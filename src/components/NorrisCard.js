import React from 'react'
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles=makeStyles({
    card:{
        marginBottom:20,
        marginTop:20,
        backgroundColor:'steelblue',
        color:'#fff',
        opacity:"95%"
    },
    cContent:{
        padding:12
    },
    cardAction:
    {
        padding:18,
    },
    button:{
        backgroundColor:'#f57b51'
    }  
})

export default function Jokescard({joke,like,unLike,index}) {
    const classes=styles();

    return (
        <Card variant="outlined" className={classes.card} id={`joke-${index}`}>
            <CardContent className={classes.cContent}>
            {joke.categories.length>0?(
                joke.categories.map((type)=>(
                    <h3 key={type}
                        style={{
                            textAlign: 'right',
                            marginRight: '2rem',
                            color: 'lightgrey'
                        }} > #{type}
                    </h3>
                ))
            ):<h3 style={{
                textAlign: 'right',
                marginRight: '2rem',
                color: 'lightgrey'
            }}>#Normal</h3>}
            <Typography style={{textAlign: 'left'}}>
                {joke.joke}
            </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button
                    variant='contained'
                    onClick={()=>like(joke.id)}
                    style={{fontWeight:'700', backgroundColor: '#51E63D'}}>
                    <span role="img" aria-label="up">👍</span>
                </Button>
                <Button
                    variant='contained'
                    onClick={()=>unLike(joke.id)}
                    style={{backgroundColor:"#E63DA5",fontWeight:'700'}}>
                    <span role="img" aria-label="down">👎</span>
                </Button>
            </CardActions>         
        </Card>
    )
}