import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/Pokemon.css';
import Button from '@mui/material/Button';
import { getPokemon } from '../apis/apis';
import { useParams } from 'react-router-dom';

const Pokemon =(props)=> {
  const [Poke, setPoke] = useState({});
  const [pokeId, setPokeId] = useState();
  const params = useParams()

  // useEffect(() => {
  //   getAllPokemon().then((res) =>
  //     setListPoke(res.data.results)
  //   ).catch((err)=>{
  //     console.log("error",err)
  //   })
  // },[])

  useEffect(() => {
    setPokeId(params.id)
    console.log(params.id)
    

    getPokemon(params.id).then((res) =>
       setPoke(res.data) /*console.log(res.data)*/
     ).catch((err)=>{
       console.log("error",err);
      
     })


  },[])

 

  return(
    <div className='contenedor-pokemon'>
      <img
      //className='imagen-pokemon'
      //src={require(`../imagenes/imagen-pikachu.png`)}
      //alt='Imagen de {props.imagen}'
       />
      <div className='contenedor-caracteristicas-pokemon'>
        
        <p className='nombre-pokemon'>Name: {Poke.name}</p>
        <p className='evoluciones-pokemon'>Base experience: {Poke.base_experience}</p>
        <p className='altura-pokemon'>Height: {Poke.height}</p>
        <p className='altura-pokemon'>Weight: {Poke.weight}</p>
      
        <Button variant="contained" href='../'>Return to list</Button>
      </div>     
    </div>
  );
}

export default Pokemon;