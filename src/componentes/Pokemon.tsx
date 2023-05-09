import * as React from 'react';
import { useEffect, useState } from 'react';
import Loader from './Loader'
import { useQuery, gql } from '@apollo/client';

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


const GET_POKEMON = gql`
    query GetPokemon($pokeName: String!) {
        pokemon: pokemon_v2_pokemon(where: {name: {_eq: $pokeName}}) {
            name 
            id
            height
            pokemon_species_id
            weight
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                id
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                id
                name
              }
            }
            pokemon_v2_pokemonspecy {
              pokemon_v2_evolutionchain {
                pokemon_v2_pokemonspecies {
                  name
                  id
                }
              }
            }
            
          
        } 
    }
  `;

function DisplayPokemon( {pokeName} ) {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {pokeName},
  });

  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${1}.png`
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : ${error.message}</p>;
    return (
      <Grid container direction='column' alignItems='center' style={{ minHeight: '100vh', backgroundColor: '#FAFFFF' }}>
          
      <Button size="small" href='../' >Return to list</Button>

      <Card sx={{ maxWidth: 275}}> 
          
        <CardHeader 
          title={data.pokemon[0].name}      
        />
        
        <CardMedia
          component="img"
          height="194"
          image= {img}
          alt='No image available'
        />
        
      
        <CardContent> 


            <Typography variant="h6">Height:</Typography> 
            <List>
              <ListItem>
                <ListItemText primary={data.pokemon[0].height}/>
              </ListItem>
            </List>
            <Typography variant="h6">Weight:</Typography> 
            <List>
              <ListItem>
                <ListItemText primary={data.pokemon[0].weight}/>
              </ListItem>
            </List>

            <Typography variant="h6">Evolution Chain:</Typography> 
            <List>
              {data.pokemon[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map(({id, name}) => (
                <ListItem disablePadding key={id}> 
                  <ListItemButton autoFocus={name===data.pokemon[0].name}component="a" href={'.././' + name}>  
                  <ListItemText primary={name} />  
                  </ListItemButton> 
                </ListItem>
              ))}
            </List>
            

            <Typography variant="h6">Abilities:</Typography> 
            <List>
              {data.pokemon[0].pokemon_v2_pokemonabilities.map(({pokemon_v2_ability}) => (
                <ListItem key={pokemon_v2_ability.id}>    
                  <ListItemText primary={pokemon_v2_ability.name} />     
                </ListItem> 
              ))}
            </List>

            <Typography variant="h6">Types:</Typography> 
            <List>
              {data.pokemon[0].pokemon_v2_pokemontypes.map(({pokemon_v2_type}) => (
                <ListItem key={pokemon_v2_type.id}>    
                  <ListItemText primary={pokemon_v2_type.name} />     
                </ListItem> 
              ))}
            </List>

            

            
              
        </CardContent>
      </Card>
    </Grid>
    )
}

  

const Pokemon = () => {
 
  const params = useParams()
  
 
  return (


    <DisplayPokemon pokeName = {params.id} />

  
    )
  ;
}

export default Pokemon;