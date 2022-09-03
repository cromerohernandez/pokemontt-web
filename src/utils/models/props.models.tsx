import { ChangeEvent, ChangeEventHandler, FormEvent, MouseEventHandler } from 'react';

import { ISelectOptions } from './form.models';

export interface IAuthenticatedRouteProps {
  children: JSX.Element
}

export interface IBattleViewProps {
  onChangeMove: ChangeEventHandler<HTMLSelectElement>;
  onAttack: MouseEventHandler<HTMLButtonElement> | undefined;
  onSurrender: MouseEventHandler<HTMLButtonElement> | undefined;
  onGoHome: MouseEventHandler<HTMLButtonElement> | undefined;
  onStart: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface IHealthBarProps {
  owner: string
}

export interface IHealthBarViewProps {
  currentHp: number | undefined,
  owner: string,
}

export interface IHomeViewProps {
  onLogout: MouseEventHandler<HTMLButtonElement> | undefined;
  onSettings: MouseEventHandler<HTMLButtonElement> | undefined;
  onRanking: MouseEventHandler<HTMLButtonElement> | undefined;
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
  formError: string | null,
  anyError: () => boolean,
  onLogin: (event: FormEvent<HTMLFormElement>) => void,
  onGoToSignUp: () => void,
}

export interface INotAuthenticatedRouteProps {
  children: JSX.Element
}

export interface IRankingViewProps {
  usersRanking: IUserRanking[] | undefined;
  onGoHome: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface IUserRanking {
  username: string,
  score: number
}
export interface ISettingsViewProps {
  formData: {
    name: string
    value: string | null,
    label?: string,
    options: ISelectOptions[],
    actions: ISelectActions,
    validation?: IInputValidation,
  }[],
  onApply: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

interface ISelectActions {
  onChange: ((event: ChangeEvent<HTMLSelectElement>) => void)
  onBlur?: ((event: ChangeEvent<HTMLSelectElement>) => void)
  resetError?: ((newMessage: string) => void)
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
  formError: string | null,
  anyError: () => boolean,
  onSignUp: (event: FormEvent<HTMLFormElement>) => void,
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

export interface ITableRowViewProps {
  tableType: string
  rowKey: number,
  rowData: IUserRanking,
}
