import {
  faArrowLeft,
  faArrowRight,
  faArrowUpFromBracket,
  faCheck,
  faClockRotateLeft,
  faDesktop,
  faFlag,
  faForwardStep,
  faGear,
  faPlay,
  faRightFromBracket,
  faRightToBracket,
  faRotateLeft,
  faShieldHalved,
  faTrophy,
  faUser,
  faXmark,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'

interface ICRH {
  [key:string] : IconDefinition
}

export const icons: ICRH = {
  apply: faCheck,
  arrow_left: faArrowLeft,
  arrow_right: faArrowRight,
  attack: faForwardStep,
  back: faRotateLeft,
  battle: faShieldHalved,
  cancel: faXmark,
  computer: faDesktop,
  history: faClockRotateLeft,
  human: faUser,
  login: faRightToBracket,
  logout: faRightFromBracket,
  ranking: faTrophy,
  start: faPlay,
  settings: faGear,
  signup: faArrowUpFromBracket,
  surrender: faFlag,
}
