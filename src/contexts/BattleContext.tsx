import { createContext, ProviderProps, ConsumerProps, FunctionComponent, useState } from "react";
import { Pokemon } from 'pokedex-promise-v2';

import { getRandomMovesForBattle } from "../utils/helpers/moves-helpers";
import { OwnerTypes, BattleData, BattlePokemonData } from '../utils/models/battle-models'
import { battleDefaultValue } from '../utils/const/battle-const'

const BattleContext = createContext<BattleData>(battleDefaultValue)

export const BattleContextProvider = (props: ProviderProps<BattleData>) => {
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | undefined>()
  const [playerPokemon, setPlayerPokemon] = useState<BattlePokemonData | undefined>()
  const [opponentPokemon, setOpponentPokemon]= useState<BattlePokemonData | undefined>()

  /**
   * @description function to get pokemon data for battle
   * @param pokemonData Pokemon
   * @returns BattlePokemonData
   */
  const _getBattlePokemonData = (pokemonData: Pokemon): BattlePokemonData => {
    return {
      name: pokemonData.name,
      types: _getTypeNames(pokemonData),
      experience: pokemonData.base_experience,
      hp: pokemonData.stats[0].base_stat,
      attack: pokemonData.stats[1].base_stat,
      defense: pokemonData.stats[2].base_stat,
      moves: _getMoveNames(pokemonData),
      image: pokemonData.sprites.other.home.front_default,
    }
  }

  /**
   * @description function to get type names of a pokemon
   * @param pokemonData Pokemon
   * @returns string[]
   */
  const _getTypeNames = (pokemonData: Pokemon): string[] => {
    return pokemonData.types.map(type => type.type.name)
  }

  /**
   * @description function to get move names of a pokemon
   * @param pokemonData Pokemon
   * @returns string[]
   */
  const _getMoveNames = (pokemonData: Pokemon): string[] => {
    const randomMovesForBattle = getRandomMovesForBattle(pokemonData.moves)
    return randomMovesForBattle.map(move => move.move.name)
  }

  /**
   * @description function to change turn between player and opponent
   * @returns void
   */
  const changeTurn = (): void => {
    setIsPlayerTurn(!isPlayerTurn)
  }

  /**
   * @description function to set data to a player's pokemon for battle
   * @param owner OwnerTypes
   * @param pokemonData Pokemon
   * @returns void
   */
  const setPokemon = (owner: OwnerTypes, pokemonData: Pokemon | undefined): void => {
    const battlePokemonData = pokemonData ? _getBattlePokemonData(pokemonData) : undefined
    
    if (owner === OwnerTypes.player) {
      setPlayerPokemon(battlePokemonData)
    }

    if (owner === OwnerTypes.opponent) {
      setOpponentPokemon(battlePokemonData)
    }
  }

  const value: BattleData = {
    isPlayerTurn: isPlayerTurn,
    playerPokemon: playerPokemon,
    opponentPokemon: opponentPokemon,
    changeTurn: changeTurn,
    setPokemon: setPokemon
  }

  return (
    <BattleContext.Provider value={value}>
      {props.children}
    </BattleContext.Provider>
  )
}

export const WithBattleConsumer = (WrappedComponent: FunctionComponent<any>) => (props: ConsumerProps<any>) => {
  <BattleContext.Consumer>
    {(battleProps) => (<WrappedComponent {...props} {...battleProps} />)}
  </BattleContext.Consumer>
}

export default BattleContext
