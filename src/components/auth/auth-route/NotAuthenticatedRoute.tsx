import { FunctionComponent, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../../../contexts/AuthContext';

import { INotAuthenticatedRouteProps } from '../../../utils/models/props.models';

const NotAuthenticatedRoute: FunctionComponent<INotAuthenticatedRouteProps> = (props: INotAuthenticatedRouteProps) => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Navigate to='/' replace />
  } else {
    return props.children
  }
};

export default NotAuthenticatedRoute;
