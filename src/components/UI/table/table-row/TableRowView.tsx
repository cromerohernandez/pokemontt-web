import { FunctionComponent } from 'react';
import { translate } from '../../../../utils/i18n/i18n.index';

import { ITableRowViewProps } from '../../../../utils/models/props.models';

const TableRowView: FunctionComponent<ITableRowViewProps> = ({ tableType, rowKey, rowData }) => {
  return (
    <div className='row-container'>
      {tableType === 'history' &&
        <>
          <span className='row-container__data row-container__data--index'>{ rowKey + 1 }.</span>
          <span className='row-container__data row-container__data--name'>{
            rowData.win ? translate('HISTORY.VICTORY').toUpperCase() : translate('HISTORY.DEFEAT').toUpperCase()
          }</span>
          <span className='row-container__data row-container__data--name'>{ `VS ${rowData.opponentName}` }</span>
          <span className='row-container__data row-container__data--score'>{ `+${rowData.userScoreIncrement}` }</span>
        </>
      }

      {tableType === 'ranking' &&
        <>
          <span className='row-container__data row-container__data--index'>{ rowKey + 1 }.</span>
          <span className='row-container__data row-container__data--name'>{ rowData.username }</span>
          <span className='row-container__data row-container__data--score'>{ rowData.score }</span>
        </>
      }
    </div>
  )
}

export default TableRowView
