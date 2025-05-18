/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { IDocument } from '@/types/documentType';
import DocumentService from '@/services/documentService';
import ButtonCustom from '@/components/customs/ButtonCustom';
import { DownloadCloud, XCircle } from 'lucide-react';
import generatePriceStatus from '@/utils/generatePriceStatus';
import { BsCoin } from 'react-icons/bs';
import useAccountStore from '@/stores/accountStore';

interface DownloadConfirmModalProps {
  open: boolean;
  onClose: () => void;
  currentDocument: IDocument | null;
}

const DownloadConfirmModal = ({ open, onClose, currentDocument }: DownloadConfirmModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { currentUser } = useAccountStore();

  const handleDownloadDocument = async () => {
    if (!currentDocument?.id) return;
    if (!currentUser?.id) {
      toast.error('Vui lòng đăng nhập để tải tài liệu');
      return;
    }
    if (currentDocument.point > currentUser.point) {
      toast.error('Bạn không đủ điểm để tải tài liệu này');
      return;
    }
    setIsDownloading(true);
    try {
      const response = await DocumentService.getDownloadDocumentUrl(currentDocument.id);
      if (response.statusCode === 200 || response.statusCode === 201) {
        const downloadUrl = response.data.url;
        const fileName = currentDocument.name || 'document.pdf';
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
        toast.success('🎉 Tải tài liệu thành công!');
      } else {
        toast.error(response?.message || 'Có lỗi xảy ra khi tải tài liệu');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra khi tải tài liệu');
    } finally {
      setTimeout(() => setIsDownloading(false), 1500);
    }
  };

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      title='Xác nhận tải tài liệu'
      showFooter={false}
      size='lg'
    >
      {currentDocument ? (
        <div className='space-y-6'>
          <div className='flex gap-4'>
            <div className='w-40 h-52 rounded-xl overflow-hidden border'>
              <img
                src={currentDocument.image || '/images/document-placeholder.png'}
                alt={currentDocument.name}
                width={160}
                height={208}
                className='object-cover w-full h-full'
              />
            </div>

            <div className='flex-1 flex flex-col justify-between'>
              <div>
                <h3 className='text-[16px] font-semibold text-gray-800 dark:text-gray-100 line-clamp-2'>
                  {currentDocument.name}
                </h3>
                <div className='text-[16px]  text-gray-800 dark:text-gray-100 line-clamp-4'>
                  {currentDocument.description || 'Chưa có mô tả'}
                </div>
                <div className='mt-2 top-2 right-2 bg-purple-600 text-white text-sm font-semibold px-2 py-1 rounded-full inline-flex items-center min-w-28 h-10'>
                  <span className='flex-1 inline-block text-center'>
                    {generatePriceStatus(currentDocument.point).label}
                  </span>
                  <BsCoin className='inline-block ml-2' size={14} />
                </div>
              </div>

              <div className='flex gap-4 mt-6'>
                <Button
                  variant='outline'
                  onClick={onClose}
                  className='w-36 flex items-center gap-2'
                >
                  <XCircle className='w-5 h-5' />
                  Huỷ
                </Button>
                <ButtonCustom
                  isLoading={isDownloading}
                  className='w-36 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2'
                  onClick={handleDownloadDocument}
                  disabled={isDownloading}
                >
                  <DownloadCloud className='w-5 h-5' />
                  {isDownloading ? 'Đang tải...' : 'Xác nhận'}
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center text-gray-600'>Không có tài liệu nào được chọn.</div>
      )}
    </ModalCustom>
  );
};

export default DownloadConfirmModal;
