'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ModalCustom from '@/components/customs/ModalCustom';
import { useState } from 'react';
import { toast } from 'sonner';

interface RejectDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
}

const RejectDocumentModal = ({ open, onClose, onReject }: RejectDocumentModalProps) => {
  const [reason, setReason] = useState('');

  const handleReject = () => {
    if (!reason.trim()) {
      toast.warning('Vui lòng nhập lý do từ chối!');
      return;
    }
    onReject(reason);
    setReason('');
    onClose();
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <ModalCustom
      title='Từ chối tài liệu'
      open={open}
      onClose={handleClose}
      size='2xl'
      showFooter={false}
      showHeader={true}
    >
      <div className='space-y-4'>
        <p className='text-gray-700 font-medium'>Nhập lý do từ chối:</p>
        <Textarea
          placeholder='Nhập lý do...'
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={handleClose}>
            Huỷ
          </Button>
          <Button className='bg-red-500 hover:bg-red-600' onClick={handleReject}>
            Từ chối
          </Button>
        </div>
      </div>
    </ModalCustom>
  );
};

export default RejectDocumentModal;
