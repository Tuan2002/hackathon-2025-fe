import RoutePaths from '@/routes/routePaths';
import type { IconType } from 'react-icons';
import { BiSolidUser } from 'react-icons/bi';

interface MenuItem {
  id: string;
  title: string;
  icon?: IconType;
  path?: string;
}

export const USER_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    title: 'Trang cá nhân',
    icon: BiSolidUser,
    path: RoutePaths.AccountProfile,
  },
  {
    id: '2',
    title: 'Lịch sử giao dịch',
    icon: BiSolidUser,
  },
  {
    id: '3',
    title: 'Cài đặt',
    icon: BiSolidUser,
    path: RoutePaths.AccountSettings,
  },
  {
    id: '4',
    title: 'Đổi mật khẩu',
    icon: BiSolidUser,
    path: RoutePaths.AccountChangePassword,
  },
];

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: BiSolidUser,
    path: RoutePaths.AdminDashboard,
  },
  {
    id: '2',
    title: 'Quản lý người dùng',
    icon: BiSolidUser,
    path: RoutePaths.ManageUser,
  },
  {
    id: '3',
    title: 'Quản lý danh mục',
    icon: BiSolidUser,
    path: RoutePaths.ManageCategory,
  },
  {
    id: '4',
    title: 'Quản lý nhà xuất bản',
    icon: BiSolidUser,
    path: RoutePaths.ManagePublisher,
  },
  {
    id: '5',
    title: 'Quản lý tác giả',
    icon: BiSolidUser,
    path: RoutePaths.ManageAuthor,
  },
  {
    id: '6',
    title: 'Quản lý phản hồi',
    icon: BiSolidUser,
  },
  {
    id: '7',
    title: 'Quản lý giao dịch',
    icon: BiSolidUser,
  },
];

export const NAVBAR_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    title: 'Trang chủ',
    icon: BiSolidUser,
    path: RoutePaths.Home,
  },
  {
    id: '2',
    title: 'Giới thiệu',
    icon: BiSolidUser,
    path: RoutePaths.About,
  },
  {
    id: '3',
    title: 'Thư viện điện tử',
    icon: BiSolidUser,
    path: RoutePaths.Document,
  },
  {
    id: '4',
    title: 'Tin tức',
    icon: BiSolidUser,
    path: RoutePaths.News,
  },
];
