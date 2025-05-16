import ButtonCustom from '@/components/customs/ButtonCustom';
import CategoryService from '@/services/categoryService';
import { useState } from 'react';
import { toast } from 'react-toastify';

const seedCategoryData = [
  {
    name: 'Công nghệ thông tin',
    description:
      'Tài liệu, sách chuyên ngành về lập trình, phần mềm, mạng máy tính và các công nghệ số.',
  },
  {
    name: 'Khoa học tự nhiên',
    description:
      'Tổng hợp sách và tài liệu về Toán, Lý, Hóa, Sinh, và các ngành khoa học nghiên cứu tự nhiên.',
  },
  {
    name: 'Khoa học xã hội',
    description:
      'Tài liệu nghiên cứu về lịch sử, văn hóa, xã hội học, nhân học và các ngành khoa học con người.',
  },
  {
    name: 'Kinh tế',
    description:
      'Sách và tài liệu về quản trị kinh doanh, tài chính, marketing, kinh tế học và thương mại.',
  },
  {
    name: 'Ngôn ngữ',
    description: 'Tài liệu học ngoại ngữ, từ điển, ngữ pháp và nghiên cứu ngôn ngữ học.',
  },
  {
    name: 'Văn học',
    description:
      'Tuyển tập tiểu thuyết, truyện ngắn, thơ, phê bình và nghiên cứu văn học trong và ngoài nước.',
  },
  {
    name: 'Lịch sử',
    description:
      'Sách và tài liệu nghiên cứu, biên niên sử, tiểu sử và các sự kiện lịch sử Việt Nam và thế giới.',
  },
  {
    name: 'Địa lý',
    description:
      'Tài liệu về vị trí địa lý, khí hậu, dân cư và các nghiên cứu chuyên sâu về trái đất và lãnh thổ.',
  },
  {
    name: 'Giáo dục',
    description: 'Giáo trình, đề cương, tài liệu giảng dạy và nghiên cứu phương pháp giáo dục.',
  },
  {
    name: 'Nghệ thuật',
    description:
      'Tài liệu về hội họa, âm nhạc, điêu khắc, sân khấu và các loại hình nghệ thuật khác.',
  },
  {
    name: 'Thể thao',
    description:
      'Sách, giáo trình và tài liệu huấn luyện, lý thuyết về các bộ môn thể thao trong và ngoài nước.',
  },
  {
    name: 'Y học',
    description:
      'Tài liệu chuyên ngành về y học, dược học, điều dưỡng và các lĩnh vực chăm sóc sức khỏe.',
  },
  {
    name: 'Tâm lý học',
    description:
      'Sách và nghiên cứu về tâm lý học, tư vấn tâm lý, phân tích hành vi và trị liệu tâm lý.',
  },
  {
    name: 'Sách điện tử',
    description:
      'Các tài liệu, sách và giáo trình được phát hành dưới định dạng số (ebook, PDF, EPUB...).',
  },
  {
    name: 'Luận văn, luận án',
    description: 'Tổng hợp các công trình nghiên cứu học thuật cấp đại học và sau đại học.',
  },
  {
    name: 'Đề cương môn học',
    description:
      'Hệ thống đề cương, đề bài, kế hoạch giảng dạy và học tập các môn học trong chương trình đào tạo.',
  },
  {
    name: 'Giáo trình điện tử',
    description:
      'Tài liệu bài giảng số hóa, tích hợp hình ảnh, video và các tài nguyên học tập trực tuyến.',
  },
];

const SeedCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleImportData = async () => {
    setIsLoading(true);
    try {
      seedCategoryData.forEach(async (category) => {
        const response = await CategoryService.createCategory(category);
        console.log('response', response);
      });
    } catch {
      toast.error('Có lỗi xảy ra trong quá trình nhập dữ liệu');
    } finally {
      setIsLoading(false);
      toast.info('OK');
    }
  };
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4'>
      <h3>3. Nhập dữ liệu các danh mục</h3>
      <ButtonCustom isLoading={isLoading}>
        <span className='text-sm' onClick={handleImportData}>
          Nhập dữ liệu
        </span>
      </ButtonCustom>
    </div>
  );
};

export default SeedCategory;
