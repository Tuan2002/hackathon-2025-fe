import { Card } from '@/components/ui/card';

const DocumentItemSkeleton = () => {
  return (
    <Card className='overflow-hidden shadow-md bg-white dark:bg-gray-800'>
      <div className='w-full h-44 bg-gray-200 dark:bg-gray-700 animate-pulse'></div>

      <div className='p-2 space-y-2'>
        <div className='h-5 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded'></div>
        <div className='h-5 w-2/3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded'></div>

        <div className='space-y-1 mt-2'>
          <div className='h-4 w-1/2 bg-gray-200 dark:bg-gray-700 animate-pulse rounded'></div>
          <div className='h-4 w-2/5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded'></div>
        </div>

        <div className='flex items-center justify-between mt-2'>
          <div className='h-4 w-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded'></div>
          <div className='h-4 w-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded'></div>
        </div>

        <div className='mt-3 h-9 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg'></div>
      </div>
    </Card>
  );
};

export default DocumentItemSkeleton;
