import { FunctionComponent } from 'react'

import { IFormInput } from '../../../utils/models/form.models';

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
    errorMessage,
  } = formInputProps

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ? placeholder : name}
        disabled={disabled ? disabled : false}
        defaultValue={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touch && errorMessage && (
        <span>{ errorMessage }</span>
      )}
    </>
  )
}

export default FormInput
