import { FunctionComponent , useState, useCallback, useEffect } from 'react';
import { Pokemon } from 'pokedex-promise-v2';

import PokedexService from '../services/PokedexService';

const Test: FunctionComponent = () => {
  const [pokemon, setPokemon] = useState<Pokemon>()

  const getPokemonData = useCallback((pokemonName: string): void => {
    PokedexService.getPokemonDataByName(pokemonName)
      .then((response: Pokemon | undefined) => {
        setPokemon(response)
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })

  }, [])

  const getRandomPokemon = useCallback(() => {
    PokedexService.getRandomPokemonName()
      .then(response => {
        getPokemonData(response)
      })
      .catch(error => {
        console.log(error) //TODOCRH
      })
  }, [getPokemonData])

  useEffect(() => {
    getRandomPokemon()
  }, [getRandomPokemon])

  return (
    <>
      {pokemon && 
        <>
          <h2>{ pokemon.name }</h2>
          <h3>{ pokemon.height }</h3>
          <img src={pokemon.sprites.other.home.front_default ?? undefined} alt="pokemon-sprite"></img>
        </>
      }
    </>
  )
}
 
export default Test