import { FunctionComponent, useContext } from 'react';

import BattleContext from '../../contexts/BattleContext';
import BattlePokemonPreviewView from './BattlePokemonPreview';

import { OwnerTypes } from '../../utils/const/battle.const';

const BattlePreviewView: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)

  return (
    <div className='battle-preview-container'>
      <BattlePokemonPreviewView owner={OwnerTypes.OPPONENT} battlePokemonData={opponentPokemon} />

      <span>VS</span>

      <BattlePokemonPreviewView owner={OwnerTypes.PLAYER}  battlePokemonData={playerPokemon} />
    </div>
  )
}
 
export default BattlePreviewView;
