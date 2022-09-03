import { FunctionComponent } from 'react';

import { IHealthBarViewProps } from '../../../utils/models/props.models';

const HealthBarView: FunctionComponent<IHealthBarViewProps> = (healthBarViewProps: IHealthBarViewProps) => {
  const { currentHp, owner } = healthBarViewProps

  return (
    <div className='health-bar-container'>
      <span className='health-bar-container__label'>{ currentHp }</span>

      <div className='health-bar-container__border'>
        <div id={`${owner}Filling`} className='health-bar-container__filling' />
      </div>
    </div>
  )
}

export default HealthBarView
