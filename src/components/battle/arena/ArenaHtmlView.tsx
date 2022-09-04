import { FunctionComponent, useContext } from 'react';

import BattleContext from '../../../contexts/BattleContext';

const ArenaHtmlView: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)

  return (
    <>
      {playerPokemon && opponentPokemon &&
        <div className='arena-html-container'>
          <img
            id='opponent-pokemon'
            src={opponentPokemon.image ?? undefined}
            alt='pokemon-sprite'
            className='arena-html-container__img arena-html-container__img--left'
          />

          <img
            id='player-pokemon'
            src={playerPokemon.image ?? undefined}
            alt='pokemon-sprite'
            className='arena-html-container__img arena-html-container__img--right'
          />
        </div>
      }
    </>
  )
}
 
export default ArenaHtmlView;
