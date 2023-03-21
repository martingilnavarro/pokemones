import baseURL from "./baseURL"

const getAllPokemon = () => {
    return baseURL.get('/pokemon/?offset=0&limit=1300')
}

const getPokemon = (id) => {
    return baseURL.get(`/pokemon/${id}/`)
}

const getPokemonSpecies = (id) => {
    return baseURL.get(`/pokemon-species/${id}/`)
}

export {getAllPokemon}
export {getPokemon}
export {getPokemonSpecies}