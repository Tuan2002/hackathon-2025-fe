import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, FilePlus, BarChart } from 'lucide-react';
const EnumerationBox = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
      <Card className='shadow-md dark:bg-gray-800'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-base'>Người dùng mới</CardTitle>
          <Users className='w-6 h-6 text-blue-600 dark:text-blue-400' />
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>123</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Trong tháng này</p>
        </CardContent>
      </Card>

      <Card className='shadow-md dark:bg-gray-800'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-base'>Tổng tài liệu</CardTitle>
          <BookOpen className='w-6 h-6 text-green-600 dark:text-green-400' />
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>560</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Tài liệu hiện có</p>
        </CardContent>
      </Card>

      <Card className='shadow-md dark:bg-gray-800'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-base'>Lượt truy cập</CardTitle>
          <BarChart className='w-6 h-6 text-orange-500 dark:text-orange-400' />
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>8500</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Trong tháng này</p>
        </CardContent>
      </Card>

      <Card className='shadow-md dark:bg-gray-800'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-base'>Tài liệu mới</CardTitle>
          <FilePlus className='w-6 h-6 text-purple-600 dark:text-purple-400' />
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold'>35</p>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Trong tuần này</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnumerationBox;
