import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Đặt lại mật khẩu</CardTitle>
          <p className='text-gray-500 text-sm'>Nhập mật khẩu mới cho tài khoản của bạn.</p>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='password'>Mật khẩu mới</Label>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='********'
              />
              <div
                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirm-password'>Nhập lại mật khẩu</Label>
            <div className='relative'>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirm-password'
                placeholder='********'
              />
              <div
                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </div>
            </div>
          </div>

          <Button className='w-full'>Đặt lại mật khẩu</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
