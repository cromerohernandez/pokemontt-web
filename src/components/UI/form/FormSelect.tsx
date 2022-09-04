import { FunctionComponent } from 'react'

import { IFormSelect } from '../../../utils/models/form.models';
import { translate } from '../../../utils/i18n/i18n.index';

const FormSelect: FunctionComponent<IFormSelect> = (formSelectProps: IFormSelect) => {
  const {
    name,
    label,
    placeholder,
    options,
    value,
    disabled,
    onChange,
    onBlur,
    touch,
    error,
  } = formSelectProps

  return (
    <div className='form-item-container'>
      <div className='form-item-container__data'>
        {label &&
          <label htmlFor={name} className='form-item-container__label'>{ translate(label ?? '') }</label>
        }

        <select
          id={name}
          name={name}
          disabled={disabled ? disabled : false}
          defaultValue={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          className='form-item-container__item'
        >
          {placeholder &&
            <option value='' disabled hidden>{ translate(placeholder) }</option>
          }
          {options.map((option, index) =>
            <option key={index} value={option.value}>{ translate(option.name) }</option>
          )}
        </select>
      </div>
      
      {error &&
        <div className='form-item-container__error'>
          {touch && error?.active && (
            <span>{ translate(error?.message ?? '') }</span>
          )}
        </div>
      }
    </div>
  )
}

export default FormSelect
