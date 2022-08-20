import { FunctionComponent, MouseEventHandler } from 'react';

interface ConfigProps {
  onApply: MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel: MouseEventHandler<HTMLButtonElement> | undefined;
}

const ConfigView: FunctionComponent<ConfigProps> = ({ onApply, onCancel }) => {
  return (
    <>
      <h3>CONFIG</h3>

      <div>
        <label htmlFor='language'>LANGUAGE</label>
        <select name='language'>
          <option value='english'>english</option>
          <option value='spanish'>spanish</option>
        </select>
      </div>

      <div>
        <label htmlFor='theming'>THEMING</label>
        <select name='theming'>
          <option value='dark'>dark</option>
          <option value='light'>light</option>
        </select>
      </div>

      <div>
        <label htmlFor='render'>RENDER</label>
        <select name='render'>
          <option value='html'>HTML</option>
          <option value='canvas'>canvas</option>
        </select>
      </div>

      <div>
        <button onClick={onCancel}>CANCEL</button>
        <button onClick={onApply}>APPLY</button>
      </div>
    </>
  )
}
 
export default ConfigView
