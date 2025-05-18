/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import HeaderBox from '@/components/customs/HeaderBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import FeedbackService from '@/services/feedbackService';
import type { IFeedbackFormData } from '@/types/feedbackType';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const FeedbackForm = () => {
  const [formData, setFormData] = useState<IFeedbackFormData>({
    star: 0,
    content: '',
  });

  const handleStarClick = (value: number) => {
    setFormData((prev) => ({ ...prev, star: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.star === 0) {
      toast.warning('Vui lòng chọn số sao trước khi gửi đánh giá!');
      return;
    }

    try {
      const response = await FeedbackService.createFeedback(formData);
      toast.success('Gửi đánh giá thành công!');
      if (response.statusCode === 200 || response.statusCode === 201) {
        setFormData({
          star: 0,
          content: '',
        });
      } else {
        toast.error('Gửi đánh giá thất bại!');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Gửi đánh giá thất bại!');
    }
  };

  return (
    <div className='flex justify-center my-6'>
      <Card className='shadow-lg max-w-md w-full'>
        <HeaderBox
          title='Đánh giá về tài liệu'
          description='Hãy để lại đánh giá của bạn về tài liệu của chúng tôi'
        />
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4 flex flex-col items-center'>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 cursor-pointer transition ${
                    i <= formData.star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                  }`}
                  onClick={() => handleStarClick(i)}
                />
              ))}
            </div>
            <Textarea
              placeholder='Hãy để lại cảm nhận của bạn...'
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
            />
            <Button type='submit' className='w-full bg-green-500 hover:bg-green-600'>
              Đánh giá
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
