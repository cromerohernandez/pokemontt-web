import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PokemonttService from '../../services/PokemonttService';

import HistoryView from './HistoryView';

import { IBattleHistory } from '../../utils/models/props.models';

const Ranking: FunctionComponent = () => {
  const navigate = useNavigate()
  const [battlesHistory, setBattlesHistory] = useState<IBattleHistory[]>();

  /**
   * @description useEffect function to get history user battles
   */
  useEffect((): void => {
    PokemonttService.getUserBattles()
      .then((response: any) => { //TODOCRH: type any
        setBattlesHistory(response.data)
      })
      .catch(error => {
        console.log(error) //TODOCRH: delete
      })
  }, [])

  /**
   * @description function to redirect to home route
   */
  const handleGoHome = (): void => {
    navigate('/')
  }

  return (
    <HistoryView battlesHistory={battlesHistory} onGoHome={handleGoHome} />
  )
}

export default Ranking;
