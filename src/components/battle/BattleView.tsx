import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthContext from '../../contexts/AuthContext';
import BattleContext from '../../contexts/BattleContext';

import ArenaCanvas from './arena/ArenaCanvas';
import ArenaHtmlView from './arena/ArenaHtmlView';
import BattlePreviewView from './battle-preview/BattlePreviewView';
import BattlePokemonInfoView from './battle-pokemon-info/BattlePokemonInfoView';
import FormSelect from '../UI/form/FormSelect';
import MenuButton from '../UI/buttons/menu-button/MenuButton';

import { ICONS } from '../../assets/icons/icons';
import { RenderTypes } from '../../utils/const/settings.const';
import { OwnerTypes } from '../../utils/const/battle.const';
import { IBattleViewProps } from '../../utils/models/props.models';
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
          <div className='button-container'>
            {isBattleInProgress &&
              <>
                <MenuButton label={'BUTTONS.SURRENDER'} icon={'surrender'} handleClick={onSurrender} />

                <FormSelect
                  name='playerCurrentMoveName'
                  placeholder={ translate('BATTLE.SELECT_MOVE') }
                  options={playerPokemon.moves}
                  value={playerCurrentMoveName}
                  disabled={!isPlayerTurn}
                  onChange={onChangeMove}
                />
          
                <MenuButton disabled={(!isPlayerTurn || !playerCurrentMoveName)} label={'BUTTONS.ATTACK'} icon={'attack'} handleClick={onAttack} />
              </>
            }

            {isBattleOver &&
              <MenuButton label={'BUTTONS.BACK'} icon={'back'} handleClick={onGoHome} />
            }
          </div>

          <div className='display-container'>
            <div className='battle-message-container'>
                <span>{ battleMessage }</span>
            </div>

            <div id='battle-arena-container' className='battle-arena-container'>
              {currentUser?.render === RenderTypes.CANVAS &&
                <ArenaCanvas />
              }

              {currentUser?.render === RenderTypes.HTML &&
                <ArenaHtmlView />
              }
            </div>

            <div className='battle-info-container'>
              <BattlePokemonInfoView battlePokemonData={opponentPokemon} owner={OwnerTypes.OPPONENT} />

              {isBattleInProgress &&
                <FontAwesomeIcon icon={isPlayerTurn ? ICONS.arrow_left : ICONS.arrow_right} className='battle-info-container__arrow'/>
              }

              <BattlePokemonInfoView battlePokemonData={playerPokemon} owner={OwnerTypes.PLAYER} />
            </div>
          </div>
        </>
      }
    </>
  )
}
 
export default BattleView;
