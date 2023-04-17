import { Routes, Route } from 'react-router-dom'
import PokemonList from './componentes/PokemonList.jsx'
import Pokemon from './componentes/Pokemon.jsx'

function App() {
  return (
    <Routes>
        <Route exact path='/' element={<PokemonList />} />
        <Route exact path='/:id' element={<Pokemon />} />
    </Routes>
  );
}

export default App;
