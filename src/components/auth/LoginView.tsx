import { FunctionComponent } from 'react';

import FormInput from '../UI/form/FormInput';

import { ILoginViewProps } from '../../utils/models/props.models';
import { translate } from '../../utils/i18n/i18n.index';

const LoginView: FunctionComponent<ILoginViewProps> = ({ formData, formError, anyError, onLogin, onGoToSignUp }) => {
  return (
    <form onSubmit={onLogin}>
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

      <button disabled={anyError()} type='submit'>{ translate('BUTTONS.LOGIN') }</button>
      <button onClick={onGoToSignUp}>{ translate('BUTTONS.SIGN_UP') }</button>
    </form>
  )
}
 
export default LoginView;
