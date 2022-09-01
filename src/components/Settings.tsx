import { FormEvent, FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import PokemonttService from '../services/PokemonttService';

import useFormInput from '../hooks/useFormInput';

import SettingsView from './SettingsView';

import { LANGUAGES_OPTIONS, RENDER_OPTIONS, THEMING_OPTIONS } from '../utils/const/settings.const';

const Settings: FunctionComponent = () => {
  const { currentUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: language,
    actions: languageActions,
  } = useFormInput({initialValue: currentUser.language});

  const {
    value: theming,
    actions: themingActions,
  } = useFormInput({initialValue: currentUser.theming});

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
      name: 'theming',
      value: theming,
      label: 'SETTINGS.THEMING',
      options: THEMING_OPTIONS,
      actions: themingActions
    },
    { 
      name: 'render',
      value: render,
      label: 'SETTINGS.RENDER',
      options: RENDER_OPTIONS,
      actions: renderActions
    },
  ];

  const handleApply = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const settingsData = {
      language: language,
      theming: theming,
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
  
  const handleCancel = (): void => navigate('/');

  return (
    <SettingsView formData={formData} onApply={handleApply} onCancel={handleCancel} />
  )
};
 
export default Settings;
