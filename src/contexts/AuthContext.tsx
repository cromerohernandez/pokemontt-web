import { ConsumerProps, createContext, FunctionComponent, ProviderProps, useState } from 'react';

import PokemonttService from '../services/PokemonttService';

import { IAuthData } from '../utils/models/context.models';
import { AUTH_DEFAULT_VALUES, DEFAULT_LANGUAGE, DEFAULT_THEME } from '../utils/const/auth.const';
import i18next from 'i18next';

const AuthContext = createContext<IAuthData>(AUTH_DEFAULT_VALUES);

export const AuthContextProvider = (props: ProviderProps<IAuthData>) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : null);

  /**
   * @description function to set current user
   * @param user 
   */
  const setUser = (user: any) => { //TODOCRH: review any
    localStorage.setItem('user', user ? JSON.stringify(user.data) : '')
    setCurrentUser(user?.data ?? null)

    if (user) {
      _setLanguage(user.data.language ?? DEFAULT_LANGUAGE)
      _setTheme(user.data.theme ?? DEFAULT_THEME)
    }
  };

  /**
   * @description private function to set app language
   * @param language string
   */
  const _setLanguage = (language: string): void => {
    i18next.changeLanguage(language)
  };

  /**
   * @description private function to set app theme
   * @param theme string
   */
  const _setTheme = (theme: string): void => {
    document.documentElement.className = theme
  }

  /**
   * @description function to delete current user
   */
  const logout = () => {
    PokemonttService.logout()
      .then(() => {
        localStorage.removeItem('user')
        setUser('') //TODOCRH: review value
      })
  };

  const value = {
    currentUser: currentUser,
    setUser: setUser,
    logout: logout
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const WithAuthConsumer = (WrappedComponent: FunctionComponent<any>) => (props: ConsumerProps<any>) => (
  <AuthContext.Consumer>
    {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
  </AuthContext.Consumer>
)

export default AuthContext