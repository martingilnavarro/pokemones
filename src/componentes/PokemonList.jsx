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

    function createData(name, url) {
        return { name, url };
    }

    const [listPoke, setListPoke] = useState([]);
    const [rowsTable, setRowsTable] = useState([]);

    // pagination
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);
    

    // get list of Pokemons from API  
    useEffect(() => {
        getAllPokemon(page).then((res) =>
            setListPoke(res.data.results)
        ).catch((err) => {
            console.log("error", err)
        })
    }, [page])

    //set data in table row
    useEffect(() => {
        setRowsTable(listPoke.map((poke) => {
            return createData(poke.name, poke.url)
        }))
    }, [listPoke])

    // display data
    return (
    <>
         <Pagination
            page={page}
            count={64}
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
                    {rowsTable.map((row) => (
                        <TableRow 
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <LinkUI href={'./' + row.name}>{row.name}</LinkUI>
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