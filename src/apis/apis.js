import baseURL from "./baseURL"

const getAllPokemon = () => {
    return baseURL.get('/pokemon/')
}

const getPokemon = (id) => {
    return baseURL.get(`/pokemon/${id}/`)
}

export {getAllPokemon}
export {getPokemon}