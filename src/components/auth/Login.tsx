import { FormEvent, FunctionComponent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import PokemonttService from '../../services/PokemonttService';
import useFormInput from '../../hooks/useFormInput';

import LoginView from './LoginView';

const validators = {
  username: (val: any) => val,
  password: (val: any) => val,
}

const Login: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null)

  const {
    value: username,
    actions: usernameActions,
    validation: usernameValidation,
  } = useFormInput({validator: validators.username});

  const {
    value: password,
    actions: passwordActions,
    validation: passwordValidation,
  } = useFormInput({validator: validators.password});

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
  ];

  const anyError = (): boolean => {
    const errors = [
      usernameValidation?.error.active,
      passwordValidation?.error.active,
    ]

    return errors.some(x => x === true)
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const loginData = { username, password };

    setFormError(null)

    PokemonttService.login(loginData)
      .then(user => {
        auth.setUser(user)
        navigate('/')
      })
      .catch(error => {
        setFormError(error.response.data.message ?? error.message)
      })
  }

  const handleGoToSignUp = (): void => navigate('/signup');

  return (
    <LoginView formData={formData} formError={formError} anyError={anyError} onLogin={handleLogin} onGoToSignUp={handleGoToSignUp} />
  )
}
 
export default Login;
