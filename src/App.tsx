import { FunctionComponent } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Config from './components/Config';
import Battle from './components/Battle';
import Test from './components/Test';

const App: FunctionComponent = () => {
  return (
    <div className='app-container'>
      <h1>Pokemonnt Arena</h1>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/config' element={<Config />} />
        <Route path='/battle' element={<Battle />} />
        <Route path='/test' element={<Test /> /*TODOCRH: delete*/} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
