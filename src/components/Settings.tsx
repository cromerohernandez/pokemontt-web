import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsView from './SettingsView';

const Settings: FunctionComponent = () => {
  const navigate = useNavigate()

  const onApply = () => navigate('/')
  const onCancel = () => navigate('/')

  return (
    <SettingsView onApply={onApply} onCancel={onCancel} />
  )
}
 
export default Settings;
