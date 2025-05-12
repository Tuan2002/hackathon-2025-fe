import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-toastify';
import authService from '@/services/authService';
import ButtonCustom from '@/components/customs/ButtonCustom';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Đếm ngược thời gian OTP
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, step]);

  // Xử lý nhập số và di chuyển con trỏ
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // chỉ cho nhập số

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleConfirmMail = async () => {
    setIsSubmitting(true);
    try {
      const sendMailResponse = await authService.forgetPassword({
        email,
      });
      if (sendMailResponse.statusCode === 200 || sendMailResponse.statusCode === 201) {
        toast.success('Mã xác thực đã được gửi đến email của bạn.');
        setStep(2);
        setTimeLeft(300);
        setUserId(sendMailResponse.data.userId);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmOtp = async () => {
    if (!userId || userId.trim() === '') {
      setStep(1);
      return;
    }
    if (otp.some((digit) => digit === '')) {
      toast.error('Vui lòng nhập đầy đủ mã OTP.');
      return;
    }
    setIsSubmitting(true);
    try {
      const otpCode = otp.join('');
      const verifyOtpResponse = await authService.verifyOtp({
        userId: userId as string,
        otp: otpCode,
      });
      if (verifyOtpResponse.statusCode === 200 || verifyOtpResponse.statusCode === 201) {
        navigate(RoutePaths.ResetPassword + `?otpToken=${verifyOtpResponse.data.otpToken}`);
      } else {
        toast.error('Mã OTP không hợp lệ.');
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);

    try {
      const resendOtpResponse = await authService.forgetPassword({
        email,
      });
      if (resendOtpResponse.statusCode === 200 || resendOtpResponse.statusCode === 201) {
        toast.success('Mã xác thực đã được gửi lại đến email của bạn.');
        setTimeLeft(300);
        setOtp(new Array(6).fill(''));
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Quên mật khẩu</CardTitle>
          <p className='text-gray-500 text-sm'>
            {step === 1
              ? 'Nhập email của bạn để nhận mã xác thực.'
              : 'Nhập mã OTP đã gửi về email của bạn.'}
          </p>
        </CardHeader>

        <CardContent className='space-y-4'>
          {step === 1 && (
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                id='email'
                placeholder='nhapemail@gmail.com'
              />
              <ButtonCustom
                isLoading={isSubmitting}
                className='w-full mt-2'
                onClick={handleConfirmMail}
              >
                Xác nhận
              </ButtonCustom>
            </div>
          )}

          {step === 2 && (
            <>
              <Label>Mã OTP</Label>
              <div className='flex items-center justify-between gap-2'>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    type='text'
                    value={digit}
                    maxLength={1}
                    className='text-center text-lg font-medium w-12 h-12'
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                  />
                ))}
              </div>

              <div className='text-sm text-gray-500'>
                Mã hết hạn sau: <span className='font-semibold'>{timeLeft}s</span>
              </div>

              <ButtonCustom
                isLoading={isSubmitting}
                onClick={handleConfirmOtp}
                className='w-full mt-2'
              >
                Xác nhận mã OTP
              </ButtonCustom>

              <Separator />

              <Button variant='outline' className='w-full' onClick={handleResendOtp}>
                Gửi lại mã
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
