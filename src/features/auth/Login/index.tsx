import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import RoutePaths from '@/routes/routePaths';
import type { ILoginRequestData } from '@/types/authType';
import { useState } from 'react';
import ButtonCustom from '@/components/customs/ButtonCustom';
import authService from '@/services/authService';
import { toast } from 'react-toastify';
import accountService from '@/services/accountService';
import useAccountStore from '@/stores/accountStore';

const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken, setCurrentUser } = useAccountStore();
  const [loginData, setLoginData] = useState<ILoginRequestData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const checkData = () => {
    const { email, password } = loginData;
    if (!email || !password) {
      return false;
    }
    if (password.length < 8) {
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkData()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await authService.login(loginData);
      if (response.statusCode === 200 || response.statusCode === 201) {
        // Handle successful login
        localStorage.setItem('accessToken', response.data.accessToken);

        const user = await accountService.getMe();
        if (user.statusCode === 200 || user.statusCode === 201) {
          toast.success('Đăng nhập thành công');
          setAccessToken(response.data.accessToken);
          setCurrentUser(user.data);
          navigate(RoutePaths.Home);
        }
      }
    } catch {
      // Handle error
      toast.error('Đăng nhập không thành công');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Chào mừng bạn!</CardTitle>
          <p className='text-gray-500 text-sm'>Vui lòng đăng nhập vào tài khoản của bạn</p>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              value={loginData.email}
              name='email'
              onChange={(e) => handleInputChange(e)}
              placeholder='nhapemail@gmail.com'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              type='password'
              id='password'
              value={loginData.password}
              name='password'
              onChange={(e) => handleInputChange(e)}
              placeholder='********'
            />
          </div>

          {/* Nhớ tài khoản + Quên mật khẩu */}
          <div className='flex items-center justify-end gap-2'>
            <Link to='/forgot-password' className='text-sm text-blue-600 hover:underline'>
              Quên mật khẩu?
            </Link>
          </div>

          <ButtonCustom isLoading={isLoading} onClick={handleSubmit} className='w-full'>
            Đăng nhập
          </ButtonCustom>

          <div className='flex items-center gap-2'>
            <Separator className='flex-1' />
            <span className='text-xs text-gray-400'>HOẶC</span>
            <Separator className='flex-1' />
          </div>

          <Button variant='outline' className='w-full flex items-center gap-2'>
            <FcGoogle className='text-xl' />
            Đăng nhập với Google
          </Button>
        </CardContent>

        <CardFooter className='text-sm text-center text-gray-500 flex justify-center'>
          Chưa có tài khoản?{' '}
          <Link to={RoutePaths.Signup} className='text-blue-600 ml-1 hover:underline'>
            Đăng ký ngay
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
