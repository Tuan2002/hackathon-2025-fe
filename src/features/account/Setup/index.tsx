import { Card } from '@/components/ui/card';
import AccountLayout from '@/layouts/AccountLayout';
const Setup = () => {
  return (
    <AccountLayout>
      <Card className='p-3 h-[calc(100vh-120px)] shadow-lg space-y-5'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Cài đặt tài khoản</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <span>Cài đặt tài khoản</span>
        </div>
      </Card>
    </AccountLayout>
  );
};

export default Setup;
