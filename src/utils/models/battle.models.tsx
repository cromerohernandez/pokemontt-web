import { Move, Pokemon } from 'pokedex-promise-v2';

export enum OwnerTypes {
  player,
  opponent
}

export interface IAttackData {
  attackingPokemon: IBattlePokemonData | undefined,
  defendingPokemon: IBattlePokemonData | undefined,
  attackMoveName: string | undefined,
}

export interface IAttackResponse { //TODOCRH: check if it is used
  damage: number,
  newDefendignPokemonHealth: number,
}

export interface IBattleData {
  isPlayerTurn: boolean | undefined,
  playerPokemon: IBattlePokemonData | undefined,
  playerCurrentMove: string | undefined,
  opponentPokemon: IBattlePokemonData | undefined,
  changeTurn: () => void,
  setPokemon: (owner: OwnerTypes, pokemonData: Pokemon | undefined, randomMovesData: Move[] | void) =>  void,
  updatePokemonHealth: (owner: OwnerTypes, damage: number) =>  void,
  updatePlayerCurrentMove: (updatedMove: string) => void,
  resetBattleData: () => void,
}

export interface IBattlePokemonData {
  name: string,
  types: string[],
  experience: number,
  hp: number,
  attack: number,
  defense: number,
  moves: IBattleMoveData[],
  image: string | null,
}

export interface IBattleMoveData {
  name: string,
  power: number | null,
  type: string,
}
