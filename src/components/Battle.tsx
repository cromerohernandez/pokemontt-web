import { FunctionComponent, ChangeEvent, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Move, MoveElement, Pokemon } from 'pokedex-promise-v2';

import BattleContext from '../contexts/BattleContext';
import PokedexService from '../services/PokedexService';

import BattleView from './BattleView'

import { getRandomMovesForBattle } from '../utils/helpers/moves-helpers';
import { OwnerTypes } from '../utils/models/battle-models'

const Battle: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon, setPokemon, updatePlayerCurrentMove } = useContext(BattleContext)
  const navigate = useNavigate()

  /**
   * @description function to get pokemon data from PokedexService and set pokemon data in BattleContext
   * @param moves MoveElement[] | undefined
   * @returns void
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

  /**
   * @description function to get pokemon data from PokedexService and set pokemon data in BattleContext
   * @param owner OwnerTypes
   * @param pokemonName string
   * @returns void
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
   * @returns void
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
    !playerPokemon && getRandomPokemon(OwnerTypes.player)
    !opponentPokemon && getRandomPokemon(OwnerTypes.opponent)
  }, [playerPokemon, opponentPokemon, getRandomPokemon])

  const onChangeMove = (event: ChangeEvent<HTMLSelectElement>): void => {
    updatePlayerCurrentMove(event.target.value)
  }

  const onSurrender = () => navigate('/')

  return (
    <BattleView onChangeMove={onChangeMove} onSurrender={onSurrender} />
  )
}
 
export default Battle
