import { ChangeEvent } from 'react';

export interface IFormInput {
  type: string,
  name: string,
  label?: string,
  placeholder?: string,
  value: string | null,
  disabled?: boolean,
  //actions
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void,
  resetError?: (newMessage: string) => void,
  //validation
  touch?: boolean,
  errorMessage?: string,
}
