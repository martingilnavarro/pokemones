import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/Pokemon.css';
import Button from '@mui/material/Button';


import { getPokemon } from '../apis/apis';
import { getPokemonSpecies } from '../apis/apis';
import { getChain } from '../apis/apis';
import { useParams } from 'react-router-dom';
import { Container, Grid, Link } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';


const Pokemon = () => {
  const [Poke, setPoke] = useState({});
  const [pokeSpecies, setPokeSpecies] = useState({});
  const [pokeMoves, setPokeMoves] = useState([])
  const [pokeAbilities, setPokeAbilities] = useState([])
  const [pokeSprites, setPokeSprites] = useState({})
  const [pokeChain, setPokeChain] = useState({})
  const [pokeFirstSpecies, setPokeFirstSpecies] = useState({})
  const [pokeSecondSpecies, setPokeSecondSpecies] = useState({})
  const [pokeThirdSpecies, setPokeThirdSpecies] = useState({})

  const params = useParams()
  const listMoves = pokeMoves.map((pokeMove) => <li key={pokeMove.move.name}> {pokeMove.move.name}</li>)
  const listAbilities = pokeAbilities.map((pokeAbility) => <li key={pokeAbility.ability.name}> {pokeAbility.ability.name}</li>)
  const pokeEvolvesFrom = pokeSpecies.evolves_from_species
  const pokeEvolutionChain = pokeSpecies.evolution_chain
  const pokeIdChain = parseInt(pokeEvolutionChain ? pokeEvolutionChain.url.slice(42, pokeEvolutionChain.url.length-1) : 1)

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
      setPokeChain(res.data.chain)
      setPokeFirstSpecies(res.data.chain.species)
      setPokeSecondSpecies(res.data.chain.evolves_to[0].species)
      setPokeThirdSpecies(res.data.chain.evolves_to[0].evolves_to[0].species)

    }
    ).catch((err) => {
      console.log("error!!!", err);

    })

  }, [pokeIdChain])



  return (

    //<div className='pokemonContainer'>
    <Container>
      <Card sx={{ maxWidth: 275 }}>
        <CardActions >
          <Button size="small" href='../'>Return to list</Button>
        </CardActions>
        <CardContent sx={{ justifyContent: "center" }}>
          <Typography variant='h5' sx={{ fontWeight: "bold" }}>{Poke.name}</Typography>
          

          <img
            className='pokemonImage'
            src={pokeSprites.front_default}
            alt='Pokemon'
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <strong>Evolves from:</strong> {pokeEvolvesFrom ?
              <Link href={'.././' + pokeEvolvesFrom.url.slice(42, pokeEvolvesFrom.url.length)}>{pokeEvolvesFrom.name} </Link> : 'none'}
           <br />
           
            <br />
           <strong>Evolution Chain:</strong> 
           <br />
           {pokeFirstSpecies.name}
           <br />
           {pokeSecondSpecies.name}
           <br />
           {pokeThirdSpecies.name}
            
          </Typography>
          <Typography variant="body2">

            <br />

            <strong>Height:</strong> {Poke.height}<br /><br />
            <strong>Weight:</strong> {Poke.weight}<br /><br />
            <strong>Abilities:</strong> {listAbilities}<br />
            <strong>Moves:</strong> {listMoves}<br />
            

          </Typography>
        </CardContent>
      </Card>
    </Container>
    //</div>

  );
}

export default Pokemon;