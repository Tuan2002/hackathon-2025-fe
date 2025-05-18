/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from '@/components/ui/textarea';
import DocumentService from '@/services/documentService';
import uploadService from '@/services/uploadService';
import type { IComment, ISendCommentRequest } from '@/types/documentType';
import getAccessToken from '@/utils/getAccessToken';
import dayjs from 'dayjs';
import { Camera, MessageCircle, Send, Trash2, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

interface CommentEnumerationTabProps {
  documentId?: string;
}
const CommentEnumerationTab = ({ documentId }: CommentEnumerationTabProps) => {
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [replyTo, setReplyTo] = React.useState<IComment | null>(null);
  const [content, setContent] = React.useState<string>('');
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const accessToken = getAccessToken();

  const handleDeleteComment = async (commentId: string) => {
    if (!documentId) return;
    if (!window.confirm('Bạn chắc chắn muốn xoá bình luận này?')) return;

    try {
      const res = await DocumentService.deleteComment(commentId);
      if (res.statusCode === 200) {
        toast.success('Đã xoá bình luận');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Xoá thất bại');
    }
  };

  const renderComments = () => {
    return comments
      .filter((c) => c.parentId === null)
      .map((parentComment) => (
        <div
          key={parentComment.id}
          className='p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 relative'
        >
          <div className='absolute top-2 right-3 text-xs text-gray-400'>
            {dayjs(parentComment.createdAt).format('HH:mm - DD/MM/YYYY')}
          </div>

          <div className='flex items-center gap-3 mb-2'>
            <img
              src={parentComment.commenterImage}
              alt={parentComment.commenterName}
              className='w-8 h-8 rounded-full object-cover'
            />
            <div className='font-medium'>{parentComment.commenterName}</div>
          </div>

          <p className='whitespace-pre-line text-sm'>{parentComment.content}</p>

          {parentComment.image && (
            <div className='mt-2'>
              <img
                src={parentComment.image}
                alt='comment img'
                className='max-w-20 rounded-lg border'
              />
            </div>
          )}

          <div className='flex items-center justify-end gap-4 text-sm text-gray-500 mt-3'>
            <span
              onClick={() => setReplyTo(parentComment)}
              className='flex items-center gap-1 hover:text-violet-600 transition cursor-pointer'
            >
              <MessageCircle className='w-4 h-4' />
              <span>Trả lời</span>
            </span>

            <span
              onClick={() => handleDeleteComment(parentComment.id)}
              className='flex items-center gap-1 hover:text-red-600 transition cursor-pointer'
            >
              <Trash2 className='w-4 h-4' />
              <span>Xoá</span>
            </span>
          </div>

          <div className='pl-5 mt-4 space-y-3'>
            {comments
              .filter((c) => c.parentId === parentComment.id)
              .map((reply) => (
                <div
                  key={reply.id}
                  className='p-3 border rounded-lg bg-white dark:bg-gray-800 relative'
                >
                  <div className='absolute top-2 right-3 text-xs text-gray-400'>
                    {dayjs(reply.createdAt).format('HH:mm - DD/MM/YYYY')}
                  </div>

                  <div className='flex items-center gap-3 mb-2'>
                    <img
                      src={reply.commenterImage}
                      alt={reply.commenterName}
                      className='w-7 h-7 rounded-full object-cover'
                    />
                    <div className='font-medium'>{reply.commenterName}</div>
                  </div>

                  <div className='text-xs text-gray-500 mb-1'>
                    Đã trả lời <span className='font-medium'>{parentComment.commenterName}</span>
                  </div>

                  <p className='whitespace-pre-line text-sm'>{reply.content}</p>

                  {reply.image && (
                    <div className='mt-2'>
                      <img
                        src={reply.image}
                        alt='reply img'
                        className='max-w-20 rounded-lg border'
                      />
                    </div>
                  )}

                  <div className='flex items-center justify-end gap-4 text-sm text-gray-500 mt-3'>
                    <span
                      onClick={() => setReplyTo(parentComment)}
                      className='flex items-center gap-1 hover:text-violet-600 transition cursor-pointer'
                    >
                      <MessageCircle className='w-4 h-4' />
                      <span>Trả lời</span>
                    </span>

                    <span
                      onClick={() => handleDeleteComment(reply.id)}
                      className='flex items-center gap-1 hover:text-red-600 transition cursor-pointer'
                    >
                      <Trash2 className='w-4 h-4' />
                      <span>Xoá</span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostComment = async () => {
    if (!content.trim() || !documentId) return;

    let imageUrl: string | null = null;

    if (imageFile) {
      try {
        const res = await uploadService.uploadAnImage(imageFile);
        if (res.statusCode === 200) {
          imageUrl = res.data.secure_url;
        }
      } catch (error: any) {
        toast.error(error?.message || 'Không upload được ảnh');
        return;
      }
    }

    const newComment: ISendCommentRequest = {
      content,
      image: imageUrl,
    };

    try {
      let res;
      if (replyTo) {
        res = await DocumentService.replyComment(replyTo.id, newComment);
      } else {
        res = await DocumentService.postComment(documentId, newComment);
      }

      if (res.statusCode === 201 || res.statusCode === 200) {
        toast.success(replyTo ? 'Trả lời bình luận thành công!' : 'Bình luận thành công!');
        setContent('');
        setImageFile(null);
        setImagePreview(null);
        setReplyTo(null);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Lỗi khi gửi bình luận');
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!documentId) return;
      setIsLoading(true);
      try {
        const res = await DocumentService.getComments(documentId);
        if (res.statusCode === 200) {
          setComments(res.data);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Không tải được bình luận');
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [documentId]);
  return (
    <div className='p-4 '>
      {replyTo && (
        <div className='relative mb-4'>
          <Textarea
            placeholder={
              replyTo
                ? `Trả lời bình luận của ${replyTo.commenterName}...`
                : 'Nhập bình luận của bạn...'
            }
            value={content}
            rows={4}
            onChange={(e) => setContent(e.target.value)}
            className='pr-24'
          />

          <div className='absolute bottom-3 right-3 flex items-center gap-2'>
            <label className='cursor-pointer'>
              <input type='file' accept='image/*' onChange={handleImageChange} className='hidden' />
              <Camera className='w-5 h-5 text-gray-500 hover:text-violet-600 transition' />
            </label>

            <div
              onClick={handlePostComment}
              className={`p-1.5 rounded-full cursor-pointer transition ${
                accessToken ? 'hover:bg-violet-600' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: accessToken ? '#f5f5f5' : 'transparent' }}
            >
              <Send
                className={`w-5 h-5 ${
                  accessToken ? 'text-gray-700 hover:text-white' : 'text-gray-400'
                } transition`}
              />
            </div>
          </div>
        </div>
      )}
      {imagePreview && (
        <div className='relative w-32 h-32 mt-3 overflow-hidden rounded-lg border'>
          <img src={imagePreview} alt='Preview' className='object-cover w-full h-full' />
          <button
            onClick={() => {
              setImagePreview(null);
              setImageFile(null);
            }}
            className='absolute w-6 h-6 top-1 right-1 z-10 bg-black bg-opacity-50 text-white rounded-full flex justify-center items-center hover:bg-opacity-80'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      )}

      {replyTo && (
        <div className='mt-2 text-sm text-gray-500 mb-6'>
          Đang trả lời bình luận của <strong>{replyTo.commenterName}</strong>{' '}
          <button onClick={() => setReplyTo(null)} className='ml-2 text-violet-600 underline'>
            Huỷ
          </button>
        </div>
      )}
      <div className='space-y-4'>{renderComments()}</div>
    </div>
  );
};

export default CommentEnumerationTab;
