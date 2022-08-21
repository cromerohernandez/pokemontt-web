import { FunctionComponent } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Settings from './components/Settings';
import Battle from './components/Battle';

import pokemonttLogo from './assets/img/pokemonttLogo.png';

const App: FunctionComponent = () => {
  return (
    <div className='app-container'>
      <img src={pokemonttLogo} alt='pokemontt-logo' className='app-container__logo' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/battle' element={<Battle />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
