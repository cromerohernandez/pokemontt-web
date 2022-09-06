import { FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import PokemonttService from '../../services/PokemonttService';

import AuthContext from '../../contexts/AuthContext';
import BattleContext from '../../contexts/BattleContext';

import HomeView from './HomeView';

import { OpponentTypes } from '../../utils/const/battle.const';

const Home: FunctionComponent = () => {
  const auth = useContext(AuthContext)
  const { setIsNewBattleDataRequested, setOpponentType } = useContext(BattleContext)
  const navigate = useNavigate()

  /**
   * @description function to logout in auth context
   */
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

  /**
   * @description function to redirect to settings route
   */
  const handleSettings = (): void => navigate('/settings')

  /**
   * @description function to redirect to ranking route
   */
  const handleRanking = (): void => {
    navigate('/ranking')
  }

  /**
   * @description function to redirect to history route
   */
  const handleHistory = (): void => {
    navigate('/history')
  }
  
  /**
   * @description function to redirect to battle route
   */
  const handleBattle = (): void => {
    setIsNewBattleDataRequested(true)
    setOpponentType(OpponentTypes.COMPUTER)
    navigate('/battle')
  }

  return (
    <HomeView
      onLogout={handleLogout}
      onSettings={handleSettings}
      onRanking={handleRanking}
      onHistory={handleHistory}
      onBattle={handleBattle}
    />
  )
}
 
export default Home;
