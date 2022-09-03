import { FunctionComponent } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import Battle from './components/battle/Battle';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import NotAuthenticatedRoute from './components/auth/NotAuthenticatedRoute';
import Settings from './components/settings/Settings';
import Ranking from './components/ranking/Ranking';
import SignUp from './components/auth/SignUp';

import pokemonttLogo from './assets/img/pokemonttLogo.png';

const App: FunctionComponent = () => {
  return (
    <div className='app-container'>
      <div className='app-container__header'>
        <img src={pokemonttLogo} alt='pokemontt-logo' className='app-container__logo' />
      </div>

      <div className='app-container__body'>
        <Routes>
          <Route
            path='/'
            element={
              <AuthenticatedRoute>
                <Home />
              </AuthenticatedRoute>
            }
          />

          <Route 
            path='/signup'
            element={
              <NotAuthenticatedRoute>
                <SignUp />
              </NotAuthenticatedRoute>
            }
          />

          <Route 
            path='/login'
            element={
              <NotAuthenticatedRoute>
                <Login />
              </NotAuthenticatedRoute>
            }
          />

          <Route
            path='/settings'
            element={
              <AuthenticatedRoute>
                <Settings />
              </AuthenticatedRoute>
            }
          />

          <Route 
            path='/ranking'
            element={
              <AuthenticatedRoute>
                <Ranking />
              </AuthenticatedRoute>
            }
          />

          <Route
            path='/battle'
            element={
              <AuthenticatedRoute>
                <Battle />
              </AuthenticatedRoute>
            }
          />

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
