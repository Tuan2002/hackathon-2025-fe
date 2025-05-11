import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import RoutePaths from '@/routes/routePaths';

const Login = () => {
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
            <Input type='email' id='email' placeholder='nhapemail@gmail.com' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Mật khẩu</Label>
            <Input type='password' id='password' placeholder='********' />
          </div>

          {/* Nhớ tài khoản + Quên mật khẩu */}
          <div className='flex items-center justify-end gap-2'>
            <Link to='/forgot-password' className='text-sm text-blue-600 hover:underline'>
              Quên mật khẩu?
            </Link>
          </div>

          <Button className='w-full'>Đăng nhập</Button>

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
