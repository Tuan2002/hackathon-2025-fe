/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import type { IBanner, IBannerData } from '@/types/bannerType';
import BannerService from '@/services/bannerService';
import useBannerStore from '@/stores/bannerStore';
import uploadService from '@/services/uploadService';
import { Camera } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface CreateAndUpdateBannerModalProps {
  open: boolean;
  onClose: () => void;
  currentBanner: IBanner | null;
}

const CreateAndUpdateBannerModal = ({
  open,
  onClose,
  currentBanner,
}: CreateAndUpdateBannerModalProps) => {
  const [bannerData, setBannerData] = useState<IBannerData>({
    title: '',
    description: '',
    image: '',
    link: '',
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const { updateBanner, createBanner } = useBannerStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      if (currentBanner) {
        setBannerData(currentBanner);
      } else {
        setBannerData({
          title: '',
          description: '',
          image: '',
          link: '',
          isActive: true,
        });
      }
      setBannerFile(null);
    }
  }, [open, currentBanner]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
      setBannerFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!bannerData.title) {
      toast.error('Vui lòng nhập tiêu đề banner');
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = bannerData.image;

      if (bannerFile) {
        const uploadRes = await uploadService.uploadAnImage(bannerFile);
        if (uploadRes.data.secure_url) {
          imageUrl = uploadRes.data.secure_url;
        } else {
          toast.error('Upload ảnh thất bại');
          setIsLoading(false);
          return;
        }
      }

      const submitData: IBannerData = {
        ...bannerData,
        image: imageUrl,
      };

      if (currentBanner) {
        const res = await BannerService.updateBanner(currentBanner.id, submitData);
        if (res) {
          updateBanner(res.data);
          toast.success('Cập nhật banner thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        const res = await BannerService.createBanner(submitData);
        if (res) {
          createBanner(res.data);
          toast.success('Tạo banner thành công');
          onClose();
        } else {
          toast.error('Tạo banner thất bại');
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
      title={currentBanner ? 'Cập nhật banner' : 'Thêm mới banner'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentBanner ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div className='relative w-full h-[150px]'>
          {bannerData.image ? (
            <img
              src={bannerData.image}
              alt='Banner preview'
              className='w-full h-full object-cover rounded-lg'
            />
          ) : (
            <div className='w-full h-full bg-gray-100 flex items-center justify-center rounded-lg text-gray-400'>
              Chưa có ảnh
            </div>
          )}

          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow'
          >
            <Camera size={16} />
          </button>

          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            className='hidden'
            onChange={handleImageChange}
          />
        </div>

        <div>
          <Label>Tiêu đề</Label>
          <Input
            placeholder='Nhập tiêu đề banner'
            value={bannerData.title}
            onChange={(e) => setBannerData((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <Label>Mô tả</Label>
          <Textarea
            rows={3}
            placeholder='Nhập mô tả banner'
            value={bannerData.description}
            onChange={(e) => setBannerData((prev) => ({ ...prev, description: e.target.value }))}
            className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
          />
        </div>

        <div>
          <Label>Link liên kết</Label>
          <Input
            placeholder='Nhập link chuyển đến'
            value={bannerData.link}
            onChange={(e) => setBannerData((prev) => ({ ...prev, link: e.target.value }))}
          />
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateBannerModal;
