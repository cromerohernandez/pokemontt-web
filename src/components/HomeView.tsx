import { FunctionComponent } from 'react';

import { IHomeViewProps } from '../utils/models/props.models';
import { translate } from '../utils/i18n/i18n.index';

const HomeView: FunctionComponent<IHomeViewProps> = ({ onLogout, onSettings, onRanking, onBattle }) => {
  return (
    <>
      <h3>CRH-HOME</h3>
      <button onClick={onLogout}>{ translate('BUTTONS.LOGOUT') }</button>
      <button onClick={onSettings}>{ translate('BUTTONS.SETTINGS') }</button>
      <button onClick={onRanking}>{ translate('BUTTONS.RANKING') }</button>
      <button onClick={onBattle}>{ translate('BUTTONS.BATTLE') }</button>
    </>
  )
}
 
export default HomeView;
