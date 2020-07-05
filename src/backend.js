export const getJokes = () => {
    return fetch('https://api.icndb.com/jokes')
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch('https://api.icndb.com/categories')
    .then(res => res.json())
    .catch(err => console.log(err))
}