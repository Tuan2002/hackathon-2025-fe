/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ModalCustom from '@/components/customs/ModalCustom';
import type { IDocument } from '@/types/documentType';
import dayjs from 'dayjs';
import { DOCUMENT_STATUS_LABELS, DOCUMENT_STATUSES } from '@/constants/documentStatuses';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import useAccountStore from '@/stores/accountStore';
import { USER_ROLES } from '@/constants/userRoles';

interface ShowDocumentDetailModalProps {
  open: boolean;
  onClose: () => void;
  document: IDocument | null;
  onReject?: (reason: string) => void;
  onApprove?: (point: number) => void;
}

const ShowDocumentDetailModal = ({
  open,
  onClose,
  document,
  onApprove,
  onReject,
}: ShowDocumentDetailModalProps) => {
  const [approvalStatus, setApprovalStatus] = useState('');
  const [point, setPoint] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const { currentUser } = useAccountStore();

  if (!document) return null;

  const renderRow = (label: string, value: any) => (
    <div className='flex items-center gap-3'>
      <Label className='w-24'>{label}:</Label>
      <div className='flex-1'>{value}</div>
    </div>
  );

  const handleConfirmApproval = () => {
    if (approvalStatus === 'approved' && !point) {
      toast.error('Vui lòng nhập số điểm!');
      return;
    }
    if (approvalStatus === 'rejected' && !rejectionReason) {
      toast.error('Vui lòng nhập lý do từ chối!');
      return;
    }

    if (approvalStatus === 'approved' && onApprove) {
      onApprove(Number(point));
    } else if (approvalStatus === 'rejected' && onReject) {
      onReject(rejectionReason);
    } else {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      return;
    }
    // Reset
    setApprovalStatus('');
    setPoint('');
    setRejectionReason('');
  };

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
          {renderRow('Lượt thích', document.favoriteCount)}

          <Separator />

          {/* Radio + Nút xác nhận */}
          {currentUser &&
            currentUser.role === USER_ROLES.ADMIN &&
            document.status === DOCUMENT_STATUSES.PENDING && (
              <div className='flex items-center gap-6'>
                <RadioGroup
                  value={approvalStatus}
                  onValueChange={(value: any) => setApprovalStatus(value)}
                  className='flex gap-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='approved'
                      id='approved'
                      className='border-gray-400 text-primary focus:ring-0 focus:ring-offset-0 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 w-5 h-5 rounded-full'
                    />
                    <Label htmlFor='approved'>Duyệt tài liệu</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='rejected'
                      id='rejected'
                      className='border-gray-400 text-primary focus:ring-0 focus:ring-offset-0 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500 w-5 h-5 rounded-full'
                    />
                    <Label htmlFor='rejected'>Từ chối tài liệu</Label>
                  </div>
                </RadioGroup>

                <Button onClick={handleConfirmApproval} disabled={!approvalStatus} className='px-4'>
                  Xác nhận
                </Button>
              </div>
            )}

          {approvalStatus === 'approved' && (
            <Input
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              placeholder='Nhập số điểm nhận được'
              type='number'
              min={0}
              className='mt-3'
            />
          )}
          {approvalStatus === 'rejected' && (
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder='Nhập lý do từ chối'
              className='mt-3'
            />
          )}
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
