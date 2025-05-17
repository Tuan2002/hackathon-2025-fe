/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import useConfigStore from '@/stores/configStore';
import ConfigService from '@/services/configStore';
import type { IConfig, IConfigFormData } from '@/types/configType';

interface CreateAndUpdateConfigModalProps {
  open: boolean;
  onClose: () => void;
  currentConfig: IConfig | null;
}

const CreateAndUpdateConfigModal = ({
  open,
  onClose,
  currentConfig,
}: CreateAndUpdateConfigModalProps) => {
  const [configData, setConfigData] = useState<IConfigFormData>({
    name: '',
    config: {
      maxLoginAttempts: 10,
      maxHomePageDocument: 10,
      maxHomePageBanner: 10,
      maxHomePagePost: 10,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { updateConfig, createConfig } = useConfigStore();

  useEffect(() => {
    if (open) {
      if (currentConfig) {
        setConfigData(currentConfig);
      } else {
        setConfigData({
          name: '',
          config: {
            maxLoginAttempts: 10,
            maxHomePageDocument: 10,
            maxHomePageBanner: 10,
            maxHomePagePost: 10,
          },
        });
      }
    }
  }, [open, currentConfig]);

  const handleChangeConfigValue = (key: keyof IConfigFormData['config'], value: number) => {
    setConfigData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!configData.name) {
      toast.error('Vui lòng nhập tên gói cấu hình');
      return;
    }

    setIsLoading(true);
    try {
      if (currentConfig) {
        const res = await ConfigService.updateConfig(currentConfig.id, configData);
        if (res) {
          updateConfig(res.data);
          toast.success('Cập nhật cấu hình thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        const res = await ConfigService.createConfig(configData);
        if (res) {
          createConfig(res.data);
          toast.success('Tạo cấu hình mới thành công');
          onClose();
        } else {
          toast.error('Tạo cấu hình thất bại');
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
      title={currentConfig ? 'Cập nhật cấu hình' : 'Thêm mới cấu hình'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentConfig ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-5'>
        <div className='space-y-2'>
          <Label>Tên gói cấu hình</Label>
          <Input
            placeholder='Nhập tên gói cấu hình'
            value={configData.name}
            onChange={(e) => setConfigData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <div className='space-y-2 flex justify-between items-center'>
            <Label className='flex-1'>Số lần đăng nhập sai tối đa</Label>
            <Input
              className='w-20'
              type='number'
              value={configData.config.maxLoginAttempts}
              onChange={(e) => handleChangeConfigValue('maxLoginAttempts', Number(e.target.value))}
              min={1}
            />
          </div>

          <div className='space-y-2 flex justify-between items-center'>
            <Label className='flex-1'>Số tài liệu hiển thị trang chủ</Label>
            <Input
              className='w-20'
              type='number'
              value={configData.config.maxHomePageDocument}
              onChange={(e) =>
                handleChangeConfigValue('maxHomePageDocument', Number(e.target.value))
              }
              min={1}
            />
          </div>

          <div className='space-y-2 flex justify-between items-center'>
            <Label className='flex-1'>Số banner hiển thị trang chủ</Label>
            <Input
              className='w-20'
              type='number'
              value={configData.config.maxHomePageBanner}
              onChange={(e) => handleChangeConfigValue('maxHomePageBanner', Number(e.target.value))}
              min={1}
            />
          </div>

          <div className='space-y-2 flex justify-between items-center'>
            <Label className='flex-1'>Số bài viết hiển thị trang chủ</Label>
            <Input
              className='w-20'
              type='number'
              value={configData.config.maxHomePagePost}
              onChange={(e) => handleChangeConfigValue('maxHomePagePost', Number(e.target.value))}
              min={1}
            />
          </div>
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateConfigModal;
