import { FunctionComponent } from 'react';

import FormSelect from '../UI/form/FormSelect';
import MenuButton from '../UI/buttons/menu-button/MenuButton';

import { BUTTON_TYPES } from '../../utils/const/button.const';
import { ISettingsViewProps } from '../../utils/models/props.models';

const SettingsView: FunctionComponent<ISettingsViewProps> = ({ formData, onApply, onCancel }) => {
  return (
    <form onSubmit={onApply} className='form-container'>
      <div className='button-container'>
        <MenuButton label={'BUTTONS.CANCEL'} icon={'cancel'} handleClick={onCancel} />
        <MenuButton type={BUTTON_TYPES.submit} label={'BUTTONS.APPLY'} icon={'apply'} />
      </div>

      <div className='display-container'>
        {formData.map((select, index) =>
          <FormSelect
            name={select.name}
            options={select.options}
            value={select.value}
            label={select.label}
            {...select.actions}
            key={index}
          />
        )}
      </div>
    </form>
  )
}
 
export default SettingsView;
