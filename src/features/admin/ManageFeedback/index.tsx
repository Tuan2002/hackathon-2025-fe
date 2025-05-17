/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Star, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CardScroll from '@/components/customs/CardScroll';
import TableCustom from '@/components/customs/TableCustom';
import type { IFeedback } from '@/types/feedbackType';
import FeedbackService from '@/services/feedbackService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-toastify';

const ManageFeedback = () => {
  const [search, setSearch] = useState('');
  const [listFeedbacks, setListFeedbacks] = useState<IFeedback[]>([]);

  const fetchFeedbacks = useCallback(async () => {
    try {
      const res = await FeedbackService.getFeedbacks();
      if (res && res.statusCode === 200) {
        setListFeedbacks(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch feedbacks:', err);
    }
  }, []);

  const handleToggleActive = async (id: string) => {
    try {
      const res = await FeedbackService.toogleFeedbackStatus(id);
      if (res && res.statusCode === 200) {
        toast.success('Cập nhật trạng thái thành công');
        fetchFeedbacks();
      } else {
        toast.error('Cập nhật thất bại');
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xoá phản hồi này?')) return;
    try {
      const res = await FeedbackService.deleteFeedback(id);
      if (res && res.statusCode === 200) {
        toast.success('Xoá thành công');
        fetchFeedbacks();
      } else {
        toast.error('Xoá thất bại');
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const filteredFeedbacks = listFeedbacks?.filter(
    (f) =>
      f.reviewerName.toLowerCase().includes(search.toLowerCase()) ||
      f.content.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = useMemo(() => {
    return [
      {
        id: 'stt',
        title: 'STT',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (_: IFeedback, index: number) => index + 1,
      },
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
          <span className='text-sm text-gray-500'>
            {new Date(feedback.createdAt).toLocaleString('vi-VN')}
          </span>
        ),
      },
      {
        id: 'isActive',
        title: 'Kích hoạt',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (feedback: IFeedback) => (
          <Switch
            checked={feedback.isActive}
            onCheckedChange={() => handleToggleActive(feedback.id)}
          />
        ),
      },
      {
        id: 'actions',
        title: '',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (feedback: IFeedback) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon'>
                <MoreVertical className='w-5 h-5 text-gray-700 dark:text-gray-300' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-36'>
              <DropdownMenuItem
                onClick={() => handleDelete(feedback.id)}
                className='flex items-center gap-2 text-red-500'
              >
                <Trash2 className='w-4 h-4' />
                Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, []);

  return (
    <CardScroll title='Danh sách phản hồi'>
      <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Tìm kiếm tên hoặc nội dung...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-64'
          />
        </div>
      </div>

      <TableCustom data={filteredFeedbacks ?? []} columns={columns} />
    </CardScroll>
  );
};

export default ManageFeedback;
