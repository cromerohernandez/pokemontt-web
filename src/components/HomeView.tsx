import { FunctionComponent, MouseEventHandler } from 'react';

interface HomeProps {
  onConfig: MouseEventHandler<HTMLButtonElement> | undefined;
  onBattle: MouseEventHandler<HTMLButtonElement> | undefined;
}

const HomeView: FunctionComponent<HomeProps> = ({ onConfig, onBattle }) => {
  return (
    <>
      <h3>HOME</h3>
      <button onClick={onConfig}>CONFIG</button>
      <button onClick={onBattle}>BATTLE</button>
    </>
  )
}
 
export default HomeView
