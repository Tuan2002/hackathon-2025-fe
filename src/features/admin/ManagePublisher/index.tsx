/* eslint-disable react-hooks/exhaustive-deps */
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
import CreateAndUpdatePublisherModal from './CreateAndUpdatePublisherModal';
import { toast } from 'react-toastify';
import usePublisherStore from '@/stores/publisherStore';
import PublisherService from '@/services/publisherService';
import type { IPublisher } from '@/types/publisherType';

const ManagePublisher = () => {
  const [search, setSearch] = useState('');
  const {
    listPublishers,
    currentPublisher,
    openModalDeletePublisher,
    openModalCreateAndUpdatePublisher,
    setListPublishers,
    setCurrentPublisher,
    setOpenModalCreateAndUpdatePublisher,
    setOpenModalDeletePublisher,
    deletePublisher,
  } = usePublisherStore();

  const [isLoading, setIsLoading] = useState(false);

  const filteredPublishers = listPublishers?.filter((p) =>
    p.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const fetchPublishers = useCallback(async () => {
    try {
      const response = await PublisherService.getPublishers();
      if (response && response.statusCode === 200) {
        setListPublishers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch publishers:', error);
    }
  }, [setListPublishers]);

  const handleCloseModalCreateAndUpdate = () => {
    setOpenModalCreateAndUpdatePublisher(false);
    setCurrentPublisher(null);
  };

  const handleOpenModal = useCallback(
    (data: IPublisher | null) => {
      setCurrentPublisher(data);
      setOpenModalCreateAndUpdatePublisher(true);
    },
    [setCurrentPublisher, setOpenModalCreateAndUpdatePublisher],
  );

  const handleOpenModalDeletePublisher = (publisher: IPublisher) => {
    setCurrentPublisher(publisher);
    setOpenModalDeletePublisher(true);
  };
  const handleCloseModalDeletePublisher = () => {
    setOpenModalDeletePublisher(false);
    setCurrentPublisher(null);
  };

  const handleConfirmDeletePublisher = async () => {
    setIsLoading(true);
    try {
      if (currentPublisher) {
        const response = await PublisherService.deletePublisher(currentPublisher.id);
        if (response && response.statusCode === 200) {
          toast.success('Xoá nhà xuất bản thành công');
          deletePublisher(currentPublisher.id);
          handleCloseModalDeletePublisher();
        } else {
          toast.error('Xoá nhà xuất bản thất bại');
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
        render: (_: IPublisher, index: number) => index + 1,
      },
      {
        id: 'name',
        title: 'Tên nhà xuất bản',
        headerClass: 'text-center',
        render: (publisher: IPublisher) => (
          <div className='flex items-center justify-center gap-3'>
            <span>{publisher.name}</span>
          </div>
        ),
      },
      {
        id: 'email',
        title: 'Email',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (publisher: IPublisher) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm'>{publisher.email}</span>
          </div>
        ),
      },
      {
        id: 'phone',
        title: 'Số điện thoại',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (publisher: IPublisher) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm'>{publisher.phone}</span>
          </div>
        ),
      },
      {
        id: 'address',
        title: 'Địa chỉ',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (publisher: IPublisher) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>{publisher.address}</span>
          </div>
        ),
      },
      {
        id: 'createdAt',
        title: 'Ngày tạo',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (publisher: IPublisher) => (
          <div className='flex items-center justify-center gap-3'>
            <span className='text-sm text-gray-500'>
              {new Date(publisher.createdAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        ),
      },
      {
        id: 'actions',
        title: 'Tác vụ',
        headerClass: 'text-right',
        cellClass: 'text-right',
        render: (item: IPublisher) => (
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
                onClick={() => handleOpenModalDeletePublisher(item)}
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
  }, [handleOpenModal, handleOpenModalDeletePublisher]);

  useEffect(() => {
    fetchPublishers();
  }, [fetchPublishers]);

  return (
    <CardScroll title='Danh sách nhà xuất bản'>
      <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Tìm kiếm nhà xuất bản...'
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

      <TableCustom data={filteredPublishers ?? []} columns={columns} />
      <ModalConfirm
        isConfirming={isLoading}
        open={openModalDeletePublisher}
        onClose={handleCloseModalDeletePublisher}
        onConfirm={handleConfirmDeletePublisher}
        title='Xoá nhà xuất bản'
        description='Bạn có chắc chắn muốn xoá nhà xuất bản này không?'
        type='delete'
      />
      <CreateAndUpdatePublisherModal
        open={openModalCreateAndUpdatePublisher}
        onClose={handleCloseModalCreateAndUpdate}
        currentPublisher={currentPublisher}
      />
    </CardScroll>
  );
};

export default ManagePublisher;
