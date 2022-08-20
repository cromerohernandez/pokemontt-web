import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import BattleView from './BattleView'

const Battle: FunctionComponent = () => {
  const navigate = useNavigate()

  const onSurrender = () => navigate('/')

  return (
    <BattleView onSurrender={onSurrender} />
  )
}
 
export default Battle
