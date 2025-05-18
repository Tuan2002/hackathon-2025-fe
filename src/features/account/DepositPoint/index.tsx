'use client';

import { Card } from '@/components/ui/card';
import AccountLayout from '@/layouts/AccountLayout';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const DepositPoint = () => {
  const pointOptions = [1, 5, 10, 20, 30, 50, 100, 200];
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const handleDeposit = () => {
    if (!selectedPoint) return;
    const money = selectedPoint * 1000;
    // Giả lập API nạp
    toast.success(
      `🎉 Đã tạo yêu cầu nạp ${selectedPoint} điểm (${money.toLocaleString()} VNĐ) qua VNPay!`,
    );
  };

  return (
    <AccountLayout>
      <Card className='p-5 h-[calc(100vh-120px)] shadow-lg space-y-8 overflow-x-auto'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl w-full text-center font-bold text-gray-800 dark:text-gray-300'>
            Nạp tiền
          </h2>
        </div>

        <div className='max-w-xl mx-auto space-y-6'>
          <div className='grid grid-cols-4 gap-4'>
            {pointOptions.map((point) => (
              <Button
                key={point}
                variant={selectedPoint === point ? 'default' : 'outline'}
                className={`py-6 ${selectedPoint === point ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setSelectedPoint(point)}
              >
                {point} điểm
              </Button>
            ))}
          </div>

          {selectedPoint && (
            <div className='text-center text-lg text-gray-800 dark:text-gray-200'>
              Số tiền cần thanh toán:{' '}
              <span className='font-semibold text-green-600'>
                {(selectedPoint * 1000).toLocaleString()} VNĐ
              </span>
            </div>
          )}

          <Button
            className='w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-6 rounded-xl'
            onClick={handleDeposit}
            disabled={!selectedPoint}
          >
            Xác nhận nạp điểm qua VNPay
          </Button>
        </div>
      </Card>
    </AccountLayout>
  );
};

export default DepositPoint;
