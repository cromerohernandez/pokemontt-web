import { MoveElement } from 'pokedex-promise-v2';

import { IBattleMoveData } from '../models/battle.models'
import { NUMBER_OF_MOVES_FOR_BATTLE } from '../const/move.const'

/**
 * @description function to select random pokemon moves for battle
 * @param pokemonMoves MoveElement[]
 * @returns MoveElement[]
 */
export const getRandomMovesForBattle = (pokemonMoves: MoveElement[]): MoveElement[] => {
  let remainingMoves = [...pokemonMoves]
  let selectedMoves: MoveElement[] = []
  
  for (let numberOfMoves = NUMBER_OF_MOVES_FOR_BATTLE; numberOfMoves > 0 && remainingMoves.length > 0; numberOfMoves--) {
    const randomIndex = Math.floor(Math.random() * remainingMoves.length)
    selectedMoves.push(remainingMoves[randomIndex])
    remainingMoves.splice(randomIndex, 1)
  }

  return selectedMoves
}

/**
 * @description function to select a random move from computer's pokemon
 * @param computerPokemonMoves IBattleMoveData[]
 * @returns IBattleMoveData
 */
export const getComputerMoveToAttack = (computerPokemonMoves: IBattleMoveData[]): IBattleMoveData => {
  //TODOCRH: develop AI
  const randomKey = Math.floor(Math.random() * computerPokemonMoves.length)
  
  return computerPokemonMoves[randomKey]
}
