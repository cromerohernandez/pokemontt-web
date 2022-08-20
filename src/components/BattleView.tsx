import { FunctionComponent, MouseEventHandler } from 'react';

interface BattleProps {
  onSurrender: MouseEventHandler<HTMLButtonElement> | undefined;
}

const BattleView: FunctionComponent<BattleProps> = ({ onSurrender }) => {
  return (
    <>
      <h3>BATTLE</h3>
      <button onClick={onSurrender}>SURRENDER</button>
    </>
  )
}
 
export default BattleView
