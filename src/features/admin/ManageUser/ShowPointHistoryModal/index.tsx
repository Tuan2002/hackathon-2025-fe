import ModalCustom from '@/components/customs/ModalCustom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { POINT_ACTIONS } from '@/constants/pointActions';
import userService from '@/services/userService';
import useUserStore from '@/stores/userStore';
import type { IUser } from '@/types/accountType';
import type { IUserPoint } from '@/types/userType';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { BsCoin } from 'react-icons/bs';

interface ShowPointHistoryModalProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  currentUser?: IUser; // Replace with the actual type
}
const ShowPointHistoryModal = ({
  open,
  onClose,
  isLoading,
  currentUser,
}: ShowPointHistoryModalProps) => {
  const { listPointHistory, setListPointHistory } = useUserStore();
  useEffect(() => {
    const fetchPointHistory = async () => {
      if (!currentUser) return;
      try {
        const response = await userService.getUserPointHistory(currentUser?.id);
        if (response && response.statusCode === 200) {
          setListPointHistory(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch point history:', error);
      }
    };
    fetchPointHistory();
  }, [currentUser, setListPointHistory]);
  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      isConfirming={isLoading}
      title={'Thống kê lịch sử giao dịch'}
      size='4xl'
      showHeader={true}
      showFooter={false}
    >
      <table className='w-full table-auto border border-gray-300 dark:border-gray-600 text-left'>
        <thead>
          <tr className='bg-gray-100 dark:bg-gray-700'>
            <th className='p-3 border-b dark:border-gray-600'>Người dùng</th>
            <th className='p-3 border-b dark:border-gray-600 text-center'>Thời gian</th>
            <th className='p-3 border-b dark:border-gray-600 text-center'>Số điểm</th>
            <th className='p-3 border-b dark:border-gray-600'>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {listPointHistory.length > 0 ? (
            listPointHistory.map((item: IUserPoint) => (
              <tr key={item.id} className='hover:bg-gray-50 dark:hover:bg-gray-800'>
                <td className='p-3 flex items-center gap-2'>
                  <Avatar>
                    <AvatarImage src={item?.avatar} alt='@shadcn' />
                    <AvatarFallback>{'U'}</AvatarFallback>
                  </Avatar>
                  <span>{item.userName ?? 'Nguyễn Tạ Quyền'}</span>
                </td>
                <td className='p-3 text-center'>
                  <span>{dayjs(new Date(item.createdAt)).format('HH:mm')}</span> <br />{' '}
                  <span>{dayjs(new Date(item.createdAt)).format('DD/MM/YYYY')}</span>
                </td>
                <td className='p-3 font-semibold text-center'>
                  <span
                    className={clsx(
                      'px-2 py-1 inline-flex items-center justify-center text-sm font-medium min-w-20 rounded-full',
                      item.pointAction === POINT_ACTIONS.INCREASE
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700',
                    )}
                  >
                    {item.pointAction === POINT_ACTIONS.INCREASE
                      ? `+${item.amount}`
                      : `-${item.amount}`}
                    <BsCoin className='ml-1' size={12} />
                  </span>
                </td>
                <td className='p-3'>{item.note}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className='p-5 text-center text-gray-500 italic'>
                Chưa có giao dịch nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </ModalCustom>
  );
};

export default ShowPointHistoryModal;
