import { FunctionComponent, useContext } from 'react';

import BattleContext from '../contexts/BattleContext';

import { IBattleViewProps } from '../utils/models/props.models';

const BattleView: FunctionComponent<IBattleViewProps> = ({ onChangeMove, onAttack, onSurrender, onGoHome, onStart }) => {
  const { isPlayerTurn, isBattleInProgress, playerPokemon, playerCurrentMoveName, opponentPokemon } = useContext(BattleContext)

  return (
    <div>
      {isBattleInProgress &&
        <button onClick={onSurrender}>SURRENDER</button>
      }
      {!isBattleInProgress &&
        <>
          <button onClick={onGoHome}>HOME</button>
          <button disabled={(!playerPokemon || !opponentPokemon)} onClick={onStart}>START</button>
        </>
      }

      {playerPokemon && opponentPokemon &&
        <>
          <div>
            <h4>COM - { opponentPokemon.name }</h4>
            <h5>{ opponentPokemon.hpInBattle }</h5>
            <h4>PLAYER - { playerPokemon.name }</h4>
            <h5>{ playerPokemon.hpInBattle }</h5>
            <select disabled={!isPlayerTurn} onChange={onChangeMove} defaultValue={'default'}>
              <option value='default' disabled hidden>SELECT A MOVE</option>
              {playerPokemon.moves.map((move, index) =>
                <option key={index} value={move.name}>{move.name}</option>
              )}
            </select>
            <button disabled={(!isPlayerTurn || !playerCurrentMoveName)} onClick={onAttack}>ATTACK</button>
          </div>

          <div>
            <img src={opponentPokemon.image ?? undefined} alt='pokemon-sprite'></img>
            <img src={playerPokemon.image ?? undefined} alt='pokemon-sprite'></img>
          </div>
        </>
      }
    </div>
  )
}
 
export default BattleView;
