import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/Pokemon.css';
import Button from '@mui/material/Button';

import { getPokemon } from '../apis/apis';
import { useParams } from 'react-router-dom';


const Pokemon =()=> {
  const [Poke, setPoke] = useState({});
  const [pokeId, setPokeId] = useState();
  const params = useParams()
  //const forms = Poke.moves.map((pokeMove) => <p>{pokeMove.move.name}</p>)


  useEffect(() => {
    setPokeId(params.id)
    
    getPokemon(params.id).then((res) =>
       setPoke(res.data) 
     ).catch((err)=>{
       console.log("error",err);
      
     })

  },[params.id])

 
  return(
    <div className='contenedor-pokemon'>
      <p className='nombre-pokemon'>{Poke.name}</p>
      <img
        className='imagen-pokemon' 
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeId+'.png'}
        alt='Pokemon'
       />
      <div className='contenedor-caracteristicas-pokemon'>
           
        <p className='pokemonExperience'>Base experience: {Poke.base_experience}</p>
        <p className='pokemonHeight'>Height: {Poke.height}</p>
        <p className='pokemonWeight'>Weight: {Poke.weight}</p>
        
        

      
        <Button variant="contained" href='../'>Return to list</Button>
      </div>     
    </div>
  );
}

export default Pokemon;