import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import type { MenuItem } from '@/constants/menuItems';

import {
  BiBorderInner,
  BiBrain,
  BiBuildingHouse,
  BiCabinet,
  BiKey,
  BiSolidUser,
  BiTransfer,
  BiUser,
  BiUserCircle,
  BiWrench,
} from 'react-icons/bi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const iconOptions = [
  { label: 'BiBorderInner', value: 'BiBorderInner', icon: BiBorderInner },
  { label: 'BiBrain', value: 'BiBrain', icon: BiBrain },
  { label: 'BiBuildingHouse', value: 'BiBuildingHouse', icon: BiBuildingHouse },
  { label: 'BiCabinet', value: 'BiCabinet', icon: BiCabinet },
  { label: 'BiKey', value: 'BiKey', icon: BiKey },
  { label: 'BiSolidUser', value: 'BiSolidUser', icon: BiSolidUser },
  { label: 'BiTransfer', value: 'BiTransfer', icon: BiTransfer },
  { label: 'BiUser', value: 'BiUser', icon: BiUser },
  { label: 'BiUserCircle', value: 'BiUserCircle', icon: BiUserCircle },
  { label: 'BiWrench', value: 'BiWrench', icon: BiWrench },
];

interface CreateAndUpdateMenuModalProps {
  open: boolean;
  onClose: () => void;
  currentMenu: MenuItem | null;
}

const CreateAndUpdateMenuModal = ({
  open,
  onClose,
  currentMenu,
}: CreateAndUpdateMenuModalProps) => {
  const [menuData, setMenuData] = useState<{ title: string; icon?: string; path: string }>({
    title: '',
    icon: undefined,
    path: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (currentMenu) {
        setMenuData({
          title: currentMenu.title,
          icon: typeof currentMenu.icon === 'string' ? currentMenu.icon : '',
          path: currentMenu.path || '',
        });
      } else {
        setMenuData({
          title: '',
          icon: undefined,
          path: '',
        });
      }
    }
  }, [open, currentMenu]);

  const handleSubmit = async () => {
    if (!menuData.title) {
      toast.error('Vui lòng nhập tên menu');
      return;
    }
    setIsLoading(true);
  };

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      isConfirming={isLoading}
      title={currentMenu ? 'Cập nhật Menu' : 'Thêm mới Menu'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentMenu ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div>
          <Label>Tên menu</Label>
          <Input
            placeholder='Nhập tên menu'
            value={menuData.title}
            onChange={(e) => setMenuData((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <Label>Icon</Label>
          <Select
            value={menuData.icon || ''}
            onValueChange={(value) => setMenuData((prev) => ({ ...prev, icon: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn icon' />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <div className='flex items-center gap-2'>
                    <item.icon size={18} />
                    {item.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Đường dẫn (path)</Label>
          <Input
            placeholder='Nhập path (tuỳ chọn)'
            value={menuData.path}
            onChange={(e) => setMenuData((prev) => ({ ...prev, path: e.target.value }))}
          />
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateMenuModal;
