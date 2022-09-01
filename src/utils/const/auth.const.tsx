import { Languages, ThemeTypes } from "./settings.const";

export const AUTH_DEFAULT_VALUES = {
  currentUser: null,
  setUser: () => undefined,
  logout: () => undefined,
}

export const DEFAULT_LANGUAGE = Languages.EN

export const DEFAULT_THEME = ThemeTypes.LIGHT
