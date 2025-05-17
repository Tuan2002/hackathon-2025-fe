import RoutePaths from '@/routes/routePaths';
import type { IconType } from 'react-icons';
import {
  BiBorderInner,
  BiBrain,
  BiBuildingHouse,
  BiCabinet,
  BiKey,
  BiSolidUser,
  BiTransfer,
  BiUser,
  BiUserCircle,
  BiWrench,
} from 'react-icons/bi';

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
    icon: BiUserCircle,
    path: RoutePaths.AccountProfile,
  },
  {
    id: '2',
    title: 'Lịch sử giao dịch',
    icon: BiTransfer,
  },
  {
    id: '3',
    title: 'Cài đặt',
    icon: BiWrench,
    path: RoutePaths.AccountSettings,
  },
  {
    id: '4',
    title: 'Đổi mật khẩu',
    icon: BiKey,
    path: RoutePaths.AccountChangePassword,
  },
];

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: BiBorderInner,
    path: RoutePaths.AdminDashboard,
  },
  {
    id: '2',
    title: 'Quản lý người dùng',
    icon: BiUser,
    path: RoutePaths.ManageUser,
  },
  {
    id: '3',
    title: 'Quản lý danh mục',
    icon: BiCabinet,
    path: RoutePaths.ManageCategory,
  },
  {
    id: '4',
    title: 'Quản lý nhà xuất bản',
    icon: BiBuildingHouse,
    path: RoutePaths.ManagePublisher,
  },
  {
    id: '5',
    title: 'Quản lý tác giả',
    icon: BiBrain,
    path: RoutePaths.ManageAuthor,
  },
  {
    id: '6',
    title: 'Quản lý tài liệu',
    icon: BiSolidUser,
    path: RoutePaths.ManageDocument,
  },
  {
    id: '7',
    title: 'Quản lý liên hệ',
    icon: BiSolidUser,
    path: RoutePaths.ManageContact,
  },
  {
    id: '8',
    title: 'Quản lý phản hồi',
    icon: BiSolidUser,
    path: RoutePaths.ManageFeedback,
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
