import { FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { icons } from '../../../assets/icons/icons';
import { IMenuButtonViewProps } from '../../../utils/models/button.models';
import { translate } from '../../../utils/i18n/i18n.index';

const MenuButtonView: FunctionComponent<IMenuButtonViewProps> = (menuButtonViewProps: IMenuButtonViewProps) => {
  const { type, disabled, label, labelOn, icon, handleMouseOver, handleMouseLeave, handleClick } = menuButtonViewProps

  return (
    <div className='module-button'>
      <Button
        type={type}
        disabled={disabled}
        variant='primary'
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className='module-button__button'
      >
        <FontAwesomeIcon icon={icons[icon]} className='module-button__icon' />
      </Button>

      <label className={`module-button__label ${!disabled && labelOn ? 'module-button__label--on' : null}`} >
        {translate(label).toUpperCase()}
      </label>
    </div>
  )
}

export default MenuButtonView
