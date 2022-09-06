export enum OpponentTypes {
  COMPUTER = 'computer',
  HUMAN = 'human'
}

export enum OwnerTypes {
  PLAYER = 'player',
  OPPONENT = 'opponent',
}

export const BATTLE_DEFAULT_VALUES = {
  isNewBattleDataRequested: false,
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
  setIsNewBattleDataRequested: () => undefined,
  changeTurn: () => undefined,
  setIsBattleInProgress: () => undefined,
  setIsBattleOver: () => undefined,
  setPokemonStartsAttack: () => undefined,
  setPokemon: () => undefined,
  updatePokemonHealthInBattle: () => undefined,
  setPlayerCurrentMoveName: () => undefined,
  setOpponentType: () => undefined,
  setLoser: () => undefined,
  setBattleMessage: () => undefined,
  resetBattleData: () => undefined,
}

export const MIN_DELAY_COMPUTER_ATTACK = 1800

export const MAX_DELAY_COMPUTER_ATTACK = 2800

export const DELAY_COMPUTER_START_ATTACK = 2000
