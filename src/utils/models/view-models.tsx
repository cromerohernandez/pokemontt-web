import { MouseEventHandler, ChangeEventHandler } from 'react';

export interface HomeViewProps {
  onSettings: MouseEventHandler<HTMLButtonElement> | undefined;
  onBattle: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface SettingsViewProps {
  onApply: MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface BattleViewProps {
  onChangeMove: ChangeEventHandler<HTMLSelectElement>;
  onAttack: MouseEventHandler<HTMLButtonElement> | undefined;
  onSurrender: MouseEventHandler<HTMLButtonElement> | undefined;
}
