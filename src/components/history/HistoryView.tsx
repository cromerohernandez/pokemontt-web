import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MenuButton from '../UI/buttons/menu-button/MenuButton';
import Spinner from '../UI/misc/spinner/Spinner';
import TableRowView from '../UI/table/table-row/TableRowView';

import { IHistoryViewProps } from '../../utils/models/props.models';
import { ICONS } from '../../assets/icons/icons';
import { translate } from '../../utils/i18n/i18n.index';

const HistoryView: FunctionComponent<IHistoryViewProps> = ({ battlesHistory, onGoHome }) => {
  return (
    <>
      <div className='button-container'>
        <MenuButton label={'BUTTONS.BACK'} icon={'back'} handleClick={onGoHome} />
      </div>

      <div className='display-container'>
        {battlesHistory ?
          <>
            <FontAwesomeIcon icon={ICONS.history} className='display-container__icon' />

            {battlesHistory &&
              battlesHistory.map((battle, index) =>
                <TableRowView key={index} tableType='history' rowKey={index} rowData={battle}/>
              )
            }
          </>
        :
          <Spinner />
        }

        {battlesHistory && battlesHistory.length === 0 &&
          <span>{ translate('HISTORY.NO_BATTLES_YET') }</span>
        }
      </div>
    </>
  )
}
 
export default HistoryView;
