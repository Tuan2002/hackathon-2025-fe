'use client';

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
import CreateAndUpdateAuthorModal from './CreateAndUpdateAuthorModal';
import { toast } from 'react-toastify';
import useAuthorStore from '@/stores/authorStore';
import AuthorService from '@/services/authorService';
import type { IAuthor } from '@/types/authorType';

const ManageAuthor = () => {
  const [search, setSearch] = useState('');
  const {
    listAuthors,
    currentAuthor,
    openModalDeleteAuthor,
    openModalCreateAndUpdateAuthor,
    setListAuthors,
    setCurrentAuthor,
    setOpenModalCreateAndUpdateAuthor,
    setOpenModalDeleteAuthor,
    deleteAuthor,
  } = useAuthorStore();

  const [isLoading, setIsLoading] = useState(false);

  const filteredAuthors = listAuthors?.filter((a) =>
    a.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const fetchAuthors = useCallback(async () => {
    try {
      const response = await AuthorService.getAuthors();
      if (response && response.statusCode === 200) {
        setListAuthors(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  }, [setListAuthors]);

  const handleCloseModalCreateAndUpdate = () => {
    setOpenModalCreateAndUpdateAuthor(false);
    setCurrentAuthor(null);
  };

  const handleOpenModal = useCallback(
    (data: IAuthor | null) => {
      setCurrentAuthor(data);
      setOpenModalCreateAndUpdateAuthor(true);
    },
    [setCurrentAuthor, setOpenModalCreateAndUpdateAuthor],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpenModalDeleteAuthor = (author: IAuthor) => {
    setCurrentAuthor(author);
    setOpenModalDeleteAuthor(true);
  };
  const handleCloseModalDeleteAuthor = () => {
    setOpenModalDeleteAuthor(false);
    setCurrentAuthor(null);
  };

  const handleConfirmDeleteAuthor = async () => {
    setIsLoading(true);
    try {
      if (currentAuthor) {
        const response = await AuthorService.deleteAuthor(currentAuthor.id);
        if (response && response.statusCode === 200) {
          toast.success('Xoá tác giả thành công');
          deleteAuthor(currentAuthor.id);
          handleCloseModalDeleteAuthor();
        } else {
          toast.error('Xoá tác giả thất bại');
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
        render: (_: IAuthor, index: number) => index + 1,
      },
      {
        id: 'name',
        title: 'Tên tác giả',
        headerClass: 'text-center',
        render: (author: IAuthor) => (
          <div className='flex items-center justify-center gap-3'>
            <span>{author.name}</span>
          </div>
        ),
      },
      {
        id: 'email',
        title: 'Email',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (author: IAuthor) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm'>{author.email}</span>
          </div>
        ),
      },
      {
        id: 'phone',
        title: 'Số điện thoại',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (author: IAuthor) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm'>{author.phone}</span>
          </div>
        ),
      },
      {
        id: 'address',
        title: 'Địa chỉ',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (author: IAuthor) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>{author.address}</span>
          </div>
        ),
      },
      {
        id: 'createdAt',
        title: 'Ngày tạo',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (author: IAuthor) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>
              {new Date(author.createdAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        title: 'Tác vụ',
        headerClass: 'text-right',
        cellClass: 'text-right',
        render: (item: IAuthor) => (
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
                onClick={() => handleOpenModalDeleteAuthor(item)}
                className='flex items-center gap-2'
              >
                <Trash className='w-4 h-4 text-red-500' />
                <span>Xoá</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, [handleOpenModal, handleOpenModalDeleteAuthor]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return (
    <CardScroll title='Danh sách tác giả'>
      <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Tìm kiếm tác giả...'
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

      <TableCustom data={filteredAuthors ?? []} columns={columns} />
      <ModalConfirm
        isConfirming={isLoading}
        open={openModalDeleteAuthor}
        onClose={handleCloseModalDeleteAuthor}
        onConfirm={handleConfirmDeleteAuthor}
        title='Xoá tác giả'
        description='Bạn có chắc chắn muốn xoá tác giả này không?'
        type='delete'
      />
      <CreateAndUpdateAuthorModal
        open={openModalCreateAndUpdateAuthor}
        onClose={handleCloseModalCreateAndUpdate}
        currentAuthor={currentAuthor}
      />
    </CardScroll>
  );
};

export default ManageAuthor;
