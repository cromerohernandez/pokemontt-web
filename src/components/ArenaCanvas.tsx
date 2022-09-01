import { FunctionComponent, useContext } from 'react';

import BattleContext from '../contexts/BattleContext';

const ArenaCanvas: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)

  return (
    <>
      {playerPokemon && opponentPokemon &&
        <h3>CRH-CANVAS</h3>
      }
    </>
  )
}
 
export default ArenaCanvas;
