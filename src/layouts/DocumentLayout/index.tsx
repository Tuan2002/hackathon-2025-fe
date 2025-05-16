import ContainerBox from '@/components/customs/ContainerBox';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import useCategoryStore from '@/stores/categoryStore';
import { Link } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';

interface DocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
  const { listCategories } = useCategoryStore();
  return (
    <ContainerBox>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {/* Cột trái: danh mục */}
        <div className='md:col-span-1 space-y-4'>
          <Card className='p-3 shadow-lg bg-white dark:bg-gray-800 space-y-3'>
            <h5 className='uppercase text-center pb-1 border-b-[1px] border-b-gray-200 dark:border-b-gray-600'>
              Tìm kiếm tài liệu
            </h5>
            <div className='flex items-center gap-2 relative'>
              <Input
                type='text'
                placeholder='Tìm tài liệu...'
                className='bg-gray-100 dark:bg-gray-700 border-none focus:ring-0 text-sm'
              />
              <span className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center'>
                <Search className='text-gray-500 dark:text-gray-400' />
              </span>
            </div>

            {/* Nút tìm kiếm */}
            <Button className='w-full' variant='default'>
              Tìm kiếm
            </Button>
          </Card>

          <Card className='p-2 space-y-2 shadow-lg bg-white dark:bg-gray-800'>
            <h5 className='uppercase text-center pb-1 border-b-[1px] border-b-gray-200 dark:border-b-gray-600'>
              Danh mục tài liệu
            </h5>
            <div className='space-y-2'>
              {listCategories.length > 0 ? (
                <>
                  <Link
                    to={RoutePaths.Document}
                    className='block px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out font-medium shadow-sm 
    bg-gray-100 dark:bg-gray-800 
    text-gray-700 dark:text-gray-300 
    hover:bg-purple-50 dark:hover:bg-purple-900/30 
    hover:text-purple-600 dark:hover:text-purple-400'
                  >
                    Tất cả tài liệu
                  </Link>
                  {listCategories.map((item) => (
                    <Link
                      to={`${RoutePaths.CategoryDocuments.replace(':categorySlug', item.slug)}`}
                      key={item.id}
                      className='block px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out font-medium shadow-sm 
    bg-gray-100 dark:bg-gray-800 
    text-gray-700 dark:text-gray-300 
    hover:bg-purple-50 dark:hover:bg-purple-900/30 
    hover:text-purple-600 dark:hover:text-purple-400'
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              ) : (
                <div>
                  {/* skeleton */}
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                  <div className='h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Cột phải: nội dung */}
        <div className='md:col-span-3'>{children}</div>
      </div>
    </ContainerBox>
  );
};

export default DocumentLayout;
