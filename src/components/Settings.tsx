import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsView from './SettingsView';

const Settings: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleApply = (): void => navigate('/');
  
  const handleCancel = (): void => navigate('/');

  return (
    <SettingsView onApply={handleApply} onCancel={handleCancel} />
  )
};
 
export default Settings;
