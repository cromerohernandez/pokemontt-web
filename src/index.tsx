import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { BattleContextProvider } from './contexts/BattleContext';

import App from './App';

import reportWebVitals from './reportWebVitals';
import { AUTH_DEFAULT_VALUES } from './utils/const/auth.const'
import { BATTLE_DEFAULT_VALUES } from './utils/const/battle.const';

import './styles/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContextProvider value={AUTH_DEFAULT_VALUES}>
      <BattleContextProvider value={BATTLE_DEFAULT_VALUES}>
        <App />
      </BattleContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
