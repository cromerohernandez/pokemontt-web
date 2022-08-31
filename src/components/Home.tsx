import { FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PokemonttService from '../services/PokemonttService';

import AuthContext from '../contexts/AuthContext';
import BattleContext from '../contexts/BattleContext';

import HomeView from './HomeView';

import { OpponentTypes } from '../utils/models/battle.models';

const Home: FunctionComponent = () => {
  const auth = useContext(AuthContext)
  const { setBattleOpponentType } = useContext(BattleContext)
  const navigate = useNavigate()

  const handleLogout = (): void => {
    PokemonttService.logout()
      .then(() => {
        auth.setUser(null)
        navigate('/')
      })
      .catch(error => {
        console.log(error) //TODOCRH: delete
      })
  }

  const handleSettings = (): void => navigate('/settings')
  
  const handleBattle = (): void => {
    setBattleOpponentType(OpponentTypes.COMPUTER)
    navigate('/battle')
  }

  return (
    <HomeView onLogout={handleLogout} onSettings={handleSettings} onBattle={handleBattle} />
  )
}
 
export default Home;
