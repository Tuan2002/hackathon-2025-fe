/* eslint-disable @typescript-eslint/no-explicit-any */
import HeaderBox from '@/components/customs/HeaderBox';
import PaginationCustom from '@/components/customs/PaginationCustom';
import DocumentItem from '@/components/DocumentItem';
import DocumentItemSkeleton from '@/components/DocumentItemSkelton';
import DocumentLayout from '@/layouts/DocumentLayout';
import DocumentService from '@/services/documentService';
import useCategoryStore from '@/stores/categoryStore';
import useDocumentStore from '@/stores/documentStore';
import type { IDocument } from '@/types/documentType';
import getAccessToken from '@/utils/getAccessToken';
import { FileX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DocumentCategory = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { currentCategory, setCurrentCategory, listCategories } = useCategoryStore();
  const { listDocuments, setListDocuments } = useDocumentStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const accessToken = getAccessToken();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchValue = query.get('search');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Tìm category theo slug khi slug hoặc listCategories thay đổi
  useEffect(() => {
    if (categorySlug) {
      const category = listCategories.find((item) => item.slug === categorySlug);
      if (category) {
        setCurrentCategory(category);
      }
    }
  }, [categorySlug, listCategories, setCurrentCategory]);

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
          if (searchValue) {
            const filteredDocuments = response.data?.filter((item: IDocument) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            console.log('Filtered documents:', filteredDocuments);
            console.log('Documents:', documents);
            console.log('Search value:', searchValue);
            setListDocuments(filteredDocuments);
            return;
          }
          setListDocuments(categorySlug && currentCategory?.id ? documents : response.data);
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
  }, [categorySlug, currentCategory?.id, setListDocuments, accessToken, searchValue]);

  // Tính documents theo trang
  const paginatedDocuments = listDocuments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <DocumentLayout>
      <div>
        {categorySlug && !currentCategory ? (
          <div className='flex flex-col items-center justify-center mt-10'>
            <div className='h-10 w-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md'></div>
            <div className='h-10 w-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
            <div className='h-10 w-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          </div>
        ) : (
          <HeaderBox
            title={categorySlug ? currentCategory?.name : 'Tất cả tài liệu'}
            description={
              categorySlug
                ? currentCategory?.description
                : 'Dưới đây là tất cả các tài liệu có sẵn trong hệ thống.'
            }
          />
        )}
      </div>

      <div>
        {isLoading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: pageSize }).map((_, index) => (
              <div key={index} className='w-full'>
                <DocumentItemSkeleton />
              </div>
            ))}
          </div>
        ) : listDocuments.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {paginatedDocuments.map((document) => (
                <DocumentItem document={document} key={document.id} />
              ))}
            </div>

            {/* Custom Pagination */}
            <PaginationCustom
              totalItems={listDocuments.length}
              pageSizeOptions={[5, 10, 15, 20]}
              defaultPageSize={10}
              onChangePage={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
            />
          </>
        ) : (
          <div className='flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400'>
            <FileX size={48} className='mb-4 text-gray-400 dark:text-gray-500' />
            <p className='text-lg font-semibold mb-1'>Oops!</p>
            <p className='text-sm'>Hiện chưa có tài liệu nào trong mục này.</p>
          </div>
        )}
      </div>
    </DocumentLayout>
  );
};

export default DocumentCategory;
