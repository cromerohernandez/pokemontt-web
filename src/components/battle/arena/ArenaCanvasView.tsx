import { FunctionComponent, useContext } from 'react';

import BattleContext from '../../../contexts/BattleContext';

import Spinner from '../../UI/misc/spinner/Spinner';

const ArenaCanvasView: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)

  return (
    <Spinner />
  )
}
 
export default ArenaCanvasView;
