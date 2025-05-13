/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import type { IAuthor, IAuthorFormData } from '@/types/authorType';
import useAuthorStore from '@/stores/authorStore';
import AuthorService from '@/services/authorService';

interface CreateAndUpdateAuthorModalProps {
  open: boolean;
  onClose: () => void;
  currentAuthor: IAuthor | null;
}

const CreateAndUpdateAuthorModal = ({
  open,
  onClose,
  currentAuthor,
}: CreateAndUpdateAuthorModalProps) => {
  const [authorData, setAuthorData] = useState<IAuthorFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { updateAuthor, createAuthor } = useAuthorStore();

  useEffect(() => {
    if (open) {
      if (currentAuthor) {
        setAuthorData({
          name: currentAuthor.name,
          email: currentAuthor.email,
          phone: currentAuthor.phone,
          address: currentAuthor.address,
        });
      } else {
        setAuthorData({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
      }
    }
  }, [open, currentAuthor]);

  const handleSubmit = async () => {
    if (!authorData.name) {
      toast.error('Vui lòng nhập tên tác giả');
      return;
    }
    setIsLoading(true);
    try {
      if (currentAuthor) {
        const res = await AuthorService.updateAuthor(currentAuthor.id, authorData);
        if (res) {
          updateAuthor(res.data);
          toast.success('Cập nhật tác giả thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        const res = await AuthorService.createAuthor(authorData);
        if (res) {
          createAuthor(res.data);
          toast.success('Tạo tác giả thành công');
          onClose();
        } else {
          toast.error('Tạo tác giả thất bại');
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
      title={currentAuthor ? 'Cập nhật tác giả' : 'Thêm mới tác giả'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentAuthor ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div>
          <Label>Tên tác giả</Label>
          <Input
            placeholder='Nhập tên tác giả'
            value={authorData.name}
            onChange={(e) => setAuthorData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            placeholder='Nhập email'
            type='email'
            value={authorData.email}
            onChange={(e) => setAuthorData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <Label>Số điện thoại</Label>
          <Input
            placeholder='Nhập số điện thoại'
            value={authorData.phone}
            onChange={(e) => setAuthorData((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div>
          <Label>Địa chỉ</Label>
          <Input
            placeholder='Nhập địa chỉ'
            value={authorData.address}
            onChange={(e) => setAuthorData((prev) => ({ ...prev, address: e.target.value }))}
          />
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateAuthorModal;
