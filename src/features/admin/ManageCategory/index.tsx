/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Edit, Trash, MoreVertical, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CardScroll from '@/components/customs/CardScroll';
import TableCustom from '@/components/customs/TableCustom';
import ModalConfirm from '@/components/customs/ModalConfirm';
import CreateAndUpdateUserModal from './CreateAndUpdateCategoryModal';
import { toast } from 'react-toastify';
import useCategoryStore from '@/stores/categoryStore';
import CategoryService from '@/services/categoryService';
import type { ICategory } from '@/types/categoryType';

const ManageCategory = () => {
  const [search, setSearch] = useState('');
  const {
    listCategories,
    currentCategory,
    openModalDeleteCategory,
    openModalCreateAndUpdateCategory,
    setListCategories,
    setCurrentCategory,
    setOpenModalCreateAndUpdateCategory,
    setOpenModalDeleteCategory,
    deleteCategory,
  } = useCategoryStore();
  const [isLoading, setIsLoading] = useState(false);

  const filteredCategories = listCategories?.filter((u) =>
    u.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await CategoryService.getCategories();
      if (response && response.statusCode === 200) {
        setListCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [setListCategories]);

  const handleCloseModalCreateAndUpdate = () => {
    setOpenModalCreateAndUpdateCategory(false);
    setCurrentCategory(null);
  };

  const handleOpenModal = useCallback(
    (data: ICategory | null) => {
      setCurrentCategory(data);
      setOpenModalCreateAndUpdateCategory(true);
    },
    [setCurrentCategory, setOpenModalCreateAndUpdateCategory],
  );

  const handleOpenModalDeleteCategory = (category: ICategory) => {
    setCurrentCategory(category);
    setOpenModalDeleteCategory(true);
  };
  const handleCloseModalDeleteCategory = () => {
    setOpenModalDeleteCategory(false);
    setCurrentCategory(null);
  };

  const handleConfirmDeleteCategory = async () => {
    setIsLoading(true);
    try {
      if (currentCategory) {
        const response = await CategoryService.deleteCategory(currentCategory.id);
        if (response && response.statusCode === 200) {
          toast.success('Xoá tài khoản thành công');
          deleteCategory(currentCategory.id);
          handleCloseModalDeleteCategory();
        } else {
          toast.error('Xoá tài khoản thất bại');
        }
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        id: 'stt',
        title: 'STT',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (_: ICategory, index: number) => index + 1,
      },
      {
        id: 'name',
        title: 'Tên danh mục',
        headerClass: 'text-center',
        render: (category: ICategory) => (
          <div className='flex items-center justify-center gap-3'>
            <span>{category.name}</span>
          </div>
        ),
      },
      {
        id: 'description',
        title: 'Thông tin mô tả',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (category: ICategory) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>
              {category.description || 'Chưa có thông tin'}
            </span>
          </div>
        ),
      },

      {
        id: 'createdAt',
        title: 'Ngày tạo',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (user: ICategory) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>
              {new Date(user.createdAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        title: 'Tác vụ',
        headerClass: 'text-right',
        cellClass: 'text-right',
        render: (item: ICategory) => (
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

              <DropdownMenuItem
                onClick={() => handleOpenModalDeleteCategory(item)}
                className='flex items-center gap-2'
              >
                <Trash className='w-4 h-4 text-red-500' />
                <span>Xoá danh mục</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, [handleOpenModal, handleOpenModalDeleteCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
        <Button onClick={() => handleOpenModal(null)}>
          <Plus className='w-4 h-4 mr-2' /> Thêm mới
        </Button>
      </div>

      <TableCustom data={filteredCategories ?? []} columns={columns} />
      <ModalConfirm
        isConfirming={isLoading}
        open={openModalDeleteCategory}
        onClose={handleCloseModalDeleteCategory}
        onConfirm={handleConfirmDeleteCategory}
        title='Xoá danh mục'
        description='Bạn có chắc chắn muốn xoá danh mục này không?'
        type='delete'
      />

      <CreateAndUpdateUserModal
        open={openModalCreateAndUpdateCategory}
        onClose={handleCloseModalCreateAndUpdate}
        currentCategory={currentCategory}
      />
    </CardScroll>
  );
};

export default ManageCategory;
