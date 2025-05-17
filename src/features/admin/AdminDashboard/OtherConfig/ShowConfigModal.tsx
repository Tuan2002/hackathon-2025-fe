import { Label } from '@/components/ui/label';
import ModalCustom from '@/components/customs/ModalCustom';
import type { IConfig } from '@/types/configType';

interface ShowConfigModalProps {
  open: boolean;
  onClose: () => void;
  config: IConfig | null;
  onSetActiveConfig?: (id: string) => void;
  activeConfig?: IConfig | null;
}

const ShowConfigModal = ({
  open,
  onClose,
  config,
  onSetActiveConfig,
  activeConfig,
}: ShowConfigModalProps) => {
  if (!config) return null;

  const configInfo = [
    { label: 'Số lần đăng nhập sai tối đa', value: config.config.maxLoginAttempts },
    { label: 'Số tài liệu homepage', value: config.config.maxHomePageDocument },
    { label: 'Số banner homepage', value: config.config.maxHomePageBanner },
    { label: 'Số bài viết homepage', value: config.config.maxHomePagePost },
  ];

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      title='Chi tiết cấu hình'
      size='md'
      footer={
        <div className='flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition'
          >
            Đóng
          </button>
          {config.id !== activeConfig?.id && (
            <button
              onClick={() => onSetActiveConfig && onSetActiveConfig(config.id)}
              className='px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition'
            >
              Chọn gói này
            </button>
          )}
        </div>
      }
    >
      <div className='space-y-6'>
        <div className='flex items-center justify-between border-b pb-2'>
          <Label className='font-semibold text-base'>Tên gói:</Label>
          <div className='font-semibold text-base'>{config.name}</div>
        </div>

        <div className='space-y-4'>
          {configInfo.map((item, index) => (
            <div key={index} className='flex items-center justify-between'>
              <Label>{item.label}</Label>
              <div className='font-medium'>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </ModalCustom>
  );
};

export default ShowConfigModal;
