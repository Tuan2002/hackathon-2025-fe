'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModalCustom from '@/components/customs/ModalCustom';
import { useState } from 'react';
import FavoriteEnumerationTab from './FavoriteEnumeration';
import DownloadEnumerationTab from './DownloadEnumeration';
import useDocumentStore from '@/stores/documentStore';

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
];

const EnumerationModal = ({ open, onClose }: EnumerationModalProps) => {
  const { currentDocument } = useDocumentStore();
  const [tab, setTab] = useState('likes');
  const comments: Comment[] = [{ id: '1', user: 'Nguyễn Văn A', content: 'Tài liệu rất hữu ích!' }];
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
          <TabsList className='flex w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-4'>
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className='flex-1 
        data-[state=active]:bg-white 
        data-[state=active]:text-black 
        data-[state=active]:shadow-sm 
        dark:data-[state=active]:bg-gray-900 
        dark:data-[state=active]:text-white 
        rounded-md px-3 py-2 text-sm font-medium 
        text-gray-600 hover:bg-white hover:text-black 
        dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white 
        transition'
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
            <div className='space-y-2 max-h-80 overflow-y-auto'>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className='p-3 border rounded-lg'>
                    <p className='font-medium'>{comment.user}</p>
                    <p className='text-gray-700'>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className='text-gray-500 italic'>Chưa có bình luận nào.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ModalCustom>
  );
};

export default EnumerationModal;
