import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getAllPokemon } from '../apis/apis';

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

const GET_POKEMONS = gql`
    query samplePokeAPIquery {
    pokemons: pokemon_v2_pokemonspecies(offset: 1, limit: 20, order_by: {id: asc}) {
      name
      id
    } 
  }
  `;

  function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_POKEMONS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    return (
        <>
             
            <TableContainer component={Paper} sx={{ backgroundColor: '#FAFFFF' }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#CFFFFF' }}>
                        <TableRow>
                            <TableCell>Pick a Pokemon!</TableCell>  
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.pokemons.map(({id, name}) => (
                            <TableRow 
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <LinkUI href={'./' + name}>{name}</LinkUI>
                                </TableCell>
    
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        );
  }

const PokemonList = () => {

    const [countPoke, setCountPoke] = useState(0);


    // pagination
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    

    // get list of Pokemons from API  
    useEffect(() => {
        getAllPokemon(page).then((res) => {
            setCountPoke(res.data.count)}
        ).catch((err) => {
            console.log("error", err)
        })
    }, [page])



    // display data
    return (
    <>
         <Pagination
            page={page}
            count={Math.ceil(countPoke / 20)}
            renderItem={(item) => (
            <PaginationItem
                component={Link}
                to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
            />
            )}
         />
         <DisplayLocations />
        
    </>
    )
}

export default PokemonList;