import { Move, Pokemon } from 'pokedex-promise-v2';

export enum OwnerTypes {
  player,
  opponent
}

export interface BattleData {
  isPlayerTurn: boolean | undefined;
  playerPokemon: BattlePokemonData | undefined;
  playerCurrentMove: string | undefined;
  opponentPokemon: BattlePokemonData | undefined;
  changeTurn: () => void;
  setPokemon: (owner: OwnerTypes, pokemonData: Pokemon | undefined, randomMovesData: Move[] | void) =>  void;
  setPokemonHealth: (owner: OwnerTypes, newHealthValue: number) =>  void;
  updatePlayerCurrentMove: (updatedMove: string) => void;
  resetBattleData: () => void,
}

export interface BattlePokemonData {
  name: string,
  types: string[],
  experience: number,
  hp: number,
  attack: number,
  defense: number,
  moves: BattleMoveData[],
  image: string | null,
}

export interface BattleMoveData {
  name: string,
  power: number | null,
  type: string,
}
