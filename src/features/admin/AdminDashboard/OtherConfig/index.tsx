import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import TableConfig from './TableConfig';
import CreateAndUpdateConfigModal from './CreateAndUpdateConfigModal';
import useConfigStore from '@/stores/configStore';
import type { IConfig } from '@/types/configType';
import { useEffect, useState } from 'react';
import ConfigService from '@/services/configStore';
import ModalConfirm from '@/components/customs/ModalConfirm';
import { toast } from 'react-toastify';
import ShowConfigModal from './ShowConfigModal';
import { Label } from '@/components/ui/label';

const OtherConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    openModalCreateAndUpdateConfig,
    setOpenModalCreateAndUpdateConfig,
    openModalDeleteConfig,
    setOpenModalDeleteConfig,
    setOpenModalShowConfig,
    openModalShowConfig,
    currentConfig,
    listConfigs,
    setListConfigs,
    setCurrentConfig,
    deleteConfig,
    updateConfig,
    activeConfig,
    setActiveConfig,
  } = useConfigStore();

  const handleOpenModalCreateAndUpdateConfig = (config: IConfig | null) => {
    setOpenModalCreateAndUpdateConfig(true);
    setCurrentConfig(config);
  };
  const handleCloseModalCreateAndUpdateConfig = () => {
    setOpenModalCreateAndUpdateConfig(false);
    setCurrentConfig(null);
  };
  const handleOpenModalDelete = (currentConfig: IConfig) => {
    setOpenModalDeleteConfig(true);
    setCurrentConfig(currentConfig);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDeleteConfig(false);
    setCurrentConfig(null);
  };
  const handleOpenModalShowConfig = (currentConfig: IConfig) => {
    setOpenModalShowConfig(true);
    setCurrentConfig(currentConfig);
  };
  const handleCloseModalShowConfig = () => {
    setOpenModalShowConfig(false);
    setCurrentConfig(null);
  };
  const handleConfigDelete = async () => {
    if (!currentConfig) return;
    setIsLoading(true);
    try {
      const response = await ConfigService.deleteConfig(currentConfig.id);
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success('Xoá cấu hình thành công');
        deleteConfig(currentConfig.id);
      } else {
        toast.error('Xoá cấu hình thất bại');
      }
    } catch (error) {
      console.error('Error deleting config:', error);
      toast.error('Xoá cấu hình thất bại');
    } finally {
      setIsLoading(false);
      handleCloseModalDelete();
    }
  };

  const handleSetActiveConfig = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await ConfigService.setActiveConfig(id);
      if (response.statusCode === 200 || response.statusCode === 201) {
        handleCloseModalShowConfig();
        setActiveConfig(response.data);
        updateConfig(response.data);
        toast.success('Cập nhật cấu hình thành công');
      } else {
        toast.error('Cập nhật cấu hình thất bại');
      }
    } catch (error) {
      console.error('Error setting active config:', error);
      toast.error('Cập nhật cấu hình thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await ConfigService.getConfigs();
        setListConfigs(response.data);
        const findActiveConfig = response.data.find((item) => item.isActive);
        if (findActiveConfig) {
          setActiveConfig(findActiveConfig);
        }
      } catch (error) {
        console.error('Error fetching configs:', error);
      }
    };
    fetchConfigs();
  }, [setListConfigs]);

  const configInfo = [
    { label: 'Gói cấu hình hiện tại', value: activeConfig?.name },
    { label: 'Số lần đăng nhập sai tối đa', value: activeConfig?.config.maxLoginAttempts },
    { label: 'Số tài liệu homepage', value: activeConfig?.config.maxHomePageDocument },
    { label: 'Số banner homepage', value: activeConfig?.config.maxHomePageBanner },
    { label: 'Số bài viết homepage', value: activeConfig?.config.maxHomePagePost },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base flex items-center justify-between '>
          <span>Các thông số hệ thống</span>
          <Button
            onClick={() => handleOpenModalCreateAndUpdateConfig(null)}
            variant='secondary'
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' /> Thêm gói cấu hình
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-6'>
          <TableConfig
            onUpdate={handleOpenModalCreateAndUpdateConfig}
            onDelete={handleOpenModalDelete}
            onShowDetail={handleOpenModalShowConfig}
            listConfigs={listConfigs}
            activeConfig={activeConfig}
          />
          <div className='space-y-3 px-4 border-l-2 '>
            {configInfo.map((item, index) => (
              <div key={index} className='flex items-center justify-between'>
                <Label>{item.label}</Label>
                <div className='font-medium'>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <CreateAndUpdateConfigModal
          open={openModalCreateAndUpdateConfig}
          onClose={handleCloseModalCreateAndUpdateConfig}
          currentConfig={currentConfig}
        />
        <ModalConfirm
          open={openModalDeleteConfig}
          onClose={handleCloseModalDelete}
          isConfirming={isLoading}
          type='delete'
          title='Xoá gói cấu hình'
          description={`Bạn có chắc chắn muốn xoá "${currentConfig?.name}" không?`}
          onConfirm={handleConfigDelete}
        />
        <ShowConfigModal
          onSetActiveConfig={handleSetActiveConfig}
          open={openModalShowConfig}
          onClose={handleCloseModalShowConfig}
          config={currentConfig}
          activeConfig={activeConfig}
        />
      </CardContent>
    </Card>
  );
};

export default OtherConfig;
