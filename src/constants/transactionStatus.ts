export const TransactionStatus = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected',
  TIMEOUT: 'timeout',
};
export const TransactionStatusLabel = {
  [TransactionStatus.PENDING]: 'Đang chờ xử lý',
  [TransactionStatus.SUCCESS]: 'Thành công',
  [TransactionStatus.FAILED]: 'Thất bại',
  [TransactionStatus.CANCELLED]: 'Đã huỷ',
  [TransactionStatus.REJECTED]: 'Bị từ chối',
  [TransactionStatus.TIMEOUT]: 'Hết thời gian',
};

export const TransactionStatusColor = {
  [TransactionStatus.PENDING]: '#fadb14',
  [TransactionStatus.SUCCESS]: '#52c41a',
  [TransactionStatus.FAILED]: '#ff4d4f',
  [TransactionStatus.CANCELLED]: '#ff4d4f',
  [TransactionStatus.REJECTED]: '#ff4d4f',
};
