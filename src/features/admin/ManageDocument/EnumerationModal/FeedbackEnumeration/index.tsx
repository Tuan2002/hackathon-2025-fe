import { useMemo, useState } from 'react';

import { Star } from 'lucide-react';
import TableCustom from '@/components/customs/TableCustom';
import type { IFeedback } from '@/types/feedbackType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import dayjs from 'dayjs';

interface FeedbackEnumerationTabProps {
  documentId?: string;
}

const listFeedbacks = [
  // Mảng trống
  [],

  // Mảng 1 feedback
  [
    {
      id: '1',
      reviewerId: 'ta2k3quyen',
      reviewerName: 'Nguyễn Tạ Quyền',
      reviewerAvatar: 'https://example.com/avatar1.jpg',
      star: 5,
      content: 'Quá xuất sắc, đáng đọc!',
      createdAt: '2025-05-16T08:30:00Z',
    },
  ],

  // Mảng 2 feedback
  [
    {
      id: '2',
      reviewerId: 'tuananh',
      reviewerName: 'Nguyễn Anh Tuấn',
      reviewerAvatar: 'https://example.com/avatar2.jpg',
      star: 4,
      content: 'Tài liệu hay, chỉ tiếc hơi dài.',
      createdAt: '2025-05-15T14:10:00Z',
    },
    {
      id: '3',
      reviewerId: 'ta2k3quyen',
      reviewerName: 'Nguyễn Tạ Quyền',
      reviewerAvatar: 'https://example.com/avatar1.jpg',
      star: 5,
      content: 'Rất đầy đủ và dễ hiểu.',
      createdAt: '2025-05-14T09:20:00Z',
    },
  ],

  // Mảng 3 feedback
  [
    {
      id: '4',
      reviewerId: 'tuananh',
      reviewerName: 'Nguyễn Anh Tuấn',
      reviewerAvatar: 'https://example.com/avatar2.jpg',
      star: 3,
      content: 'Nội dung ổn, có thể cải thiện thêm phần hình ảnh.',
      createdAt: '2025-05-13T10:00:00Z',
    },
    {
      id: '5',
      reviewerId: 'ta2k3quyen',
      reviewerName: 'Nguyễn Tạ Quyền',
      reviewerAvatar: 'https://example.com/avatar1.jpg',
      star: 5,
      content: 'Đọc mà mê luôn.',
      createdAt: '2025-05-12T16:45:00Z',
    },
    {
      id: '6',
      reviewerId: 'tuananh',
      reviewerName: 'Nguyễn Anh Tuấn',
      reviewerAvatar: 'https://example.com/avatar2.jpg',
      star: 4,
      content: 'Cấu trúc logic, dễ tiếp cận.',
      createdAt: '2025-05-11T11:30:00Z',
    },
  ],

  // Mảng 4 feedback
  [
    {
      id: '7',
      reviewerId: 'ta2k3quyen',
      reviewerName: 'Nguyễn Tạ Quyền',
      reviewerAvatar: 'https://example.com/avatar1.jpg',
      star: 5,
      content: 'Một tài liệu không thể thiếu với sinh viên CNTT.',
      createdAt: '2025-05-10T09:00:00Z',
    },
    {
      id: '8',
      reviewerId: 'tuananh',
      reviewerName: 'Nguyễn Anh Tuấn',
      reviewerAvatar: 'https://example.com/avatar2.jpg',
      star: 4,
      content: 'Thiết kế trình bày đẹp mắt.',
      createdAt: '2025-05-09T13:30:00Z',
    },
    {
      id: '9',
      reviewerId: 'ta2k3quyen',
      reviewerName: 'Nguyễn Tạ Quyền',
      reviewerAvatar: 'https://example.com/avatar1.jpg',
      star: 5,
      content: 'Không còn gì để chê!',
      createdAt: '2025-05-08T15:20:00Z',
    },
    {
      id: '10',
      reviewerId: 'tuananh0',
      reviewerName: 'Nguyễn Anh Tuấn',
      reviewerAvatar: 'https://example.com/avatar2.jpg',
      star: 4,
      content: 'Nên thêm ví dụ thực tế.',
      createdAt: '2025-05-07T08:40:00Z',
    },
  ],
];

const FeedbackEnumerationTab = ({ documentId }: FeedbackEnumerationTabProps) => {
  const [loading] = useState<boolean>(false);
  const feedbacks = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * listFeedbacks.length);
    return listFeedbacks[randomIndex];
  }, []);

  const columns = useMemo(() => {
    return [
      {
        id: 'reviewer',
        title: 'Người đánh giá',
        render: (feedback: IFeedback) => (
          <div className='flex items-center gap-2'>
            <Avatar className='w-8 h-8'>
              <AvatarImage src={feedback.reviewerAvatar} alt={feedback.reviewerName} />
              <AvatarFallback>{feedback.reviewerName[0]}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='font-medium'>{feedback.reviewerName}</span>
              <span className='text-xs text-gray-500'>{feedback.reviewerId}</span>
            </div>
          </div>
        ),
      },
      {
        id: 'star',
        title: 'Điểm',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (feedback: IFeedback) => (
          <span className='flex items-center justify-center gap-1 text-yellow-500 font-medium'>
            {feedback.star}
            <Star className='w-4 h-4' />
          </span>
        ),
      },
      {
        id: 'content',
        title: 'Nội dung',
        render: (feedback: IFeedback) => (
          <p className='text-sm text-gray-700 line-clamp-2'>{feedback.content}</p>
        ),
      },
      {
        id: 'createdAt',
        title: 'Ngày tạo',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (feedback: IFeedback) => (
          <div>
            <span className='text-sm text-gray-500'>
              {dayjs(feedback.createdAt).format('HH:mm ')}
            </span>
            <br />
            <span className='text-sm text-gray-500'>
              {dayjs(feedback.createdAt).format('DD/MM/YYYY')}
            </span>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div className='p-4'>
      {loading ? (
        <Skeleton className='h-8 w-full mb-2' />
      ) : (
        <TableCustom data={feedbacks ?? []} columns={columns} />
      )}
    </div>
  );
};

export default FeedbackEnumerationTab;
