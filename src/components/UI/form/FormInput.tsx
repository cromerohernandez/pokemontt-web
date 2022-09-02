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
    <>
      <label htmlFor={name}>{ translate(label ?? '') }</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ? translate(placeholder) : ''}
        disabled={disabled ? disabled : false}
        defaultValue={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
      />
      {touch && error?.active && (
        <span>{ translate(error?.message ?? '') }</span>
      )}
    </>
  )
}

export default FormInput
