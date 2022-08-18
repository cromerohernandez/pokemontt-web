import { FunctionComponent , useState, useCallback, useEffect } from 'react';
import { Pokemon, Move, MoveElement } from 'pokedex-promise-v2';

import PokedexService from '../services/PokedexService';
import { getRandomMovesForBattle } from '../utils/helpers/move-helpers'

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

  const styleImg = {
    transform: 'scaleX(-1)'
  }

  return (
    <>
      {pokemonA && pokemonB &&
        <>
          <div>
            <h4>{ pokemonA.name }</h4>
            <h6>{ pokemonA.types[0].type.name }</h6>
            <h6>{ `${pokemonA.stats[0].stat.name} - ${pokemonA.stats[0].base_stat}` }</h6>
            <h6>{ `${pokemonA.stats[1].stat.name} - ${pokemonA.stats[1].base_stat}` }</h6>
            <h6>{ `${pokemonA.stats[2].stat.name} - ${pokemonA.stats[2].base_stat}` }</h6>

            <h4>{ pokemonB.name }</h4>
            <h6>{ pokemonB.types[0].type.name }</h6>
            <h6>{ `${pokemonB.stats[0].stat.name} - ${pokemonB.stats[0].base_stat}` }</h6>
            <h6>{ `${pokemonB.stats[1].stat.name} - ${pokemonB.stats[1].base_stat}` }</h6>
            <h6>{ `${pokemonB.stats[2].stat.name} - ${pokemonB.stats[2].base_stat}` }</h6>
          </div>

          <div>
            <img src={pokemonA.sprites.other.home.front_default ?? undefined} alt="pokemon-sprite" style={styleImg}></img>
            <img src={pokemonB.sprites.other.home.front_default ?? undefined} alt="pokemon-sprite"></img>
          </div>
        </>
      }
    </>
  )
}
 
export default Test
