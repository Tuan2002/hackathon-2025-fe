import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { JSX } from 'react';
import RoutePaths from './routePaths';
import getAccessToken from '@/utils/getAccessToken';

const PrivateRoute = (): JSX.Element => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    toast.info('Vui lòng đăng nhập trước khi đến trang này');
    return <Navigate to={RoutePaths.Login} />;
  }
  return <Outlet />;
};
export default PrivateRoute;
