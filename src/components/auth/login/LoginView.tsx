import { FunctionComponent } from 'react';

import FormInput from '../../UI/form/FormInput';
import MenuButton from '../../UI/buttons/menu-button/MenuButton';
import Spinner from '../../UI/misc/spinner/Spinner';

import { ILoginViewProps } from '../../../utils/models/props.models';
import { translate } from '../../../utils/i18n/i18n.index';
import { BUTTON_TYPES } from '../../../utils/const/button.const';

const LoginView: FunctionComponent<ILoginViewProps> = ({ formData, isLoginRequested, formError, anyError, onLogin }) => {
  return (
    <form onSubmit={onLogin} className='form-container'>
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

        <div className='form-container__button'>
          {!isLoginRequested ?
            <MenuButton type={BUTTON_TYPES.submit} disabled={anyError()} label={'BUTTONS.LOGIN'} icon={'login'} />
            :
            <Spinner />
          }
        </div>

        <hr className='form-container__hr'></hr>
        
        <p className='form-container__p'>
          { translate('AUTH.DONT_HAVE_ACCOUNT') } 
          <span><a href='/signup'>{ translate('AUTH.SIGN_UP') }</a></span>
        </p>
      </div>
    </form>
  )
}
 
export default LoginView;
