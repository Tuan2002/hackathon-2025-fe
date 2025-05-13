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
import { useState, useRef, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IUser, EUserRole } from '@/types/accountType';
import { USER_ROLES, USER_ROLES_LABELS } from '@/constants/userRoles';
import { GENDERS, GENDERS_LABELS } from '@/constants/genders';
import type { IUpdateUserRequest, ICreateUserRequest, IUserFormData } from '@/types/userType';
import { toast } from 'react-toastify';
import userService from '@/services/userService';
import uploadService from '@/services/uploadService';
import useUserStore from '@/stores/userStore';

interface CreateAndUpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: IUser | null;
}

const CreateAndUpdateUserModal = ({
  open,
  onClose,
  currentUser,
}: CreateAndUpdateUserModalProps) => {
  const [userData, setUserData] = useState<IUserFormData>({
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    role: USER_ROLES.USER,
    gender: GENDERS.FEMALE,
    phone: '',
    address: '',
    dob: new Date().toISOString().split('T')[0],
    isLocked: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser, createUser } = useUserStore();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (currentUser) {
        setUserData({
          avatar: currentUser.avatar || '/default-avatar.png',
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          role: currentUser.role,
          gender: currentUser.gender,
          phone: currentUser.phone,
          address: currentUser.address,
          dob: new Date().toISOString().split('T')[0],
          isLocked: currentUser.isLocked,
        });
        setImageFile(null);
      } else {
        setUserData({
          avatar: '',
          firstName: '',
          lastName: '',
          email: '',
          role: USER_ROLES.USER,
          gender: GENDERS.FEMALE,
          phone: '',
          address: '',
          dob: new Date().toISOString().split('T')[0],
          isLocked: true,
        });
        setImageFile(null);
      }
    }
  }, [open, currentUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setUserData((prev) => ({ ...prev, avatar: reader.result as string }));
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setIsLoading(true);
    try {
      let avatarUrl = userData.avatar;

      if (imageFile) {
        const uploadRes = await uploadService.uploadAnImage(imageFile);
        if (uploadRes.data.secure_url) {
          avatarUrl = uploadRes.data.secure_url;
        } else {
          toast.error('Upload ảnh thất bại');
          return;
        }
      }

      if (currentUser) {
        const updateData: IUpdateUserRequest = {
          email: userData.email,
          isLocked: userData.isLocked,
          role: userData.role,
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          phone: userData.phone,
          dob: null,
          gender: userData.gender,
          avatar: avatarUrl,
        };

        const res = await userService.updateUser(currentUser.id, updateData);
        if (res) {
          updateUser(res.data);
          toast.success('Cập nhật người dùng thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        const createData: ICreateUserRequest = {
          email: userData.email,
          role: userData.role,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          dob: null,
          gender: userData.gender,
        };

        const res = await userService.createUser({ ...createData });
        if (res) {
          createUser(res.data);
          toast.success('Tạo người dùng thành công');
          onClose();
        } else {
          toast.error('Tạo người dùng thất bại');
        }
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      isConfirming={isLoading}
      title={currentUser ? 'Cập nhật người dùng' : 'Thêm mới người dùng'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit}>{currentUser ? 'Cập nhật' : 'Tạo mới'}</Button>
        </div>
      }
    >
      <div className='relative flex flex-col items-center mb-3'>
        <div className='relative w-28 h-28 rounded-full overflow-hidden border'>
          {userData.avatar ? (
            <img src={userData.avatar} alt='avatar' className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
              No Image
            </div>
          )}
        </div>

        <button
          type='button'
          className='absolute bottom-4 translate-y-1/2 right-[calc(50%-50px)] bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700'
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className='w-4 h-4' />
        </button>

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
          <Input
            value={userData.firstName}
            onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))}
          />
        </div>
        <div className='w-1/2'>
          <Label>Tên</Label>
          <Input
            value={userData.lastName}
            onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
      </div>

      <div className='mb-4'>
        <Label>Email</Label>
        <Input
          type='email'
          value={userData.email}
          onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div className='mb-4'>
        <Label>Số điện thoại</Label>
        <Input
          value={userData.phone}
          onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      {currentUser && (
        <div className='mb-4'>
          <Label>Địa chỉ</Label>
          <Input
            value={userData.address}
            onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
          />
        </div>
      )}

      <div className='mb-4'>
        <Label>Ngày sinh</Label>
        <Input
          type='date'
          value={userData.dob || ''}
          onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
        />
      </div>

      <div className='mb-4'>
        <Label>Giới tính</Label>
        <Select
          value={userData.gender + ''}
          onValueChange={(value) => setUserData((prev) => ({ ...prev, gender: +value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Chọn giới tính' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(GENDERS).map((gender) => (
              <SelectItem key={gender} value={gender + ''}>
                {GENDERS_LABELS[gender]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='mb-4'>
        <Label>Phân quyền</Label>
        <Select
          value={userData.role}
          onValueChange={(value) => setUserData((prev) => ({ ...prev, role: value as EUserRole }))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Chọn phân quyền' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(USER_ROLES).map((role) => (
              <SelectItem key={role} value={role}>
                {USER_ROLES_LABELS[role]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentUser && (
        <div className='mb-4'>
          <Label>Trạng thái khóa</Label>
          <Select
            value={userData.isLocked.toString()}
            onValueChange={(value) =>
              setUserData((prev) => ({ ...prev, isLocked: value === 'true' }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='false'>Đang hoạt động</SelectItem>
              <SelectItem value='true'>Đã bị khoá</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </ModalCustom>
  );
};

export default CreateAndUpdateUserModal;
