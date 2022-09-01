import { FunctionComponent, useContext } from 'react';

import BattleContext from '../contexts/BattleContext';

const ArenaHtml: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)

  return (
    <>
      {playerPokemon && opponentPokemon &&
        <>
          <h4>COM - { opponentPokemon.name }</h4>
          <h5>{ opponentPokemon.hpInBattle }</h5>
          <h4>PLAYER - { playerPokemon.name }</h4>
          <h5>{ playerPokemon.hpInBattle }</h5>
          <img src={opponentPokemon.image ?? undefined} alt='pokemon-sprite'></img>
          <img src={playerPokemon.image ?? undefined} alt='pokemon-sprite'></img>
        </>
      }
    </>
  )
}
 
export default ArenaHtml;
