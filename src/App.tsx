import { Routes, Route } from 'react-router-dom'
import PokemonList from './componentes/PokemonList.tsx'
import Pokemon from './componentes/Pokemon.tsx'
import * as React from 'react'

function App() {
  return (
    <Routes>
        <Route path='/' element={<PokemonList />} />
        <Route path='/:id' element={<Pokemon />} />
    </Routes>
  );
}

export default App;
