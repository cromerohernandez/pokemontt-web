import { FunctionComponent } from 'react';

import FormInput from '../UI/form/FormInput';

import { ILoginViewProps } from '../../utils/models/props.models';

const LoginView: FunctionComponent<ILoginViewProps> = ({ formData, onLogin, onGoToSignUp }) => {
  return (
    <form onSubmit={onLogin}>
      {formData.map((input, index) =>
        <FormInput
          type={input.type}
          name={input.name}
          value={input.value}
          label={input.label}
          {...input.actions}
          key={index}
        />
      )}

      <button type='submit'>LOGIN</button>
      <button type='button' onClick={onGoToSignUp}>SIGNUP</button>
    </form>
  )
}
 
export default LoginView;
