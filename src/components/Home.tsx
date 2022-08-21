import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeView from './HomeView';

const Home: FunctionComponent = () => {
  const navigate = useNavigate()

  const onSettings = () => navigate('/settings')
  const onBattle = () => navigate('/battle')

  return (
    <HomeView onSettings={onSettings} onBattle={onBattle} />
  )
}
 
export default Home;
