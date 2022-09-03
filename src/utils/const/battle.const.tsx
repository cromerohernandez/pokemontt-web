export const BATTLE_DEFAULT_VALUES = {
  isPlayerTurn: undefined,
  isBattleInProgress: false,
  isBattleOver: false,
  playerPokemon: undefined,
  playerCurrentMoveName: undefined,
  opponentPokemon: undefined,
  opponentType: undefined,
  battleMessage: undefined,
  changeTurn: () => undefined,
  setIsBattleInProgress: () => undefined,
  setIsBattleOver: () => undefined,
  setPokemon: () => undefined,
  updatePokemonHealthInBattle: () => undefined,
  updatePlayerCurrentMove: () => undefined,
  setBattleOpponentType: () => undefined,
  setBattleMessage: () => undefined,
  resetBattleData: () => undefined,
}

export enum OpponentTypes {
  COMPUTER = 'computer',
  HUMAN = 'human'
}

export enum OwnerTypes {
  PLAYER = 'player',
  OPPONENT = 'opponent',
}