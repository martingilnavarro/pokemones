import React, { useEffect, useState } from 'react';
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



const PokemonList = () => {

    const [listPoke, setListPoke] = useState([]);
    const [countPoke, setCountPoke] = useState(0);


    // pagination
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    

    // get list of Pokemons from API  
    useEffect(() => {
        getAllPokemon(page).then((res) => {
            setListPoke(res.data.results)
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
        <TableContainer component={Paper} sx={{ backgroundColor: '#FAFFFF' }} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#CFFFFF' }}>
                    <TableRow>
                        <TableCell>Pick a Pokemon!</TableCell>  
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listPoke.map((poke) => (
                        <TableRow 
                            key={poke.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <LinkUI href={'./' + poke.name}>{poke.name}</LinkUI>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
}

export default PokemonList;