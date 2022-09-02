import { FunctionComponent } from 'react';

import FormInput from '../UI/form/FormInput';

import { ISignUpViewProps } from '../../utils/models/props.models';
import { translate } from '../../utils/i18n/i18n.index';

const SignUpView: FunctionComponent<ISignUpViewProps> = ({ formData, formError, anyError, onSignUp, onGoToLogin }) => {
  return (
    <form onSubmit={onSignUp}>
      {formData.map((input, index) =>
        <FormInput
          type={input.type}
          name={input.name}
          value={input.value}
          label={input.label}
          {...input.actions}
          {...input.validation}
          key={index}
        />
      )}

      {formError &&
        <span>{ translate(`ERRORS.${formError}`) }</span>
      }

      <button disabled={anyError()} type='submit'>{ translate('BUTTONS.SIGN_UP') }</button>
      <button onClick={onGoToLogin}>{ translate('BUTTONS.LOGIN') }</button>
    </form>
  )
}
 
export default SignUpView;
