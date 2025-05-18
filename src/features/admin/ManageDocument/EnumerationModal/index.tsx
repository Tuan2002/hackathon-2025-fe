'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModalCustom from '@/components/customs/ModalCustom';
import { useState } from 'react';
import FavoriteEnumerationTab from './FavoriteEnumeration';
import DownloadEnumerationTab from './DownloadEnumeration';
import useDocumentStore from '@/stores/documentStore';
import CommentEnumerationTab from './CommentEnumeration';
import FeedbackEnumerationTab from './FeedbackEnumeration';

interface Comment {
  id: string;
  user: string;
  content: string;
}

interface EnumerationModalProps {
  open: boolean;
  onClose: () => void;
}

const tabItems = [
  { value: 'likes', label: 'Người dùng đã thích' },
  { value: 'downloads', label: 'Người dùng đã tải xuống' },
  { value: 'comments', label: 'Tổng hợp bình luận' },
  { value: 'feedback', label: 'Tổng hợp đánh giá' },
];

const EnumerationModal = ({ open, onClose }: EnumerationModalProps) => {
  const { currentDocument } = useDocumentStore();
  const [tab, setTab] = useState('likes');
  return (
    <ModalCustom
      title='Chi tiết tài liệu'
      open={open}
      onClose={onClose}
      size='3xl'
      showFooter={false}
      showHeader={true}
    >
      <div className='min-h-[500px]'>
        <Tabs defaultValue='likes' value={tab} onValueChange={setTab}>
          <TabsList className='flex w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-4 gap-3'>
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className='flex-1
        border 
        border-gray-300 
        rounded-md 
        px-4 py-2 
        text-sm font-medium 
        text-gray-600 
        dark:text-gray-300 
        bg-gray-50 
        dark:bg-gray-700
        hover:bg-gray-200 
        dark:hover:bg-gray-600 
        transition-all
        data-[state=active]:bg-blue-600 
        data-[state=active]:text-white 
        data-[state=active]:border-blue-600 
        data-[state=active]:shadow'
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='likes'>
            <FavoriteEnumerationTab documentId={currentDocument?.id} />
          </TabsContent>

          <TabsContent value='downloads'>
            <DownloadEnumerationTab documentId={currentDocument?.id} />
          </TabsContent>

          <TabsContent value='comments'>
            <CommentEnumerationTab documentId={currentDocument?.id} />
          </TabsContent>

          <TabsContent value='feedback'>
            <FeedbackEnumerationTab documentId={currentDocument?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </ModalCustom>
  );
};

export default EnumerationModal;
