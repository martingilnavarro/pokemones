import * as React from 'react';
import { useEffect, useState } from 'react';
import Loader from './Loader'

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
import Divider from '@mui/material/Divider';



const Pokemon = () => {
  const [pokeName, setPokeName] = useState("");
  const [pokeHeight, setPokeHeight] = useState("");
  const [pokeWeight, setPokeWeight] = useState("");
  
  const [pokeMoves, setPokeMoves] = useState([])
  const [pokeAbilities, setPokeAbilities] = useState([])
  const [pokeSprites, setPokeSprites] = useState("")
  const [pokeSpritesAlt, setPokeSpritesAlt] = useState("")
  const [pokeSpeciesUrl, setPokeSpeciesUrl] = useState("");
  const [pokeChainUrl, setPokeChainUrl] = useState("")
  // set loading
  const [loadingPoke, setLoadingPoke] = useState(true);
  const [loadingChain, setLoadingChain] = useState(true);

  // evolutions
  const [pokeFirstSpecies, setPokeFirstSpecies] = useState("")
  const [pokeFirstEvolve, setPokeFirstEvolve] = useState([])
  const [pokeSecondEvolve, setPokeSecondEvolve] = useState([])
 
  const params = useParams()
  
  // get Pokemon data from API
  useEffect(() => {   
    getPokemon(params.id).then((res) => {
      setPokeName(res.data.name)
      setPokeHeight(res.data.height)
      setPokeWeight(res.data.weight)
      setPokeMoves(res.data.moves)
      setPokeSpeciesUrl(res.data.species.url)
      setPokeAbilities(res.data.abilities)
      setPokeSprites(res.data.sprites.other.home.front_default)
      setPokeSpritesAlt(res.data.sprites.front_default)
    }
    ).catch((err) => {
      console.log("Can't get Pokemon", err);
    })

    .finally(() => setLoadingPoke(false))
  }, [params.id])

  
  // get species id (need to obtain chain id) 
  
  const idSpecies = pokeSpeciesUrl ? pokeSpeciesUrl.slice(42, pokeSpeciesUrl.length-1) : ""
  // get Pokemon species data from API (needed to get chain id)
  useEffect(() => {
    getPokemonSpecies(idSpecies).then((res) => {
      setPokeChainUrl(idSpecies ? res.data.evolution_chain.url : "")
    }
    ).catch((err) => {
      console.log("Can't get Pokemon Species", err);
    })
  }, [idSpecies])
  
  // get chain id

  const idChain = pokeChainUrl ? pokeChainUrl.slice(42, pokeChainUrl.length-1) : ""
  // get Pokemon evolutions data from API
  useEffect(() => {
    getChain(idChain).then((res) => {     
      setPokeFirstSpecies(idChain ? res.data.chain.species.name : "")
      setPokeFirstEvolve(idChain ? res.data.chain.evolves_to : "")
      setPokeSecondEvolve((idChain && res.data.chain.evolves_to[0]) ? res.data.chain.evolves_to[0].evolves_to : "")      
    }
    ).catch((err) => {
      console.log("Can't get Pokemon chain", err);
    })
    .finally(() => setLoadingChain(false)) 
  }, [idChain])

  
  // push evolutions in arrays
  const pokeInitialEvolutions : Array<string> = [];
  pokeInitialEvolutions.push(pokeFirstSpecies)

  const pokeMediumEvolutions : Array<string> = [];
  for(let i=0; pokeFirstEvolve[i]; i++) {pokeFirstEvolve[i] && pokeMediumEvolutions.push(pokeFirstEvolve[i].species.name)}

  const pokeFinalEvolutions : Array<string> = [];
  for(let i=0; pokeSecondEvolve[i]; i++) {pokeSecondEvolve[i] && pokeFinalEvolutions.push(pokeSecondEvolve[i].species.name)}

  
  // show arrays into a list (evolutions, abilities, and moves)

  const listEvolutions = (list : Array<string>) => list.map((pokeEvolution, i) => 
  <ListItem disablePadding key={i}>
    <ListItemButton autoFocus={pokeEvolution===pokeName} component="a" href={'.././' + pokeEvolution}>
      <ListItemText primary={pokeEvolution} />
    </ListItemButton>
  </ListItem> )
  const listInitialEvolutions = listEvolutions(pokeInitialEvolutions)
  const listMediumEvolutions = listEvolutions(pokeMediumEvolutions)
  const listFinalEvolutions = listEvolutions(pokeFinalEvolutions)


  const listAbilities = pokeAbilities.map((pokeAbility, i) => 
    <ListItem key={i}>    
        <ListItemText primary={pokeAbility.ability.name} />     
    </ListItem> )

  const listMoves = pokeMoves.map((pokeMove, i) => 
    <ListItem  key={i}>
        <ListItemText primary={pokeMove.move.name} />
    </ListItem> )

  
 
  return (

    (loadingPoke || loadingChain) ? (
      <Loader />
    ) : (

    <Grid container direction='column' alignItems='center' style={{ minHeight: '100vh', backgroundColor: '#FAFFFF' }}>
          
      <Button size="small" href='../' >Return to list</Button>

      <Card sx={{ maxWidth: 275}}> 

        <CardHeader 
          title={pokeName}      
        />
        
        <CardMedia
          component="img"
          height="194"
          image={pokeSprites || pokeSpritesAlt}
          alt='No image available'
        />
        
        <CardContent> 

            <Typography variant="h6">Evolution Chain:</Typography>
            
            <List> {pokeChainUrl ? listInitialEvolutions: ""} </List>
            <Divider textAlign="left">{listMediumEvolutions[0] && 'Evolves to'}</Divider>
            <List> {pokeChainUrl ? listMediumEvolutions: ""} </List>
            <Divider textAlign="left">{listFinalEvolutions[0] && 'Evolves to'}</Divider>
            <List> {pokeChainUrl ? listFinalEvolutions: ""} </List>

            <Typography variant="h6">Physical Characteristics:</Typography> 
            <List>
              <ListItem>
                <ListItemText primary={pokeHeight}/>
              </ListItem>
              <ListItem >
                <ListItemText primary={pokeWeight}/>
              </ListItem>
            </List>

            <Typography variant="h6">Abilities:</Typography> 
            <List>{listAbilities}</List>

            <Typography variant="h6">Moves:</Typography> 
            <List>{listMoves}</List>
              
        </CardContent>
      </Card>
    </Grid>
    )
  );
}

export default Pokemon;