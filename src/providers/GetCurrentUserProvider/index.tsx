import accountService from '@/services/accountService';
import useAccountStore from '@/stores/accountStore';
import getAccessToken from '@/utils/getAccessToken';
import React from 'react';

const GetCurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getAccessToken();
  const { setAccessToken, setCurrentUser } = useAccountStore();

  React.useEffect(() => {
    if (!accessToken) return;
    const fetchCurrentUser = async () => {
      try {
        const response = await accountService.getMe();
        if (response.statusCode === 200 || response.statusCode === 201) {
          console.log('Current user:', response.data);
          setAccessToken(accessToken);
          setCurrentUser(response.data);
        } else {
          setAccessToken(null);
          setCurrentUser(null);
          localStorage.removeItem('accessToken');
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    };
    fetchCurrentUser();
  }, [accessToken, setAccessToken, setCurrentUser]);
  return children;
};
export default GetCurrentUserProvider;
