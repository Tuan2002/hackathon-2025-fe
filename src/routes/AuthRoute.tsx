import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import getAccessToken from '../utils/getAccessToken';
import RoutePaths from './routePaths';

const AuthRoute = (): JSX.Element => {
  const accessToken = getAccessToken();
  return accessToken ? <Outlet /> : <Navigate to={RoutePaths.Home} />;
};
export default AuthRoute;
