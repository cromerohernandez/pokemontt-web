import { FunctionComponent, useContext } from 'react';

import AuthContext from '../contexts/AuthContext';
import BattleContext from '../contexts/BattleContext';

import ArenaCanvas from './ArenaCanvas';
import ArenaHtml from './ArenaHtml';

import { RenderTypes } from '../utils/const/settings.const';
import { IBattleViewProps } from '../utils/models/props.models';
import { translate } from '../utils/i18n/i18n.index';

const BattleView: FunctionComponent<IBattleViewProps> = ({ onChangeMove, onAttack, onSurrender, onGoHome, onStart }) => {
  const { currentUser } = useContext(AuthContext);
  const { isPlayerTurn, isBattleInProgress, playerPokemon, playerCurrentMoveName, opponentPokemon } = useContext(BattleContext)

  return (
    <div>
      {isBattleInProgress &&
        <button onClick={onSurrender}>{ translate('BUTTONS.SURRENDER') }</button>
      }
      {!isBattleInProgress &&
        <>
          <button onClick={onGoHome}>CRH-HOME</button>
          <button disabled={(!playerPokemon || !opponentPokemon)} onClick={onStart}>{ translate('BUTTONS.START') }</button>
        </>
      }

      {playerPokemon && opponentPokemon &&
        <>
          <div>
            <select disabled={!isPlayerTurn} onChange={onChangeMove} defaultValue={'default'}>
              <option value='default' disabled hidden>{ translate('BATTLE.SELECT_MOVE') }</option>
              {playerPokemon.moves.map((move, index) =>
                <option key={index} value={move.name}>{move.name}</option>
              )}
            </select>
            <button disabled={(!isPlayerTurn || !playerCurrentMoveName)} onClick={onAttack}>{ translate('BUTTONS.ATTACK') }</button>
          </div>

          {currentUser.render === RenderTypes.CANVAS &&
            <ArenaCanvas />
          }

          {currentUser.render === RenderTypes.HTML &&
            <ArenaHtml />
          }
        </>
      }
    </div>
  )
}
 
export default BattleView;
