/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Camera } from 'lucide-react';
import type { IUpdateProfileRequest, IUser } from '@/types/accountType';
import { genderList, GENDERS } from '@/constants/genders';
import uploadService from '@/services/uploadService';
import { toast } from 'react-toastify';
import accountService from '@/services/accountService';
import useAccountStore from '@/stores/accountStore';

interface IUpdateProfileFormProps {
  user?: IUser;
  isUpdating?: boolean;
}

export interface UpdateProfileFormRef {
  handleConfirmUpdate: () => Promise<void>;
}
const UpdateProfileForm = forwardRef<UpdateProfileFormRef, IUpdateProfileFormProps>(
  ({ user, isUpdating = true }, ref) => {
    const [formData, setFormData] = useState<IUpdateProfileRequest>({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      dob: new Date().toISOString().split('T')[0],
      gender: GENDERS.MALE,
      avatar: '',
    });

    const { setIsSubmitting, setCurrentUser } = useAccountStore();

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleChange = (key: keyof IUpdateProfileRequest, value: any) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setAvatarFile(file);

        // tạo preview URL
        const previewURL = URL.createObjectURL(file);
        handleChange('avatar', previewURL);
      }
    };

    useEffect(() => {
      if (user?.id) {
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          phone: user.phone,
          dob: user.dob,
          gender: user.gender,
          avatar: user.avatar,
        });
      }
    }, [user]);

    useImperativeHandle(ref, () => ({
      handleConfirmUpdate: async () => {
        setIsSubmitting(true);
        try {
          const updateProfileData: IUpdateProfileRequest = {
            ...formData,
            // dob: null, //formData.dob && dayjs(formData.dob).format('DD-MM-YYYY'),
            gender: +formData.gender,
          };

          if (avatarFile) {
            const uploadAvatar = await uploadService.uploadAnImage(avatarFile);
            if (uploadAvatar.statusCode === 200) {
              updateProfileData.avatar = uploadAvatar.data.secure_url;
            }
          }

          const response = await accountService.updateProfile(updateProfileData);
          if (response.statusCode === 200) {
            setCurrentUser(response.data);
            toast.success('Cập nhật thông tin thành công');
          } else {
            toast.error('Cập nhật thông tin thất bại');
          }
        } catch {
          toast.error('Cập nhật thông tin thất bại');
        } finally {
          setIsSubmitting(false);
        }
      },
    }));

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='col-span-1 md:col-span-2 flex items-center gap-4 justify-center mb-5'>
          <div className='relative w-24 h-24'>
            <div className='w-full h-full rounded-full overflow-hidden border'>
              {formData.avatar ? (
                <img src={formData.avatar} alt='avatar' className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  No Image
                </div>
              )}
            </div>

            <label className='absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full cursor-pointer shadow hover:bg-gray-100 transition'>
              <Camera size={16} className='text-gray-600' />
              <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Các input khác giữ nguyên */}
        <div>
          <Label>Họ</Label>
          <Input
            disabled={!isUpdating}
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>

        <div>
          <Label>Tên</Label>
          <Input
            disabled={!isUpdating}
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <Label>Địa chỉ</Label>
          <Input
            disabled={!isUpdating}
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <div>
          <Label>Số điện thoại</Label>
          <Input
            disabled={!isUpdating}
            type='tel'
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div>
          <Label>Ngày sinh</Label>
          <Input
            disabled={!isUpdating}
            type='date'
            value={formData.dob}
            onChange={(e) => handleChange('dob', e.target.value)}
          />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <Label>Giới tính</Label>
          <Select
            disabled={!isUpdating}
            value={formData.gender + ''}
            onValueChange={(value) => handleChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn giới tính' />
            </SelectTrigger>
            <SelectContent>
              {genderList.map((item) => (
                <SelectItem key={item.value} value={item.value + ''}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
);

UpdateProfileForm.displayName = 'UpdateProfileForm';
export default UpdateProfileForm;
