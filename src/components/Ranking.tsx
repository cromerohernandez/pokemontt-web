import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PokemonttService from '../services/PokemonttService';

import RankingView from './RankingView';

import { IUserRanking } from '../utils/models/props.models';

const Ranking: FunctionComponent = () => {
  const navigate = useNavigate()
  const [usersRanking, setUsersRanking] = useState<IUserRanking[]>();

  useEffect(() => {
    PokemonttService.getRanking()
      .then((response: any) => { //TODOCRH: type any
        setUsersRanking(response.data)
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
    <RankingView usersRanking={usersRanking} onGoHome={handleGoHome} />
  )
}

export default Ranking;
