'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import type { ICategory, ICategoryFormData } from '@/types/categoryType';
import useCategoryStore from '@/stores/categoryStore';
import CategoryService from '@/services/categoryService';

interface CreateAndUpdateCategoryModalProps {
  open: boolean;
  onClose: () => void;
  currentCategory: ICategory | null;
}

const CreateAndUpdateCategoryModal = ({
  open,
  onClose,
  currentCategory,
}: CreateAndUpdateCategoryModalProps) => {
  const [categoryData, setCategoryData] = useState<ICategoryFormData>({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { updateCategory, createCategory } = useCategoryStore();

  useEffect(() => {
    if (open) {
      if (currentCategory) {
        setCategoryData({
          name: currentCategory.name,
          description: currentCategory.description || '',
        });
      } else {
        setCategoryData({
          name: '',
          description: '',
        });
      }
    }
  }, [open, currentCategory]);

  const handleSubmit = async () => {
    if (!categoryData.name) {
      toast.error('Vui lòng nhập tên danh mục');
      return;
    }
    setIsLoading(true);
    try {
      if (currentCategory) {
        const res = await CategoryService.updateCategory(currentCategory.id, categoryData);
        if (res) {
          updateCategory(res.data);
          toast.success('Cập nhật danh mục thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        const res = await CategoryService.createCategory(categoryData);
        if (res) {
          createCategory(res.data);
          toast.success('Tạo danh mục thành công');
          onClose();
        } else {
          toast.error('Tạo danh mục thất bại');
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
      title={currentCategory ? 'Cập nhật danh mục' : 'Thêm mới danh mục'}
      size='md'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentCategory ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        <div>
          <Label>Tên danh mục</Label>
          <Input
            placeholder='Nhập tên danh mục'
            value={categoryData.name}
            onChange={(e) => setCategoryData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <Label>Mô tả</Label>
          <Textarea
            placeholder='Nhập mô tả (tuỳ chọn)'
            value={categoryData.description}
            onChange={(e) => setCategoryData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
          />
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateCategoryModal;
