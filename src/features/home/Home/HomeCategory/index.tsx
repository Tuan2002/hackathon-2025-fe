import { BookOpen } from 'lucide-react';
import ContainerBox from '@/components/customs/ContainerBox';
import HeaderBox from '@/components/customs/HeaderBox';

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

const HomeCategory = () => {
  return (
    <ContainerBox>
      <div className='mt-8'>
        <HeaderBox title='📚 Danh mục tài liệu 📚' />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {category.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700'
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
