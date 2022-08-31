import { Pokemon } from 'pokedex-promise-v2';

import { POKEMON_REQUIRED_FIELDS } from '../const/pokemon.const'

/**
 * @description function to check if pokemonData has a value for each pokemon required field
 * @param pokemonData Pokemon
 * @returns boolean
 */
export const isAValidPokemon = (pokemonData: Pokemon): boolean => {
  let isValid = true

  POKEMON_REQUIRED_FIELDS.forEach(requiredField => {
    let requiredEntry = undefined

    if (requiredField.length === 1) {
      requiredEntry = getSimpleEntry(pokemonData, requiredField[0])
    }
    if (requiredField.length > 1) {
      requiredEntry = getNestedEntry(pokemonData, requiredField)
    }

    if (requiredEntry === undefined) {
      isValid = false
    }
  })

  return isValid
}

/**
 * @description function to get pokemonData entry for a simple requiredField
 * @param pokemonData Pokemon
 * @param requiredField string
 * @returns string[] | undefined
 */
const getSimpleEntry = (pokemonData: Pokemon, requiredField: string): string[] | undefined => {
  const pokemonEntries = Object.entries(pokemonData)

  return pokemonEntries.find(pokemonEntry => {
    const pokemonEntryName = pokemonEntry[0]
    const pokemonEntryValue = pokemonEntry[1]
    return pokemonEntryName === requiredField && pokemonEntryValue !== null && pokemonEntryValue !== undefined
  })
}

/**
 * @description function to get pokemonData entry for a nested requiredField
 * @param dataObject any
 * @param nestedFields string[]
 * @returns string[] | undefined | unknown
 */
const getNestedEntry = (dataObject: any, nestedFields: string[]): string[] | undefined | unknown => {
  const currentField = nestedFields[0]
  const remainingFields = nestedFields.slice(1)
  const pokemonEntries = Object.entries(dataObject)
  const currentEntry = pokemonEntries.find(pokemonEntry => pokemonEntry[0] === currentField) ?? []
  const currentEntryValue = currentEntry[1]


  if (nestedFields?.length === 1) {
    return currentEntryValue !== null && currentEntryValue !== undefined ? currentEntry : undefined
  }

  return getNestedEntry(currentEntryValue, remainingFields)
}
