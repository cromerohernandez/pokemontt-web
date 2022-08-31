import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';

export interface IAuthenticatedRouteProps {
  children: JSX.Element
}

export interface IBattleViewProps {
  onChangeMove: ChangeEventHandler<HTMLSelectElement>;
  onAttack: MouseEventHandler<HTMLButtonElement> | undefined;
  onSurrender: MouseEventHandler<HTMLButtonElement> | undefined;
  onStart: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface IHomeViewProps {
  onLogout: MouseEventHandler<HTMLButtonElement> | undefined;
  onSettings: MouseEventHandler<HTMLButtonElement> | undefined;
  onBattle: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface ILoginViewProps {
  formData: {
    type: string,
    name: string
    value: string | null,
    label?: string,
    actions: IInputActions,
    validation?: IInputValidation,
  }[],
  onLogin: (event: ChangeEvent<HTMLFormElement>) => void,
  onGoToSignUp: () => void,
}

export interface INotAuthenticatedRouteProps {
  children: JSX.Element
}

export interface ISettingsViewProps {
  onApply: MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface ISignUpViewProps {
  formData: {
    type: string,
    name: string
    value: string | null,
    label?: string,
    actions: IInputActions,
    validation?: IInputValidation,
  }[],
  onSignUp: (event: ChangeEvent<HTMLFormElement>) => void,
  onGoToLogin: () => void,
}

interface IInputActions {
  onChange: ((event: ChangeEvent<HTMLInputElement>) => void)
  onBlur?: ((event: ChangeEvent<HTMLInputElement>) => void)
  resetError?: ((newMessage: string) => void)
}

interface IInputValidation {
  touch?: boolean,
  errorMessage?: string,
}
