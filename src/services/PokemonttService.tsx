import axios from 'axios';

import { IAttackData } from '../utils/models/battle.models';
import { ISettingsDataForRequest, IUserDataForRequest } from '../utils/models/user.models';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/')
    }
    return Promise.reject(error)
  }
);

//users
const signup = (userData: IUserDataForRequest) => http.post('/users/new', userData);
const getRanking = () => http.get('/users/ranking');
const updateSettings = (settingsData: ISettingsDataForRequest) => http.patch('/users/update/settings', settingsData);

//battles
const sendAttack = (attackData: IAttackData) => http.post('/battles/attack', attackData);

//sessions
const login = (loginData: IUserDataForRequest) => http.post('/login', loginData);
const logout = () => http.post('/logout');

const PokemonttService = {
  signup,
  getRanking,
  updateSettings,
  sendAttack,
  login,
  logout
};

export default PokemonttService;
