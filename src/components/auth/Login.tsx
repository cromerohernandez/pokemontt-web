import { FormEvent, FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import PokemonttService from '../../services/PokemonttService';
import useFormInput from '../../hooks/useFormInput';

import LoginView from './LoginView';

const Login: FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    value: username,
    actions: usernameActions,
  } = useFormInput();

  const {
    value: password,
    actions: passwordActions,
  } = useFormInput();

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
  ];

  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const loginData = { username, password };

    PokemonttService.login(loginData)
      .then(user => {
        auth.setUser(user)
        navigate('/')
      })
      .catch(error => {
        console.log(error) //TODOCRH: delete
      })
  }

  const handleGoToSignUp = (): void => navigate('/signup');

  return (
    <LoginView formData={formData} onLogin={handleLogin} onGoToSignUp={handleGoToSignUp} />
  )
}
 
export default Login;
