import i18next from 'i18next';

import { en } from './en';
import { es } from './es';

const currentUser = localStorage.getItem('user');

i18next.init({
  interpolation: {
    escapeValue: true
  },
  lng: currentUser ? (JSON.parse(currentUser))['language'] : window.navigator.language.slice(0,2),
  resources: {
    en: {
      translation: en
    },
    es: {
      translation: es
    }
  }
})

/**
 * @description function to get translation from i18n files
 * @param key string
 * @returns string
 */
export const translate = (key: string): string => {
  return i18next.t(key)
}
