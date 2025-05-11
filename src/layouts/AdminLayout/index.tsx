import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <AdminHeader />
      <div className='flex gap-4 flex-1'>
        <div className='max-w-[250px] w-full h-full'>
          <AdminSidebar />
        </div>
        <div className='flex-1 h-[calc(100vh-70px)] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-200 p-2'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
