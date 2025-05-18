/* eslint-disable @typescript-eslint/no-explicit-any */
import HeaderBox from '@/components/customs/HeaderBox';
import DocumentItem from '@/components/DocumentItem';
import DocumentItemSkeleton from '@/components/DocumentItemSkelton';
import DocumentService from '@/services/documentService';
import useDocumentStore from '@/stores/documentStore';
import type { IDocument } from '@/types/documentType';
import getAccessToken from '@/utils/getAccessToken';
import { FileX } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

interface SimilarDocumentProps {
  categorySlug: string;
  currentDocumentId: string;
}
const SimilarDocument = ({ categorySlug, currentDocumentId }: SimilarDocumentProps) => {
  const { listDocuments, setListDocuments } = useDocumentStore();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const accessToken = getAccessToken();
  // Lấy documents
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const response = accessToken
          ? await DocumentService.getAuthDocuments()
          : await DocumentService.getPublicDocuments();
        if (response) {
          const documents = response.data?.filter(
            (item: IDocument) => item.categorySlug === categorySlug,
          );
          // lay ra 6 tai lieu, loai bo tai lieu hien tai:
          const filteredDocuments = documents.filter(
            (item: IDocument) => item.id !== currentDocumentId,
          );
          const limitedDocuments = filteredDocuments.slice(0, 6);
          setListDocuments(limitedDocuments);
        } else {
          setListDocuments([]);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tài liệu');
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetchDocuments();
  }, [categorySlug, setListDocuments, accessToken, currentDocumentId]);
  return (
    <div>
      <HeaderBox
        title='Tài liệu tương tự'
        description='Các tài liệu tương tự bạn có thể tham khảo thêm'
      />
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='w-full'>
              <DocumentItemSkeleton />
            </div>
          ))}
        </div>
      ) : listDocuments.length > 0 ? (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {listDocuments.map((document) => (
              <DocumentItem document={document} key={document.id} />
            ))}
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400'>
          <FileX size={48} className='mb-4 text-gray-400 dark:text-gray-500' />
          <p className='text-lg font-semibold mb-1'>Oops!</p>
          <p className='text-sm'>Hiện chưa có tài liệu nào liên quan.</p>
        </div>
      )}
    </div>
  );
};

export default SimilarDocument;
