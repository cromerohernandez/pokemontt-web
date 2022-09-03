import { MoveElement } from 'pokedex-promise-v2';

import { IBattleMoveData } from '../models/battle.models'
import { NUMBER_OF_MOVES_FOR_BATTLE } from '../const/move.const'
import { Languages } from '../const/settings.const';
import { translate } from '../i18n/i18n.index';

/**
 * @description function to get battle loss message
 * @param scoreIncrease number
 * @return string
 */
export const getBattleLossMessage = (scoreIncrease: number): string => {
  const lossMessage = `
    ${translate('BATTLE.THE_BATTLE_IS_OVER')}
    ${translate('BATTLE.YOU_HAVE_BEEN_DEFEATED')}
    ${translate('BATTLE.BUT_YOU_HAVE_ACHIEVED')}
    ${scoreIncrease}
    ${translate(scoreIncrease !== 1 ? 'BATTLE.POINTS' : 'BATTLE.POINT')}!
  `
  return lossMessage
}

/**
 * @description function to get battle victory message
 * @param scoreIncrease number
 * @return string
 */
export const getBattleVictoryMessage = (scoreIncrease: number): string => {
  const victoryMessage = `
    ${translate('BATTLE.THE_BATTLE_IS_OVER')}
    ${translate('BATTLE.YOU_HAVE_WON_AND_ACHIEVED')}
    ${scoreIncrease}
    ${translate(scoreIncrease !== 1 ? 'BATTLE.POINTS' : 'BATTLE.POINT')}!
  `
  return victoryMessage
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
 * @description function to get player's attack result message
 * @param damage number
 * @param usedMoveName string
 * @param currentUser any
 * @returns string
 */
export const getPlayerAttackResultMessage = (damage: number, usedMoveName: string, currentUser: any): string => {
  let startMessage = ''

  if (currentUser.language === Languages.EN) {
    startMessage = `${translate('BATTLE.YOUR')} '${usedMoveName}' ${translate('BATTLE.MOVE')}`
  }

  if (currentUser.language === Languages.ES) {
    startMessage = `${translate('BATTLE.YOUR')} ${translate('BATTLE.MOVE')} '${usedMoveName}'`
  }

  return (`
    ${startMessage}
    ${translate('BATTLE.HAS_DEALT')}
    ${damage}
    ${translate(damage !== 1 ? 'BATTLE.DAMAGE_POINTS' : 'BATTLE.DAMAGE_POINT')}
    ${translate('BATTLE.TO_YOUR_OPPONENT')}.
  `)
}

  /**
   * @description function to get opponent's attack result message
   * @param damage number
   * @param usedMoveName string
   * @param currentUser any
   * @returns string
   */
   export const getOpponentAttackResultMessage = (damage: number, usedMoveName: string, currentUser: any): string => {
    let resultMessage = ''

    if (currentUser.language === Languages.EN) {
      resultMessage = `
        ${translate('BATTLE.YOUR_OPPONENT_S')} 
        '${usedMoveName}' 
        ${translate('BATTLE.MOVE')}
        ${translate('BATTLE.HAS_DEALT')}
        ${damage}
        ${translate(damage !== 1 ? 'BATTLE.DAMAGE_POINTS' : 'BATTLE.DAMAGE_POINT')}
        ${translate('BATTLE.TO_YOU')}.
      `
    }

    if (currentUser.language === Languages.ES) {
      resultMessage = `
        ${translate('BATTLE.THE_MOVE')}
        '${usedMoveName}'
        ${translate('BATTLE.YOUR_OPPONENT_S')}
        ${translate('BATTLE.HAS_DEALT_YOU')}
        ${damage}
        ${translate(damage !== 1 ? 'BATTLE.DAMAGE_POINTS' : 'BATTLE.DAMAGE_POINT')}.
      `
    }

    return resultMessage
  }
