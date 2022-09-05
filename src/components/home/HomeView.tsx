import { FunctionComponent } from 'react';

import MenuButton from '../UI/buttons/menu-button/MenuButton';

import { IHomeViewProps } from '../../utils/models/props.models';

const HomeView: FunctionComponent<IHomeViewProps> = ({ onLogout, onSettings, onRanking, onHistory, onBattle }) => {
  return (
    <>
      <div className='button-container'>
        <MenuButton label={'BUTTONS.LOGOUT'} icon={'logout'} handleClick={onLogout} />
        <MenuButton label={'BUTTONS.SETTINGS'} icon={'settings'} handleClick={onSettings} />
        <MenuButton label={'BUTTONS.RANKING'} icon={'ranking'} handleClick={onRanking} />
        <MenuButton label={'BUTTONS.HISTORY'} icon={'history'} handleClick={onHistory} />
        <MenuButton label={'BUTTONS.BATTLE'} icon={'battle'} handleClick={onBattle} />
      </div>

      <div className='display-container'></div>
    </>
  )
}
 
export default HomeView;
