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
  error?: {
    active: boolean,
    message: string
  }
}

export interface IFormSelect {
  name: string,
  label?: string,
  placeholder?: string,
  options: ISelectOptions[],
  value: string | null,
  disabled?: boolean,
  //actions
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void,
  resetError?: (newMessage: string) => void,
  //validation
  touch?: boolean,
  error?: {
    active: boolean,
    message: string
  }
}

export interface ISelectOptions {
  name: string,
  value: string | number,
}
