import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AccountLayout from '@/layouts/AccountLayout';
const ChangePassword = () => {
  return (
    <AccountLayout>
      <Card className='p-3 h-[calc(100vh-120px)] shadow-lg space-y-5'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Đổi mật khẩu</h2>
          <Button className='bg-green-600 hover:bg-green-700 text-white'>Cập nhật</Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <span>Change Password</span>
        </div>
      </Card>
    </AccountLayout>
  );
};

export default ChangePassword;
