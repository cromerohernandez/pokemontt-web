import { FunctionComponent } from 'react';

import { IRankingViewProps } from '../utils/models/props.models';

const RankingView: FunctionComponent<IRankingViewProps> = ({ usersRanking, onGoHome }) => {
  return (
    <>
      <h3>RANKING</h3>
      <button onClick={onGoHome}>HOME</button>

      {usersRanking &&
        usersRanking.map((user, index) =>
          <div key={index }>
            <h6>{ index + 1 }</h6>
            <h5>{ user.username }</h5>
            <h6>{ user.score }</h6>
          </div>
        )
      }
    </>
  )
}
 
export default RankingView;
