import { ChangeEvent, useState } from 'react';

import { IUseFormInput } from '../utils/models/hook.models';

const defaultFormDataInput = {
  initialValue: null,
  validator: null,
  initialErrorMessage: '',
}

const useFormInput = (formInputData?: IUseFormInput) => {
  const { initialValue, validator, initialErrorMessage } = formInputData ?? defaultFormDataInput

  const [value, setValue] = useState(initialValue ?? null)
  const [touch, setTouch] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => setValue(event.currentTarget.value)

  const onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    const valid = validator ? validator(event.target.value) : true

    setTouch(true)
    setErrorMessage(!valid ? (initialErrorMessage ?? '') : '')
  }

  const resetError = (newMessage: string): void => {
    setErrorMessage(newMessage ? newMessage : (initialErrorMessage ?? ''))
  }

  if (validator) {
    return {
      value,
      actions: {
        onChange,
        onBlur,
        resetError,
      },
      validation: {
        touch,
        errorMessage,
      },
    }
  } else {
    return {
      value,
      actions: {
        onChange
      },
    }
  }
}

export default useFormInput
