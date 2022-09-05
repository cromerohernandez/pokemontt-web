import { FunctionComponent } from 'react';

import FormInput from '../../UI/form/FormInput';
import MenuButton from '../../UI/buttons/menu-button/MenuButton';

import { ISignUpViewProps } from '../../../utils/models/props.models';
import { translate } from '../../../utils/i18n/i18n.index';
import { BUTTON_TYPES } from '../../../utils/const/button.const';

const SignUpView: FunctionComponent<ISignUpViewProps> = ({ formData, formError, anyError, onSignUp, onGoToLogin }) => {
  return (
    <form onSubmit={onSignUp} className='form-container'>
      <div className='button-container'>
        <MenuButton type={BUTTON_TYPES.button} label={'BUTTONS.LOGIN'} icon={'login'} handleClick={onGoToLogin} />
        <MenuButton type={BUTTON_TYPES.submit} disabled={anyError()} label={'BUTTONS.SIGN_UP'} icon={'signup'} />
      </div>

      <div className='display-container'>
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

        <div className='form-container__error'>
          {formError &&
            <span>{ translate(`ERRORS.${formError}`) }</span>
          }
        </div>
      </div>
    </form>
  )
}
 
export default SignUpView;
