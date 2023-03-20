import baseURL from "./baseURL"

const getAllPokemon = () => {
    return baseURL.get('/pokemon/?offset=0&limit=1300')
}

const getPokemon = (id) => {
    return baseURL.get(`/pokemon/${id}/`)
}

export {getAllPokemon}
export {getPokemon}