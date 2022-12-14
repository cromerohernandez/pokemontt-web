import { ChangeEvent, useState } from 'react';

import { FORM_INPUT_DEFAULT_VALUES } from '../utils/const/hook.const';
import { IUseFormInput } from '../utils/models/hook.models';


const useFormInput = (formInputData?: IUseFormInput) => {
  const { initialValue, validator, initialErrorMessage } = formInputData ?? FORM_INPUT_DEFAULT_VALUES

  const [value, setValue] = useState(initialValue ?? null)
  const [touch, setTouch] = useState(false)
  const [error, setError] = useState({active: true, message: ''})

  /**
   * @description function to manage input change event
   * @param event ChangeEvent<HTMLInputElement | HTMLSelectElement>
   */
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void =>{
    const valid = validator ? validator(event.currentTarget.value) : true

    setValue(event.currentTarget.value)
    setError({active: !valid, message: initialErrorMessage ?? ''})
  }

  /**
   * @description function to manage input blur event
   * @param event ChangeEvent<HTMLInputElement | HTMLSelectElement>
   */
  const onBlur = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const valid = validator ? validator(event.target.value) : true

    setTouch(true)
    setError({active: !valid, message: initialErrorMessage ?? ''})
  }

  /**
   * @description function to reset input error
   * @param newMessage string
   */
  const resetError = (newMessage: string): void => {
    setError({
      active: true,
      message: newMessage ? newMessage : (initialErrorMessage ?? '')
    })
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
        error,
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
