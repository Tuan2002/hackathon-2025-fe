import ContainerBox from '@/components/customs/ContainerBox';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DocumentLayoutProps {
  children: React.ReactNode;
}

const category = [
  { id: '1', name: 'Công nghệ thông tin' },
  { id: '2', name: 'Khoa học tự nhiên' },
  { id: '3', name: 'Khoa học xã hội' },
  { id: '4', name: 'Kinh tế' },
  { id: '5', name: 'Ngôn ngữ' },
  { id: '6', name: 'Văn học' },
  { id: '7', name: 'Lịch sử' },
  { id: '8', name: 'Địa lý' },
  { id: '9', name: 'Giáo dục' },
  { id: '10', name: 'Nghệ thuật' },
  { id: '11', name: 'Thể thao' },
  { id: '12', name: 'Y học' },
  { id: '13', name: 'Tâm lý học' },
  { id: '14', name: 'Sách điện tử' },
  { id: '15', name: 'Luận văn, luận án' },
  { id: '16', name: 'Đề cương môn học' },
  { id: '17', name: 'Giáo trình điện tử' },
];

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
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
              {category.map((item) => (
                <Button
                  key={item.id}
                  variant='outline'
                  className='w-full justify-start border-gray-300 dark:border-gray-600 
                  hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition'
                >
                  {item.name}
                </Button>
              ))}
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
