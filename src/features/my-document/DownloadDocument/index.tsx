/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button';
import { Download, Eye, Heart } from 'lucide-react';
import useDocumentStore from '@/stores/documentStore';
import type { IDocument } from '@/types/documentType';
import { useEffect, useMemo, useState } from 'react';
import DocumentService from '@/services/documentService';
import TableCustom from '@/components/customs/TableCustom';
import { toast } from 'react-toastify';
import MyDocumentLayout from '@/layouts/MyDocumentLayout';
import ShowDocumentDetailModal from '@/components/ShowDocumentDetailModal';
import { Link } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';
import useCategoryStore from '@/stores/categoryStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { DOCUMENT_STATUSES } from '@/constants/documentStatuses';

const DownloadDocument = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const {
    listDocuments,
    currentDocument,
    openModalShowDocumentDetail,
    setOpenModalShowDocumentDetail,
    setListDocuments,
    setCurrentDocument,
  } = useDocumentStore();

  const { listCategories } = useCategoryStore();

  const handleOpenModalShowDocumentDetail = (document: IDocument) => {
    setCurrentDocument(document);
    setOpenModalShowDocumentDetail(true);
  };

  const handleCloseModalShowDocumentDetail = () => {
    setOpenModalShowDocumentDetail(false);
    setCurrentDocument(null);
  };

  const columns = useMemo(
    () => [
      {
        id: 'image',
        title: 'Ảnh',
        render: (document: IDocument) => (
          <div className='flex justify-center'>
            <img
              src={document.image}
              alt={document.name}
              className='w-20 h-28 object-cover rounded-xl border'
            />
          </div>
        ),
      },
      {
        id: 'name',
        title: 'Nội dung tài liệu',
        render: (document: IDocument) => (
          <div className='max-w-[250px] text-sm flex flex-col justify-between min-h-24'>
            {document.status === DOCUMENT_STATUSES.APPROVED ? (
              <Link
                to={RoutePaths.DocumentDetail.replace(
                  ':categorySlug',
                  document.categorySlug,
                ).replace(':documentSlug', document.slug)}
                className='font-semibold line-clamp-2 text-justify'
              >
                {document.name}
              </Link>
            ) : (
              <div className='font-semibold line-clamp-2 text-justify'>{document.name}</div>
            )}
            <div className='line-clamp-3 text-justify'>{document.description}</div>
          </div>
        ),
      },
      {
        id: 'info',
        title: 'Thông tin',
        render: (document: IDocument) => (
          <div className='text-sm space-y-1'>
            <div>
              <span className='font-medium'>Tác giả: </span>
              {document.authorName}
            </div>
            <div>
              <span className='font-medium'>Danh mục: </span>
              {document.categoryName}
            </div>
            <div>
              <span className='font-medium'>NXB: </span>
              {document.publisherName}
            </div>
          </div>
        ),
      },
      {
        id: 'statistics',
        title: 'Thông số',
        render: (document: IDocument) => (
          <div className='text-sm space-y-1 flex items-center justify-center flex-col'>
            <div className='flex items-center gap-1'>
              <Eye size={14} /> {document.viewCount} lượt xem
            </div>
            <div className='flex items-center gap-1'>
              <Heart size={14} /> {document.favoriteCount} lượt thích
            </div>
            <div className='flex items-center gap-1'>
              <Download size={14} /> {document.downloadCount} lượt tải
            </div>
          </div>
        ),
      },

      {
        id: 'actions',
        title: 'Tác vụ',
        render: (document: IDocument) => (
          <Button
            onClick={() => handleOpenModalShowDocumentDetail(document)}
            variant='secondary'
            size='icon'
          >
            <Eye className='w-5 h-5 text-gray-700' />
          </Button>
        ),
      },
    ],
    [],
  );

  const filteredDocuments = useMemo(() => {
    return listDocuments?.filter((doc) => {
      const matchesSearch = doc.name?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter ? doc.categoryId === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [listDocuments, search, categoryFilter]);

  useEffect(() => {
    const fetchDownloadedDocuments = async () => {
      try {
        const response = await DocumentService.getDownloadedDocuments();
        if (response.statusCode === 200) {
          setListDocuments(response.data);
        } else {
          toast.error(response.message || 'Có lỗi xảy ra khi tải tài liệu');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra khi tải tài liệu');
      }
    };
    fetchDownloadedDocuments();
  }, []);

  return (
    <MyDocumentLayout>
      <div className='flex gap-4 mb-4'>
        <Input
          placeholder='Tìm theo tên tài liệu...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='max-w-xs'
        />
        <Select
          value={categoryFilter ?? 'all'}
          onValueChange={(val) => setCategoryFilter(val === 'all' ? null : val)}
        >
          <SelectTrigger className='w-48'>
            <SelectValue placeholder='Chọn danh mục' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả danh mục</SelectItem>
            {listCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TableCustom data={filteredDocuments ?? []} columns={columns} />
      <ShowDocumentDetailModal
        open={openModalShowDocumentDetail}
        onClose={handleCloseModalShowDocumentDetail}
        document={currentDocument}
      />
    </MyDocumentLayout>
  );
};

export default DownloadDocument;
