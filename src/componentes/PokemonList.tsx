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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';



const GET_POKEMONS = gql`
    query GetPokemons($pageNumber: Int!, $searchName: String, $minWeight: Int!, $maxWeight: Int!, $color: String, $isBaby: Boolean) {
        pokemons: pokemon_v2_pokemon(offset: $pageNumber, limit: 20, 
            order_by: {id: asc}, where: {weight: {_gte: $minWeight, _lte: $maxWeight}, 
            name: {_ilike: $searchName}, 
            pokemon_v2_pokemonspecy: {is_baby: {_eq: $isBaby}, pokemon_v2_pokemoncolor: {name: {_ilike: $color}}}}) {
            name 
            id
            weight
            specy: pokemon_v2_pokemonspecy {
                is_baby
                color: pokemon_v2_pokemoncolor {
                    id
                    name
                  }
            }
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                  id
                  name
                }
              }
        } 
        pokemonsCount: pokemon_v2_pokemon_aggregate (where: {weight: {_gte: $minWeight, _lte: $maxWeight}, 
            name: {_ilike: $searchName}, 
            pokemon_v2_pokemonspecy: {is_baby: {_eq: $isBaby}, pokemon_v2_pokemoncolor: {name: {_ilike: $color}}}}) {
            aggregate {
              count
            }
          }
    }
  `;

  const GET_COLORS = gql`
    query GetColor {
        color: pokemon_v2_pokemoncolor {
        name
        id
        }
    }
  `;



  function DisplayPokemons( {pageNumber, searchName, minWeight, maxWeight, color, isBaby} ) {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: {pageNumber, searchName, minWeight, maxWeight, color, isBaby}, 
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
                        {data.pokemons.map(({id, name, weight, specy, types}) => (
                            <TableRow 
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <LinkUI href={'./' + name}>{name}</LinkUI>
                                </TableCell>
                                <TableCell align="right">{weight}</TableCell>
                                <TableCell align="right">{specy.is_baby?"true":"false"}</TableCell>
                                <TableCell align="right">{specy.color.name}</TableCell>
                                <TableCell align="right">{types[0].type.name}</TableCell>
    
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        
            </>
        );
  }

const PokemonList = () => {

const { loading, error, data } = useQuery(GET_COLORS)  

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const [minWeight, setMinWeight] = React.useState("")
  const [maxWeight, setMaxWeight] = React.useState("")
  const [searchName, setSearchName] = React.useState("")

  const [isBaby, setIsBaby] = React.useState(false)
  const handleChangeBaby = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBaby(event.target.checked);
  };

  const [color, setColor] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    
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
        <TextField id="outlined-basic" label="Pokemon Name" variant="outlined" value={searchName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchName(event.target.value);
              }}/>
        <TextField id="outlined-basic2" label="Min Weight" variant="outlined" type="number" value={minWeight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMinWeight((event.target.value));
          }} />
        <TextField id="outlined-basic2" label="Max Weight" variant="outlined" type="number" value={maxWeight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMaxWeight((event.target.value));
              }}/>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={color}
          label="Color"
          onChange={handleChange}
        >
          <MenuItem value={"%"}>all</MenuItem>

          {data.color.map(({name, id}) => (
                    <MenuItem value={name} key={id}>{name}</MenuItem>        
                        ))}

        </Select>
      </FormControl>
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={isBaby} onChange={handleChangeBaby}/>} label="Is baby" /> 
        </FormGroup>
        </Box>

         
         <DisplayPokemons pageNumber = {(page-1)*20} searchName = {"%".concat(searchName).concat("%")} 
         minWeight={minWeight?minWeight:0} maxWeight={maxWeight?maxWeight:100000} 
         color={color?color:"%"} isBaby={isBaby}/>
        
    </>
    )
}

export default PokemonList;