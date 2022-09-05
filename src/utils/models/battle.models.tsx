import { Move, Pokemon } from 'pokedex-promise-v2';
import { OpponentTypes, OwnerTypes } from '../const/battle.const';

export interface IAttackData {
  attackingPokemon: IBattlePokemonData | undefined,
  defendingPokemon: IBattlePokemonData | undefined,
  attackMoveName: string | undefined,
}

export interface IBattleData {
  isPlayerTurn: boolean | undefined,
  isBattleInProgress: boolean | undefined,
  isBattleOver: boolean | undefined,
  pokemonStartsAttack: OwnerTypes | undefined,
  playerPokemon: IBattlePokemonData | undefined,
  playerCurrentMoveName: string | undefined,
  opponentPokemon: IBattlePokemonData | undefined,
  opponentType: OpponentTypes | undefined,
  loser: OwnerTypes | undefined,
  battleMessage: string | undefined,
  changeTurn: (isPlayerTurn: boolean | undefined) => void,
  setIsBattleInProgress: (setIsBattleInProgress: boolean | undefined) => void,
  setIsBattleOver: (setIsBattleInProgress: boolean | undefined) => void,
  setPokemonStartsAttack: (owner: OwnerTypes | undefined) => void,
  setPokemon: (owner: OwnerTypes, pokemonData: Pokemon | undefined, randomMovesData: Move[] | void) =>  void,
  updatePokemonHealthInBattle: (owner: OwnerTypes, damage: number) =>  void,
  updatePlayerCurrentMove: (updatedMove: string) => void,
  setBattleOpponentType: (type: OpponentTypes) => void,
  setLoser: (type: OwnerTypes) => void, 
  setBattleMessage: (type: string) => void,
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
  value: string,
  power: number | null,
  type: string,
}
