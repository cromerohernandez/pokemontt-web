import { MouseEventHandler } from 'react';

import { BUTTON_TYPES } from '../const/button.const';

export interface IMenuButtonProps {
  type?: BUTTON_TYPES | undefined;
  disabled?: boolean,
  label: string,
  icon: string,
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined,
}

export interface IMenuButtonViewProps {
  type?: BUTTON_TYPES | undefined;
  disabled?: boolean,
  label: string,
  labelOn: boolean,
  icon: string,
  handleMouseOver: MouseEventHandler<HTMLButtonElement> | undefined,
  handleMouseLeave: MouseEventHandler<HTMLButtonElement> | undefined,
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined,
}
