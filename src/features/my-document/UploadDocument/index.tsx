/* eslint-disable @typescript-eslint/no-explicit-any */
import MyDocumentLayout from '@/layouts/MyDocumentLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { IDocumentFormData } from '@/types/documentType';
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
import { useParams } from 'react-router-dom';
const UploadDocument = () => {
  const { listCategories } = useCategoryStore();
  const { listPublishers } = usePublisherStore();
  const { listAuthors } = useAuthorStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const { documentId } = useParams<{ documentId: string }>();

  const [documentData, setDocumentData] = useState<IDocumentFormData>({
    name: '',
    image: '',
    authorId: '',
    publisherId: '',
    categoryId: '',
    shortDescription: '',
    description: '',
    fileKey: '',
    fileName: '',
    fileType: FILE_TYPES.PDF,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { updateDocument, createDocument } = useDocumentStore();

  useEffect(() => {
    if (documentId) {
      // setDocumentData({
      //   name: currentDocument.name,
      //   image: currentDocument.image,
      //   authorId: currentDocument.authorId,
      //   publisherId: currentDocument.publisherId,
      //   categoryId: currentDocument.categoryId,
      //   shortDescription: currentDocument.shortDescription,
      //   description: currentDocument.description,
      //   fileKey: currentDocument.fileKey,
      //   fileName: currentDocument.fileName,
      //   fileType: currentDocument.fileType,
      // });
      // setImageFile(null);
      // setDocumentFile(null);
    } else {
      setDocumentData({
        name: '',
        image: '',
        authorId: '',
        publisherId: '',
        categoryId: '',
        shortDescription: '',
        description: '',
        fileKey: '',
        fileName: '',
        fileType: FILE_TYPES.PDF,
      });
      setImageFile(null);
      setDocumentFile(null);
    }
  }, [documentId]);

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
          documentData.fileKey = response.data?.key;
          documentData.fileName = response.data?.originalName;
          documentData.fileType = response.data?.mimetype;
        } else {
          toast.error('Upload file thất bại');
          return;
        }
      }
      if (documentId) {
        documentData.image = documentImage;
        const res = await DocumentService.updateDocument(documentId, documentData);
        if (res) {
          updateDocument(res.data);
          toast.success('Cập nhật tài liệu thành công');
        } else {
          toast.error('Cập nhật thất bại');
        }
      } else {
        documentData.image = documentImage;
        const res = await DocumentService.createDocument(documentData);
        if (res) {
          createDocument(res.data);
          toast.success('Tạo tài liệu thành công');
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
    <MyDocumentLayout>
      <div className='space-y-4'>
        {/* Image Preview */}
        <div className='flex justify-center items-center'>
          <div className='relative w-[150px] h-[200px] border rounded-xl overflow-hidden'>
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
        </div>

        {/* Document Name */}
        <div>
          <Label>Tên tài liệu</Label>
          <Input
            placeholder='Nhập tên tài liệu'
            value={documentData.name}
            onChange={(e) => setDocumentData((prev) => ({ ...prev, name: e.target.value }))}
          />
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

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Đang tải lên...' : documentId ? 'Cập nhật tài liệu' : 'Tải tài liệu lên'}
          </button>
        </div>
      </div>
    </MyDocumentLayout>
  );
};

export default UploadDocument;
