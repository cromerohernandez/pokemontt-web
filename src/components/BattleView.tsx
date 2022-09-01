import { FunctionComponent, useContext } from 'react';

import AuthContext from '../contexts/AuthContext';
import BattleContext from '../contexts/BattleContext';

import ArenaCanvas from './ArenaCanvas';
import ArenaHtml from './ArenaHtml';

import { RenderTypes } from '../utils/const/settings.const';
import { IBattleViewProps } from '../utils/models/props.models';

const BattleView: FunctionComponent<IBattleViewProps> = ({ onChangeMove, onAttack, onSurrender, onGoHome, onStart }) => {
  const { currentUser } = useContext(AuthContext);
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
            <select disabled={!isPlayerTurn} onChange={onChangeMove} defaultValue={'default'}>
              <option value='default' disabled hidden>SELECT A MOVE</option>
              {playerPokemon.moves.map((move, index) =>
                <option key={index} value={move.name}>{move.name}</option>
              )}
            </select>
            <button disabled={(!isPlayerTurn || !playerCurrentMoveName)} onClick={onAttack}>ATTACK</button>
          </div>

          {currentUser.data.render === RenderTypes.CANVAS &&
            <ArenaCanvas />
          }

          {currentUser.data.render === RenderTypes.HTML &&
            <ArenaHtml />
          }
        </>
      }
    </div>
  )
}
 
export default BattleView;
