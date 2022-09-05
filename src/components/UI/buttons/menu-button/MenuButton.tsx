import { FunctionComponent, useState } from 'react';

import MenuButtonView from './MenuButtonView';

import { IMenuButtonProps } from '../../../../utils/models/button.models';

const MenuButton: FunctionComponent<IMenuButtonProps> = (menuButtonProps: IMenuButtonProps) => {
  const { type, disabled, label, icon, handleClick } = menuButtonProps

  const [labelOn, setLabelOn] = useState(false)

  const handleMouseOver = () => setLabelOn(true)

  const handleMouseLeave = () => setLabelOn(false)

  return (
    <MenuButtonView
      type={type}
      disabled={disabled}
      label={label}
      labelOn={labelOn}
      icon={icon}
      handleMouseOver={handleMouseOver}
      handleMouseLeave={handleMouseLeave}
      handleClick={handleClick}
    />
  )
}

export default MenuButton
