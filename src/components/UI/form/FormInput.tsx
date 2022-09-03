import { FunctionComponent } from 'react'

import { IFormInput } from '../../../utils/models/form.models';
import { translate } from '../../../utils/i18n/i18n.index';

const FormInput: FunctionComponent<IFormInput> = (formInputProps: IFormInput) => {
  const {
    type,
    name,
    label,
    placeholder,
    value,
    disabled,
    onChange,
    onBlur,
    touch,
    error,
  } = formInputProps

  return (
    <div className='form-item-container'>
      <div className='form-item-container__data'>
        <label htmlFor={name} className='form-item-container__label'>{ translate(label ?? '') }</label>

        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder ? translate(placeholder) : ''}
          disabled={disabled ? disabled : false}
          defaultValue={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          className='form-item-container__item'
        />
      </div>

      <div className='form-item-container__error'>
        {touch && error?.active && (
          <span>{ translate(error?.message ?? '') }</span>
        )}
      </div>
    </div>
  )
}

export default FormInput
