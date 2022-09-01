import { FunctionComponent } from 'react';

import FormInput from '../UI/form/FormInput';

import { ISignUpViewProps } from '../../utils/models/props.models';

const SignUpView: FunctionComponent<ISignUpViewProps> = ({ formData, onSignUp, onGoToLogin }) => {
  return (
    <form onSubmit={onSignUp}>
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

      <button type='submit'>SIGN UP</button>
      <button onClick={onGoToLogin}>LOGIN</button>
    </form>
  )
}
 
export default SignUpView;
