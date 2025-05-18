'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AccountLayout from '@/layouts/AccountLayout';
import RoutePaths from '@/routes/routePaths';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentError = () => {
  return (
    <AccountLayout>
      <Card className='p-5 h-[calc(100vh-120px)] shadow-lg space-y-8 overflow-x-auto'>
        <div className='h-full flex flex-col items-center justify-center space-y-8'>
          <XCircle className='text-red-500 w-24 h-24' />

          <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>
            Thanh toán thất bại!
          </h1>

          <p className='text-lg text-gray-600 dark:text-gray-300 text-center max-w-md'>
            Có lỗi xảy ra trong quá trình thanh toán. <br />
            Vui lòng kiểm tra lại hoặc thử lại sau.
          </p>

          <div className='flex gap-4'>
            <Link to={RoutePaths.AccountDepositPoint}>
              <Button variant='outline' className='text-base px-6 py-3 rounded-lg'>
                Thử lại
              </Button>
            </Link>

            <Link to={RoutePaths.Home}>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-3 rounded-lg'>
                Về lại trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </AccountLayout>
  );
};

export default PaymentError;
