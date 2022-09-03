import { FormEvent, FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import PokemonttService from '../../services/PokemonttService';

import useFormInput from '../../hooks/useFormInput';

import SettingsView from './SettingsView';

import { LANGUAGES_OPTIONS, RENDER_OPTIONS, THEME_OPTIONS } from '../../utils/const/settings.const';

const Settings: FunctionComponent = () => {
  const { currentUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: language,
    actions: languageActions,
  } = useFormInput({initialValue: currentUser.language});

  const {
    value: theme,
    actions: themeActions,
  } = useFormInput({initialValue: currentUser.theme});

  const {
    value: render,
    actions: renderActions,
  } = useFormInput({initialValue: currentUser.render});

  const formData = [
    { 
      name: 'language',
      value: language,
      label: 'SETTINGS.LANGUAGE',
      options: LANGUAGES_OPTIONS,
      actions: languageActions
    },
    { 
      name: 'theme',
      value: theme,
      label: 'SETTINGS.THEME',
      options: THEME_OPTIONS,
      actions: themeActions
    },
    { 
      name: 'render',
      value: render,
      label: 'SETTINGS.RENDER',
      options: RENDER_OPTIONS,
      actions: renderActions
    },
  ];

  /**
   * @description function to apply selected settings options
   * @param event FormEvent<HTMLFormElement>
   */
  const handleApply = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const settingsData = {
      language: language,
      theme: theme,
      render: render,
    }

    PokemonttService.updateSettings(settingsData)
      .then(updatedUser => {
        setUser(updatedUser)
        navigate('/')
      })
      .catch((error: any) => {
        console.log(error) //TODOCRH
      })
  }
  
  /**
   * @description function to redirect to home route
   */
  const handleCancel = (): void => navigate('/');

  return (
    <SettingsView formData={formData} onApply={handleApply} onCancel={handleCancel} />
  )
};
 
export default Settings;
