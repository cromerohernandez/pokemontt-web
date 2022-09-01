import { FunctionComponent } from 'react'

import { IFormSelect } from '../../../utils/models/form.models';

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
    errorMessage,
  } = formSelectProps

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        disabled={disabled ? disabled : false}
        defaultValue={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
      >
        {placeholder &&
          <option value='default' disabled hidden>{placeholder ? placeholder : name}</option>
        }
        {options.map((option, index) =>
          <option key={index} value={option.value}>{option.name}</option>
        )}
      </select>
      {touch && errorMessage && (
        <span>{ errorMessage }</span>
      )}
    </>
  )
}

export default FormSelect
