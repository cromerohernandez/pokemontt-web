import { FunctionComponent, ChangeEvent, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Move, MoveElement, Pokemon } from 'pokedex-promise-v2';

import BattleContext from '../contexts/BattleContext';
import PokedexService from '../services/PokedexService';
import PokemonttService from '../services/PokemonttService';

import BattleView from './BattleView';

import { getRandomMovesForBattle, getComputerMoveToAttack } from '../utils/helpers/moves.helpers';
import { OpponentTypes, OwnerTypes, IAttackData, IBattlePokemonData } from '../utils/models/battle.models';

const Battle: FunctionComponent = () => {
  const { 
    playerPokemon,
    playerCurrentMoveName,
    opponentPokemon,
    opponentType,
    changeTurn,
    setIsBattleInProgress,
    setPokemon,
    updatePokemonHealthInBattle,
    updatePlayerCurrentMove,
    resetBattleData
  } = useContext(BattleContext)
  const navigate = useNavigate()

  /**
   * @description function to get pokemon data from PokedexService and set pokemon data in BattleContext
   * @param owner OwnerTypes
   * @param pokemonName string
   */
  const getPokemonData = useCallback((owner: OwnerTypes, pokemonName: string): void => {
    PokedexService.getPokemonDataByName(pokemonName)
      .then((pokemonData: Pokemon | undefined) => {      
        getMovesData(pokemonData?.moves)
          .then((movesData: Move[] | void) => {
            setPokemon(owner, pokemonData, movesData)
          })
          .catch(error => {
            console.log(error) //TODOCRH
          })
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }, [setPokemon])

  /**
   * @description function to get pokemon data from PokedexService
   * @param owner OwnerTypes
   * @param pokemonName string
   */
  const getRandomPokemon = useCallback((owner: OwnerTypes) => {
    PokedexService.getRandomPokemonName()
      .then(response => {
        getPokemonData(owner, response)
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }, [getPokemonData])

  useEffect(() => {
    !playerPokemon && getRandomPokemon(OwnerTypes.PLAYER)
    !opponentPokemon && getRandomPokemon(OwnerTypes.OPPONENT)
  }, [changeTurn, playerPokemon, opponentPokemon, getRandomPokemon])

  /**
   * @description function to get pokemon data from PokedexService and set pokemon data in BattleContext
   * @param moves MoveElement[] | undefined
  */
  const getMovesData = (moves: MoveElement[] | undefined): Promise<Move[] | void> => {
    const randomMovesForBattle = getRandomMovesForBattle(moves ?? [])

    return Promise.all<Move>(
      randomMovesForBattle.map(move => {
        return PokedexService.getMoveDataByName(move.move.name)
          .then(response => {
            return response
          })
          .catch(error => {
            return error
          })
      })
    )
      .then (movesData => {
        return movesData
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }

  const handleChangeMove = (event: ChangeEvent<HTMLSelectElement>): void => {
    updatePlayerCurrentMove(event.target.value)
  }

  /**
   * @description function to start player (human) attack from button's event click
   */
  const handleAttack = (): void => {
    if (playerPokemon && opponentPokemon && playerCurrentMoveName) {
      sendAttack(playerPokemon, opponentPokemon, OwnerTypes.PLAYER, playerCurrentMoveName)
      changeTurn(false)
    }
  }

  /**
   * @description function to start computer attack
   */
  const startComputerAttack = (): void => {
    if (playerPokemon && opponentPokemon) {
      const computerAttack = getComputerMoveToAttack(opponentPokemon.moves)
      //TODOCRH: review
      setTimeout(() => {
        sendAttack(opponentPokemon, playerPokemon, OwnerTypes.OPPONENT, computerAttack.name)
      }, 1500)
    }
  }

  /**
   * @description function to send an attack from attackingPokemon to defendingPokemon
   * @param attackingPokemon IBattlePokemonData
   * @param defendingPokemon IBattlePokemonData
   * @param attackingPokemonOwner OwnerTypes
   * @param attackMoveName string
   */
  const sendAttack = (
    attackingPokemon: IBattlePokemonData,
    defendingPokemon: IBattlePokemonData,
    attackingPokemonOwner: OwnerTypes,
    attackMoveName: string
  ): void => {
    const attackData: IAttackData = {
      attackingPokemon: attackingPokemon,
      defendingPokemon: defendingPokemon,
      attackMoveName: attackMoveName,
    }

    PokemonttService.sendAttack(attackData)
      .then(response => {
        const { damage, usedMoveName, newDefendignPokemonHealth, attackingPokemonScoreIncrease, defendingPokemonScoreIncrease } = response.data
        setAttackResult(attackingPokemonOwner, damage, usedMoveName, newDefendignPokemonHealth)

        if (newDefendignPokemonHealth > 0) {
          continueBattle(attackingPokemonOwner)
        } else {
          finishBattle(attackingPokemonOwner, attackingPokemonScoreIncrease, defendingPokemonScoreIncrease)
        }
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }

  /**
   * @description function to set defending pokemon's health and message from attack result
   * @param attackingPokemonOwner OwnerTypes
   * @param damage number
   * @param usedMoveName string
   * @param newDefendignPokemonHealth number
  */
  const setAttackResult = (attackingPokemonOwner: OwnerTypes, damage: number, usedMoveName: string, newDefendignPokemonHealth: number): void => {
    if (attackingPokemonOwner === OwnerTypes.PLAYER) {
      updatePokemonHealthInBattle(OwnerTypes.OPPONENT, newDefendignPokemonHealth)
      console.log(`Tu movimiento '${usedMoveName}' ha causado ${damage} punto${damage !== 1 ? 's' : ''} de daño a tu oponente.`) //TODOCRH: to modal
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT) {
      updatePokemonHealthInBattle(OwnerTypes.PLAYER, newDefendignPokemonHealth)
      console.log(`El movimiento '${usedMoveName}' de tu oponente te ha causado ${damage} punto${damage !== 1 ? 's' : ''} de daño.`) //TODOCRH: to modal
    }
  }

  /**
   * @description function to continue battle flow
   * @param attackingPokemonOwner OwnerTypes
   */
  const continueBattle = (attackingPokemonOwner: OwnerTypes): void => {
    if (attackingPokemonOwner === OwnerTypes.PLAYER) {
      if (opponentType === OpponentTypes.COMPUTER) {
        startComputerAttack()
      }
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT) {
      changeTurn(true)
    }
  }

  /**
   * @description function to finish battle flow
   * @param attackingPokemonOwner OwnerTypes
   * @param attackingPokemonScoreIncrease number
   * @param defendingPokemonScoreIncrease number
  */
  const finishBattle = (attackingPokemonOwner: OwnerTypes, attackingPokemonScoreIncrease: number, defendingPokemonScoreIncrease: number): void => {
    changeTurn(undefined)
    setIsBattleInProgress(false)

    if (attackingPokemonOwner === OwnerTypes.PLAYER) {
      console.log(`La batalla ha finalizado. ¡Has vencido y has ganado ${attackingPokemonScoreIncrease} puntos!`) //TODOCRH: to modal
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT) {
      console.log(`La batalla ha finalizado. Has sido derrotado... pero has conseguido ${defendingPokemonScoreIncrease} puntos!`) //TODOCRH: to modal
    }
  }

  /**
   * @description function to surrender from button's event click
  */
  const handleSurrender = (): void => {
    resetBattleData()
    navigate('/')
  }

  /**
   * @description function to start battle from button's event click
  */
  const handleStart = (): void => {
    const firstTurn = Math.random() < 0.5
    changeTurn(firstTurn)
    setIsBattleInProgress(true)

    if (!firstTurn && opponentType === OpponentTypes.COMPUTER) {
      startComputerAttack()
    }
  }

  return (
    <BattleView onChangeMove={handleChangeMove} onAttack={handleAttack} onSurrender={handleSurrender} onStart={handleStart} />
  )
}
 
export default Battle;
