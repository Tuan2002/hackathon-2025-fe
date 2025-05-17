/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DownloadIcon, FileTextIcon, HeartIcon } from 'lucide-react';
import type { IDocument } from '@/types/documentType';
import useDocumentStore from '@/stores/documentStore';
import ButtonCustom from '@/components/customs/ButtonCustom';
import useAccountStore from '@/stores/accountStore';
import { toast } from 'react-toastify';

interface InfomationBoxProps {
  currentDocument: IDocument | null;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  isLoadingFavorite?: boolean;
  onDownload?: () => void;
  isDownloading?: boolean;
}

const InfomationBox = ({
  currentDocument,
  isFavorite = false,
  onFavoriteToggle,
  isLoadingFavorite = false,
  onDownload,
  isDownloading = false,
}: InfomationBoxProps) => {
  const { setOpenModalShowSummaryDocument } = useDocumentStore();
  const { currentUser } = useAccountStore();

  const renderRow = (label: string, value: any) => (
    <div className='flex items-center gap-3'>
      <Label className='w-24'>{label}:</Label>
      <div className='flex-1 text-justify'>{value}</div>
    </div>
  );

  const handleShowSummary = () => {
    if (!currentUser?.id) {
      toast.error('Vui lòng đăng nhập để xem tóm tắt tài liệu');
      return;
    }
    setOpenModalShowSummaryDocument(true);
  };

  const handleDownload = () => {
    if (!currentUser?.id) {
      toast.error('Vui lòng đăng nhập để tải tài liệu');
      return;
    }
    onDownload?.();
  };

  return (
    <div className='flex gap-6'>
      {/* Ảnh */}
      <div className='relative w-64 h-96'>
        <img
          src={currentDocument?.image}
          alt={currentDocument?.name}
          className='w-full h-full object-cover rounded-lg border'
        />

        {/* Icon trái tim */}
        <button
          className='absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white transition'
          aria-label='Yêu thích'
        >
          <HeartIcon
            className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      {/* Thông tin */}
      <div className='space-y-3 flex-1'>
        {renderRow('Tên tài liệu', currentDocument?.name)}
        {renderRow('Mô tả ngắn', currentDocument?.shortDescription)}
        <Separator />
        {renderRow('Danh mục', currentDocument?.categoryName)}
        {renderRow('Tác giả', currentDocument?.authorName)}
        {renderRow('Nhà xuất bản', currentDocument?.publisherName)}
        <Separator />
        {renderRow('Lượt xem', currentDocument?.viewCount)}
        {renderRow('Lượt tải', currentDocument?.downloadCount)}
        <Separator />

        <div className='flex items-center gap-3'>
          {/* Nút yêu thích */}
          {currentUser?.id && (
            <ButtonCustom
              isLoading={isLoadingFavorite}
              variant={isFavorite ? 'default' : 'outline'}
              className={`gap-2 ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'text-red-500 border-red-300 hover:bg-red-50'}`}
              onClick={onFavoriteToggle}
            >
              <HeartIcon className='w-5 h-5' />
              <span className='text-sm'>{isFavorite ? 'Đã yêu thích' : 'Yêu thích'}</span>
            </ButtonCustom>
          )}

          {/* Nút xem tóm tắt */}
          <Button
            onClick={handleShowSummary}
            variant='secondary'
            className='flex items-center gap-2'
          >
            <FileTextIcon className='w-5 h-5' />
            Xem tóm tắt
          </Button>

          {/* Nút tải về */}
          <ButtonCustom
            onClick={handleDownload}
            isLoading={isDownloading}
            variant='default'
            className='flex items-center gap-2'
          >
            <DownloadIcon className='w-5 h-5' />
            <span className='text-sm'>Tải tài liệu</span>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default InfomationBox;
