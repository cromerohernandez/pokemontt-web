import { FunctionComponent } from 'react';

import FormSelect from './UI/form/FormSelect';

import { ISettingsViewProps } from '../utils/models/props.models';

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

        <button onClick={onCancel}>CANCEL</button>
        <button type='submit'>APPLY</button>
      </form>
    </>
  )
}
 
export default SettingsView;
