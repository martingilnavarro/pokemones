import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/Pokemon.css';
import Button from '@mui/material/Button';

import { getPokemon } from '../apis/apis';
import { useParams } from 'react-router-dom';


const Pokemon =()=> {
  const [Poke, setPoke] = useState({});
  const [pokeId, setPokeId] = useState();
  const [pokeMoves, setPokeMoves] = useState([])
  const [pokeAbilities, setPokeAbilities] = useState([])
  const params = useParams()
  const listMoves = pokeMoves.map((pokeMove) => <li> {pokeMove.move.name}</li>)
  const listAbilities = pokeAbilities.map((pokeAbility) => <li> {pokeAbility.ability.name}</li>)


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

 
  return(
    <div className='contenedor-pokemon'>
      <Button variant="contained" href='../'>Return to list</Button>
      <p className='nombre-pokemon'>{Poke.name}</p>
      <img
        className='imagen-pokemon' 
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeId+'.png'}
        alt='Pokemon'
       />
      <div className='contenedor-caracteristicas-pokemon'>
           
        <p className='pokemonExperience'><strong>Base experience:</strong> {Poke.base_experience}</p>
        <p className='pokemonHeight'><strong>Height:</strong> {Poke.height}</p>
        <p className='pokemonWeight'><strong>Weight:</strong> {Poke.weight}</p>
        <p className='pokemonAbilities'><strong>Abilities:</strong> {listAbilities}</p>
        <p className='pokemonMoves'><strong>Moves:</strong> {listMoves}</p>
        
        

      
        
      </div>     
    </div>
  );
}

export default Pokemon;