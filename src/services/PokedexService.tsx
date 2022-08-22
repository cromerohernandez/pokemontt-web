import Pokedex, { Pokemon, Move } from 'pokedex-promise-v2';

import { isAValidPokemon } from '../utils/helpers/pokemon.helpers';

const pokedex = new Pokedex();

/**
 * @description function to get random pokemon name
 * @returns Promise<string>
 */
const getRandomPokemonName = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    pokedex.getPokemonsList({})
      .then(response => {
        const pokemonsListLength = response.count
        const randomPokemonKey = Math.floor(Math.random() * pokemonsListLength)
        const randomPokemonName = response.results[randomPokemonKey].name
        resolve(randomPokemonName)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @description function to get pokemon data by name
 * @param name string
 * @returns PromiseLike<Pokemon | undefined>
 */
 const getPokemonDataByName = (name: string): Promise<Pokemon | undefined> => {
  return new Promise((resolve, reject) => {
    pokedex.getPokemonByName(name)
      .then((response: Pokemon | Pokemon []) => {
        let pokemonData: Pokemon

        if (Array.isArray(response)) {
          pokemonData = response[0]
        } else {
          pokemonData = response
        }

        if (isAValidPokemon(pokemonData)) {
          resolve(pokemonData)
        } else {
          reject('Error en la carga del pokemon') //TODOCRH: to modal
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @description function to get move data by name
 * @param name string
 * @returns Promise<Move | undefined>
 */
 const getMoveDataByName = (name: string): Promise<Move> => {
  return new Promise((resolve, reject) => {
    pokedex.getMoveByName(name)
      .then((response: Move | Move[]) => {
        let moveData: Move

        if (Array.isArray(response)) {
          moveData = response[0]
        } else {
          moveData = response
        }

        resolve(moveData)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const PokedexService = {
  getRandomPokemonName,
  getPokemonDataByName,
  getMoveDataByName
};

export default PokedexService;
