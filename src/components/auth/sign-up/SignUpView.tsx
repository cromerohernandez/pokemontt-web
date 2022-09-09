import { FunctionComponent } from 'react';

import FormInput from '../../UI/form/FormInput';
import MenuButton from '../../UI/buttons/menu-button/MenuButton';

import { ISignUpViewProps } from '../../../utils/models/props.models';
import { BUTTON_TYPES } from '../../../utils/const/button.const';
import { translate } from '../../../utils/i18n/i18n.index';

const SignUpView: FunctionComponent<ISignUpViewProps> = ({ formData, formError, anyError, onSignUp }) => {
  return (
    <form onSubmit={onSignUp} className='form-container'>
      <div className='display-container--auth'>
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

        <MenuButton type={BUTTON_TYPES.submit} disabled={anyError()} label={'BUTTONS.SIGN_UP'} icon={'signup'} />

        <hr className='form-container__hr'></hr>
        
        <p className='form-container__p'>
          { translate('AUTH.HAVE_ACCOUNT') } 
          <span><a href='/login'>{ translate('AUTH.LOGIN') }</a></span>
        </p>
      </div>
    </form>
  )
}
 
export default SignUpView;
