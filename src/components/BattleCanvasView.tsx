import { FunctionComponent, useContext } from 'react';

import BattleContext from '../contexts/BattleContext';

import { IBattleViewProps } from '../utils/models/props.models';

const BattleCanvasView: FunctionComponent<IBattleViewProps> = ({ onChangeMove, onAttack, onSurrender, onGoHome, onStart }) => {
  const { isPlayerTurn, isBattleInProgress, playerPokemon, playerCurrentMoveName, opponentPokemon } = useContext(BattleContext)

  return (
    <div>
      <h1>CANVAS</h1>
    </div>
  )
}
 
export default BattleCanvasView;
