import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/Pokemon.css';
import Button from '@mui/material/Button';

import { getPokemon } from '../apis/apis';
import { getPokemonSpecies } from '../apis/apis';
import { useParams } from 'react-router-dom';
import { Link } from '@mui/material';



const Pokemon =()=> {
  const [Poke, setPoke] = useState({});
  const [pokeSpecies, setPokeSpecies] = useState({});
  const [pokeId, setPokeId] = useState();
  const [pokeMoves, setPokeMoves] = useState([])
  const [pokeAbilities, setPokeAbilities] = useState([])
  const params = useParams()
  const listMoves = pokeMoves.map((pokeMove) => <li> {pokeMove.move.name}</li>)
  const listAbilities = pokeAbilities.map((pokeAbility) => <li> {pokeAbility.ability.name}</li>)
  const pokeEvolution = pokeSpecies.evolves_from_species
  


  useEffect(() => {
    setPokeId(params.id)
    
    getPokemon(params.id).then((res) => {
       setPoke(res.data)
       setPokeMoves(res.data.moves)
       setPokeAbilities(res.data.abilities) }
     ).catch((err)=>{
       console.log("error",err);
      
     })


  },[params.id])

  useEffect(() => {
    setPokeId(params.id)
    
    getPokemonSpecies(params.id).then((res) => {
       setPokeSpecies(res.data)

 }
     ).catch((err)=>{
       console.log("error",err);
      
     })


  },[params.id])

 
  return(
    
    <div className='pokemonContainer'>
      <Button variant="contained" href='../'>Return to list</Button>
      
      
      <div className='pokemonCharacteristics'>
        <p className='pokemonName'><strong>Name:</strong> {Poke.name}</p> 
        <img
        className='pokemonImage' 
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeId+'.png'}
        alt='Pokemon'
       />
        <p className='pokemonEvolution'><strong>Evolves from:</strong> {pokeEvolution ? 
        <Link href={'.././' + pokeEvolution.url.slice(42,pokeEvolution.url.length)}>{pokeEvolution.name} </Link> : 'none'}</p>
        <p className='pokemonHeight'><strong>Height:</strong> {Poke.height}</p>
        <p className='pokemonWeight'><strong>Weight:</strong> {Poke.weight}</p>
        <p className='pokemonAbilities'><strong>Abilities:</strong> {listAbilities}</p>
        <p className='pokemonMoves'><strong>Moves:</strong> {listMoves}</p>
        

      </div>     
    </div>
  );
}

export default Pokemon;