import React, { useEffect, useState } from 'react';
import { getAllPokemon } from '../apis/apis';
import '../hojas-de-estilo/PokemonList.css';


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

      
    useEffect(() => {
        getAllPokemon().then((res) =>
            setListPoke(res.data.results)
        ).catch((err) => {
            console.log("error", err)
        })
    }, [])


    useEffect(() => {
        setRowsTable(listPoke.map((poke) => {
            return createData(poke.name, poke.url)
        }))
    }, [listPoke])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>

                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsTable.map((row) => (
                        <TableRow 
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 100 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Link href={'./' + row.url.slice(34,row.url.length)}>{row.name}</Link>
                            </TableCell>

              
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonList;