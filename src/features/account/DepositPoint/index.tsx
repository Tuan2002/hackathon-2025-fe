'use client';

import { Card } from '@/components/ui/card';
import AccountLayout from '@/layouts/AccountLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const DepositPoint = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');

  const handleDeposit = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error('Nhập số tiền hợp lệ trước khi nạp!');
      return;
    }
    // Gọi API nạp tiền ở đây
    toast.success(`🎉 Nạp ${amount} điểm qua ${paymentMethod.toUpperCase()} thành công!`);
  };

  return (
    <AccountLayout>
      <Card className='p-5 h-[calc(100vh-120px)] shadow-lg space-y-8 overflow-x-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-300'>
            Nạp tiền tài khoản
          </h2>
        </div>

        <div className='max-w-lg mx-auto space-y-6'>
          <div>
            <Label
              htmlFor='amount'
              className='text-base font-medium text-gray-700 dark:text-gray-300'
            >
              Nhập số điểm cần nạp
            </Label>
            <Input
              id='amount'
              type='number'
              placeholder='Nhập số điểm...'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='mt-2'
            />
          </div>

          <div>
            <Label className='text-base font-medium text-gray-700 dark:text-gray-300'>
              Chọn phương thức thanh toán
            </Label>
            <RadioGroup
              defaultValue='momo'
              className='mt-3 space-y-3'
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <div className='flex items-center gap-3'>
                <RadioGroupItem value='momo' id='momo' />
                <Label htmlFor='momo'>Ví MoMo</Label>
              </div>
              <div className='flex items-center gap-3'>
                <RadioGroupItem value='vnpay' id='vnpay' />
                <Label htmlFor='vnpay'>VNPAY</Label>
              </div>
              <div className='flex items-center gap-3'>
                <RadioGroupItem value='bank' id='bank' />
                <Label htmlFor='bank'>Chuyển khoản ngân hàng</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            className='w-full bg-green-600 hover:bg-green-700 text-white text-base py-6 rounded-xl'
            onClick={handleDeposit}
          >
            Xác nhận nạp điểm
          </Button>
        </div>
      </Card>
    </AccountLayout>
  );
};

export default DepositPoint;
