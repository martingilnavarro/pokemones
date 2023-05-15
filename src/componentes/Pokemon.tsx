import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
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
            weight
            abilities: pokemon_v2_pokemonabilities {
              ability: pokemon_v2_ability {
                id
                name
              }
            }
            pokesprites: pokemon_v2_pokemonsprites {
              sprites
            }
            types: pokemon_v2_pokemontypes {
              type: pokemon_v2_type {
                id
                name
              }
            }
            specy: pokemon_v2_pokemonspecy {
              evolutionchain: pokemon_v2_evolutionchain {
                species: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
                  name
                  id
                }
              }
            }
            
          
        } 
    }
  `;

function DisplayPokemon( {pokeName} : {pokeName:string} ) {
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {pokeName},
  });


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
          image= {((JSON.parse(data.pokemon[0].pokesprites[0].sprites)).other.home.front_default) ?
            ((JSON.parse(data.pokemon[0].pokesprites[0].sprites)).other.home.front_default)
            .replace("/media", "https://raw.githubusercontent.com/PokeAPI/sprites/master/") : ""}
          alt='No image available'
        />
        
      
        <CardContent> 

            <Typography variant="h6">Evolution Chain:</Typography> 
            <List>
              {data.pokemon[0].specy.evolutionchain.species.map(({id, name} : {id:number; name:string}) => (
                <ListItem disablePadding key={id}> 
                  <ListItemButton autoFocus={name===data.pokemon[0].name}component="a" href={'.././' + name}>  
                  <ListItemText primary={name} />  
                  </ListItemButton> 
                </ListItem>
              ))}
            </List>

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
            

            <Typography variant="h6">Abilities:</Typography> 
            <List>
              {data.pokemon[0].abilities.map(({ability} : {ability:{id:number;name:string}}) => (
                <ListItem key={ability.id}>    
                  <ListItemText primary={ability.name} />     
                </ListItem> 
              ))}
            </List>

            <Typography variant="h6">Types:</Typography> 
            <List>
              {data.pokemon[0].types.map(({type} : {type:{id:number;name:string}}) => (
                <ListItem key={type.id}>    
                  <ListItemText primary={type.name} />     
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