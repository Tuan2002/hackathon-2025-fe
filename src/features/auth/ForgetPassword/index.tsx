import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

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
              <Input type='email' id='email' placeholder='nhapemail@gmail.com' />
              <Button className='w-full mt-2' onClick={() => setStep(2)}>
                Xác nhận
              </Button>
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

              <Button className='w-full mt-2'>Xác nhận mã OTP</Button>

              <Separator />

              <Button
                variant='outline'
                className='w-full'
                onClick={() => {
                  setTimeLeft(60);
                  setOtp(new Array(6).fill(''));
                  // Gửi lại mã
                }}
              >
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
