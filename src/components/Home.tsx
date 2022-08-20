import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeView from './HomeView'

const Home: FunctionComponent = () => {
  const navigate = useNavigate()

  const onConfig = () => navigate('/config')
  const onBattle = () => navigate('/battle')

  return (
    <HomeView onConfig={onConfig} onBattle={onBattle} />
  )
}
 
export default Home
