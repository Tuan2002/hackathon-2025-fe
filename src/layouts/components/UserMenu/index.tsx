import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BsColumnsGap } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BiLogOut } from 'react-icons/bi';
import { USER_MENU_ITEMS } from '@/constants/menuItems';
import { useNavigate } from 'react-router-dom';
import useAccountStore from '@/stores/accountStore';
import RoutePaths from '@/routes/routePaths';
import { USER_ROLES } from '@/constants/userRoles';
const UserMenu = () => {
  const { currentUser, setCurrentUser, setAccessToken } = useAccountStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Handle logout logic here
    setCurrentUser(null); // Clear user data
    setAccessToken(''); // Clear access token
    localStorage.removeItem('accessToken'); // Remove access token from local storage
    navigate(RoutePaths.Login); // Redirect to login page after logout
  };
  const handleClickMenuItem = (href: string) => {
    // Handle menu item click logic here
    console.log('Menu item clicked:', href);
    navigate(href);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='cursor-pointer'>
        <Avatar>
          <AvatarImage src={currentUser?.avatar ?? 'https://github.com/shadcn.png'} alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mr-2 mt-2'>
        <DropdownMenuLabel>
          <div className='h-16 flex items-center'>
            <div>
              <Avatar>
                <AvatarImage
                  src={currentUser?.avatar ?? 'https://github.com/shadcn.png'}
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='ml-2'>
              <p>
                {currentUser?.firstName} {currentUser?.lastName}
              </p>
              <span className='font-thin'>{currentUser?.userName}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {currentUser?.role === USER_ROLES.ADMIN && (
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => handleClickMenuItem(RoutePaths.AdminDashboard)}
            >
              <BsColumnsGap className='mr-2' />
              Trang quản trị
            </DropdownMenuItem>
          )}
          {USER_MENU_ITEMS.map((item) => (
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => handleClickMenuItem(item.path || '')}
              key={item.id}
            >
              {item.icon && <item.icon className='mr-2' />}
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className='text-red-500 cursor-pointer'>
          <BiLogOut className='mr-2' />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
