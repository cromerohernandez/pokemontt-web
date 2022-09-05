import { createContext, ConsumerProps, FunctionComponent, ProviderProps, useContext, useState } from 'react';
import { Move, Pokemon } from 'pokedex-promise-v2';

import AuthContext from './AuthContext';

import { IBattleData, IBattlePokemonData, IBattleMoveData } from '../utils/models/battle.models';
import { BATTLE_DEFAULT_VALUES, OpponentTypes, OwnerTypes } from '../utils/const/battle.const';
import { DEFAULT_POWER_MOVE_VALUE } from '../utils/const/move.const';

const BattleContext = createContext<IBattleData>(BATTLE_DEFAULT_VALUES);

export const BattleContextProvider = (props: ProviderProps<IBattleData>) => {
  const { currentUser } = useContext(AuthContext)

  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean | undefined>()
  const [isBattleInProgress, setIsBattleInProgress] = useState<boolean | undefined>()
  const [isBattleOver, setIsBattleOver] = useState<boolean | undefined>()
  const [pokemonStartsAttack, setPokemonStartsAttack] = useState<OwnerTypes>()
  const [playerPokemon, setPlayerPokemon] = useState<IBattlePokemonData | undefined>()
  const [playerCurrentMoveName, setPlayerCurrentMoveName] = useState<string | undefined>()
  const [opponentPokemon, setOpponentPokemon] = useState<IBattlePokemonData | undefined>()
  const [opponentType, setOpponentType] = useState<OpponentTypes | undefined>()
  const [loser, setLoser] = useState<OwnerTypes | undefined>()
  const [battleMessage, setBattleMessage] = useState<string>()

  /**
   * @description private function to map pokemon data for battle
   * @param pokemonData Pokemon
   * @param randomMovesData Move[]
   * @returns IBattlePokemonData
   */
  const _mapBattlePokemonData = (pokemonData: Pokemon, randomMovesData: Move[]): IBattlePokemonData => {
    return {
      userId: null,
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
   * @description private function to map type names of a pokemon
   * @param pokemonData Pokemon
   * @returns string[]
   */
  const _mapTypeNames = (pokemonData: Pokemon): string[] => {
    return pokemonData.types.map(type => type.type.name)
  }

  /**
   * @description private function to map random moves data for battle
   * @param randomMovesData Move[]
   * @returns IBattleMoveData[]
   */
  const _mapBattleMovesData = (randomMovesData: Move[]): IBattleMoveData[] => {
    return randomMovesData.map(move => {
      return {
        name: move.name,
        value: move.name,
        power: move.power ?? DEFAULT_POWER_MOVE_VALUE,
        type: move.type.name,
      }
  })
  }

  /**
   * @description function to change turn between player and opponent
   * @param isPlayerTurn boolean
   */
  const changeTurn = (newIsPlayerTurn: boolean | undefined): void => {
    setIsPlayerTurn(newIsPlayerTurn)
  }

  /**
   * @description function to set data to a player's pokemon for battle
   * @param owner OwnerTypes
   * @param pokemonData Pokemon | undefined
   * @param randomMovesData Move[] | void
   */
  const setPokemon = (owner: OwnerTypes, pokemonData: Pokemon | undefined, randomMovesData: Move[] | void): void => {
    const battlePokemonData = pokemonData ? _mapBattlePokemonData(pokemonData, randomMovesData ?? []) : undefined
    
    if (owner === OwnerTypes.PLAYER) {
      if (battlePokemonData) {
        battlePokemonData.userId = currentUser?.id ?? null
      }
      setPlayerPokemon(battlePokemonData)
    }

    if (owner === OwnerTypes.OPPONENT) {
      setOpponentPokemon(battlePokemonData)
    }
  }

  /**
   * @description function to set new pokemon health value
   * @param owner OwnerTypes
   * @param newDefendignPokemonHealth: number
   */
  const updatePokemonHealthInBattle = (owner: OwnerTypes, newDefendignPokemonHealth: number): void => {
    if (owner === OwnerTypes.PLAYER) {
      const newPlayerPokemonData = {...playerPokemon, hpInBattle: newDefendignPokemonHealth} as IBattlePokemonData
      setPlayerPokemon(newPlayerPokemonData)
    }

    if (owner === OwnerTypes.OPPONENT) { 
      const newOpponentPokemonData = {...opponentPokemon, hpInBattle: newDefendignPokemonHealth} as IBattlePokemonData
      setOpponentPokemon(newOpponentPokemonData)
    }
  }

  /**
   * @description function to update player current move
   * @param updatedMove string
   */
  const updatePlayerCurrentMove = (updatedMove: string): void => {
    setPlayerCurrentMoveName(updatedMove)
  }

  /**
   * @description function to set opponent type for the battle
   * @param type OpponentTypes
   */
  const setBattleOpponentType = (type: OpponentTypes): void => {
    setOpponentType(type)
  }

  /**
   * @description function to reset battle data 
   */
  const resetBattleData = (): void => {
    setIsPlayerTurn(BATTLE_DEFAULT_VALUES.isPlayerTurn)
    setIsBattleInProgress(BATTLE_DEFAULT_VALUES.isBattleInProgress)
    setIsBattleOver(BATTLE_DEFAULT_VALUES.isBattleOver)
    setPlayerPokemon(BATTLE_DEFAULT_VALUES.playerPokemon)
    setPlayerCurrentMoveName(BATTLE_DEFAULT_VALUES.playerCurrentMoveName)
    setOpponentPokemon(BATTLE_DEFAULT_VALUES.opponentPokemon)
    setOpponentType(BATTLE_DEFAULT_VALUES.opponentType)
    setBattleMessage(BATTLE_DEFAULT_VALUES.battleMessage)
  }

  const value: IBattleData = {
    isPlayerTurn: isPlayerTurn,
    isBattleInProgress: isBattleInProgress,
    isBattleOver: isBattleOver,
    pokemonStartsAttack: pokemonStartsAttack,
    playerPokemon: playerPokemon,
    playerCurrentMoveName: playerCurrentMoveName,
    opponentPokemon: opponentPokemon,
    opponentType: opponentType,
    loser: loser,
    battleMessage: battleMessage,
    changeTurn: changeTurn,
    setIsBattleInProgress: setIsBattleInProgress,
    setIsBattleOver: setIsBattleOver,
    setPokemonStartsAttack: setPokemonStartsAttack,
    setPokemon: setPokemon,
    updatePokemonHealthInBattle: updatePokemonHealthInBattle,
    updatePlayerCurrentMove: updatePlayerCurrentMove,
    setBattleOpponentType: setBattleOpponentType,
    setLoser: setLoser,
    setBattleMessage: setBattleMessage,
    resetBattleData: resetBattleData,
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
