import { FunctionComponent } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Config from './components/Config';
import Battle from './components/Battle';
import Test from './components/Test';

import pokemonttLogo from './assets/img/pokemonttLogo.png'

const App: FunctionComponent = () => {
  return (
    <div className='app-container'>
      <img src={pokemonttLogo} alt='pokemonttLogo' className='app-container__logo' />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/config' element={<Config />} />
        <Route path='/battle' element={<Test />} />
        <Route path='/test' element={<Test /> /*TODOCRH: delete*/} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
