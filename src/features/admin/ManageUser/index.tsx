/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import type { IUser } from '@/types/accountType';
import { USER_ROLES, USER_ROLES_LABELS } from '@/constants/userRoles';
import useUserStore from '@/stores/userStore';
import userService from '@/services/userService';
import { toast } from 'react-toastify';
import ShowPointHistoryModal from './ShowPointHistoryModal';
import ShowTransactionHistoryModal from './ShowTransactionHistoryModal';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const {
    listUsers,
    currentUser,
    openModalDeleteUser,
    openModalCreateAndUpdateUser,
    openModalLockUser,
    setListUsers,
    setCurrentUser,
    setOpenModalCreateAndUpdateUser,
    setOpenModalDeleteUser,
    deleteUser,
    setOpenModalLockUser,
    updateUser,
    openModalShowPointHistory,
    setOpenModalShowPointHistory,
    openModalShowTransactionHistory,
    setOpenModalShowTransactionHistory,
  } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const filteredUsers = listUsers?.filter(
    (u) =>
      u.firstName?.toLowerCase()?.includes(search?.toLowerCase()) ||
      u.lastName?.toLowerCase()?.includes(search?.toLowerCase()) ||
      u.email?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  const fetchUsers = useCallback(async () => {
    try {
      const response = await userService.getUsers();
      if (response && response.statusCode === 200) {
        setListUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [setListUsers]);

  const handleCloseModalCreateAndUpdate = () => {
    setOpenModalCreateAndUpdateUser(false);
    setCurrentUser(null);
  };

  const handleOpenModalShowPointHistory = (user: IUser) => {
    setCurrentUser(user);
    setOpenModalShowPointHistory(true);
  };
  const handleCloseModalShowPointHistory = () => {
    setOpenModalShowPointHistory(false);
    setCurrentUser(null);
  };

  const handleOpenModalShowTransactionHistory = (user: IUser) => {
    setCurrentUser(user);
    setOpenModalShowTransactionHistory(true);
  };
  const handleCloseModalShowTransactionHistory = () => {
    setOpenModalShowTransactionHistory(false);
    setCurrentUser(null);
  };

  const handleOpenModal = useCallback(
    (data: IUser | null) => {
      setCurrentUser(data);
      setOpenModalCreateAndUpdateUser(true);
    },
    [setCurrentUser, setOpenModalCreateAndUpdateUser],
  );

  const handleOpenModalDeleteUser = (user: IUser) => {
    setCurrentUser(user);
    setOpenModalDeleteUser(true);
  };
  const handleCloseModalDeleteUser = () => {
    setOpenModalDeleteUser(false);
    setCurrentUser(null);
  };
  const handleOpenModalLockUser = (user: IUser) => {
    setCurrentUser(user);
    setOpenModalLockUser(true);
  };
  const handleCloseModalLockUser = () => {
    setOpenModalLockUser(false);
    setCurrentUser(null);
  };

  const handleConfirmDeleteUser = async () => {
    setIsLoading(true);
    try {
      if (currentUser) {
        const response = await userService.deleteUser(currentUser.id);
        if (response && response.statusCode === 200) {
          toast.success('Xoá tài khoản thành công');
          deleteUser(currentUser.id);
          handleCloseModalDeleteUser();
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

  const handleConfirmLockUser = async () => {
    setIsLoading(true);
    try {
      if (currentUser) {
        const response = await userService.updateUser(currentUser.id, {
          ...currentUser,
          isLocked: !currentUser.isLocked,
        });
        if (response && response.statusCode === 200) {
          toast.success(
            currentUser.isLocked ? 'Mở khoá tài khoản thành công' : 'Khoá tài khoản thành công',
          );
          updateUser(response.data);
          handleCloseModalLockUser();
        } else {
          toast.error(
            currentUser.isLocked ? 'Mở khoá tài khoản thất bại' : 'Khoá tài khoản thất bại',
          );
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
        render: (_: IUser, index: number) => index + 1,
      },
      {
        id: 'info',
        title: 'Thông tin người dùng',
        render: (user: IUser) => (
          <div className='flex items-center gap-3'>
            <Avatar className='w-9 h-9'>
              <AvatarImage src={user.avatar} alt={user.firstName} />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium text-gray-900 dark:text-gray-100'>
                {user.firstName} {user.lastName}
              </div>
              <div className='text-sm text-gray-500'>{user.userName}</div>
            </div>
          </div>
        ),
      },
      {
        id: 'role',
        title: 'Phân quyền',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (user: IUser) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium 
        ${
          user.role === USER_ROLES.ADMIN
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300'
            : 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'
        }`}
          >
            {USER_ROLES_LABELS[user.role]}
          </span>
        ),
      },
      {
        id: 'status',
        title: 'Trạng thái',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (user: IUser) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium 
        ${
          !user.isLocked
            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300'
            : 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300'
        }`}
          >
            {user.isLocked ? 'Đã bị khoá' : 'Đang hoạt động'}
          </span>
        ),
      },
      {
        id: 'createdAt',
        title: 'Ngày tạo',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (user: IUser) => user.createdAt,
      },
      {
        id: 'actions',
        title: 'Tác vụ',
        headerClass: 'text-right',
        cellClass: 'text-right',
        render: (item: IUser) => (
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
                onClick={() => handleOpenModalShowPointHistory(item)}
                className='flex items-center gap-2'
              >
                <Eye className='w-4 h-4 text-blue-500' />
                <span>Thống kê lịch sử điểm</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenModalShowTransactionHistory(item)}
                className='flex items-center gap-2'
              >
                <Eye className='w-4 h-4 text-blue-500' />
                <span>Thống kê lịch sử giao dịch</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenModal(item)}
                className='flex items-center gap-2'
              >
                <Edit className='w-4 h-4 text-green-500' />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenModalLockUser(item)}
                className='flex items-center gap-2'
              >
                <Lock className='w-4 h-4 text-yellow-500' />
                <span>{item.isLocked ? 'Mở khoá tài khoản' : 'Khoá tài khoản'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenModalDeleteUser(item)}
                className='flex items-center gap-2'
              >
                <Trash className='w-4 h-4 text-red-500' />
                <span>Xoá tài khoản</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, [handleOpenModal, handleOpenModalDeleteUser, handleOpenModalLockUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

      <TableCustom data={filteredUsers ?? []} columns={columns} />
      <ModalConfirm
        isConfirming={isLoading}
        open={openModalDeleteUser}
        onClose={handleCloseModalDeleteUser}
        onConfirm={handleConfirmDeleteUser}
        title='Xoá tài khoản'
        description='Bạn có chắc chắn muốn xoá tài khoản này không?'
        type='delete'
      />
      <ModalConfirm
        isConfirming={isLoading}
        open={openModalLockUser}
        onClose={handleCloseModalLockUser}
        onConfirm={handleConfirmLockUser}
        title={currentUser?.isLocked ? 'Mở khoá tài khoản' : 'Khoá tài khoản'}
        description={
          currentUser?.isLocked
            ? 'Bạn có chắc chắn muốn mở khoá tài khoản này không?'
            : 'Bạn có chắc chắn muốn khoá tài khoản này không?'
        }
        type='lock'
      />
      <CreateAndUpdateUserModal
        open={openModalCreateAndUpdateUser}
        onClose={handleCloseModalCreateAndUpdate}
        currentUser={currentUser}
      />
      <ShowPointHistoryModal
        open={openModalShowPointHistory}
        onClose={handleCloseModalShowPointHistory}
        isLoading={isLoading}
        currentUser={currentUser as IUser} // Ensure currentUser is of type IUser
      />
      <ShowTransactionHistoryModal
        open={openModalShowTransactionHistory}
        onClose={handleCloseModalShowTransactionHistory}
        isLoading={isLoading}
        currentUser={currentUser as IUser} // Ensure currentUser is of type IUser
      />
    </CardScroll>
  );
};

export default UserManagement;
