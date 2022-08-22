import { createContext, ProviderProps, ConsumerProps, FunctionComponent, useState } from "react";
import { Move, Pokemon } from 'pokedex-promise-v2';

import { OwnerTypes, IBattleData, IBattlePokemonData, IBattleMoveData } from '../utils/models/battle.models';
import { battleDefaultValue } from '../utils/const/battle.const';
import { defaultPowerMoveValue } from "../utils/const/move.const";

const BattleContext = createContext<IBattleData>(battleDefaultValue);

export const BattleContextProvider = (props: ProviderProps<IBattleData>) => {
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | undefined>()
  const [playerPokemon, setPlayerPokemon] = useState<IBattlePokemonData | undefined>()
  const [playerCurrentMove, setPlayerCurrentMove]= useState<string | undefined>()
  const [opponentPokemon, setOpponentPokemon]= useState<IBattlePokemonData | undefined>()

  /**
   * @description function to map pokemon data for battle
   * @param pokemonData Pokemon
   * @param randomMovesData Move[]
   * @returns IBattlePokemonData
   */
  const _mapBattlePokemonData = (pokemonData: Pokemon, randomMovesData: Move[]): IBattlePokemonData => {
    return {
      name: pokemonData.name,
      types: _mapTypeNames(pokemonData),
      experience: pokemonData.base_experience,
      hp: pokemonData.stats[0].base_stat,
      hpInBattle: pokemonData.stats[0].base_stat,
      attack: pokemonData.stats[1].base_stat,
      defense: pokemonData.stats[2].base_stat,
      moves: _mapBattleMovesData(randomMovesData),
      image: pokemonData.sprites.other.home.front_default,
    }
  }

  /**
   * @description function to map type names of a pokemon
   * @param pokemonData Pokemon
   * @returns string[]
   */
  const _mapTypeNames = (pokemonData: Pokemon): string[] => {
    return pokemonData.types.map(type => type.type.name)
  }

  /**
   * @description function to map random moves data for battle
   * @param randomMovesData Move[]
   * @returns IBattleMoveData[]
   */
  const _mapBattleMovesData = (randomMovesData: Move[]): IBattleMoveData[] => {
    return randomMovesData.map(move => {
      return {
        name: move.name,
        power: move.power ?? defaultPowerMoveValue,
        type: move.type.name,
      }
  })
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
   * @param pokemonData Pokemon | undefined
   * @param randomMovesData Move[] | void
   * @returns void
   */
  const setPokemon = (owner: OwnerTypes, pokemonData: Pokemon | undefined, randomMovesData: Move[] | void): void => {
    const battlePokemonData = pokemonData ? _mapBattlePokemonData(pokemonData, randomMovesData ?? []) : undefined
    
    if (owner === OwnerTypes.player) {
      setIsPlayerTurn(true/*Math.random() < 0.5*/) //TODOCRH
      setPlayerPokemon(battlePokemonData)
    }

    if (owner === OwnerTypes.opponent) {
      setOpponentPokemon(battlePokemonData)
    }
  }

  /**
   * @description function to set new pokemon health value
   * @param owner OwnerTypes
   * @param newDefendignPokemonHealth: number
   * @returns void
   */
  const updatePokemonHealthInBattle = (owner: OwnerTypes, newDefendignPokemonHealth: number): void => {
    if (owner === OwnerTypes.player) {
      const newPlayerPokemonData = {...playerPokemon, hpInBattle: newDefendignPokemonHealth} as IBattlePokemonData
      setPlayerPokemon(newPlayerPokemonData)
    }

    if (owner === OwnerTypes.opponent) { 
      const newOpponentPokemonData = {...opponentPokemon, hpInBattle: newDefendignPokemonHealth} as IBattlePokemonData
      setOpponentPokemon(newOpponentPokemonData)
    }
  }

  /**
   * @description function to update player current move
   * @param updatedMove string
   * @returns void
   */
  const updatePlayerCurrentMove = (updatedMove: string): void => {
    setPlayerCurrentMove(updatedMove)
  }

  /**
   * @description function to reset battle data 
   * @returns void
   */
    const resetBattleData = (): void => {
    setIsPlayerTurn(battleDefaultValue.isPlayerTurn)
    setPlayerPokemon(battleDefaultValue.playerPokemon)
    setOpponentPokemon(battleDefaultValue.opponentPokemon)
    setPlayerCurrentMove(battleDefaultValue.playerCurrentMove)
  }

  const value: IBattleData = {
    isPlayerTurn: isPlayerTurn,
    playerPokemon: playerPokemon,
    playerCurrentMove: playerCurrentMove,
    opponentPokemon: opponentPokemon,
    changeTurn: changeTurn,
    setPokemon: setPokemon,
    updatePokemonHealthInBattle: updatePokemonHealthInBattle,
    updatePlayerCurrentMove: updatePlayerCurrentMove,
    resetBattleData: resetBattleData
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

export default BattleContext;
