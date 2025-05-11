import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const categoryList = [
  'Công nghệ thông tin',
  'Khoa học tự nhiên',
  'Khoa học xã hội',
  'Kinh tế',
  'Ngôn ngữ',
  'Văn học',
  'Lịch sử',
  'Địa lý',
  'Giáo dục',
  'Nghệ thuật',
  'Thể thao',
  'Y học',
  'Tâm lý học',
  'Sách điện tử',
  'Luận văn, luận án',
  'Đề cương môn học',
  'Giáo trình điện tử',
];

const MainFooter = () => {
  return (
    <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12'>
      <div className='max-w-7xl mx-auto  py-10 grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Cột Danh mục (chiếm 2 phần) */}
        <div className='md:col-span-2'>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center'>
            Danh mục tài liệu
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm text-gray-600 dark:text-gray-400'>
            {categoryList.map((item, index) => (
              <a key={index} href='#' className='hover:text-blue-500'>
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Cột Liên hệ */}
        <div>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4'>Liên hệ</h2>
          <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
            <li>Email: tailieuonline@gmail.com</li>
            <li>Hotline: 0123 456 789</li>
            <li>Địa chỉ: TP. Hồ Chí Minh</li>
          </ul>
        </div>

        {/* Cột Theo dõi */}
        <div>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4'>Theo dõi</h2>
          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
            Theo dõi chúng tôi qua các nền tảng:
          </p>
          <div className='flex space-x-4'>
            <a href='#' className='text-gray-600 dark:text-gray-400 hover:text-blue-500 transition'>
              <Facebook />
            </a>
            <a href='#' className='text-gray-600 dark:text-gray-400 hover:text-pink-500 transition'>
              <Instagram />
            </a>
            <a href='#' className='text-gray-600 dark:text-gray-400 hover:text-blue-700 transition'>
              <Linkedin />
            </a>
            <a href='#' className='text-gray-600 dark:text-gray-400 hover:text-red-500 transition'>
              <Mail />
            </a>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 dark:border-gray-700 mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400'>
        © {new Date().getFullYear()} Tài liệu Online. All rights reserved.
      </div>
    </footer>
  );
};

export default MainFooter;
