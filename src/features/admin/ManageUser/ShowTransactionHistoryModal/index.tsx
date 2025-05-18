import ModalCustom from '@/components/customs/ModalCustom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TransactionStatusColor, TransactionStatusLabel } from '@/constants/transactionStatus';
import userService from '@/services/userService';
import useUserStore from '@/stores/userStore';
import type { IUser } from '@/types/accountType';
import type { IHistoryTransaction } from '@/types/userType';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface ShowTransactionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  currentUser?: IUser; // Replace with the actual type
}
const ShowTransactionHistoryModal = ({
  open,
  onClose,
  isLoading,
  currentUser,
}: ShowTransactionHistoryModalProps) => {
  const { listTransactionHistory, setListTransactionHistory } = useUserStore();
  useEffect(() => {
    const fetchPointHistory = async () => {
      if (!currentUser) return;
      try {
        const response = await userService.getUserTransaction(currentUser?.id);
        if (response && response.statusCode === 200) {
          setListTransactionHistory(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch point history:', error);
      }
    };
    fetchPointHistory();
  }, [currentUser, setListTransactionHistory]);
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
            <th className='p-3 border-b dark:border-gray-600 text-center'>Trạng thái</th>
            <th className='p-3 border-b dark:border-gray-600'>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {listTransactionHistory.length > 0 ? (
            listTransactionHistory.map((item: IHistoryTransaction) => (
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
                <td className='p-3 font-semibold text-center'>{item.amount} VND</td>
                <td className='p-3 text-center'>
                  <span
                    className='p-2 rounded-full'
                    style={{ backgroundColor: TransactionStatusColor[item.status] }}
                  >
                    {TransactionStatusLabel[item.status]}
                  </span>
                </td>
                <td className='p-3'>{item.failedReason}</td>
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

export default ShowTransactionHistoryModal;
