import { FunctionComponent } from 'react';

import { HomeViewProps } from '../utils/models/view.models';

const HomeView: FunctionComponent<HomeViewProps> = ({ onSettings, onBattle }) => {
  return (
    <>
      <h3>HOME</h3>
      <button onClick={onSettings}>SETTINGS</button>
      <button onClick={onBattle}>BATTLE</button>
    </>
  )
}
 
export default HomeView;
