/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCallback, useState } from 'react';
import type { IRegisterRequestData } from '@/types/authType';
import { toast } from 'react-toastify';
import authService from '@/services/authService';
import RoutePaths from '@/routes/routePaths';
import ButtonCustom from '@/components/customs/ButtonCustom';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState<IRegisterRequestData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkData = useCallback(() => {
    const { email, firstName, lastName, password, confirmPassword } = registerData;
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp');
      return false;
    }
    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error('Email không hợp lệ');
      return false;
    }
    return true;
  }, [registerData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!checkData) {
      return;
    }
    setIsLoading(true);
    try {
      // Call the API to register the user
      const response = await authService.register(registerData);
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success('Đăng ký thành công');
        setRegisterData({
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirmPassword: '',
        });
        navigate(RoutePaths.Login);
      } else {
        toast.error(response.message || 'Đăng ký thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Đăng ký tài khoản</CardTitle>
          <p className='text-gray-500 text-sm'>Điền thông tin để đăng ký tài khoản của bạn</p>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Họ và tên trên cùng 1 hàng */}
          <div className='flex gap-4'>
            <div className='space-y-2 w-1/2'>
              <Label htmlFor='firstName'>Họ đệm</Label>
              <Input
                type='text'
                id='firstName'
                value={registerData.firstName}
                onChange={(e) => handleInputChange(e)}
                name='firstName'
                placeholder='Nguyễn'
              />
            </div>

            <div className='space-y-2 w-1/2'>
              <Label htmlFor='lastName'>Tên</Label>
              <Input
                type='text'
                id='lastName'
                value={registerData.lastName}
                onChange={(e) => handleInputChange(e)}
                name='lastName'
                placeholder='Văn A'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              value={registerData.email}
              onChange={(e) => handleInputChange(e)}
              name='email'
              placeholder='nhapemail@gmail.com'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input
              type='password'
              id='password'
              value={registerData.password}
              onChange={(e) => handleInputChange(e)}
              name='password'
              placeholder='********'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Xác nhận mật khẩu</Label>
            <Input
              type='password'
              id='confirmPassword'
              value={registerData.confirmPassword}
              onChange={(e) => handleInputChange(e)}
              name='confirmPassword'
              placeholder='********'
            />
          </div>

          <ButtonCustom isLoading={isLoading} onClick={handleSubmit} className='w-full'>
            Đăng ký
          </ButtonCustom>
        </CardContent>

        <CardFooter className='text-sm text-center text-gray-500 flex justify-center'>
          Đã có tài khoản?{' '}
          <Link to='/login' className='text-blue-600 ml-1 hover:underline'>
            Đăng nhập
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
