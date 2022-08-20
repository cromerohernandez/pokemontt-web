import { FunctionComponent, useContext } from 'react';

import BattleContext from '../contexts/BattleContext';

import { BattleViewProps } from '../utils/models/view-models'

const BattleView: FunctionComponent<BattleViewProps> = ({ onChangeMove, onSurrender }) => {
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)

  return (
    <div>
      <button onClick={onSurrender}>SURRENDER</button>

      {playerPokemon && opponentPokemon &&
        <>
          <div>
            <h4>{ opponentPokemon.name }</h4>
            <h4>{ playerPokemon.name }</h4>
            <select onChange={onChangeMove} defaultValue={'default'}>
              <option value='default' disabled hidden>SELECT A MOVE</option>
              {playerPokemon.moves.map((move, index) =>
                <option key={index} value={move.name}>{move.name}</option>
              )}
            </select>
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
 
export default BattleView
