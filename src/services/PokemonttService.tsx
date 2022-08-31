import axios from 'axios';

import { IAttackData } from '../utils/models/battle.models';
import { IUserDataForRequest } from '../utils/models/user.models';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials:true
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

//battles
const sendAttack = (attackData: IAttackData) => http.post('/battles/attack', attackData);

//sessions
const login = (loginData: IUserDataForRequest) => http.post('/login', loginData);
const logout = () => http.post('/logout');

const PokemonttService = {
  signup,
  sendAttack,
  login,
  logout
};

export default PokemonttService;
