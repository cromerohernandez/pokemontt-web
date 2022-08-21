import { FunctionComponent, useState, useCallback, useEffect } from 'react';
import { Pokemon, Move } from 'pokedex-promise-v2';

import PokedexService from '../services/PokedexService';

import TestView from './TestView';

import { getRandomMovesForBattle } from '../utils/helpers/moves.helpers';

const Test: FunctionComponent = () => {
  const [pokemonA, setPokemonA] = useState<Pokemon>()
  const [pokemonB, setPokemonB] = useState<Pokemon>()

  const getPokemonData = useCallback((pokemonName: string): void => {
    PokedexService.getPokemonDataByName(pokemonName)
      .then((response: Pokemon | undefined) => {
        //TODOCRH
        if(pokemonA) {
          setPokemonB(response)
        } else {
          setPokemonA(response)
          getRandomMovesForBattle(response ? response.moves : [])
        }
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }, [pokemonA])

  const getRandomPokemon = useCallback(() => {
    PokedexService.getRandomPokemonName()
      .then(response => {
        getPokemonData(response)
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }, [getPokemonData])

  const getMoveData = useCallback((moveName: string): void => {
    PokedexService.getMoveDataByName(moveName)
    .then((response: Move) => {
      console.log(response) //TODOCRH
    })
    .catch(error => {
      console.log(error) //TODOCRH
    })
  }, [])

  useEffect(() => {
    getRandomPokemon()
    getMoveData('pay-day')
  }, [getRandomPokemon, getMoveData])

  return (
    <TestView pokemonA={pokemonA} pokemonB={pokemonB} />
  )
}
 
export default Test;
