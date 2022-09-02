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
    <>
      <label htmlFor={name}>{ translate(label ?? '') }</label>
      <select
        id={name}
        name={name}
        disabled={disabled ? disabled : false}
        defaultValue={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
      >
        {placeholder &&
          <option value='default' disabled hidden>{ placeholder ? translate(placeholder) : name }</option>
        }
        {options.map((option, index) =>
          <option key={index} value={option.value}>{ translate(option.name) }</option>
        )}
      </select>
      {touch && error?.active && (
        <span>{ translate(error?.message ?? '') }</span>
      )}
    </>
  )
}

export default FormSelect
