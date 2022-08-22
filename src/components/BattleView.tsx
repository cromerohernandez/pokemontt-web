import { FunctionComponent, useContext } from 'react';

import BattleContext from '../contexts/BattleContext';

import { IBattleViewProps } from '../utils/models/view.models';

const BattleView: FunctionComponent<IBattleViewProps> = ({ onChangeMove, onAttack, onSurrender }) => {
  const { isPlayerTurn, playerPokemon, playerCurrentMove, opponentPokemon } = useContext(BattleContext)

  return (
    <div>
      <button onClick={onSurrender}>SURRENDER</button>

      {playerPokemon && opponentPokemon &&
        <>
          <div>
            <h4>{ opponentPokemon.name }</h4>
            <h5>{ opponentPokemon.hpInBattle }</h5>
            <h4>{ playerPokemon.name }</h4>
            <h5>{ playerPokemon.hpInBattle }</h5>
            <select onChange={onChangeMove} defaultValue={'default'}>
              <option value='default' disabled hidden>SELECT A MOVE</option>
              {playerPokemon.moves.map((move, index) =>
                <option key={index} value={move.name}>{move.name}</option>
              )}
            </select>
            <button disabled={(!isPlayerTurn || !playerCurrentMove)} onClick={onAttack}>ATTACK</button>
          </div>

          <div>
            <img src={opponentPokemon.image ?? undefined} alt="pokemon-sprite"></img>
            <img src={playerPokemon.image ?? undefined} alt="pokemon-sprite"></img>
          </div>
        </>
      }
    </div>
  )
}
 
export default BattleView;
