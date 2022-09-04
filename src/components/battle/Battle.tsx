import { FunctionComponent, ChangeEvent, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Move, MoveElement, Pokemon } from 'pokedex-promise-v2';

import AuthContext from '../../contexts/AuthContext';
import BattleContext from '../../contexts/BattleContext';
import PokedexService from '../../services/PokedexService';
import PokemonttService from '../../services/PokemonttService';

import BattleView from './BattleView';

import {
  getBattleLossMessage,
  getBattleVictoryMessage,
  getComputerMoveToAttack,
  getRandomMovesForBattle,
  getPlayerAttackResultMessage,
  getOpponentAttackResultMessage
} from '../../utils/helpers/battle.helpers';
import { IAttackData, IBattlePokemonData } from '../../utils/models/battle.models';
import { OpponentTypes, OwnerTypes } from '../../utils/const/battle.const';
import { translate } from '../../utils/i18n/i18n.index';

const Battle: FunctionComponent = () => {
  const { currentUser, setUser } = useContext(AuthContext)
  const {
    playerPokemon,
    playerCurrentMoveName,
    opponentPokemon,
    opponentType,
    changeTurn,
    setIsBattleInProgress,
    setIsBattleOver,
    setPokemon,
    updatePokemonHealthInBattle,
    updatePlayerCurrentMove,
    setBattleMessage,
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
        _getMovesData(pokemonData?.moves)
          .then((movesData: Move[] | void) => {
            setPokemon(owner, pokemonData, movesData)
          })
          .catch(() => {
            getRandomPokemon(owner)
          })
      })
      .catch(() => {
        getRandomPokemon(owner)
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
  }, [playerPokemon])

  useEffect(() => {
    !opponentPokemon && getRandomPokemon(OwnerTypes.OPPONENT)
  }, [opponentPokemon])


  /**
   * @description private function to get pokemon data from PokedexService and set pokemon data in BattleContext
   * @param moves MoveElement[] | undefined
   */
  const _getMovesData = (moves: MoveElement[] | undefined): Promise<Move[] | void> => {
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

  /**
   * @description function to set player selected move
   * @param event ChangeEvent<HTMLSelectElement>
   */
  const handleChangeMove = (event: ChangeEvent<HTMLSelectElement>): void => {
    updatePlayerCurrentMove(event.target.value)
  }

  /**
   * @description function to start player (human) attack from button's event click
   */
  const handleAttack = (): void => {
    if (playerPokemon && opponentPokemon && playerCurrentMoveName) {
      _sendAttack(playerPokemon, opponentPokemon, OwnerTypes.PLAYER, playerCurrentMoveName)
      changeTurn(false)
    }
  }

  /**
   * @description private function to start computer attack
   */
  const _startComputerAttack = (): void => {
    if (playerPokemon && opponentPokemon) {
      const computerAttack = getComputerMoveToAttack(opponentPokemon.moves)
      setTimeout(() => {
        _sendAttack(opponentPokemon, playerPokemon, OwnerTypes.OPPONENT, computerAttack.name)
      }, 2500)
    }
  }

  /**
   * @description private function to send an attack from attackingPokemon to defendingPokemon
   * @param attackingPokemon IBattlePokemonData
   * @param defendingPokemon IBattlePokemonData
   * @param attackingPokemonOwner OwnerTypes
   * @param attackMoveName string
   */
  const _sendAttack = (
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
        const {
          damage,
          usedMoveName,
          newDefendignPokemonHealth,
          attackingPokemonScoreIncrease,
          defendingPokemonScoreIncrease,
          newAttackingPokemonScore,
          newDefendingPokemonScore
        } = response.data

        _setAttackResult(attackingPokemonOwner, damage, usedMoveName, newDefendignPokemonHealth)

        if (newDefendignPokemonHealth > 0) {
          _continueBattle(attackingPokemonOwner)
        } else {
          _finishBattle(attackingPokemonOwner, attackingPokemonScoreIncrease, defendingPokemonScoreIncrease, newAttackingPokemonScore, newDefendingPokemonScore)
        }
      })
      .catch(error => {
        setBattleMessage(error)
      })
  }

  /**
   * @description private function to set defending pokemon's health and message from attack result
   * @param attackingPokemonOwner OwnerTypes
   * @param damage number
   * @param usedMoveName string
   * @param newDefendignPokemonHealth number
   */
  const _setAttackResult = (attackingPokemonOwner: OwnerTypes, damage: number, usedMoveName: string, newDefendignPokemonHealth: number): void => {
    if (attackingPokemonOwner === OwnerTypes.PLAYER && currentUser) {
      updatePokemonHealthInBattle(OwnerTypes.OPPONENT, newDefendignPokemonHealth)
      setBattleMessage(getPlayerAttackResultMessage(damage, usedMoveName, currentUser))
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT && currentUser) {
      updatePokemonHealthInBattle(OwnerTypes.PLAYER, newDefendignPokemonHealth)
      setBattleMessage(getOpponentAttackResultMessage(damage, usedMoveName, currentUser))
    }
  }

  /**
   * @description private function to continue battle flow
   * @param attackingPokemonOwner OwnerTypes
   */
  const _continueBattle = (attackingPokemonOwner: OwnerTypes): void => {
    if (attackingPokemonOwner === OwnerTypes.PLAYER) {
      if (opponentType === OpponentTypes.COMPUTER) {
        _startComputerAttack()
      }
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT) {
      changeTurn(true)
    }
  }

  /**
   * @description private function to finish battle flow
   * @param attackingPokemonOwner OwnerTypes
   * @param attackingPokemonScoreIncrease number
   * @param defendingPokemonScoreIncrease number
   */
  const _finishBattle = (
    attackingPokemonOwner: OwnerTypes,
    attackingPokemonScoreIncrease: number,
    defendingPokemonScoreIncrease: number,
    newAttackingPokemonScore: number,
    newDefendingPokemonScore: number,
    ): void => {
    changeTurn(undefined)
    setIsBattleInProgress(false)
    setIsBattleOver(true)

    if (attackingPokemonOwner === OwnerTypes.PLAYER) {
      _setNewCurrentUserScore(newAttackingPokemonScore)
      setBattleMessage(getBattleVictoryMessage(attackingPokemonScoreIncrease))
      _reduceLoserPokemonOpacity(OwnerTypes.OPPONENT)
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT) {
      _setNewCurrentUserScore(newDefendingPokemonScore)
      setBattleMessage(getBattleLossMessage(defendingPokemonScoreIncrease))
      _reduceLoserPokemonOpacity(OwnerTypes.PLAYER)
    }
  }

  /**
   * @description private function to set new currentUser score (AuthContext)
   * @param newScore number
   */
  const _setNewCurrentUserScore = (newScore: number): void => {
    const newCurrentUserData = {
      ...currentUser,
      score: newScore
    }

    const updatedCurrentUser = {
      data: newCurrentUserData
    }

    setUser(updatedCurrentUser)
  }

  /**
   * @description private function to reduce opacity of loser pokemon img tag in html render
   * @param owner OwnerTypes
   */
  const _reduceLoserPokemonOpacity = (owner: OwnerTypes): void => {
    const loserPokemon = document.getElementById(owner === OwnerTypes.OPPONENT ? 'opponent-pokemon' : 'player-pokemon')

    if (loserPokemon) {
      loserPokemon.style.opacity = '0.4'
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
   * @description function to go home
   */
    const handleGoHome = (): void => {
      resetBattleData()
      navigate('/')
    }

  /**
   * @description function to start battle from button's event click
   */
  const handleStart = (): void => {
    const firstTurn = Math.random() < 0.5
    const startMessage = firstTurn ? 'BATTLE.START_ATTACKING' : 'BATTLE.START_DEFENDING';

    changeTurn(firstTurn)
    setBattleMessage(translate(startMessage))
    setIsBattleInProgress(true)

    if (!firstTurn && opponentType === OpponentTypes.COMPUTER) {
      _startComputerAttack()
    }
  }

  return (
    <BattleView onChangeMove={handleChangeMove} onAttack={handleAttack} onSurrender={handleSurrender} onGoHome={handleGoHome} onStart={handleStart} />
  )
}
 
export default Battle;
