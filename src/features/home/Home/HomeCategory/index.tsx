import { BookOpen } from 'lucide-react';
import ContainerBox from '@/components/customs/ContainerBox';
import HeaderBox from '@/components/customs/HeaderBox';
import useCategoryStore from '@/stores/categoryStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';

const HomeCategory = () => {
  const { listCategories: category } = useCategoryStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <ContainerBox>
      <div className='mt-8'>
        <HeaderBox title='📚 Danh mục tài liệu 📚' />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className='min-h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse'
                >
                  <div className='w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mb-3' />
                  <div className='w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded-full' />
                </div>
              ))
            : category.map((item) => (
                <div
                  onClick={() =>
                    navigate(RoutePaths.CategoryDocuments.replace(':categorySlug', item.slug))
                  }
                  key={item.id}
                  className='min-h-24 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700'
                >
                  <BookOpen className='w-8 h-8 text-blue-500 mb-3' />
                  <span className='text-center text-sm font-medium text-gray-700 dark:text-gray-200'>
                    {item.name}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </ContainerBox>
  );
};

export default HomeCategory;
