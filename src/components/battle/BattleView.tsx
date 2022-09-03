import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthContext from '../../contexts/AuthContext';
import BattleContext from '../../contexts/BattleContext';

import MenuButton from '../UI/buttons/MenuButton';
import BattlePreviewView from './BattlePreviewView';
import ArenaCanvasView from './arena/ArenaCanvasView';
import ArenaHtmlView from './arena/ArenaHtmlView';
import HealthBar from '../UI/misc/HealthBar';

import { icons } from '../../assets/icons/icons';
import { RenderTypes } from '../../utils/const/settings.const';
import { OwnerTypes } from '../../utils/const/battle.const';
import { IBattleViewProps } from '../../utils/models/props.models';
import { OpponentTypes } from '../../utils/const/battle.const';
import { translate } from '../../utils/i18n/i18n.index';

const BattleView: FunctionComponent<IBattleViewProps> = ({ onChangeMove, onAttack, onSurrender, onGoHome, onStart }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    isPlayerTurn,
    isBattleInProgress,
    isBattleOver,
    playerPokemon,
    playerCurrentMoveName,
    opponentPokemon,
    opponentType,
    battleMessage,
  } = useContext(BattleContext)

  return (
    <>
      {!isBattleInProgress && !isBattleOver &&
        <>
          <div className='button-container'>
            <MenuButton label={'BUTTONS.BACK'} icon={'back'} handleClick={onGoHome} />
            <MenuButton disabled={(!playerPokemon || !opponentPokemon)} label={'BUTTONS.START'} icon={'start'} handleClick={onStart} />
          </div>

          <div className='display-container'>
            <BattlePreviewView />
          </div>
        </>
      }

      {(isBattleInProgress || isBattleOver) && playerPokemon && opponentPokemon &&
        <>
          {isBattleInProgress &&
            <div className='button-container'>
              <MenuButton label={'BUTTONS.SURRENDER'} icon={'surrender'} handleClick={onSurrender} />

              <select disabled={!isPlayerTurn} onChange={onChangeMove} defaultValue={'default'}>
                <option value='default' disabled hidden>{ translate('BATTLE.SELECT_MOVE') }</option>
                {playerPokemon.moves.map((move, index) =>
                  <option key={index} value={move.name}>{move.name}</option>
                )}
              </select>

              <MenuButton disabled={(!isPlayerTurn || !playerCurrentMoveName)} label={'BUTTONS.ATTACK'} icon={'attack'} handleClick={onAttack} />
            </div>
          }

          {isBattleOver &&
            <div className='button-container'>
            <MenuButton label={'BUTTONS.BACK'} icon={'back'} handleClick={onGoHome} />
          </div>
          }

          <div className='display-container'>
            <div className='battle-message-container'>
                <span>{ battleMessage }</span>
            </div>

            <div className='battle-arena-container'>
              {currentUser.render === RenderTypes.CANVAS &&
                <ArenaCanvasView />
              }

              {currentUser.render === RenderTypes.HTML &&
                <ArenaHtmlView />
              }
            </div>

            <div className='battle-info-container'>
              <span>{ opponentPokemon.name.toUpperCase() }</span>

              <FontAwesomeIcon 
                icon={opponentType === OpponentTypes.HUMAN ? icons[OpponentTypes.HUMAN] : icons[OpponentTypes.COMPUTER]}
                className='arena-html-container__icon'
              />
              <HealthBar owner={OwnerTypes.OPPONENT} />

              <FontAwesomeIcon icon={isPlayerTurn ? icons.arrow_left : icons.arrow_right} />

              <span>{ playerPokemon.name.toUpperCase() }</span>

              <FontAwesomeIcon 
                icon={icons.human}
                className='arena-html-container__icon'
              />

              <HealthBar owner={OwnerTypes.PLAYER} />
            </div>
          </div>
        </>
      }
    </>
  )
}
 
export default BattleView;
