import axios from 'axios';

import { IAttackData } from '../utils/models/battle.models';
import { ISettingsDataForRequest, IUserDataForRequest } from '../utils/models/user.models';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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
const signup = (userData: IUserDataForRequest) => http.post('/users/new', userData, {withCredentials: true});
const getRanking = () => http.get('/users/ranking', {withCredentials: true});
const updateSettings = (settingsData: ISettingsDataForRequest) => http.patch('/users/update/settings', settingsData, {withCredentials: true});

//battles
const getUserBattles = () => http.get('/battles/history');
const sendAttack = (attackData: IAttackData) => http.post('/battles/attack', attackData, {withCredentials: true});

//sessions
const login = (loginData: IUserDataForRequest) => http.post('/login', loginData, {withCredentials: true});
const logout = () => http.post('/logout', {withCredentials: true});

const PokemonttService = {
  signup,
  getRanking,
  updateSettings,
  getUserBattles,
  sendAttack,
  login,
  logout
};

export default PokemonttService;
