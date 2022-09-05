export enum OpponentTypes {
  COMPUTER = 'computer',
  HUMAN = 'human'
}

export enum OwnerTypes {
  PLAYER = 'player',
  OPPONENT = 'opponent',
}

export const BATTLE_DEFAULT_VALUES = {
  isPlayerTurn: undefined,
  isBattleInProgress: false,
  isBattleOver: false,
  pokemonStartsAttack: undefined,
  playerPokemon: undefined,
  playerCurrentMoveName: undefined,
  opponentPokemon: undefined,
  opponentType: undefined,
  loser: undefined,
  battleMessage: undefined,
  changeTurn: () => undefined,
  setIsBattleInProgress: () => undefined,
  setIsBattleOver: () => undefined,
  setPokemonStartsAttack: () => undefined,
  setPokemon: () => undefined,
  updatePokemonHealthInBattle: () => undefined,
  updatePlayerCurrentMove: () => undefined,
  setBattleOpponentType: () => undefined,
  setLoser: () => undefined,
  setBattleMessage: () => undefined,
  resetBattleData: () => undefined,
}

export const MIN_DELAY_COMPUTER_ATTACK = 1800

export const MAX_DELAY_COMPUTER_ATTACK = 2800
