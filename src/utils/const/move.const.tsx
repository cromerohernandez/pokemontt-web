export enum MoveTypes {
  normal = 'normal',
  fire = 'fire',
  water = 'water',
  grass = 'grass',
  flying = 'flying',
  fighting = 'fighting',
  poison = 'poison',
  electric = 'electric',
  ground = 'ground',
  rock = 'rock',
  psychic = 'psychic',
  ice = 'ice',
  bug = 'bug',
  ghost = 'ghost',
  steel = 'steel',
  dragon = 'dragon',
  dark = 'dark',
  fairy = 'fairy',
}

export const DEFAULT_MOVE_TYPE = MoveTypes.fire

export const DEFAULT_POWER_MOVE_VALUE = 10

export const MOVE_FRAMES = 15

export const MOVE_FRAME_TIME = 45

export const MOVE_FRAMES_WITH_DISPLACEMENT = 11

export const NUMBER_OF_MOVES_FOR_BATTLE = 4

export const NUMBER_OF_OPACITY_CHANGES = 6 //must be even

export const OPACITY_CHANGE_TIME = 45   
