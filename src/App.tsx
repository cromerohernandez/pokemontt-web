import { FunctionComponent } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import Battle from './components/Battle';
import Home from './components/Home';
import Login from './components/auth/Login';
import NotAuthenticatedRoute from './components/auth/NotAuthenticatedRoute';
import Settings from './components/Settings';
import SignUp from './components/auth/SignUp';

import pokemonttLogo from './assets/img/pokemonttLogo.png';

const App: FunctionComponent = () => {
  return (
    <div className='app-container'>
      <img src={pokemonttLogo} alt='pokemontt-logo' className='app-container__logo' />

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
  );
}

export default App;
