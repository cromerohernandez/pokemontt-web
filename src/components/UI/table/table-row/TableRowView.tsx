import { FunctionComponent } from 'react';

import { ITableRowViewProps } from '../../../../utils/models/props.models';

const TableRowView: FunctionComponent<ITableRowViewProps> = ({ tableType, rowKey, rowData }) => {
  return (
    <div className='row-container'>
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
