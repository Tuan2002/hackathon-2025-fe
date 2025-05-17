'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Search, Reply } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CardScroll from '@/components/customs/CardScroll';
import TableCustom from '@/components/customs/TableCustom';
import type { IContact } from '@/types/feedbackType';
import FeedbackService from '@/services/feedbackService';
import useFeedbackStore from '@/stores/feedbackStore';

const ManageContact = () => {
  const [search, setSearch] = useState('');
  const [listContacts, setListContacts] = useState<IContact[]>([]);
  const { setCurrentContact, setOpenModalReplyContact } = useFeedbackStore();

  const fetchContacts = useCallback(async () => {
    try {
      const response = await FeedbackService.getContacts();
      if (response && response.statusCode === 200) {
        setListContacts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  }, []);

  const handleReply = (contact: IContact) => {
    setCurrentContact(contact);
    setOpenModalReplyContact(true);
  };
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredContacts = listContacts?.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = useMemo(() => {
    return [
      {
        id: 'stt',
        title: 'STT',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (_: IContact, index: number) => index + 1,
      },
      {
        id: 'info',
        title: 'Thông tin người gửi',
        headerClass: 'text-left',
        render: (contact: IContact) => (
          <div className='flex flex-col gap-1'>
            <span className='font-medium'>{contact.name}</span>
            <span className='text-sm text-gray-500'>{contact.email}</span>
            <span className='text-sm text-gray-500'>{contact.phone}</span>
          </div>
        ),
      },
      {
        id: 'content',
        title: 'Nội dung liên hệ',
        headerClass: 'text-left',
        render: (contact: IContact) => (
          <p className='text-sm text-gray-700 line-clamp-2'>{contact.message}</p>
        ),
      },
      {
        id: 'isReplied',
        title: 'Phản hồi',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (contact: IContact) => (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              contact.isReplied ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {contact.isReplied ? 'Đã phản hồi' : 'Chưa phản hồi'}
          </span>
        ),
      },
      {
        id: 'createdAt',
        title: 'Ngày gửi',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (contact: IContact) => (
          <span className='text-sm text-gray-500'>
            {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
          </span>
        ),
      },
      {
        id: 'actions',
        title: '',
        headerClass: 'text-center',
        cellClass: 'text-center',
        render: (contact: IContact) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon'>
                <MoreVertical className='w-5 h-5 text-gray-700 dark:text-gray-300' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuItem
                onClick={() => handleReply(contact)}
                className='flex items-center gap-2'
              >
                <Reply className='w-4 h-4 text-blue-500' />
                <span>Phản hồi</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, []);

  return (
    <CardScroll title='Danh sách liên hệ'>
      <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Tìm kiếm tên hoặc email...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-64'
          />
          <Button variant='outline' size='icon'>
            <Search className='w-4 h-4' />
          </Button>
        </div>
      </div>

      <TableCustom data={filteredContacts ?? []} columns={columns} />
      {/* <ReplyContactModal
        open={openModalReplyContact}
        onClose={handleCloseReplyModal}
        onSubmit={handleSubmitReply}
        contact={currentContact}
      /> */}
    </CardScroll>
  );
};

export default ManageContact;
