/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BreadcrumbCustom from '@/components/customs/BreadcrumbCustom';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import DocumentLayout from '@/layouts/DocumentLayout';
import RoutePaths from '@/routes/routePaths';
import DocumentService from '@/services/documentService';
import useCategoryStore from '@/stores/categoryStore';
import useDocumentStore from '@/stores/documentStore';
import InfomationBox from './InfomationBox';
import PreviewBox from './PreviewBox';
import ShowSummaryModal from './ModalShowSummary';
import getAccessToken from '@/utils/getAccessToken';
import CommentBox from './CommentBox';
import SimilarDocument from './SimilarDocument';
import ChatBotPopover from '../../../components/ChatbotBox';
import DownloadConfirmModal from './ModalDownloadDocument';

const DocumentDetail = () => {
  const { documentSlug, categorySlug } = useParams<{
    documentSlug: string;
    categorySlug: string;
  }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState<boolean>(false);
  const accessToken = getAccessToken();

  const {
    currentDocument,
    setCurrentDocument,
    openModalShowSummaryDocument,
    setOpenModalShowSummaryDocument,
    openModalDownloadDocument,
    setOpenModalDownloadDocument,
  } = useDocumentStore();
  const { listCategories } = useCategoryStore();

  const handleCloseModalSummary = () => {
    setOpenModalShowSummaryDocument(false);
  };

  const handleOpenModalDownloadDocument = () => {
    setOpenModalDownloadDocument(true);
    console.log('open modal download');
  };
  const handleCloseModalDownloadDocument = () => {
    setOpenModalDownloadDocument(false);
  };

  const handleToggleFavoriteDocument = async () => {
    if (!currentDocument?.id) return;
    setIsLoadingFavorite(true);
    try {
      const response = await DocumentService.favoriteDocument(currentDocument?.id || '');
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success(response.message);
        setTimeout(() => setIsFavorite((prev) => !prev), 2000);
      } else {
        toast.error(response?.message || 'Có lỗi xảy ra trong quá trình tải tài liệu');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tài liệu');
    } finally {
      setTimeout(() => setIsLoadingFavorite(false), 2000);
    }
  };

  // Lấy tài liệu
  useEffect(() => {
    if (!documentSlug) return;
    const fetchDocument = async () => {
      setIsLoading(true);
      try {
        const response = accessToken
          ? await DocumentService.getAuthDocumentBySlug(documentSlug)
          : await DocumentService.getDocumentBySlug(documentSlug);
        if (response.statusCode === 200 || response.statusCode === 201) {
          setCurrentDocument(response.data);
          setIsFavorite(response.data.isFavorite);
        } else {
          setCurrentDocument(null);
          toast.error(response?.message || 'Không tìm thấy tài liệu');
        }
      } catch (error: any) {
        setCurrentDocument(null);
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tài liệu');
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetchDocument();
  }, [documentSlug, setCurrentDocument, accessToken]);

  // Breadcrumb items
  const breadcrumItems = useMemo(() => {
    const currentCategory = listCategories.find((item) => item.slug === categorySlug);
    return [
      {
        label: 'Tài liệu',
        path: RoutePaths.Document,
      },
      {
        label: currentCategory?.name || 'Danh mục tài liệu',
        path: RoutePaths.CategoryDocuments.replace(':categorySlug', categorySlug || ''),
      },
      {
        label: currentDocument?.name || 'Chi tiết tài liệu',
        path: RoutePaths.DocumentDetail.replace(':categorySlug', categorySlug || '').replace(
          ':documentSlug',
          documentSlug || '',
        ),
      },
    ];
  }, [documentSlug, categorySlug, currentDocument, listCategories]);
  return (
    <DocumentLayout>
      {!isLoading ? (
        <>
          <BreadcrumbCustom items={breadcrumItems} />

          <InfomationBox
            onDownload={handleOpenModalDownloadDocument}
            isFavorite={isFavorite}
            onFavoriteToggle={handleToggleFavoriteDocument}
            currentDocument={currentDocument}
            isLoadingFavorite={isLoadingFavorite}
          />

          {/* Mô tả */}
          <div className='mt-4'>
            <Label className='text-lg'>Thông tin mô tả chi tiết</Label>
            <div className='mt-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 whitespace-pre-line text-justify'>
              {currentDocument?.description || 'Chưa có mô tả'}
            </div>
          </div>

          {/* PDF Preview */}
          <PreviewBox
            onDownload={handleOpenModalDownloadDocument}
            currentDocument={currentDocument}
          />

          {/* Bình luận */}
          <CommentBox documentId={currentDocument?.id} />

          {/* Tài liệu tương tự */}
          <SimilarDocument
            currentDocumentId={currentDocument?.id as string}
            categorySlug={categorySlug as string}
          />

          {/* Chatbot */}
          {currentDocument?.id && <ChatBotPopover documentId={currentDocument?.id} />}

          {/* Modal summary */}
          <ShowSummaryModal
            documentId={currentDocument?.id}
            open={openModalShowSummaryDocument}
            onClose={handleCloseModalSummary}
          />

          {/* Modal download */}
          <DownloadConfirmModal
            open={openModalDownloadDocument}
            onClose={handleCloseModalDownloadDocument}
            currentDocument={currentDocument}
          />
        </>
      ) : (
        <>
          <div className='bg-gray-200 w-full h-16 animate-pulse rounded-lg'></div>
          <div className='flex gap-6 mt-4'>
            <div className='bg-gray-200 w-64 h-96 animate-pulse rounded-lg'></div>
            <div className='w-full'>
              <div className='space-y-3'>
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <Separator />
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <Separator />
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
                <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='mt-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 whitespace-pre-line text-justify'>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='mt-2 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 whitespace-pre-line text-justify'>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
              <div className='bg-gray-200 w-full h-6 animate-pulse rounded-lg mt-2'></div>
            </div>
          </div>
        </>
      )}
    </DocumentLayout>
  );
};

export default DocumentDetail;
