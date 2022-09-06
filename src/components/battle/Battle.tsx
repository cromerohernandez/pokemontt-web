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
import { MIN_DELAY_COMPUTER_ATTACK, MAX_DELAY_COMPUTER_ATTACK, OpponentTypes, OwnerTypes, DELAY_COMPUTER_START_ATTACK } from '../../utils/const/battle.const';
import { MOVE_FRAME_TIME, MOVE_FRAMES, NUMBER_OF_OPACITY_CHANGES, OPACITY_CHANGE_TIME } from '../../utils/const/move.const';
import { IAttackData, IBattlePokemonData } from '../../utils/models/battle.models';
import { translate } from '../../utils/i18n/i18n.index';
import { RenderTypes } from '../../utils/const/settings.const';

const Battle: FunctionComponent = () => {
  const { currentUser, setUser } = useContext(AuthContext)
  const {
    isNewBattleDataRequested,
    isBattleInProgress,
    isBattleOver,
    playerPokemon,
    playerCurrentMoveName,
    opponentPokemon,
    opponentType,
    setIsNewBattleDataRequested,
    changeTurn,
    setIsBattleInProgress,
    setIsBattleOver,
    setPokemonStartsAttack,
    setPokemon,
    updatePokemonHealthInBattle,
    setPlayerCurrentMoveName,
    setLoser,
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
    if (!isNewBattleDataRequested && !isBattleInProgress && !isBattleOver) {
      navigate('/')
    } else {
      !playerPokemon && getRandomPokemon(OwnerTypes.PLAYER)
    }
  }, [playerPokemon])

  useEffect(() => {
    !opponentPokemon && getRandomPokemon(OwnerTypes.OPPONENT)
  }, [opponentPokemon])

  useEffect(() => {
    if (playerPokemon && opponentPokemon) {
      setIsNewBattleDataRequested(false)
    }
  }, [playerPokemon, opponentPokemon, setIsNewBattleDataRequested])

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
    setPlayerCurrentMoveName(event.target.value)
  }

  /**
   * @description function to start player (human) attack from button's event click
   */
  const handleAttack = (): void => {
    if (playerPokemon && opponentPokemon && playerCurrentMoveName) {
      setPokemonStartsAttack(OwnerTypes.PLAYER)
      _sendAttack(playerPokemon, opponentPokemon, OwnerTypes.PLAYER, playerCurrentMoveName)
    }
  }

  /**
   * @description private function to start computer attack
   * @param additionalDelay (optional) number
   */
  const _startComputerAttack = (additionalDelay?: number): void => {
    if (playerPokemon && opponentPokemon) {
      const computerAttack = getComputerMoveToAttack(opponentPokemon.moves)
      const delayTime = (Math.random() * (MAX_DELAY_COMPUTER_ATTACK - MIN_DELAY_COMPUTER_ATTACK + 1)) + MIN_DELAY_COMPUTER_ATTACK

      setTimeout(() => {
        setPokemonStartsAttack(OwnerTypes.OPPONENT)
        _sendAttack(opponentPokemon, playerPokemon, OwnerTypes.OPPONENT, computerAttack.name)
      }, delayTime + (additionalDelay ?? 0))
    }
  }

  /**
   * @description private function to map attack data and request attack result
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

    setTimeout(() => {
      _getAttackResult(attackData, attackingPokemonOwner)
    }, (MOVE_FRAME_TIME * MOVE_FRAMES) + (OPACITY_CHANGE_TIME * NUMBER_OF_OPACITY_CHANGES) + 200)
  }

  /**
   * @description private function to get attack result from PokemonttService
   * @param attackData IAttackData
   * @param attackingPokemonOwner OwnerTypes
   */
  const _getAttackResult = ((attackData: IAttackData, attackingPokemonOwner: OwnerTypes): void => {
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
        _finishBattle(
          attackingPokemonOwner,
          attackingPokemonScoreIncrease,
          defendingPokemonScoreIncrease,
          newAttackingPokemonScore,
          newDefendingPokemonScore
        )
      }
    })
    .catch(error => {
      setBattleMessage(error)
    })
  })

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
      changeTurn(false)
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
    setPokemonStartsAttack(undefined)
    setIsBattleInProgress(false)
    setIsBattleOver(true)

    if (attackingPokemonOwner === OwnerTypes.PLAYER) {
      _setNewCurrentUserScore(newAttackingPokemonScore)
      setBattleMessage(getBattleVictoryMessage(attackingPokemonScoreIncrease))
      setLoser(OwnerTypes.OPPONENT)
      _launchEndingEffects(OwnerTypes.OPPONENT)
    }
    
    if (attackingPokemonOwner === OwnerTypes.OPPONENT) {
      _setNewCurrentUserScore(newDefendingPokemonScore)
      setBattleMessage(getBattleLossMessage(defendingPokemonScoreIncrease))
      setLoser(OwnerTypes.PLAYER)
      _launchEndingEffects(OwnerTypes.PLAYER)
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
   * @description private function to launch effects at the end of the battle, depending on the rener type
   * @param loserOwner OwnerTypes
   */
  const _launchEndingEffects = (loserOwner: OwnerTypes): void => {
    if (currentUser?.render === RenderTypes.HTML) {
      _reduceLoserPokemonOpacity(loserOwner)
    }
  }

  /**
   * @description private function to reduce opacity of loser pokemon img tag in html render
   */
  const _reduceLoserPokemonOpacity = (loserOwner: OwnerTypes): void => {
    const loserPokemon = document.getElementById(loserOwner === OwnerTypes.OPPONENT ? 'opponent-pokemon' : 'player-pokemon')

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
      _startComputerAttack(DELAY_COMPUTER_START_ATTACK)
    }
  }

  return (
    <BattleView onChangeMove={handleChangeMove} onAttack={handleAttack} onSurrender={handleSurrender} onGoHome={handleGoHome} onStart={handleStart} />
  )
}
 
export default Battle;
