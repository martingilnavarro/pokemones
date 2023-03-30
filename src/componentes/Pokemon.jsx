import React, { useEffect, useState } from 'react';

import { getPokemon } from '../apis/apis';
import { getPokemonSpecies } from '../apis/apis';
import { getChain } from '../apis/apis';
import { useParams } from 'react-router-dom';

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
import Grid from '@mui/material/Grid'


const Pokemon = () => {
  const [Poke, setPoke] = useState({});
  const [pokeSpecies, setPokeSpecies] = useState({});
  const [pokeMoves, setPokeMoves] = useState([])
  const [pokeAbilities, setPokeAbilities] = useState([])
  const [pokeSprites, setPokeSprites] = useState({})
  
  const [pokeFirstSpecies, setPokeFirstSpecies] = useState({})
  const [pokeFirstEvolve, setPokeFirstEvolve] = useState([])
  const [pokeSecondEvolve, setPokeSecondEvolve] = useState([])
 

  const params = useParams()


  
  
  const pokeEvolutionChain = pokeSpecies.evolution_chain
  const idChain = parseInt(pokeEvolutionChain ? pokeEvolutionChain.url.slice(42, pokeEvolutionChain.url.length-1) : 1)
  const pokeEvolutions = [];

  pokeEvolutions.push(pokeFirstSpecies.name)
  for(let i=0; pokeFirstEvolve[i]; i++) {pokeFirstEvolve[i] && pokeEvolutions.push(pokeFirstEvolve[i].species.name)}
  pokeSecondEvolve[0] && pokeEvolutions.push(pokeSecondEvolve[0].species.name)

  const pokeSpecie = Poke.species
  const idSpecies = parseInt(pokeSpecie ? pokeSpecie.url.slice(42, pokeSpecie.url.length-1) : 1)

  const listEvolutions = pokeEvolutions.map((pokeEvolution) => 
  <ListItem disablePadding>
    <ListItemButton component="a" href={'.././' + pokeEvolution}>
      <ListItemText primary={pokeEvolution} />
    </ListItemButton>
  </ListItem> )

  const pokeHeight = `Height: ${Poke.height}`
  const pokeWeight = `Weight: ${Poke.weight}`

  const listAbilities = pokeAbilities.map((pokeAbility) => 
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={pokeAbility.ability.name} />
      </ListItemButton>
    </ListItem> )

  const listMoves = pokeMoves.map((pokeMove) => 
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={pokeMove.move.name} />
      </ListItemButton>
    </ListItem> )
 

  useEffect(() => {

    getPokemon(params.id).then((res) => {
      setPoke(res.data)
      setPokeMoves(res.data.moves)
      setPokeAbilities(res.data.abilities)
      setPokeSprites(res.data.sprites)
    }
    ).catch((err) => {
      console.log("error", err);
    })
  }, [params.id])


  useEffect(() => {

    getPokemonSpecies(idSpecies).then((res) => {
      setPokeSpecies(res.data)
    }
    ).catch((err) => {
      console.log("error", err);
    })

  }, [idSpecies])

  useEffect(() => {

    getChain(idChain).then((res) => {
      
      setPokeFirstSpecies(res.data.chain.species)
      setPokeFirstEvolve(res.data.chain.evolves_to)
      setPokeSecondEvolve(res.data.chain.evolves_to[0] ? res.data.chain.evolves_to[0].evolves_to : "") 
      

    }
    ).catch((err) => {
      console.log("error!!!", err);

    })

  }, [idChain])



  return (

    
    <Grid container spacing={0} direction='column' alignItems='center' justify="center" style={{ minHeight: '100vh', backgroundColor: '#EEEEEE' }}>

      <Button size="small" href='../'>Return to list</Button>

      <Card sx={{ maxWidth: 275}}> 

        <CardHeader 
          title={Poke.name}      
        />

        <CardMedia
          component="img"
          height="194"
          image={pokeSprites.front_default}
          alt={Poke.name}
        />
        
        <CardContent> 

            <Typography variant="h6">Evolutions:</Typography>
            <List> {listEvolutions} </List>

            <Typography variant="h6">Physical Characteristics:</Typography> 
            <List>
              <ListItem disablePadding>
                <ListItemButton>
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