import ContainerBox from '@/components/customs/ContainerBox';
import HeaderBox from '@/components/customs/HeaderBox';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { Star } from 'lucide-react';

const feedbackList = [
  {
    id: 1,
    avatar: '/avatars/1.jpg',
    name: 'Nguyễn Tạ Quyền',
    rating: 3,
    content: 'aaa',
  },
  {
    id: 2,
    avatar: '/avatars/2.jpg',
    name: 'NGUYỄN NGỌC ANH TUẤN',
    rating: 5,
    content: 'Đề thi chất lượng, sát với thực tế',
  },
  {
    id: 3,
    avatar: '/avatars/3.jpg',
    name: 'Nguyễn Tạ Quyền',
    rating: 5,
    content: '5 sao về chất lượng. Tôi đã luyện thi ở đây và may mắn vượt qua kỳ thi.',
  },
  {
    id: 4,
    avatar: '/avatars/4.jpg',
    name: 'Nguyễn Thị Ngân',
    rating: 5,
    content: 'Giao diện website sát với phần mềm thi chứng chỉ tiếng Anh B1 của trường.',
  },
  {
    id: 5,
    avatar: '/avatars/1.jpg',
    name: 'Lê Văn An',
    rating: 4,
    content: 'Tài liệu hay, bố cục rõ ràng dễ tiếp thu.',
  },
  {
    id: 6,
    avatar: '/avatars/2.jpg',
    name: 'Phạm Thị Hồng',
    rating: 5,
    content: 'Rất hữu ích cho sinh viên ôn thi cuối kỳ.',
  },
  {
    id: 7,
    avatar: '/avatars/3.jpg',
    name: 'Võ Minh Khôi',
    rating: 4,
    content: 'Nội dung phong phú, dễ tra cứu.',
  },
  {
    id: 8,
    avatar: '/avatars/4.jpg',
    name: 'Trần Thị Bích',
    rating: 5,
    content: 'Hỗ trợ nhanh, website trực quan.',
  },
  {
    id: 9,
    avatar: '/avatars/1.jpg',
    name: 'Nguyễn Văn Bình',
    rating: 5,
    content: 'Tôi đã tìm được nhiều tài liệu quý.',
  },
  {
    id: 10,
    avatar: '/avatars/2.jpg',
    name: 'Lê Thị Mai',
    rating: 4,
    content: 'Nền tảng hữu ích cho sinh viên.',
  },
];

function HomeFeedback() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 10 },
      },
      '(min-width: 769px) and (max-width: 900px)': {
        slides: { perView: 2, spacing: 15 },
      },
      '(min-width: 901px) and (max-width: 1024px)': {
        slides: { perView: 3, spacing: 20 },
      },
    },
    loop: true,
  });

  return (
    <ContainerBox>
      <div className='mt-16'>
        <HeaderBox
          title='Những phản hồi từ người dùng'
          description='Chúng tôi luôn lắng nghe và cải thiện dịch vụ của mình để phục vụ bạn tốt nhất.'
        />
        <div ref={sliderRef} className='keen-slider p-2 -m-2'>
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className='keen-slider__slide bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col items-center'
            >
              <img
                src={item.avatar}
                alt={item.name}
                className='w-16 h-16 rounded-full object-cover mb-4'
              />
              <h3 className='text-base font-semibold text-gray-800 dark:text-gray-100 mb-1'>
                {item.name}
              </h3>
              <div className='flex items-center mb-3'>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < item.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill={idx < item.rating ? '#facc15' : 'none'}
                  />
                ))}
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-300 text-center italic'>
                "{item.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </ContainerBox>
  );
}

export default HomeFeedback;
