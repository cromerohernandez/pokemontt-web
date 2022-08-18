import Pokedex, { Pokemon } from 'pokedex-promise-v2';

import { isAValidPokemon } from '../utils/helpers/pokemon-helper'

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
        const randomPokemonKey = Math.floor(Math.random() * (pokemonsListLength + 1))
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
          reject('Error en la carga del pokemon') //TODOCRH
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

const PokedexService = {
  getRandomPokemonName,
  getPokemonDataByName
}

export default PokedexService
