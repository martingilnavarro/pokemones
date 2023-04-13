import baseURL from "./baseURL"



const getAllPokemon = (page) => {
    return baseURL.get(`/pokemon/?offset=${(page-1)*20}&limit=${20}`)
}

const getPokemon = (id) => {
    return baseURL.get(`/pokemon/${id}/`)
}

const getPokemonSpecies = (idSpecies) => {
    return baseURL.get(`/pokemon-species/${idSpecies}`)
}

const getChain = (idChain) => {
    return baseURL.get(`/evolution-chain/${idChain}`)
}

export {getAllPokemon}
export {getPokemon}
export {getPokemonSpecies}
export {getChain}