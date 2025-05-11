import ContainerBox from '@/components/customs/ContainerBox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import RoutePaths from '@/routes/routePaths';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccountProfileProps {
  children: React.ReactNode;
}
export default function AccountLayout({ children }: AccountProfileProps) {
  const navigate = useNavigate();
  return (
    <ContainerBox>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-3'>
        {/* Sidebar */}
        <div className='space-y-4'>
          <Card className='p-6 text-center space-y-3 shadow-lg'>
            <div className='flex flex-col items-center space-y-2'>
              <div className='relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-300'>
                <img src='/avatars/1.jpg' alt='Avatar' className='object-cover w-full h-full' />
                <span className='absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer'>
                  <Camera size={16} />
                </span>
              </div>
              <p className='font-semibold text-lg'>admin</p>
              <p className='text-sm text-gray-500'>Nguyễn Tạ Quyền</p>
            </div>
          </Card>

          <Card className='p-3 space-y-2 shadow-lg'>
            <Button
              onClick={() => navigate(RoutePaths.AccountProfile)}
              variant='outline'
              className='w-full justify-start bg-purple-50 text-purple-600'
            >
              Thông tin tài khoản
            </Button>
            <Button
              onClick={() => navigate(RoutePaths.AccountChangePassword)}
              variant='outline'
              className='w-full justify-start bg-green-50 text-green-600'
            >
              Đổi mật khẩu
            </Button>
            <Button
              onClick={() => navigate(RoutePaths.AccountSettings)}
              variant='outline'
              className='w-full justify-start bg-blue-50 text-blue-600'
            >
              Cài đặt tài khoản
            </Button>
          </Card>
        </div>

        {/* Content */}
        <div className='md:col-span-3'>{children}</div>
      </div>
    </ContainerBox>
  );
}
