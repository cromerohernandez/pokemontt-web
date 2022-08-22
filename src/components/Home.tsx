import { FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import BattleContext from '../contexts/BattleContext';

import HomeView from './HomeView';

import { OpponentTypes } from '../utils/models/battle.models';

const Home: FunctionComponent = () => {
  const { setBattleOpponentType } = useContext(BattleContext)
  const navigate = useNavigate()

  const onSettings = () => navigate('/settings')
  const onBattle = () => {
    setBattleOpponentType(OpponentTypes.COMPUTER)
    navigate('/battle')
  }

  return (
    <HomeView onSettings={onSettings} onBattle={onBattle} />
  )
}
 
export default Home;
