import { MouseEventHandler, ChangeEventHandler } from 'react';

export interface IHomeViewProps {
  onSettings: MouseEventHandler<HTMLButtonElement> | undefined;
  onBattle: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface ISettingsViewProps {
  onApply: MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface IBattleViewProps {
  onChangeMove: ChangeEventHandler<HTMLSelectElement>;
  onAttack: MouseEventHandler<HTMLButtonElement> | undefined;
  onSurrender: MouseEventHandler<HTMLButtonElement> | undefined;
  onStart: MouseEventHandler<HTMLButtonElement> | undefined;
}
