import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import AccountLayout from '@/layouts/AccountLayout';
import accountService from '@/services/accountService';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.currentPassword || !formData.newPassword) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await accountService.changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success('Đổi mật khẩu thành công');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        navigate(RoutePaths.AccountProfile);
      } else {
        toast.error('Đổi mật khẩu thất bại');
      }
    } catch {
      toast.error('Đổi mật khẩu thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AccountLayout>
      <Card className='p-5 h-[calc(100vh-120px)] shadow-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-300'>Đổi mật khẩu</h2>
          <Button
            className='bg-green-600 hover:bg-green-700 text-white'
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang lưu...' : 'Cập nhật'}
          </Button>
        </div>

        <div className='max-w-sm flex flex-col gap-4'>
          <div className='space-y-3'>
            <Label>Mật khẩu hiện tại</Label>
            <Input
              type='password'
              value={formData.currentPassword}
              onChange={(e) => handleChange('currentPassword', e.target.value)}
              placeholder='Nhập mật khẩu hiện tại'
            />
          </div>

          <div className='space-y-3'>
            <Label>Mật khẩu mới</Label>
            <Input
              type='password'
              value={formData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              placeholder='Nhập mật khẩu mới'
            />
          </div>

          <div className='space-y-3 md:col-span-2'>
            <Label>Xác nhận mật khẩu mới</Label>
            <Input
              type='password'
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder='Nhập lại mật khẩu mới'
            />
          </div>
        </div>
      </Card>
    </AccountLayout>
  );
};

export default ChangePassword;
