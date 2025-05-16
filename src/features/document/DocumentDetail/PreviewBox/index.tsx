/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import type { IDocument } from '@/types/documentType';
import { toast } from 'react-toastify';
import DocumentService from '@/services/documentService';
import { DownloadIcon } from 'lucide-react';
import ButtonCustom from '@/components/customs/ButtonCustom';

interface PreviewBoxProps {
  currentDocument: IDocument | null;
  onDownload?: () => void;
  isDownloading?: boolean;
}
const PreviewBox = ({ currentDocument, onDownload, isDownloading = false }: PreviewBoxProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Lấy preview PDF
  useEffect(() => {
    if (!currentDocument?.id) return;

    const fetchDocumentPreview = async () => {
      try {
        const response = await DocumentService.getDocumentPreview(currentDocument.id);
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tài liệu');
      }
    };
    fetchDocumentPreview();
  }, [currentDocument?.id, currentDocument?.fileType]);
  return (
    <div className='mt-6  rounded-lg overflow-hidden'>
      {previewUrl ? (
        <>
          <iframe
            src={`${previewUrl}#toolbar=0`}
            width='100%'
            height='600px'
            className='rounded-lg border'
            title='Document Preview'
          />
          <div className='mt-6 h-60 w-full flex flex-col gap-4 items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl border'>
            <span className='text-gray-600 dark:text-gray-300 text-base font-medium'>
              Để xem tài liệu đầy đủ, vui lòng tải về để xem
            </span>
            <ButtonCustom
              isLoading={isDownloading}
              onClick={onDownload}
              variant='default'
              size='lg'
              className='flex items-center gap-2'
            >
              <DownloadIcon className='w-5 h-5' />
              Tải tài liệu
            </ButtonCustom>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center h-full'>
          <span className='text-gray-500'>Đang tải tài liệu...</span>
        </div>
      )}
    </div>
  );
};

export default PreviewBox;
