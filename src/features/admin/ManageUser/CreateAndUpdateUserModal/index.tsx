'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useState, useRef } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateAndUpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    avatar: string | null;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'user';
  }) => void;
}

const CreateAndUpdateUserModal = ({ open, onClose, onSubmit }: CreateAndUpdateUserModalProps) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit({ avatar, firstName, lastName, email, role });
    onClose();
    setAvatar(null);
    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('user');
  };

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      title='Thêm mới người dùng'
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit}>Xác nhận</Button>
        </div>
      }
    >
      <div className='relative flex flex-col items-center mb-3'>
        <div className='relative w-28 h-28 rounded-full overflow-hidden border'>
          {avatar ? (
            <img src={avatar} alt='avatar' className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
              No Image
            </div>
          )}
        </div>

        {/* Nút chọn ảnh nằm phía trên góc dưới phải */}
        <button
          type='button'
          className='absolute bottom-4 translate-y-1/2 right-[calc(50%-50px)] bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700'
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className='w-4 h-4' />
        </button>

        {/* Input file ẩn */}
        <Input
          type='file'
          accept='image/*'
          className='hidden'
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>

      <div className='flex gap-3 mb-4'>
        <div className='w-1/2'>
          <Label>Họ</Label>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='w-1/2'>
          <Label>Tên</Label>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div className='mb-4'>
        <Label>Email</Label>
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className='mb-2'>
        <Label>Phân quyền</Label>
        <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'user')}>
          <SelectTrigger>
            <SelectValue placeholder='Chọn phân quyền' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='admin'>Admin</SelectItem>
            <SelectItem value='user'>User</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateUserModal;
