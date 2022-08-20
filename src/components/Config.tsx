import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfigView from './ConfigView'

const Config: FunctionComponent = () => {
  const navigate = useNavigate()

  const onApply = () => navigate('/')
  const onCancel = () => navigate('/')

  return (
    <ConfigView onApply={onApply} onCancel={onCancel} />
  )
}
 
export default Config
