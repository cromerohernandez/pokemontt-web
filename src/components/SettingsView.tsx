import { FunctionComponent } from 'react';

import FormSelect from './UI/form/FormSelect';

import { ISettingsViewProps } from '../utils/models/props.models';
import { translate } from '../utils/i18n/i18n.index';

const SettingsView: FunctionComponent<ISettingsViewProps> = ({ formData, onApply, onCancel }) => {
  return (
    <>
      <h3>CONFIG</h3>
      <form onSubmit={onApply}>
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

        <button onClick={onCancel}>{ translate('BUTTONS.CANCEL') }</button>
        <button type='submit'>{ translate('BUTTONS.APPLY') }</button>
      </form>
    </>
  )
}
 
export default SettingsView;
