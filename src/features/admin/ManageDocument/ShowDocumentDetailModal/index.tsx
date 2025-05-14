'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ModalCustom from '@/components/customs/ModalCustom';
import type { IDocument } from '@/types/documentType';
import dayjs from 'dayjs';
import { DOCUMENT_STATUS_LABELS, DOCUMENT_STATUSES } from '@/constants/documentStatuses';

interface ShowDocumentDetailModalProps {
  open: boolean;
  onClose: () => void;
  document: IDocument | null;
}

const ShowDocumentDetailModal = ({ open, onClose, document }: ShowDocumentDetailModalProps) => {
  if (!document) return null;

  const renderRow = (label: string, value: any) => (
    <div className='flex items-center gap-3'>
      <Label className='w-24'>{label}:</Label>
      <div className='flex-1'>{value}</div>
    </div>
  );

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      title='Chi tiết tài liệu'
      size='2xl'
      footer={
        <div className='flex justify-end'>
          <Button onClick={onClose}>Đóng</Button>
        </div>
      }
    >
      <div className='flex gap-6'>
        {/* Ảnh */}
        <img
          src={document.image}
          alt={document.name}
          className='w-44 h-64 object-cover rounded-lg border'
        />

        {/* Thông tin */}
        <div className='space-y-3 flex-1'>
          {renderRow('Tên tài liệu', document.name)}
          {renderRow('Trạng thái', DOCUMENT_STATUS_LABELS[document.status])}
          {renderRow('Hoạt động', document.isActive ? 'Có' : 'Không')}
          {renderRow('Ngày tạo', dayjs(document.createdAt).format('DD/MM/YYYY'))}
          {renderRow('Cập nhật', dayjs(document.updatedAt).format('DD/MM/YYYY'))}

          <Separator />

          {renderRow('Danh mục', document.categoryName)}
          {renderRow('Tác giả', document.authorName)}
          {renderRow('Nhà xuất bản', document.publisherName)}

          <Separator />

          {renderRow('Lượt xem', document.viewCount)}
          {renderRow('Lượt tải', document.downloadCount)}
        </div>
      </div>

      {/* Tóm tắt */}
      <div className='mt-6'>
        <Label className='text-lg'>Thông tin mô tả ngắn</Label>
        <div className='mt-2 p-3 border rounded-lg bg-gray-50 whitespace-pre-line text-justify'>
          {document.shortDescription || 'Chưa có tóm tắt'}
        </div>
      </div>

      {/* Mô tả */}
      <div className='mt-4'>
        <Label className='text-lg'>Thông tin mô tả chi tiết</Label>
        <div className='mt-2 p-3 border rounded-lg bg-gray-50 whitespace-pre-line text-justify'>
          {document.description || 'Chưa có mô tả'}
        </div>
      </div>
    </ModalCustom>
  );
};

export default ShowDocumentDetailModal;
