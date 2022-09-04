import { FunctionComponent, useContext, useEffect, useState } from 'react';

import HealthBarView from './HealthBarView';

import BattleContext from '../../../../contexts/BattleContext';
import { OwnerTypes } from '../../../../utils/const/battle.const';
import { POKEMON_MAX_HP } from '../../../../utils/const/pokemon.const';
import { IHealthBarProps } from '../../../../utils/models/props.models';

const HealthBar: FunctionComponent<IHealthBarProps> = (healthBarProps: IHealthBarProps) => {
  const { owner } = healthBarProps
  const { playerPokemon, opponentPokemon } = useContext(BattleContext)
  const [ currentHp, setCurrentHp ] = useState<number>()

  useEffect(() => {
    const currentHp = owner === OwnerTypes.PLAYER ? playerPokemon?.hpInBattle : opponentPokemon?.hpInBattle
    const fillingElement = document.getElementById(`${owner}Filling`)
    
    setCurrentHp(currentHp)

    const newPercentage = (currentHp ?? 0) * 100 / POKEMON_MAX_HP
    
    if (fillingElement ){
      fillingElement.style.width = `${newPercentage < POKEMON_MAX_HP ? newPercentage : POKEMON_MAX_HP}%`;
    }

  }, [owner, playerPokemon, opponentPokemon])

  return (
    <HealthBarView currentHp={currentHp} owner={owner} />
  )
}

export default HealthBar
