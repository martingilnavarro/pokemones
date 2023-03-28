import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';


import { getPokemon } from '../apis/apis';
import { getPokemonSpecies } from '../apis/apis';
import { getChain } from '../apis/apis';
import { useParams } from 'react-router-dom';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
  const [pokeSecondSpecies, setPokeSecondSpecies] = useState({})
  const [pokeThirdSpecies, setPokeThirdSpecies] = useState({})

  const params = useParams()


  const listMoves = pokeMoves.map((pokeMove) => 
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemText primary={pokeMove.move.name} />
    </ListItemButton>
  </ListItem> )
  //<li key={pokeMove.move.name}> {pokeMove.move.name}</li>)
  const listAbilities = pokeAbilities.map((pokeAbility) => 
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemText primary={pokeAbility.ability.name} />
    </ListItemButton>
  </ListItem> )
  
  //<li> {pokeAbility.ability.name}</li>)
  
  
  const pokeEvolutionChain = pokeSpecies.evolution_chain
  const pokeIdChain = parseInt(pokeEvolutionChain ? pokeEvolutionChain.url.slice(42, pokeEvolutionChain.url.length-1) : "")
  const pokeEvolutions = [];
  pokeEvolutions.push(pokeFirstSpecies.name)
  pokeEvolutions.push(pokeSecondSpecies.name)
  pokeEvolutions.push(pokeThirdSpecies.name)
  const listEvolutions = pokeEvolutions.map((pokeEvolution) => 
  <ListItem disablePadding>
    <ListItemButton component="a" href={'.././' + pokeEvolution}>
      <ListItemText primary={pokeEvolution} />
    </ListItemButton>
  </ListItem> )
  const pokeHeight = `Height: ${Poke.height}`
  const pokeWeight = `Weight: ${Poke.weight}`
  //<li key={pokeEvolution}> 
  //<Link href={'.././' + pokeEvolution}>{pokeEvolution}</Link></li>)
  
    


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

    getPokemonSpecies(params.id).then((res) => {
      setPokeSpecies(res.data)

    }
    ).catch((err) => {
      console.log("error", err);

    })

  }, [params.id])

  useEffect(() => {

    getChain(pokeIdChain).then((res) => {
      setPokeFirstSpecies(res.data.chain.species)
      setPokeSecondSpecies(res.data.chain.evolves_to[0].species)
      setPokeThirdSpecies(res.data.chain.evolves_to[0].evolves_to[0].species)

    }
    ).catch((err) => {
      console.log("error!!!", err);

    })

  }, [pokeIdChain])



  return (

    
    <Grid container spacing={0} direction='column' alignItems='center' justify="center" style={{ minHeight: '100vh' }}>
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
          

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            
          
            <Typography variant="h6">Evolution Chain:</Typography>
              <List>
              {listEvolutions}
              </List>

              
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

              <Typography variant="h6">Abilities:</Typography> <List>{listAbilities}</List>
              <Typography variant="h6">Moves:</Typography> <List>{listMoves}</List>
            

          </Typography>
        </CardContent>
      </Card>
    </Grid>
    //</div>

  );
}

export default Pokemon;