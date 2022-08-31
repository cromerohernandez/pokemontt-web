import { Move, Pokemon } from 'pokedex-promise-v2';

export enum OpponentTypes {
  COMPUTER = 'computer',
  HUMAN = 'human'
}

export enum OwnerTypes {
  PLAYER = 'player',
  OPPONENT = 'opponent',
}

export interface IAttackData {
  attackingPokemon: IBattlePokemonData | undefined,
  defendingPokemon: IBattlePokemonData | undefined,
  attackMoveName: string | undefined,
}

export interface IBattleData {
  isPlayerTurn: boolean | undefined,
  isBattleInProgress: boolean | undefined,
  playerPokemon: IBattlePokemonData | undefined,
  playerCurrentMoveName: string | undefined,
  opponentPokemon: IBattlePokemonData | undefined,
  opponentType: OpponentTypes | undefined,
  changeTurn: (isPlayerTurn: boolean | undefined) => void,
  setIsBattleInProgress: (setIsBattleInProgress: boolean | undefined) => void,
  setPokemon: (owner: OwnerTypes, pokemonData: Pokemon | undefined, randomMovesData: Move[] | void) =>  void,
  updatePokemonHealthInBattle: (owner: OwnerTypes, damage: number) =>  void,
  updatePlayerCurrentMove: (updatedMove: string) => void,
  setBattleOpponentType: (type: OpponentTypes) => void,
  resetBattleData: () => void,
}

export interface IBattlePokemonData {
  userId: number | null,
  name: string,
  types: string[],
  experience: number,
  hp: number,
  hpInBattle: number,
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
