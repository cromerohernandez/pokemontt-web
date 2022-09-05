import { FormEvent, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PokemonttService from '../../../services/PokemonttService';
import useFormInput from '../../../hooks/useFormInput';

import SignUpView from './SignUpView';

import { translate } from '../../../utils/i18n/i18n.index';

const validators = {
  username: (val: any) => val,
  password: (val: string) => val.length >= 6,
}

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null)

  const {
    value: username,
    actions: usernameActions,
    validation: usernameValidation,
  } = useFormInput({validator: validators.username, initialErrorMessage: translate('ERRORS.INVALID_USERNAME')})

  const {
    value: password,
    actions: passwordActions,
    validation: passwordValidation,
  } = useFormInput({validator: validators.password, initialErrorMessage: translate('ERRORS.INVALID_PASSWORD')})

  const {
    value: repeatPassword,
    actions: repetaPasswordActions,
    validation: repeatPasswordValidation,
  } = useFormInput({validator: (val: string) => val === password, initialErrorMessage: translate('ERRORS.INVALID_REPEAT_PASSWORD')})

  const formData = [
    { 
      type: 'text',
      name: 'username',
      value: username,
      label: 'AUTH.USERNAME',
      actions: usernameActions,
      validation: usernameValidation,
    },
    { 
      type: 'password',
      name: 'password',
      value: password,
      label: 'AUTH.PASSWORD',
      actions: passwordActions,
      validation: passwordValidation,
    },
    { 
      type: 'password',
      name: 'repeatPassword',
      value: repeatPassword,
      label: 'AUTH.REPEAT_PASSWORD',
      actions:  repetaPasswordActions,
      validation: repeatPasswordValidation,
    },
  ]

  /**
   * @description function to check if there is any error in some form input
   * @return boolean
   */
  const anyError = (): boolean => {
    const errors = [
      usernameValidation?.error.active,
      passwordValidation?.error.active,
      repeatPasswordValidation?.error.active,
    ]

    return errors.some(x => x === true)
  }

  /**
   * @description function to sign up and redirect to login route
   * @param event FormEvent<HTMLFormElement>
   */
  const handleSignUp = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const userData = { username, password }

    setFormError(null)

    PokemonttService.signup(userData)
    .then(() => {
      navigate('/login')
    })
    .catch(error => {
      setFormError(error.response.data.message ?? error.message)
    })
  }

  /**
   * @description function to redirect to login route
   */
  const handleGoToLogin = (): void => navigate('/login');

  return (
    <SignUpView formData={formData} formError={formError} anyError={anyError} onSignUp={handleSignUp} onGoToLogin={handleGoToLogin} />
  )
}
 
export default SignUp;
