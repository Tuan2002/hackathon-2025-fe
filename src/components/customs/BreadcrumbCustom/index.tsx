import { ArrowLeft, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

interface BreadcrumbCustomProps {
  items: Array<{ label: string; path: string }>;
  onBack?: () => void;
}

const BreadcrumbCustom = ({ items, onBack }: BreadcrumbCustomProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return (
    <div className='w-full bg-white dark:bg-gray-800 rounded-xl px-4 py-1 shadow-sm border dark:border-gray-700 mb-4 flex items-center gap-3 overflow-x-auto no-scrollbar'>
      {/* Nút Back */}
      <Button
        variant='outline'
        size='icon'
        onClick={handleBack}
        className='border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition shrink-0'
      >
        <ArrowLeft size={18} className='text-gray-800 dark:text-gray-200' />
      </Button>
      <Breadcrumb className='h-14 flex items-center text-sm font-medium'>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to='/'
              className='flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition'
            >
              <Home size={18} />
              <span>Trang chủ</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <div key={index} className='flex items-center'>
            <BreadcrumbSeparator className='mx-2 text-gray-500 dark:text-gray-400'>
              {'>'}
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={item.path}
                  className='text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition'
                >
                  {item.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbCustom;
