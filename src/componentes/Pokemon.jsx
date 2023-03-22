import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/Pokemon.css';
import Button from '@mui/material/Button';

import { getPokemon } from '../apis/apis';
import { getPokemonSpecies } from '../apis/apis';
import { useParams } from 'react-router-dom';
import { Link } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';



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
      <Card sx={{ minWidth: 275 }}>
      <CardActions>
        <Button size="small" href='../'>Return to list</Button>
      </CardActions>
      <CardContent>
        
        <Typography variant="h5" component="div">
          <strong>Name:</strong> {Poke.name}
        </Typography>
        <img
        className='pokemonImage' 
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokeId+'.png'}
        alt='Pokemon'
       />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong>Evolves from:</strong> {pokeEvolution ? 
          <Link href={'.././' + pokeEvolution.url.slice(42,pokeEvolution.url.length)}>{pokeEvolution.name} </Link> : 'none'}
        </Typography>
        <Typography variant="body2">
          <p><strong>Height:</strong> {Poke.height}</p>
          <p><strong>Weight:</strong> {Poke.weight}</p>
          <p><strong>Abilities:</strong> {listAbilities}</p>
          <p><strong>Moves:</strong> {listMoves}</p>
          
        </Typography>
      </CardContent>
      
      
      
      
      </Card>    
    </div>
    
  );
}

export default Pokemon;