import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BattleContext from '../../../contexts/BattleContext';

import Spinner from '../../UI/misc/spinner/Spinner';

import { ICONS } from '../../../assets/icons/icons';
import { OpponentTypes, OwnerTypes } from '../../../utils/const/battle.const';
import { IBattlePokemonPreviewViewProps } from '../../../utils/models/props.models';
import { translate } from '../../../utils/i18n/i18n.index';

const BattlePokemonPreviewView: FunctionComponent<IBattlePokemonPreviewViewProps> = ({ owner, battlePokemonData }) => {
  const { opponentType } = useContext(BattleContext)

  return (
    <div className='battle-pokemon-preview-container'>
      {battlePokemonData ?
        <>
          <span>{ battlePokemonData.name.toUpperCase() }</span>

          <img
            src={battlePokemonData.image ?? undefined}
            alt='pokemon-sprite'
            className={
              `battle-pokemon-preview-container__img ${owner === OwnerTypes.OPPONENT ? 'battle-pokemon-preview-container__img--symmetry' : ''}`
            }
          />

          <FontAwesomeIcon
            icon={
              owner === OwnerTypes.OPPONENT ? (opponentType === OpponentTypes.COMPUTER ? ICONS.computer : ICONS.human) : ICONS.human
            }
            className='battle-pokemon-preview-container__icon'
          />

          <span>· { translate(owner === OwnerTypes.OPPONENT ? 'BATTLE.OPPONENT' : 'BATTLE.PLAYER').toLowerCase() } ·</span>
        </>
        :
        <Spinner />
      }
    </div>
  )
}
 
export default BattlePokemonPreviewView;
