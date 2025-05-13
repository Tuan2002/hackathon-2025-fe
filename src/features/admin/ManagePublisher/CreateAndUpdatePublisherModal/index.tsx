/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import type { IPublisher, IPublisherFormData } from '@/types/publisherType';
import usePublisherStore from '@/stores/publisherStore';
import PublisherService from '@/services/publisherService';

interface CreateAndUpdatePublisherModalProps {
  open: boolean;
  onClose: () => void;
  currentPublisher: IPublisher | null;
}

const CreateAndUpdatePublisherModal = ({
  open,
  onClose,
  currentPublisher,
}: CreateAndUpdatePublisherModalProps) => {
  const [publisherData, setPublisherData] = useState<IPublisherFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { updatePublisher, createPublisher } = usePublisherStore();

  useEffect(() => {
    if (open) {
      if (currentPublisher) {
        setPublisherData({
          name: currentPublisher.name,
          email: currentPublisher.email,
          phone: currentPublisher.phone,
          address: currentPublisher.address,
        });
      } else {
        setPublisherData({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
    }
  }, [open, currentPublisher]);

  const handleSubmit = async () => {
    if (!publisherData.name) {
      toast.error('Vui lòng nhập tên nhà xuất bản');
      return;
    }
    setIsLoading(true);
    try {
      if (currentPublisher) {
        const res = await PublisherService.updatePublisher(currentPublisher.id, publisherData);
        if (res) {
          updatePublisher(res.data);
          toast.success('Cập nhật nhà xuất bản thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        const res = await PublisherService.createPublisher(publisherData);
        if (res) {
          createPublisher(res.data);
          toast.success('Tạo nhà xuất bản thành công');
          onClose();
        } else {
          toast.error('Tạo nhà xuất bản thất bại');
        }
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      isConfirming={isLoading}
      title={currentPublisher ? 'Cập nhật nhà xuất bản' : 'Thêm mới nhà xuất bản'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentPublisher ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div>
          <Label>Tên nhà xuất bản</Label>
          <Input
            placeholder='Nhập tên nhà xuất bản'
            value={publisherData.name}
            onChange={(e) => setPublisherData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            placeholder='Nhập email'
            type='email'
            value={publisherData.email}
            onChange={(e) => setPublisherData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <Label>Số điện thoại</Label>
          <Input
            placeholder='Nhập số điện thoại'
            value={publisherData.phone}
            onChange={(e) => setPublisherData((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div>
          <Label>Địa chỉ</Label>
          <Input
            placeholder='Nhập địa chỉ'
            value={publisherData.address}
            onChange={(e) => setPublisherData((prev) => ({ ...prev, address: e.target.value }))}
          />
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdatePublisherModal;
