import { FunctionComponent, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from 'pokedex-promise-v2';

import BattleContext from '../contexts/BattleContext';
import PokedexService from '../services/PokedexService';

import BattleView from './BattleView'

import { OwnerTypes } from '../utils/models/battle-models'

const Battle: FunctionComponent = () => {
  const { playerPokemon, opponentPokemon, setPokemon } = useContext(BattleContext)
  const navigate = useNavigate()

  /**
   * @description function to get pokemon data from PokedexService and set pokemon data in BattleContext
   * @param owner OwnerTypes
   * @param pokemonName string
   * @returns void
   */
  const getPokemonData = useCallback((owner: OwnerTypes, pokemonName: string): void => {
    PokedexService.getPokemonDataByName(pokemonName)
      .then((response: Pokemon | undefined) => {
        setPokemon(owner, response)
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

  const onSurrender = () => navigate('/')

  return (
    <BattleView onSurrender={onSurrender} />
  )
}
 
export default Battle
