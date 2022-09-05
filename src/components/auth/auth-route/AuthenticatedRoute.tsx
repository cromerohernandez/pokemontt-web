import { FunctionComponent, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../../../contexts/AuthContext';

import { IAuthenticatedRouteProps } from '../../../utils/models/props.models';

const AuthenticatedRoute: FunctionComponent<IAuthenticatedRouteProps> = (props: IAuthenticatedRouteProps) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to='/login' replace />
  } else {
    return props.children
  }
};

export default AuthenticatedRoute;
