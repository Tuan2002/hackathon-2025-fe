/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import ModalCustom from '@/components/customs/ModalCustom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import type { IDocument, IDocumentFormData } from '@/types/documentType';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useDocumentStore from '@/stores/documentStore';
import { FILE_TYPES } from '@/constants/fileTypes';
import DocumentService from '@/services/documentService';
import useCategoryStore from '@/stores/categoryStore';
import usePublisherStore from '@/stores/publisherStore';
import useAuthorStore from '@/stores/authorStore';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import uploadService from '@/services/uploadService';

interface CreateAndUpdateDocumentModalProps {
  open: boolean;
  onClose: () => void;
  currentDocument: IDocument | null;
}

const CreateAndUpdateDocumentModal = ({
  open,
  onClose,
  currentDocument,
}: CreateAndUpdateDocumentModalProps) => {
  const { listCategories } = useCategoryStore();
  const { listPublishers } = usePublisherStore();
  const { listAuthors } = useAuthorStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [documentData, setDocumentData] = useState<IDocumentFormData>({
    name: '',
    image: '',
    authorId: '',
    publisherId: '',
    categoryId: '',
    shortDescription: '',
    point: 0,
    description: '',
    fileKey: '',
    fileName: '',
    fileType: FILE_TYPES.PDF,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { updateDocument, createDocument } = useDocumentStore();

  useEffect(() => {
    if (open) {
      if (currentDocument) {
        setDocumentData({
          name: currentDocument.name,
          image: currentDocument.image,
          authorId: currentDocument.authorId,
          publisherId: currentDocument.publisherId,
          categoryId: currentDocument.categoryId,
          point: currentDocument.point,
          shortDescription: currentDocument.shortDescription,
          description: currentDocument.description,
          fileKey: currentDocument.fileKey,
          fileName: currentDocument.fileName,
          fileType: currentDocument.fileType,
        });
        setImageFile(null);
        setDocumentFile(null);
      } else {
        setDocumentData({
          name: '',
          image: '',
          authorId: '',
          publisherId: '',
          categoryId: '',
          point: 0,
          shortDescription: '',
          description: '',
          fileKey: '',
          fileName: '',
          fileType: FILE_TYPES.PDF,
        });
        setImageFile(null);
        setDocumentFile(null);
      }
    }
  }, [open, currentDocument]);

  const handleSubmit = async () => {
    if (!documentData.name) {
      toast.error('Vui lòng nhập tên tài liệu');
      return;
    }
    setIsLoading(true);

    try {
      let documentImage = documentData.image;

      if (imageFile) {
        const uploadRes = await uploadService.uploadAnImage(imageFile);
        if (uploadRes.data.secure_url) {
          documentImage = uploadRes.data.secure_url;
        } else {
          toast.error('Upload ảnh thất bại');
          return;
        }
      }
      if (documentFile) {
        const response = await DocumentService.uploadFile(documentFile);
        if (response && (response.statusCode === 200 || response.statusCode === 201)) {
          console.log('Upload file thành công', response);
          documentData.fileKey = response.data?.key;
          documentData.fileName = response.data?.originalname;
          documentData.fileType = response.data?.mimetype;
        } else {
          toast.error('Upload file thất bại');
          return;
        }
      }
      if (currentDocument) {
        documentData.image = documentImage;
        const res = await DocumentService.updateDocument(currentDocument.id, documentData);
        if (res) {
          updateDocument(res.data);
          toast.success('Cập nhật tài liệu thành công');
          onClose();
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        documentData.image = documentImage;
        const res = await DocumentService.createDocument(documentData);
        if (res) {
          createDocument(res.data);
          toast.success('Tạo tài liệu thành công');
          onClose();
        } else {
          toast.error('Tạo tài liệu thất bại');
        }
      }
    } catch (error: any) {
      toast.error(error?.message ?? 'Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalCustom
      open={open}
      onClose={onClose}
      isConfirming={isLoading}
      title={currentDocument ? 'Cập nhật tài liệu' : 'Thêm mới tài liệu'}
      size='2xl'
      footer={
        <div className='flex justify-end gap-3'>
          <Button variant='outline' onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {currentDocument ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      }
    >
      <div className='space-y-4'>
        {/* Image Preview */}
        <div className='relative w-full h-[200px] border rounded-xl overflow-hidden'>
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt='Preview'
              className='w-full h-full object-cover'
            />
          ) : documentData.image ? (
            <img src={documentData.image} alt='Preview' className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-400'>
              <ImageIcon size={48} />
            </div>
          )}

          <div className='absolute top-2 right-2'>
            <Input
              type='file'
              accept='image/*'
              className='hidden'
              id='image-upload'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                }
              }}
            />
            <label htmlFor='image-upload' className='cursor-pointer'>
              <div className='p-2 bg-white rounded-full shadow hover:bg-gray-100 transition'>
                <UploadCloud size={18} />
              </div>
            </label>
          </div>
        </div>

        {/* Document Name */}
        <div className='flex justify-between items-center gap-3'>
          <div className='w-2/3'>
            <Label>Tên tài liệu</Label>
            <Input
              placeholder='Nhập tên tài liệu'
              value={documentData.name}
              onChange={(e) => setDocumentData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className='w-1/3'>
            <Label>Số điểm</Label>
            <Input
              placeholder='Nhập số điểm của tài liệu'
              type='number'
              min={0}
              value={documentData.point}
              onChange={(e) => setDocumentData((prev) => ({ ...prev, point: +e.target.value }))}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Category */}
          <div>
            <Label>Thể loại</Label>
            <Select
              value={documentData.categoryId}
              onValueChange={(value) => setDocumentData((prev) => ({ ...prev, categoryId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn thể loại' />
              </SelectTrigger>
              <SelectContent>
                {listCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author */}
          <div>
            <Label>Tác giả</Label>
            <Select
              value={documentData.authorId}
              onValueChange={(value) => setDocumentData((prev) => ({ ...prev, authorId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn tác giả' />
              </SelectTrigger>
              <SelectContent>
                {listAuthors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Publisher */}
        <div>
          <Label>Nhà xuất bản</Label>
          <Select
            value={documentData.publisherId}
            onValueChange={(value) => setDocumentData((prev) => ({ ...prev, publisherId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn nhà xuất bản' />
            </SelectTrigger>
            <SelectContent>
              {listPublishers.map((publisher) => (
                <SelectItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Short Description */}
        <div>
          <Label>Mô tả ngắn</Label>
          <Textarea
            placeholder='Nhập mô tả ngắn'
            value={documentData.shortDescription}
            onChange={(e) =>
              setDocumentData((prev) => ({ ...prev, shortDescription: e.target.value }))
            }
          />
        </div>

        {/* Description */}
        <div>
          <Label>Mô tả chi tiết</Label>
          <Textarea
            rows={6}
            placeholder='Nhập mô tả chi tiết'
            value={documentData.description}
            onChange={(e) => setDocumentData((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        {/* Document File Upload */}
        <div>
          <Label className='mb-1 block'>File tài liệu</Label>
          <div
            className='w-full h-36 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer text-gray-500 hover:border-primary hover:text-primary transition-all'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) {
                setDocumentFile(file);
              }
            }}
            onClick={() => document.getElementById('document-file-input')?.click()}
          >
            <UploadCloud size={36} />
            <p className='mt-2 text-sm'>Kéo file vào đây hoặc click để chọn</p>
            {documentFile && (
              <p className='mt-1 text-xs text-gray-600'>
                📄 <strong>{documentFile.name}</strong>
              </p>
            )}
          </div>
          <Input
            id='document-file-input'
            type='file'
            accept='.pdf,.doc,.docx,.epub'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setDocumentFile(file);
              }
            }}
          />
        </div>
      </div>
    </ModalCustom>
  );
};

export default CreateAndUpdateDocumentModal;
