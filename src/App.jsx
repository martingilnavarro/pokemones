import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home';
import Info from './pages/home/info';

function App() {
  return (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/:id' element={<Info />} />
    </Routes>
  );
}

export default App;
