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

  // Fetch summary content
  useEffect(() => {
    if (!open || !documentId) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      try {
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

  // Fetch audio file
  useEffect(() => {
    if (!open || !documentId || !summaryContent) return;

    const fetchAudio = async () => {
      try {
        const response = await DocumentService.textToSpeech(documentId);
        console.log('response audio', response);

        // response.data là blob, phải lấy cái này mới đúng
        setAudioBlob(response);
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra trong quá trình tải âm thanh');
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
        <div>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className='h-5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md mt-2'
            ></div>
          ))}
        </div>
      ) : (
        <div className='prose max-w-full min-h-[400px]'>
          {/* Audio player */}
          <AudioPlayer
            audioBlob={audioBlob || undefined}
            title='Nghe tài liệu'
            isLoading={isLoading}
          />

          {/* Markdown summary */}
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
