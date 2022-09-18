import { FormEvent, FunctionComponent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../../contexts/AuthContext';
import PokemonttService from '../../../services/PokemonttService';
import useFormInput from '../../../hooks/useFormInput';

import LoginView from './LoginView';

const validators = {
  username: (val: any) => val,
  password: (val: any) => val,
}

const Login: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginRequested, setIsLoginRequested] = useState(false)
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

  /**
   * @description function to check if there is any error in some form input
   * @return boolean
   */
  const anyError = (): boolean => {
    const errors = [
      usernameValidation?.error.active,
      passwordValidation?.error.active,
    ]

    return errors.some(x => x === true)
  }

  /**
   * @description function to login and redirect to home route
   * @param event FormEvent<HTMLFormElement>
   */
  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const loginData = { username, password };

    setIsLoginRequested(true)
    setFormError(null)

    PokemonttService.login(loginData)
      .then(user => {
        auth.setUser(user)
        setIsLoginRequested(false)
        navigate('/')
      })
      .catch(error => {
        setIsLoginRequested(false)
        setFormError(error.response.data.message ?? error.message)
      })
  }

  return (
    <LoginView formData={formData} isLoginRequested={isLoginRequested} formError={formError} anyError={anyError} onLogin={handleLogin} />
  )
}
 
export default Login;
