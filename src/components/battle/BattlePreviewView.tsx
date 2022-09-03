import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BattleContext from '../../contexts/BattleContext';
import { translate } from '../../utils/i18n/i18n.index';

import { icons } from '../../assets/icons/icons';
import { OpponentTypes } from '../../utils/const/battle.const';

const BattlePreviewView: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon, opponentType } = useContext(BattleContext)

  return (
    <>
      {playerPokemon && opponentPokemon &&
        <div className='battle-preview-container'>
          <div className='battle-preview-container__item'>
            <span>{ opponentPokemon.name.toUpperCase() }</span>

            <img
              src={opponentPokemon.image ?? undefined}
              alt='pokemon-sprite'
              className='battle-preview-container__img battle-preview-container__img--symmetry'
            />

            <FontAwesomeIcon 
              icon={opponentType === OpponentTypes.HUMAN ? icons[OpponentTypes.HUMAN] : icons[OpponentTypes.COMPUTER]}
              className='battle-preview-container__icon'
            />

            <span>· { translate('BATTLE.OPPONENT').toLowerCase() } ·</span>
          </div>

          <span>VS</span>

          <div className='battle-preview-container__item'>           
            <span>{ playerPokemon.name.toUpperCase() }</span>

            <img
              src={playerPokemon.image ?? undefined}
              alt='pokemon-sprite'
              className='battle-preview-container__img'
            />

            <FontAwesomeIcon icon={icons.human} className='battle-preview-container__icon' />

            <span>· { translate('BATTLE.PLAYER').toLowerCase() } ·</span>
          </div>
        </div>
      }
    </>
  )
}
 
export default BattlePreviewView;
