import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BattleContext from '../../../contexts/BattleContext';
import { OpponentTypes } from '../../../utils/const/battle.const';
import { icons } from '../../../assets/icons/icons';
import { translate } from '../../../utils/i18n/i18n.index';

const ArenaHtmlView: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon, opponentType } = useContext(BattleContext)

  return (
    <>
      {playerPokemon && opponentPokemon &&
        <div className='arena-html-container'>
          <img
            src={opponentPokemon.image ?? undefined}
            alt='pokemon-sprite'
            className='arena-html-container__img arena-html-container__img--symmetry'
          />

          <img
            src={playerPokemon.image ?? undefined}
            alt='pokemon-sprite'
            className='arena-html-container__img'
          />
        </div>
      }
    </>
  )
}
 
export default ArenaHtmlView;
