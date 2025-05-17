/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileX } from 'lucide-react';
import ContainerBox from '@/components/customs/ContainerBox';
import HeaderBox from '@/components/customs/HeaderBox';
import { useEffect, useState } from 'react';
import DocumentItemSkeleton from '@/components/DocumentItemSkelton';
import DocumentItem from '@/components/DocumentItem';
import type { IDocument } from '@/types/documentType';
import DocumentService from '@/services/documentService';
import getAccessToken from '@/utils/getAccessToken';
import { toast } from 'react-toastify';

const HomeHotDocument = () => {
  const [hotDocuments, setHotDocuments] = useState<IDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = getAccessToken();

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const response = accessToken
          ? await DocumentService.getAuthDocuments()
          : await DocumentService.getPublicDocuments();
        if (response) {
          // Lấy 6 tài liệu có downloadCount và favoriteCount lớn nhất:
          const sortedDocuments = response.data
            .sort((a: IDocument, b: IDocument) => {
              const aCount = a.downloadCount + a.favoriteCount;
              const bCount = b.downloadCount + b.favoriteCount;
              return bCount - aCount;
            })
            .slice(0, 8);
          setHotDocuments(sortedDocuments);
        } else {
          setHotDocuments([]);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tài liệu');
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetchDocuments();
  }, [setHotDocuments, accessToken]);

  return (
    <ContainerBox>
      <div className='mt-8'>
        <HeaderBox title='🔥 Tài liệu nổi bật 🔥' />
        <div>
          {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='w-full'>
                  <DocumentItemSkeleton />
                </div>
              ))}
            </div>
          ) : hotDocuments.length > 0 ? (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {hotDocuments.map((document) => (
                  <DocumentItem document={document} key={document.id} />
                ))}
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400'>
              <FileX size={48} className='mb-4 text-gray-400 dark:text-gray-500' />
              <p className='text-lg font-semibold mb-1'>Oops!</p>
              <p className='text-sm'>Hiện chưa có tài liệu nào trong mục này.</p>
            </div>
          )}
        </div>
      </div>
    </ContainerBox>
  );
};

export default HomeHotDocument;
