import { FunctionComponent } from 'react';

import FormInput from '../../UI/form/FormInput';
import MenuButton from '../../UI/buttons/menu-button/MenuButton';

import { ILoginViewProps } from '../../../utils/models/props.models';
import { translate } from '../../../utils/i18n/i18n.index';
import { BUTTON_TYPES } from '../../../utils/const/button.const';

const LoginView: FunctionComponent<ILoginViewProps> = ({ formData, formError, anyError, onLogin, onGoToSignUp }) => {
  return (
    <form onSubmit={onLogin} className='form-container'>
      <div className='button-container'>
        <MenuButton type={BUTTON_TYPES.button} label={'BUTTONS.SIGN_UP'} icon={'signup'} handleClick={onGoToSignUp} />
        <MenuButton type={BUTTON_TYPES.submit} disabled={anyError()} label={'BUTTONS.LOGIN'} icon={'login'} />
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
 
export default LoginView;
