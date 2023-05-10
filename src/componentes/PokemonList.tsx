import * as React from 'react';
import { useQuery, gql } from '@apollo/client';


//import material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link as LinkUI} from '@mui/material' ;
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';


const GET_POKEMONS = gql`
    query GetPokemons($pageNumber: Int!, $searchName: String, $minWeight: Int!, $maxWeight: Int!) {
        pokemons: pokemon_v2_pokemon(offset: $pageNumber, limit: 20, 
            order_by: {id: asc}, where: {weight: {_gte: $minWeight, _lte: $maxWeight}, name: {_ilike: $searchName}}) {
            name 
            id
            weight
            pokemon_species_id
            pokemon_v2_pokemonspecy {
                is_baby
                pokemon_v2_pokemoncolor {
                    id
                    name
                  }
            }
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  id
                  name
                }
              }
        } 
        pokemonsCount: pokemon_v2_pokemon_aggregate (where: {weight: {_gte: $minWeight, _lte: $maxWeight}, name: {_ilike: $searchName}}) {
            aggregate {
              count
            }
          }
    }
  `;

  function DisplayPokemons( {pageNumber, searchName, minWeight, maxWeight} ) {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: {pageNumber, searchName, minWeight, maxWeight}, 
    });

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    return (
        <>

    <Pagination
            page={page}
            count={Math.ceil((data.pokemonsCount.aggregate.count)/20)}
            renderItem={(item) => (
            <PaginationItem
                component={Link}
                to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
            />
            )}
         />
        
             
            <TableContainer component={Paper} sx={{ backgroundColor: '#FAFFFF' }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#CFFFFF' }}>
                        <TableRow>
                            <TableCell>Pokemon Name</TableCell> 
                            <TableCell align='right'>Weight</TableCell> 
                            <TableCell align='right'>Is baby?</TableCell> 
                            <TableCell align='right'>Color</TableCell> 
                            <TableCell align='right'>Type</TableCell> 
                               
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.pokemons.map(({id, name, weight, pokemon_v2_pokemonspecy, pokemon_v2_pokemontypes}) => (
                            <TableRow 
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <LinkUI href={'./' + name}>{name}</LinkUI>
                                </TableCell>
                                <TableCell align="right">{weight}</TableCell>
                                <TableCell align="right">{pokemon_v2_pokemonspecy.is_baby}</TableCell>
                                <TableCell align="right">{pokemon_v2_pokemonspecy.pokemon_v2_pokemoncolor.name}</TableCell>
                                <TableCell align="right">{pokemon_v2_pokemontypes[0].pokemon_v2_type.name}</TableCell>
    
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        
            </>
        );
  }

const PokemonList = () => {



  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const [minWeight, setMinWeight] = React.useState("")
  const [maxWeight, setMaxWeight] = React.useState("")
  const [searchName, setSearchName] = React.useState("")
  

    

    // display data
    return (
    <>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField id="outlined-basic" label="Pokemon Name" variant="outlined" defaultValue={searchName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchName(event.target.value);
              }}/>
        <TextField id="outlined-basic2" label="Min Weight" variant="outlined" value={minWeight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMinWeight((event.target.value));
          }} />
        <TextField id="outlined-basic2" label="Max Weight" variant="outlined" defaultValue={maxWeight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMaxWeight((event.target.value));
              }}/>
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Is baby" /> 
        </FormGroup>
        </Box>

         
         <DisplayPokemons pageNumber = {(page-1)*20} searchName = {"%".concat(searchName).concat("%")} 
         minWeight={minWeight?minWeight:0} maxWeight={maxWeight?maxWeight:100000}/>
        
    </>
    )
}

export default PokemonList;