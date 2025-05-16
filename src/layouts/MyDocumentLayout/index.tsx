import { NavLink } from 'react-router-dom';
import AccountLayout from '../AccountLayout';
import { Card } from '@/components/ui/card';
import RoutePaths from '@/routes/routePaths';

interface MyDocumentLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Tài liệu của tôi', path: RoutePaths.MyDocuments },
  { label: 'Đang chờ duyệt', path: RoutePaths.MyPendingDocuments },
  { label: 'Tải tài liệu lên', path: RoutePaths.UploadDocument },
  { label: 'Tài liệu đã lưu', path: RoutePaths.MyDownloadDocuments },
  { label: 'Tài liệu đã tải về', path: RoutePaths.MySavedDocuments },
];

const MyDocumentLayout = ({ children }: MyDocumentLayoutProps) => {
  return (
    <AccountLayout>
      <Card className='h-[calc(100vh-120px)] shadow-lg space-y-6 relative'>
        <div
          className='flex flex-wrap gap-3 items-center justify-center absolute top-0 left-0 w-full py-3 bg-white dark:bg-gray-700 dark:border-b-gray-500 border-b-2 border-b-gray-200'
          style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition 
                   ${
                     isActive
                       ? 'bg-purple-600 text-white hover:text-white'
                       : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                   }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className='h-[calc(100%-30px)] pt-14 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-200 px-2'>
          {children}
        </div>
      </Card>
    </AccountLayout>
  );
};

export default MyDocumentLayout;
