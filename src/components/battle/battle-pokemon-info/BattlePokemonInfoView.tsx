import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthContext from '../../../contexts/AuthContext';
import BattleContext from '../../../contexts/BattleContext';

import HealthBar from '../../UI/misc/health-bar/HealthBar';

import { ICONS } from '../../../assets/icons/icons';
import { OpponentTypes, OwnerTypes } from '../../../utils/const/battle.const';
import { IBattlePokemonInfoView } from '../../../utils/models/props.models';

const BattlePokemonInfoView: FunctionComponent<IBattlePokemonInfoView> = ({ battlePokemonData, owner }) => {
  const { currentUser } = useContext(AuthContext);
  const { opponentType } = useContext(BattleContext);

  return (
    <div className='battle-pokemon-info-container'>
      <HealthBar owner={owner} />

      <span>{ battlePokemonData.name.toUpperCase() }</span>

      <div className='battle-pokemon-info-container__player'>
        <FontAwesomeIcon 
          icon={
            owner === OwnerTypes.OPPONENT ? (opponentType === OpponentTypes.COMPUTER ? ICONS.computer : ICONS.human) : ICONS.human
          }
          className='battle-pokemon-info-container__icon'
        />

        <span>
          { owner === OwnerTypes.OPPONENT ? (opponentType === OpponentTypes.COMPUTER ? '' : '-') : currentUser?.username }
        </span>
      </div>
    </div>
  )
}
 
export default BattlePokemonInfoView;
