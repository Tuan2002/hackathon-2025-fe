import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Edit, Lock, Trash, MoreVertical, Plus, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import CardScroll from '@/components/customs/CardScroll';
import TableCustom from '@/components/customs/TableCustom';
import ModalConfirm from '@/components/customs/ModalConfirm';
import CreateAndUpdateUserModal from './CreateAndUpdateUserModal';

interface User {
  id: number;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const users: User[] = [
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/100?img=1',
    firstname: 'Quyền',
    lastname: 'Nguyễn',
    email: 'quyen@gmail.com',
    role: 'Quản trị viên',
    status: 'Đang hoạt động',
    lastLogin: '2025-05-10 22:30',
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/100?img=2',
    firstname: 'Linh',
    lastname: 'Trần',
    email: 'linhtran@gmail.com',
    role: 'Người dùng',
    status: 'Đã bị khoá',
    lastLogin: '2025-05-09 19:00',
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/100?img=1',
    firstname: 'Quyền',
    lastname: 'Nguyễn',
    email: 'quyen@gmail.com',
    role: 'Quản trị viên',
    status: 'Đang hoạt động',
    lastLogin: '2025-05-10 22:30',
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/100?img=2',
    firstname: 'Linh',
    lastname: 'Trần',
    email: 'linhtran@gmail.com',
    role: 'Người dùng',
    status: 'Đã bị khoá',
    lastLogin: '2025-05-09 19:00',
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/100?img=1',
    firstname: 'Quyền',
    lastname: 'Nguyễn',
    email: 'quyen@gmail.com',
    role: 'Quản trị viên',
    status: 'Đang hoạt động',
    lastLogin: '2025-05-10 22:30',
  },
];

const columns = [
  {
    id: 'stt',
    title: 'STT',
    headerClass: 'text-center',
    cellClass: 'text-center',
    render: (_: User, index: number) => index + 1,
  },
  {
    id: 'info',
    title: 'Thông tin người dùng',
    render: (user: User) => (
      <div className='flex items-center gap-3'>
        <Avatar className='w-9 h-9'>
          <AvatarImage src={user.avatar} alt={user.firstname} />
          <AvatarFallback>
            {user.firstname[0]}
            {user.lastname[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className='font-medium text-gray-900 dark:text-gray-100'>
            {user.firstname} {user.lastname}
          </div>
          <div className='text-sm text-gray-500'>{user.email}</div>
        </div>
      </div>
    ),
  },
  {
    id: 'role',
    title: 'Phân quyền',
    headerClass: 'text-center',
    cellClass: 'text-center',
    render: (user: User) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium 
        ${
          user.role === 'Quản trị viên'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300'
            : 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'
        }`}
      >
        {user.role}
      </span>
    ),
  },
  {
    id: 'status',
    title: 'Trạng thái',
    headerClass: 'text-center',
    cellClass: 'text-center',
    render: (user: User) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium 
        ${
          user.status === 'Đang hoạt động'
            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'
            : 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300'
        }`}
      >
        {user.status}
      </span>
    ),
  },
  {
    id: 'lastLogin',
    title: 'Lần đăng nhập cuối',
    headerClass: 'text-center',
    cellClass: 'text-center',
    render: (user: User) => user.lastLogin,
  },
  {
    id: 'actions',
    title: 'Tác vụ',
    headerClass: 'text-right',
    cellClass: 'text-right',
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon'>
            <MoreVertical className='w-5 h-5 text-gray-700 dark:text-gray-300' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-48'>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Eye className='w-4 h-4 text-blue-500' />
            <span>Xem chi tiết</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Edit className='w-4 h-4 text-green-500' />
            <span>Chỉnh sửa</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Lock className='w-4 h-4 text-yellow-500' />
            <span>Khoá tài khoản</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Trash className='w-4 h-4 text-red-500' />
            <span>Xoá tài khoản</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const UserManagement = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.firstname.toLowerCase().includes(search.toLowerCase()) ||
      u.lastname.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <CardScroll title='Danh sách người dùng'>
      <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Tìm kiếm người dùng...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-64'
          />
          <Button variant='outline' size='icon'>
            <Search className='w-4 h-4' />
          </Button>
        </div>
        <Button>
          <Plus className='w-4 h-4 mr-2' /> Thêm mới
        </Button>
      </div>

      <TableCustom data={filteredUsers} columns={columns} />
      <ModalConfirm
        open={false}
        onClose={() => {}}
        onConfirm={() => {}}
        title='Xoá tài khoản'
        description='Bạn có chắc chắn muốn xoá tài khoản này không?'
        type='delete'
      />
      <ModalConfirm
        open={false}
        onClose={() => {}}
        onConfirm={() => {}}
        title='Khoá tài khoản'
        description='Bạn có chắc chắn muốn khoá tài khoản này không?'
        type='lock'
      />
      <CreateAndUpdateUserModal open={false} onClose={() => {}} onSubmit={() => {}} />
    </CardScroll>
  );
};

export default UserManagement;
