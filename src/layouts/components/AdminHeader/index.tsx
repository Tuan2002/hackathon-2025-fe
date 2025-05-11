import { ModeToggle } from '../ModeToogle';
import UserMenu from '../UserMenu';

const AdminHeader = () => {
  return (
    <div className='h-[70px] p-2 flex items-center justify-between border-b-[0.5px] border-b-gray-200 dark:border-b-gray-700'>
      <div>
        <h1 className='text-2xl font-bold'>Trang quản trị</h1>
      </div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
        <UserMenu />
      </div>
    </div>
  );
};

export default AdminHeader;
