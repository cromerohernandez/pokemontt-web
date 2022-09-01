import { FormEvent, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import PokemonttService from '../../services/PokemonttService';
import useFormInput from '../../hooks/useFormInput';

import SignUpView from './SignUpView';

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate();

  const {
    value: username,
    actions: usernameActions,
  } = useFormInput()

  const {
    value: password,
    actions: passwordActions,
  } = useFormInput()

  const {
    value: repeatPassword,
    actions: repetaPasswordActions,
  } = useFormInput()

  const formData = [
    { 
      type: 'text',
      name: 'username',
      value: username,
      label: 'AUTH.USERNAME',
      actions: usernameActions
    },
    { 
      type: 'password',
      name: 'password',
      value: password,
      label: 'AUTH.PASSWORD',
      actions: passwordActions
    },
    { 
      type: 'password',
      name: 'repeatPassword',
      value: repeatPassword,
      label: 'AUTH.REPEAT_PASSWORD',
      actions:  repetaPasswordActions
    },
  ]

  const handleSignUp = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const userData = { username, password }

    PokemonttService.signup(userData)
    .then(() => {
      navigate('/login')
    })
    .catch(error => {
      console.log(error) //TODOCRH: delete
    })
  }

  const handleGoToLogin = (): void => navigate('/login');

  return (
    <SignUpView formData={formData} onSignUp={handleSignUp} onGoToLogin={handleGoToLogin} />
  )
}
 
export default SignUp;
