import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { type JSX } from 'react';
import useAccountStore from '@/stores/accountStore';
import getAccessToken from '@/utils/getAccessToken';
import RoutePaths from './routePaths';
import { USER_ROLES } from '@/constants/userRoles';
import { Loader2 } from 'lucide-react'; // icon spinner, hoặc tùy bạn dùng loader nào khác

const AdminProtectRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const { currentUser } = useAccountStore();
  const accessToken = getAccessToken();

  React.useLayoutEffect(() => {
    if (currentUser && currentUser.role !== USER_ROLES.ADMIN) {
      toast.info('Bạn không có quyền truy cập vào trang này!');
      navigate(RoutePaths.Home);
    }
  }, [currentUser, navigate]);

  if (!accessToken) return <Navigate to={RoutePaths.Login} />;

  return (
    <div>
      {currentUser?.id ? (
        <Outlet />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Loader2 className='animate-spin w-8 h-8 text-gray-500' />
          <span className='text-gray-600 text-sm'>Đang tải thông tin người dùng...</span>
        </div>
      )}
    </div>
  );
};

export default AdminProtectRoute;
