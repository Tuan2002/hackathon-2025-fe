import React from 'react';
import { ModeToggle } from '../ModeToogle';
import UserMenu from '../UserMenu';
import ContainerBox from '@/components/customs/ContainerBox';
import { NAVBAR_MENU_ITEMS } from '@/constants/menuItems';
import { Link, NavLink } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';
import getAccessToken from '@/utils/getAccessToken';

const MainHeader: React.FC = () => {
  const accessToken = getAccessToken();
  return (
    <header className='h-[70px] border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-sm'>
      <ContainerBox>
        <div className='h-full flex items-center justify-between px-4'>
          {/* Logo & Menu */}
          <div className='flex items-center gap-6 h-[64px]'>
            <Link
              to={RoutePaths.Home}
              className=' text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center hover:text-gray-900 dark:hover:text-white leading-4'
            >
              SENSE <br className='hidden sm:block' /> <span className='text-sm'>LIBRARY</span>
            </Link>

            {/* Divider */}
            <div className='w-[2px] h-10 bg-gray-300 dark:bg-gray-600'></div>

            {/* Menu */}
            <nav className='hidden md:flex items-center gap-6'>
              {NAVBAR_MENU_ITEMS.map((item) => (
                <NavLink
                  to={item.path || ''}
                  key={item.id}
                  className={({ isActive }) =>
                    `text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300'
                    } hover:text-blue-500`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-3'>
            <ModeToggle />
            {accessToken ? (
              <UserMenu />
            ) : (
              <Link
                to={RoutePaths.Login}
                className='text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500'
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </ContainerBox>
    </header>
  );
};

export default MainHeader;
