import { FunctionComponent } from 'react';

import { IHomeViewProps } from '../utils/models/props.models';

const HomeView: FunctionComponent<IHomeViewProps> = ({ onLogout, onSettings, onBattle }) => {
  return (
    <>
      <h3>HOME</h3>
      <button onClick={onLogout}>LOGOUT</button>
      <button onClick={onSettings}>SETTINGS</button>
      <button onClick={onBattle}>BATTLE</button>
    </>
  )
}
 
export default HomeView;
