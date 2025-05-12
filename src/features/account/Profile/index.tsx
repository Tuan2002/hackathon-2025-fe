import ButtonCustom from '@/components/customs/ButtonCustom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UpdateProfileForm, { type UpdateProfileFormRef } from '@/components/UpdateProfileForm';
import AccountLayout from '@/layouts/AccountLayout';
import useAccountStore from '@/stores/accountStore';
import type { IUser } from '@/types/accountType';
import { useRef, useState } from 'react';

export default function Profile() {
  const { currentUser, isSubmitting } = useAccountStore();

  const [isUpdating, setIsUpdating] = useState(false);
  const formRef = useRef<UpdateProfileFormRef>(null);

  const handleConfirmUpdate = async () => {
    if (formRef.current) {
      await formRef.current.handleConfirmUpdate();
    }
    setIsUpdating(false);
  };

  return (
    <AccountLayout>
      <Card className='p-5 h-[calc(100vh-120px)] shadow-lg space-y-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-300'>Thông tin cá nhân</h2>
          {isUpdating ? (
            <div className='flex gap-3'>
              <Button
                variant='outline'
                onClick={() => setIsUpdating(false)}
                className='border-gray-300 text-gray-700 hover:bg-gray-100'
              >
                Huỷ bỏ
              </Button>
              <ButtonCustom
                isLoading={isSubmitting}
                className='bg-green-600 hover:bg-green-700 text-white'
                onClick={handleConfirmUpdate}
              >
                Lưu thay đổi
              </ButtonCustom>
            </div>
          ) : (
            <Button
              className='bg-blue-600 hover:bg-blue-700 text-white'
              onClick={() => setIsUpdating(true)}
            >
              Cập nhật thông tin
            </Button>
          )}
        </div>

        <UpdateProfileForm ref={formRef} isUpdating={isUpdating} user={currentUser as IUser} />
      </Card>
    </AccountLayout>
  );
}
