export const BATTLE_DEFAULT_VALUES = {
  isPlayerTurn: undefined,
  isBattleInProgress: false,
  playerPokemon: undefined,
  playerCurrentMoveName: undefined,
  opponentPokemon: undefined,
  opponentType: undefined,
  changeTurn: () => undefined,
  setIsBattleInProgress: () => undefined,
  setPokemon: () => undefined,
  updatePokemonHealthInBattle: () => undefined,
  updatePlayerCurrentMove: () => undefined,
  setBattleOpponentType: () => undefined,
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