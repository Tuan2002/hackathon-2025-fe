import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Edit, Trash, MoreVertical, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CardScroll from '@/components/customs/CardScroll';
import TableCustom from '@/components/customs/TableCustom';
import { ADMIN_MENU_ITEMS, type MenuItem } from '@/constants/menuItems';
import CreateAndUpdateMenuModal from './CreateAndUpdateMenuModal';

const ManageMenu = () => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuItem | null>(null);

  const handleOpenModal = (menu: MenuItem | null) => {
    setCurrentMenu(menu);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentMenu(null);
  };

  const columns = useMemo(() => {
    return [
      {
        id: 'stt',
        title: 'STT',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (_: MenuItem, index: number) => index + 1,
      },
      {
        id: 'icon',
        title: 'Icon',
        headerClass: 'text-center',
        render: (category: MenuItem) => {
          const Icon = category.icon;
          return (
            <div className='flex items-center justify-center gap-3'>
              {Icon && <Icon className='w-5 h-5 text-gray-700 dark:text-gray-300' />}
            </div>
          );
        },
      },
      {
        id: 'name',
        title: 'Tên danh mục',
        headerClass: 'text-center',
        render: (category: MenuItem) => (
          <div className='flex items-center justify-center gap-3'>
            <span>{category.title}</span>
          </div>
        ),
      },
      {
        id: 'description',
        title: 'Đường dẫn',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (category: MenuItem) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>{category.path || 'Chưa có thông tin'}</span>
          </div>
        ),
      },

      {
        id: 'actions',
        title: 'Tác vụ',
        headerClass: 'text-right',
        cellClass: 'text-right',
        render: (item: MenuItem) => (
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
              <DropdownMenuItem
                onClick={() => handleOpenModal(item)}
                className='flex items-center gap-2'
              >
                <Edit className='w-4 h-4 text-green-500' />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>

              <DropdownMenuItem className='flex items-center gap-2'>
                <Trash className='w-4 h-4 text-red-500' />
                <span>Xoá danh mục</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, []);

  return (
    <CardScroll title='Quản lý điều hướng trang'>
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
        <Button onClick={() => handleOpenModal(null)}>
          <Plus className='w-4 h-4 mr-2' /> Thêm mới
        </Button>
      </div>

      <TableCustom data={ADMIN_MENU_ITEMS} columns={columns} />
      <CreateAndUpdateMenuModal
        open={openModal}
        onClose={handleCloseModal}
        currentMenu={currentMenu}
      />
    </CardScroll>
  );
};

export default ManageMenu;
