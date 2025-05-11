import { Eye, Heart } from 'lucide-react';
import ContainerBox from '@/components/customs/ContainerBox';
import HeaderBox from '@/components/customs/HeaderBox';

const hotDocuments = [
  {
    id: '1',
    name: 'Giáo trình Lập trình Web hiện đại với ReactJS và NodeJS',
    views: 1234,
    likes: 340,
    thumbnail: '/home-banner/1.png',
  },
  {
    id: '2',
    name: 'Tài liệu Hệ điều hành - Đại học Công nghệ',
    views: 890,
    likes: 210,
    thumbnail: '/home-banner/2.png',
  },
  {
    id: '3',
    name: 'Đề thi cuối kỳ Cơ sở dữ liệu có đáp án',
    views: 765,
    likes: 198,
    thumbnail: '/home-banner/2.png',
  },
  {
    id: '4',
    name: 'Sách Machine Learning cơ bản đến nâng cao',
    views: 650,
    likes: 276,
    thumbnail: '/home-banner/1.png',
  },
  {
    id: '5',
    name: 'Slide bài giảng Nhập môn Trí tuệ Nhân tạo',
    views: 980,
    likes: 305,
    thumbnail: '/home-banner/2.png',
  },
  {
    id: '6',
    name: 'Bộ đề ôn tập Kiến trúc Máy tính có lời giải chi tiết',
    views: 732,
    likes: 192,
    thumbnail: '/home-banner/1.png',
  },
  {
    id: '7',
    name: 'Tóm tắt Giáo trình Xác suất Thống kê',
    views: 845,
    likes: 220,
    thumbnail: '/home-banner/2.png',
  },
  {
    id: '8',
    name: 'Sổ tay Thuật toán: Phân tích & Cài đặt',
    views: 1100,
    likes: 415,
    thumbnail: '/home-banner/2.png',
  },
];

const HomeHotDocument = () => {
  return (
    <ContainerBox>
      <div className='mt-8'>
        <HeaderBox title='🔥 Tài liệu nổi bật 🔥' />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {hotDocuments.map((doc) => (
            <div
              key={doc.id}
              className='bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden'
            >
              <img src={doc.thumbnail} alt={doc.name} className='w-full h-40 object-cover' />
              <div className='p-4 flex flex-col justify-between'>
                <h3 className='text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 h-12'>
                  {doc.name}
                </h3>
                <div className='mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                  <span className='flex items-center gap-1'>
                    <Eye className='w-4 h-4' /> {doc.views.toLocaleString()}
                  </span>
                  <span className='flex items-center gap-1'>
                    <Heart className='w-4 h-4 text-red-500' /> {doc.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContainerBox>
  );
};

export default HomeHotDocument;
