/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-toastify';
import { Camera, Send, X, Trash2, MessageCircle } from 'lucide-react';
import getAccessToken from '@/utils/getAccessToken';
import type { IComment, ISendCommentRequest } from '@/types/documentType';
import DocumentService from '@/services/documentService';
import uploadService from '@/services/uploadService';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';
import useAccountStore from '@/stores/accountStore';

interface CommentBoxProps {
  documentId?: string;
}

const CommentBox = ({ documentId }: CommentBoxProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<IComment | null>(null);
  const { currentUser } = useAccountStore();

  const accessToken = getAccessToken();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchComments();
  }, [documentId]);

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
        fetchComments();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Lỗi khi gửi bình luận');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!documentId) return;
    if (!window.confirm('Bạn chắc chắn muốn xoá bình luận này?')) return;

    try {
      const res = await DocumentService.deleteComment(commentId);
      if (res.statusCode === 200) {
        toast.success('Đã xoá bình luận');
        fetchComments();
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
            {currentUser?.id && (
              <span
                onClick={() => setReplyTo(parentComment)}
                className='flex items-center gap-1 hover:text-violet-600 transition cursor-pointer'
              >
                <MessageCircle className='w-4 h-4' />
                <span>Trả lời</span>
              </span>
            )}

            {currentUser?.id === parentComment.commenterId && (
              <span
                onClick={() => handleDeleteComment(parentComment.id)}
                className='flex items-center gap-1 hover:text-red-600 transition cursor-pointer'
              >
                <Trash2 className='w-4 h-4' />
                <span>Xoá</span>
              </span>
            )}
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
                    {currentUser?.id && (
                      <span
                        onClick={() => setReplyTo(parentComment)}
                        className='flex items-center gap-1 hover:text-violet-600 transition cursor-pointer'
                      >
                        <MessageCircle className='w-4 h-4' />
                        <span>Trả lời</span>
                      </span>
                    )}

                    {currentUser?.id === reply.commenterId && (
                      <span
                        onClick={() => handleDeleteComment(reply.id)}
                        className='flex items-center gap-1 hover:text-red-600 transition cursor-pointer'
                      >
                        <Trash2 className='w-4 h-4' />
                        <span>Xoá</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ));
  };

  return (
    <div className='mt-6'>
      <h3 className='text-xl font-semibold mb-3'>Bình luận</h3>

      {currentUser ? (
        <>
          <div className='relative'>
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
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='hidden'
                />
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
            <div className='mt-2 text-sm text-gray-500'>
              Đang trả lời bình luận của <strong>{replyTo.commenterName}</strong>{' '}
              <button onClick={() => setReplyTo(null)} className='ml-2 text-violet-600 underline'>
                Huỷ
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='w-full h-32 flex flex-col items-center justify-center border rounded-lg bg-gray-50 dark:bg-gray-900'>
          <p className='text-gray-500'>Bạn cần đăng nhập để bình luận.</p>
          <Button
            variant='outline'
            onClick={() => navigate(RoutePaths.Login)}
            className='mt-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 hover:text-white'
          >
            Đăng nhập
          </Button>
        </div>
      )}

      <Separator className='my-4' />

      {isLoading ? (
        <div className='text-gray-500 animate-pulse'>Đang tải bình luận...</div>
      ) : comments.length === 0 ? (
        <div className='text-gray-500'>Chưa có bình luận nào.</div>
      ) : (
        <div className='space-y-4'>{renderComments()}</div>
      )}
    </div>
  );
};

export default CommentBox;
