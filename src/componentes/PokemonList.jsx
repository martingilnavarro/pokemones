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
import { Link } from '@mui/material';



const PokemonList = () => {

    function createData(name, url) {
        return { name, url };
    }

    const [listPoke, setListPoke] = useState([]);
    const [rowsTable, setRowsTable] = useState([]);

    // get list of Pokemons from API  
    useEffect(() => {
        getAllPokemon().then((res) =>
            setListPoke(res.data.results)
        ).catch((err) => {
            console.log("error", err)
        })
    }, [])

    //set data in table row
    useEffect(() => {
        setRowsTable(listPoke.map((poke) => {
            return createData(poke.name, poke.url)
        }))
    }, [listPoke])

    // display data
    return (
        
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
                                <Link href={'./' + row.name}>{row.name}</Link>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        
    )
}

export default PokemonList;