import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuButton from '../UI/buttons/MenuButton';
import Spinner from '../UI/misc/spinner/Spinner';
import TableRowView from '../UI/table/TableRowView';

import { IRankingViewProps } from '../../utils/models/props.models';
import { icons } from '../../assets/icons/icons';

const RankingView: FunctionComponent<IRankingViewProps> = ({ usersRanking, onGoHome }) => {
  return (
    <>
      <div className='button-container'>
        <MenuButton label={'BUTTONS.BACK'} icon={'back'} handleClick={onGoHome} />
      </div>

      <div className='display-container'>
        {usersRanking ?
          <>
            <FontAwesomeIcon icon={icons.ranking} className='display-container__icon' />

            {usersRanking &&
              usersRanking.map((user, index) =>
                <TableRowView key={index} tableType='ranking' rowKey={index} rowData={user}/>
              )
            }
          </>
        :
          <Spinner />
        }
      </div>
    </>
  )
}
 
export default RankingView;
