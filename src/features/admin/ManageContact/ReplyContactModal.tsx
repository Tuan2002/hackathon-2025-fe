import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { IContact } from '@/types/feedbackType';

interface ReplyContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reply: string) => void;
  contact: IContact;
}

const ReplyContactModal: React.FC<ReplyContactModalProps> = ({
  open,
  onClose,
  onSubmit,
  contact,
}) => {
  const [reply, setReply] = React.useState('');

  const handleSend = () => {
    if (reply.trim()) {
      onSubmit(reply);
      setReply('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Phản hồi liên hệ</DialogTitle>
        </DialogHeader>

        {contact ? (
          <div className='space-y-4'>
            <div>
              <Label>Họ tên</Label>
              <Input value={contact.name} readOnly />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Email</Label>
                <Input value={contact.email} readOnly />
              </div>
              <div>
                <Label>Số điện thoại</Label>
                <Input value={contact.phone} readOnly />
              </div>
            </div>

            <div>
              <Label>Nội dung liên hệ</Label>
              <Textarea value={contact.message} readOnly />
            </div>

            <div>
              <Label>Nội dung phản hồi</Label>
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder='Nhập nội dung phản hồi...'
              />
            </div>
          </div>
        ) : (
          <p className='text-sm text-gray-500'>Không có dữ liệu liên hệ.</p>
        )}

        <DialogFooter className='mt-4'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSend} disabled={!reply.trim()}>
            Gửi phản hồi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyContactModal;
