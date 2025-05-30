'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '@/services/authService';
import RoutePaths from '@/routes/routePaths';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const otpToken = searchParams.get('otpToken');

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error('Vui lòng nhập đầy đủ mật khẩu');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp!');
      return;
    }

    if (!otpToken) {
      toast.error('Thiếu mã xác thực (otpToken)');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.resetPassword(
        {
          newPassword: password,
        },
        otpToken,
      );
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success('Đặt lại mật khẩu thành công!');
        setTimeout(() => {
          navigate(RoutePaths.Login);
        }, 2000);
      } else {
        toast.error('Đặt lại mật khẩu không thành công!');
      }
    } catch {
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </div>
            </div>
          </div>

          <Button
            className='w-full bg-green-600 hover:bg-green-700'
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
