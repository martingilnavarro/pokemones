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
import Button from '@mui/material/Button';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';


const GET_POKEMONS = gql(/* GraphQL */ `
    query GetPokemons(
      $pageNumber: Int!, 
      $searchName: String, 
      $minWeight: Int!, 
      $maxWeight: Int!, 
      $color: String, 
      $isBaby: Boolean, 
      $type: [String]) {
        pokemons: pokemon_v2_pokemon(
          offset: $pageNumber, 
          limit: 20, 
          order_by: {id: asc}, 
          where: {weight: {_gte: $minWeight, _lte: $maxWeight}, 
                  name: {_ilike: $searchName}, 
                  pokemon_v2_pokemonspecy: {is_baby: {_eq: $isBaby}, 
                  pokemon_v2_pokemoncolor: {name: {_ilike: $color}}},
                  pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: $type}}}}) {
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
        pokemonsCount: pokemon_v2_pokemon_aggregate (where: 
          {weight: {_gte: $minWeight, _lte: $maxWeight}, 
          name: {_ilike: $searchName}, 
          pokemon_v2_pokemonspecy: {is_baby: {_eq: $isBaby}, 
          pokemon_v2_pokemoncolor: {name: {_ilike: $color}}}
          pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_in: $type}}}}) {
            aggregate {
              count
            }
          }
    }
  `);

  const GET_COLORS_TYPES = gql`
    query GetColorTypes {
      color: pokemon_v2_pokemoncolor {
        name
        id
      }
      type: pokemon_v2_type {
        id
        name
      }
      
    }
      
    
  `;


  function DisplayPokemons( {pageNumber, searchName, minWeight, maxWeight, color, isBaby, type}: {
    pageNumber:number; searchName:string; minWeight:string|number; maxWeight:string|number; color:string; isBaby:boolean; type:string} ) {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: {pageNumber, searchName, minWeight, maxWeight, color, isBaby, type}, 
    });

    //pagination variables
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    if (!data.pokemonsCount.aggregate.count) return <p>There are no Pokemons that fulfill these filters</p>
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
            <TableCell align='right'>Type 1</TableCell>
            <TableCell align='right'>Type 2</TableCell>
                            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.pokemons.map(({id, name, weight, specy, types} : {
            id:number; name:string; weight:number; specy:{is_baby:boolean; color:{name:string}}; 
            types:{type: {name:string}}[]}) => (
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
            <TableCell align="right">{types[1]?types[1].type.name:""}</TableCell>

          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
    </>
    );
  }

const PokemonList = () => {

const { loading, error, data } = useQuery(GET_COLORS_TYPES)  

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  //Hooks initialize filters
  const [minWeight, setMinWeight] = React.useState("")
  const [maxWeight, setMaxWeight] = React.useState("")
  const [searchName, setSearchName] = React.useState("")
  const [type, setType] = React.useState<string[]>([]);
  const [isBaby, setIsBaby] = React.useState(false)
  const [color, setColor] = React.useState('');

  const [minWeightTable, setMinWeightTable] = React.useState("")
  const [maxWeightTable, setMaxWeightTable] = React.useState("")
  const [searchNameTable, setSearchNameTable] = React.useState("")
  const [typeTable, setTypeTable] = React.useState<string[]>([]);
  const [isBabyTable, setIsBabyTable] = React.useState(false)
  const [colorTable, setColorTable] = React.useState('');

  //handle Changes
  const handleChangeBaby = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBaby(event.target.checked);
  };
  const handleChangeColor = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };
  const handleChangeType = (event: SelectChangeEvent<typeof type>) => {
    const {
      target: { value },
    } = event;
    setType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Format items in Types filter
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  const removeFilters = () =>{
  setMinWeight("");
  setMaxWeight("");
  setSearchName("");
  setType([]);
  setIsBaby(false);
  setColor('');
  }

  const applyFilters = () =>{
    setMinWeightTable(minWeight);
    setMaxWeightTable(maxWeight);
    setSearchNameTable(searchName);
    setTypeTable(type);
    setIsBabyTable(isBaby);
    setColorTable(color);
    }
  
  
  

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
        <TextField id="outlined-basic3" label="Max Weight" variant="outlined" type="number" value={maxWeight}
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
          onChange={handleChangeColor}
        >
          <MenuItem value={"%"}>all</MenuItem>
          {data.color.map(({name, id} :  {name:string; id:number}) => (
                    <MenuItem value={name} key={id} >{name}</MenuItem>        
                        ))}

        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={type}
          defaultChecked
          onChange={handleChangeType}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.type.map(({name, id} : {name:string, id:number}) => (
            <MenuItem key={id} value={name}>
              <Checkbox checked={type.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button size="large" variant="contained" onClick={applyFilters}>Apply filters</Button>
      

        <FormGroup>
            <FormControlLabel control={<Checkbox checked={isBaby} onChange={handleChangeBaby}/>} label="Is baby" /> 
        </FormGroup>

        
        </Box>

        <Button size="small" onClick={removeFilters}>Reset filters</Button>


         <DisplayPokemons 
          pageNumber = {(page-1)*20} 
          searchName = {"%".concat(searchNameTable).concat("%")} 
          minWeight={minWeightTable?minWeightTable:0} 
          maxWeight={maxWeightTable?maxWeightTable:100000} 
          color={colorTable?colorTable:"%"} 
          isBaby={isBabyTable} 
          type={typeTable[0]?typeTable:data.type.map(({name} : {name:string}) => (name))}
          />
        
    </>
    )
}

export default PokemonList;