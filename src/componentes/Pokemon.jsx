import React, { useEffect, useState } from 'react';

//import gets from apis
import { getPokemon } from '../apis/apis';
import { getPokemonSpecies } from '../apis/apis';
import { getChain } from '../apis/apis';

import { useParams } from 'react-router-dom';

//imports material UI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';


const Pokemon = () => {
  const [Poke, setPoke] = useState({});
  const [pokeSpecies, setPokeSpecies] = useState({});
  const [pokeMoves, setPokeMoves] = useState([])
  const [pokeAbilities, setPokeAbilities] = useState([])
  const [pokeSprites, setPokeSprites] = useState({})
  
  // evolutions
  const [pokeFirstSpecies, setPokeFirstSpecies] = useState({})
  const [pokeFirstEvolve, setPokeFirstEvolve] = useState([])
  const [pokeSecondEvolve, setPokeSecondEvolve] = useState([])
 
  const params = useParams()

  // get Pokemon data from API
  useEffect(() => {

    getPokemon(params.id).then((res) => {
      setPoke(res.data)
      setPokeMoves(res.data.moves)
      setPokeAbilities(res.data.abilities)
      setPokeSprites(res.data.sprites)
    }
    ).catch((err) => {
      console.log("Can't get Pokemon", err);
    })
  }, [params.id])


  // get species id (need to obtain chain id) 
  const pokeSpecie = Poke.species
  const idSpecies = pokeSpecie ? pokeSpecie.url.slice(42, pokeSpecie.url.length-1) : 1

  // get Pokemon species data from API (needed to get chain id)
  useEffect(() => {
    getPokemonSpecies(idSpecies).then((res) => {
      setPokeSpecies(res.data)
    }
    ).catch((err) => {
      console.log("Can't get Pokemon Species", err);
    })
  }, [idSpecies])
  
  // get chain id
  const pokeEvolutionChain = pokeSpecies.evolution_chain
  const idChain = pokeEvolutionChain ? pokeEvolutionChain.url.slice(42, pokeEvolutionChain.url.length-1) : 1

  // get Pokemon evolutions data from API
  useEffect(() => {
    getChain(idChain).then((res) => {     
      setPokeFirstSpecies(res.data.chain.species)
      setPokeFirstEvolve(res.data.chain.evolves_to)
      setPokeSecondEvolve(res.data.chain.evolves_to[0] ? res.data.chain.evolves_to[0].evolves_to : "")      
    }
    ).catch((err) => {
      console.log("Can't get Pokemon chain", err);
    })
  }, [idChain])


  // push evolutions in an array 
  const pokeEvolutions = [];
  pokeEvolutions.push(pokeFirstSpecies.name)
  for(let i=0; pokeFirstEvolve[i]; i++) {pokeFirstEvolve[i] && pokeEvolutions.push(pokeFirstEvolve[i].species.name)}
  pokeSecondEvolve[0] && pokeEvolutions.push(pokeSecondEvolve[0].species.name)

  
  // show arrays into a list (evolutions, abilities, and moves)
  const listEvolutions = pokeEvolutions.map((pokeEvolution, i) => 
  <ListItem disablePadding key={i}>
    <ListItemButton autoFocus={pokeEvolution===Poke.name} component="a" href={'.././' + pokeEvolution}>
      <ListItemText primary={pokeEvolution} />
    </ListItemButton>
  </ListItem> )

  const listAbilities = pokeAbilities.map((pokeAbility, i) => 
    <ListItem disablePadding key={i}>
      <ListItemButton dense={true}>
        <ListItemText primary={pokeAbility.ability.name} />
      </ListItemButton>
    </ListItem> )

  const listMoves = pokeMoves.map((pokeMove, i) => 
    <ListItem disablePadding key={i}>
      <ListItemButton dense={true} >
        <ListItemText primary={pokeMove.move.name} />
      </ListItemButton>
    </ListItem> )

  const pokeHeight = `Height: ${Poke.height}`
  const pokeWeight = `Weight: ${Poke.weight}`
 
 
  return (

    <Grid container direction='column' alignItems='center' style={{ minHeight: '100vh', backgroundColor: '#FAFFFF' }}>
      
      <Button size="small" href='../' >Return to list</Button>

      <Card sx={{ maxWidth: 275}}> 

        <CardHeader 
          title={Poke.name}      
        />
        
        <CardMedia
          component="img"
          height="194"
          image={pokeSprites.front_default}
          alt='No image available'
        />
        
        <CardContent> 

            <Typography variant="h6">Evolutions:</Typography>
            <List> {pokeEvolutionChain ? listEvolutions: "None"} </List>

            <Typography variant="h6">Physical Characteristics:</Typography> 
            <List>
              <ListItem disablePadding>
                <ListItemButton >
                <ListItemText primary={pokeHeight}/>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                <ListItemText primary={pokeWeight}/>
                </ListItemButton>
              </ListItem>
            </List>

            <Typography variant="h6">Abilities:</Typography> 
            <List>{listAbilities}</List>

            <Typography variant="h6">Moves:</Typography> 
            <List>{listMoves}</List>
              
        </CardContent>
      </Card>
    </Grid>

  );
}

export default Pokemon;