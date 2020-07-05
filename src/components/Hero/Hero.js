import React, { useEffect, useState } from 'react'
import { getJokes, getCategories } from '../../backend'
import {
	FormControlLabel,
	Checkbox,
	CssBaseline,
	Container,
	Tabs,
	Tab,
	AppBar,
	Badge,
	CircularProgress
} from '@material-ui/core'

import NorrisCard from '../NorrisCard'

function Hero() {
	const [loading, setLoading] = useState(false)
	const [jokes, setJokes] = useState([])
	const [stack, setStack] = useState([])
	const [categories, setCategories] = useState([])
	const [liked, setLiked] = useState([])
	const [currentTab, setCurrentTab] = useState(0)
	const [filteredNorris, setFilteredNorris] = useState([])

	useEffect(() => {
		setLoading(true)
		getJokes()
		.then(jokes => {
			setLoading(false)
			setJokes(jokes.value)
			setStack(jokes.value.slice(0, 10))
			observeElement()
		})
		.catch(err => console.log(err))

		getCategories()
		.then(categories => {
			setCategories(categories.value)
			setFilteredNorris(categories.value)
		})
		.catch(err => console.log(err))
		/* eslint-disable */
	}, [])

	const changeTab=(event,value)=>{
    	setCurrentTab(value)
  	}

	const like=(id)=>{
    if(liked.find(i=>i.id===id))
    return;
    const likedNorris=jokes.find(i=>i.id===id)
    setLiked([likedNorris,...liked])
  };
  const unLike=(id)=>{
    const newLiked= liked.filter((i)=>i.id!==id)
    setLiked(newLiked);
	}
	
	const loadJokes=()=>{
		setLoading(true);
		setTimeout(()=>{
			setStack(jokes.slice(0,stack.length + 8))
			setLoading((false))
		},500)
	}

	const observeElement=(element)=>{
		if(!element) return;
		const observer= new IntersectionObserver((entries)=>{
			if(entries[0].isIntersecting===true){
				loadJokes();
				
				// console.log('Reached bottom of card')
				observer.unobserve(element);
			}
		},{
			threshold:1
		});
		observer.observe(element);
	}
	useEffect(()=>{
		const element = document.getElementById(`joke-${stack.length-1}`)
		observeElement(element)
	},[stack])

	const toggleCategory=(event)=>{
		const category=event.target.name
		if(filteredNorris.includes(category)){
			const filterCategoriesCopy=[...filteredNorris]
			const categoryIndex=filterCategoriesCopy.indexOf(category)
			filterCategoriesCopy.splice(categoryIndex)
			setFilteredNorris(filterCategoriesCopy)
		}else{
			setFilteredNorris([...filteredNorris, category])
		}
	}
	const matchCategory=(category)=>{
		for(let i=0;i< category.length;i++)
		{
			if(filteredNorris.includes(category[i])) return true
		}
		return false
	}
	const Loader = () => {
		return (
			<div style={{textAlign:'center',padding:'2rem'}}>
				<CircularProgress/>
			</div>
		)
	}

	return (
    <div className='app-Comp' >
      <CssBaseline />
      <Container>
				<AppBar style={{
					position:'sticky',
					backgroundColor:'#07031a',
					color:'#fff',
					top: '8vh'
				}}>

					<Tabs value={currentTab} onChange={changeTab} centered>
						<Tab label="Jokes" id="jokes-tab" aria-controls="jokes-panel" style={{fontWeight:"700"}}/>
						<Tab label={
							<Badge 
							color='secondary'
							badgeContent={
								liked.length>0?liked.length:null
							} style={{fontWeight:"700"}}
							>Likes</Badge>
						} id="like-tab" aria-controls="like-panel" />
					</Tabs>
        </AppBar>


        <div role='tabpanel' hidden={currentTab!==0} style={{marginTop: '10vh'}}>
        {categories.map((category)=>(
          <FormControlLabel 
					key={category} 
					style={{
						top: '15vh',
						zIndex: 100}}
          control={
          <Checkbox 
          name={category}  
          checked={filteredNorris.includes(category)}
          onChange={toggleCategory}
          />} 
          label={category} />
        ))}

			{stack.map((joke,index)=>{
          if (joke.categories.length===0|| matchCategory(joke.categories))
          {
          return <NorrisCard style={{marginTop: '10vh'}} joke={joke} key={joke.id} like={like} unLike={unLike} index={index}/>
          }})}
          {loading&&<Loader/>}
        </div>
        <div role='tabpanel' hidden={currentTab!==1} style={{marginTop: '10vh'}}>
          {liked.map((joke,index)=>(
            <NorrisCard joke={joke} key={joke.id} like={like} unLike={unLike} index={index}/>
          ))}
        </div>

      </Container>
    </div>
  );
}

export default Hero
