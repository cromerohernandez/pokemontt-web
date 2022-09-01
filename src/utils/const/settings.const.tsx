export enum Languages {
  EN = 'en',
  ES = 'es',
}

export const LANGUAGES_OPTIONS = [
  {
    name: 'SETTINGS.ENGLISH',
    value: Languages.EN,
  },
  {
    name: 'SETTINGS.SPANISH',
    value: Languages.ES
  }
]

export enum RenderTypes {
  CANVAS = 'canvas',
  HTML = 'html',
}

export const RENDER_OPTIONS = [
  {
    name: 'SETTINGS.CANVAS',
    value: RenderTypes.CANVAS,
  },
  {
    name: 'SETTINGS.HTML',
    value: RenderTypes.HTML,
  },
]

export enum ThemingTypes {
  DARK = 'dark',
  LIGHT = 'light',
}

export const THEMING_OPTIONS = [
  {
    name: 'SETTINGS.DARK',
    value: ThemingTypes.DARK,
  },
  {
    name: 'SETTINGS.LIGHT',
    value: ThemingTypes.LIGHT,
  },
]