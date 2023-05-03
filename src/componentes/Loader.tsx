import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react'


const Loader = () => {
    return (
        <Grid container direction='column' alignItems='center' style={{ minHeight: '100vh', backgroundColor: '#FAFFFF' }}>
        
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Grid>
    )
}

export default Loader;