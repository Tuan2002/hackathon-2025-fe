/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import HeaderBox from '@/components/customs/HeaderBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FeedbackService from '@/services/feedbackService';
import type { IContactFormData } from '@/types/feedbackType';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [formData, setFormData] = useState<IContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await FeedbackService.createContact(formData);
      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success('Gửi phản hồi thành công!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        toast.error('Gửi phản hồi thất bại!');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Gửi phản hồi thất bại!');
    }
  };

  return (
    <div className='flex justify-center'>
      <Card className='shadow-lg max-w-md w-full'>
        <HeaderBox title='Liên hệ' />
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            <Input
              placeholder='Họ và tên'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type='tel'
              placeholder='Số điện thoại'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder='Thông tin phản hồi'
              name='message'
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type='submit' className='w-full bg-green-500 hover:bg-green-600'>
              Gửi phản hồi
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default ContactForm;
