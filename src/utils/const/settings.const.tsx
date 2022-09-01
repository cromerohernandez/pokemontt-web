export enum Languages {
  EN = 'en',
  ES = 'es',
}

export const LANGUAGES_OPTIONS = [
  {
    name: 'english',
    value: Languages.EN,
  },
  {
    name: 'spanish',
    value: Languages.ES
  }
]

export enum RenderTypes {
  CANVAS = 'canvas',
  HTML = 'html',
}

export const RENDER_OPTIONS = [
  {
    name: 'canvas',
    value: RenderTypes.CANVAS,
  },
  {
    name: 'HTML',
    value: RenderTypes.HTML,
  },
]

export enum ThemingTypes {
  DARK = 'dark',
  LIGHT = 'light',
}

export const THEMING_OPTIONS = [
  {
    name: 'dark',
    value: ThemingTypes.DARK,
  },
  {
    name: 'light',
    value: ThemingTypes.LIGHT,
  },
]