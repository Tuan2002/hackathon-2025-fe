import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
const UserMenu = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
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
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 mr-2 mt-2'>
        <DropdownMenuLabel>
          <div className='h-16 flex items-center'>
            <div>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='ml-2'>
              <p>Nguyen Ta Quyen</p>
              <span className='font-thin'>ta2k3quyen@gmail.com</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
