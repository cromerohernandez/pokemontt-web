import { Pokemon } from 'pokedex-promise-v2';

export enum OwnerTypes {
  player,
  opponent
}

export interface BattleData {
  isPlayerTurn: boolean | undefined;
  playerPokemon: BattlePokemonData | undefined;
  opponentPokemon: BattlePokemonData | undefined;
  changeTurn: () => void;
  setPokemon: (owner: OwnerTypes, pokemonData: Pokemon | undefined) =>  void;
}

export interface BattlePokemonData {
  name: string,
  types: string[],
  experience: number,
  hp: number,
  attack: number,
  defense: number,
  moves: string[],
  image: string | null,
}
