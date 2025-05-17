/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ReactMarkdown from 'react-markdown';
import ModalCustom from '@/components/customs/ModalCustom';
import { useEffect, useState } from 'react';
import DocumentService from '@/services/documentService';
import { toast } from 'react-toastify';
import { AudioPlayer } from './AudioPlayer';

interface ShowSummaryModalProps {
  open: boolean;
  onClose: () => void;
  documentId?: string;
}

const ShowSummaryModal = ({ open, onClose, documentId }: ShowSummaryModalProps) => {
  const [summaryContent, setSummaryContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !documentId) return;
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        // Simulate fetching summary content
        const response = await DocumentService.generateSummary(documentId);
        if (response.statusCode === 200 || response.statusCode === 201) {
          setSummaryContent(response.data.content);
        } else {
          setSummaryContent(null);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tóm tắt tài liệu');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, [open, documentId]);

  useEffect(() => {
    if (!open || !documentId || !summaryContent) return;
    const fetchAudio = async () => {
      try {
        const response = await DocumentService.textToSpeech(summaryContent);
        console.log('response', response);
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải tóm tắt tài liệu');
      }
    };
    fetchAudio();
  }, [open, documentId, summaryContent]);

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      title='Xem tóm tắt tài liệu'
      showFooter={false}
      size='2xl'
      isFullHeight
    >
      {isLoading ? (
        <div className=''>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
          <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'></div>
        </div>
      ) : (
        <div className='prose max-w-full min-h-[400px]'>
          <AudioPlayer
            audioBlob={audioBlob || undefined}
            title='Nghe tài liệu'
            isLoading={isLoading}
          />
          {summaryContent ? (
            <ReactMarkdown>{summaryContent}</ReactMarkdown>
          ) : (
            <p>Không có tóm tắt nào khả dụng cho tài liệu này.</p>
          )}
        </div>
      )}
    </ModalCustom>
  );
};

export default ShowSummaryModal;
