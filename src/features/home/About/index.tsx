import ContainerBox from '@/components/customs/ContainerBox';
import HeaderBox from '@/components/customs/HeaderBox';
import { BookOpen, Star, Users, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
function About() {
  const [rating, setRating] = useState(0);

  return (
    <ContainerBox>
      <div className='mt-10 space-y-16'>
        {/* Banner */}
        <div className='relative h-64 rounded-2xl overflow-hidden shadow-lg'>
          <img
            src='/home-banner/1.png'
            alt='Library Banner'
            className='object-cover w-full h-full'
          />
          <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Thư viện Điện tử</h1>
            <p className='text-gray-200 text-sm md:text-base max-w-xl'>
              Nơi chia sẻ tài liệu, đề thi và học liệu trực tuyến cho sinh viên & giảng viên.
            </p>
          </div>
        </div>

        {/* Tầm Nhìn & Sứ Mệnh */}
        <section className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <HeaderBox title='Tầm nhìn và sứ mệnh' />
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-center'>
              Thư viện Điện tử được xây dựng với mục tiêu tạo ra không gian chia sẻ tri thức hiện
              đại, kết nối cộng đồng học thuật và sinh viên trên cả nước. Chúng tôi hướng đến việc
              số hóa nguồn tài liệu, đề thi chất lượng cao và xây dựng nền tảng tra cứu tối ưu.
            </p>
          </div>
          <img
            src='/home-banner/2.png'
            alt='Vision'
            className='rounded-xl shadow-lg object-cover w-full h-64'
          />
        </section>

        {/* Tính năng nổi bật */}
        <section>
          <HeaderBox title='Tính năng nổi bật' />
          <div className='grid md:grid-cols-4 gap-6'>
            <div className='p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:scale-105 transition'>
              <Search className='w-10 h-10 text-blue-500 mb-4' />
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Tìm kiếm dễ dàng
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Nhanh chóng tìm kiếm và tải về hàng ngàn tài liệu theo chuyên mục.
              </p>
            </div>
            <div className='p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:scale-105 transition'>
              <BookOpen className='w-10 h-10 text-green-500 mb-4' />
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Kho đề thi chất lượng
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Cung cấp đề thi thử và đề thi thật các kỳ thi quan trọng.
              </p>
            </div>
            <div className='p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:scale-105 transition'>
              <Users className='w-10 h-10 text-purple-500 mb-4' />
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Cộng đồng học thuật
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Nơi sinh viên & giảng viên trao đổi, chia sẻ kiến thức và kinh nghiệm.
              </p>
            </div>
            <div className='p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:scale-105 transition'>
              <Star className='w-10 h-10 text-yellow-500 mb-4' />
              <h3 className='font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Chất lượng kiểm duyệt
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Tài liệu được kiểm duyệt, phân loại rõ ràng và cập nhật liên tục.
              </p>
            </div>
          </div>
        </section>

        {/* Định hướng phát triển */}
        <section className='grid md:grid-cols-2 gap-12 items-center'>
          <img
            src='/home-banner/1.png'
            alt='Development'
            className='rounded-xl shadow-lg object-cover w-full h-64'
          />
          <div>
            <HeaderBox title='Định hướng phát triển' />
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-center'>
              Trong tương lai, Thư viện Điện tử sẽ mở rộng kho tài liệu với nhiều lĩnh vực hơn, tích
              hợp công nghệ AI tra cứu thông minh, nâng cao trải nghiệm người dùng và phát triển
              cộng đồng học thuật trực tuyến ngày càng vững mạnh. Đồng thời, hệ thống sẽ tối ưu giao
              diện và tương thích nhiều thiết bị để phục vụ tốt nhất cho người dùng mọi lúc, mọi
              nơi.
            </p>
          </div>
        </section>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-10'>
          {/* Form Liên hệ */}
          <div className='flex justify-center'>
            <Card className='shadow-lg max-w-md w-full'>
              <HeaderBox title='Liên hệ' />
              <CardContent className='space-y-4'>
                <Input placeholder='Họ và tên' required />
                <Input type='email' placeholder='Email' required />
                <Input type='tel' placeholder='Số điện thoại' required />
                <Textarea placeholder='Thông tin phản hồi' rows={4} required />
                <Button className='w-full bg-green-500 hover:bg-green-600'>Gửi phản hồi</Button>
              </CardContent>
            </Card>
          </div>

          {/* Form Đánh giá */}
          <div className='flex justify-center'>
            <Card className='shadow-lg max-w-md w-full'>
              <HeaderBox title='Đánh giá về chúng tôi' />
              <CardContent className='space-y-4 flex flex-col items-center'>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${
                        i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                      }`}
                      onClick={() => setRating(i)}
                    />
                  ))}
                </div>
                <Textarea placeholder='Hãy để lại cảm nhận của bạn...' rows={4} />
                <Button className='w-full bg-green-500 hover:bg-green-600'>Đánh giá</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ContainerBox>
  );
}

export default About;
