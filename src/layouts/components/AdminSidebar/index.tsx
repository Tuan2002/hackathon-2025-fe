import { ADMIN_MENU_ITEMS } from '@/constants/menuItems';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='w-full h-full bg-white dark:bg-black border-r dark:border-gray-800 shadow-sm flex flex-col duration-300'>
      {/* Sidebar Menu */}
      <nav className='flex-1 overflow-y-auto p-4 space-y-2'>
        {ADMIN_MENU_ITEMS.map((item) => (
          <NavLink
            to={item.path || ''}
            key={item.id}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 text-sm font-medium rounded-lg  ${
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`
            }
          >
            {item.icon && <item.icon className='w-5 h-5' />}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
