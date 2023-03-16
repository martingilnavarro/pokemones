import axios from 'axios';
const baseURL = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    header:{
        "Content-type": "aplication/json"
    }
})

export default baseURL