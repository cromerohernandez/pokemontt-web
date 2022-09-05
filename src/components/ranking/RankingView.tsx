import { FunctionComponent, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthContext from '../../contexts/AuthContext';

import MenuButton from '../UI/buttons/menu-button/MenuButton';
import Spinner from '../UI/misc/spinner/Spinner';
import TableRowView from '../UI/table/table-row/TableRowView';

import { IRankingViewProps } from '../../utils/models/props.models';
import { ICONS } from '../../assets/icons/icons';
import { translate } from '../../utils/i18n/i18n.index';

const RankingView: FunctionComponent<IRankingViewProps> = ({ usersRanking, onGoHome }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <div className='button-container'>
        <MenuButton label={'BUTTONS.BACK'} icon={'back'} handleClick={onGoHome} />
      </div>

      <div className='display-container'>
        {usersRanking ?
          <>
            <FontAwesomeIcon icon={ICONS.ranking} className='display-container__icon' />

            {usersRanking &&
              usersRanking.map((user, index) =>
                <TableRowView key={index} tableType='ranking' rowKey={index} rowData={user}/>
              )
            }

            {currentUser &&
              <span className='ranking-user-score'>{ `· ${translate('RANKING.CURRENT_SCORE')} ${currentUser.score} ·` }</span>
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
