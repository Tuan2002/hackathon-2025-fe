import ModalCustom from '@/components/customs/ModalCustom';
import UpdateProfileForm, { type UpdateProfileFormRef } from '@/components/UpdateProfileForm';
import useAccountStore from '@/stores/accountStore';
import type { IUser } from '@/types/accountType';
import { useEffect, useRef, useState } from 'react';

const FirstUpdateProfile = () => {
  const [isOpenModalFirstUpdateProfile, setIsOpenModalFirstUpdateProfile] = useState(true);
  const { currentUser, isSubmitting } = useAccountStore();
  const formRef = useRef<UpdateProfileFormRef>(null);
  useEffect(() => {
    if (currentUser?.id && currentUser?.isFirstLogin) {
      setIsOpenModalFirstUpdateProfile(true);
    } else {
      setIsOpenModalFirstUpdateProfile(false);
    }
  }, [currentUser?.id, currentUser?.isFirstLogin]);

  const handleConfirmUpdate = () => {
    formRef.current?.handleConfirmUpdate();
  };

  return (
    <ModalCustom
      open={isOpenModalFirstUpdateProfile}
      onClose={() => setIsOpenModalFirstUpdateProfile(false)}
      title='Cập nhật thông tin cá nhân'
      onConfirm={handleConfirmUpdate}
      isConfirming={isSubmitting}
    >
      <UpdateProfileForm ref={formRef} user={currentUser as IUser} />
    </ModalCustom>
  );
};
export default FirstUpdateProfile;
