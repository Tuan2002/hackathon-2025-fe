/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import CardScroll from '@/components/customs/CardScroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Edit, Eye, Heart, MoreVertical, Plus, Trash } from 'lucide-react';
import CreateAndUpdateDocumentModal from './CreateAndUpdateDocumentModal';
import useDocumentStore from '@/stores/documentStore';
import type { IDocument } from '@/types/documentType';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useAuthorStore from '@/stores/authorStore';
import AuthorService from '@/services/authorService';
import useCategoryStore from '@/stores/categoryStore';
import usePublisherStore from '@/stores/publisherStore';
import CategoryService from '@/services/categoryService';
import PublisherService from '@/services/publisherService';
import DocumentService from '@/services/documentService';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TableCustom from '@/components/customs/TableCustom';
import ShowDocumentDetailModal from '../../../components/ShowDocumentDetailModal';
import ModalConfirm from '@/components/customs/ModalConfirm';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import RoutePaths from '@/routes/routePaths';
import {
  DOCUMENT_STATUS_COLORS,
  DOCUMENT_STATUS_LABELS,
  DOCUMENT_STATUSES,
  DOCUMENT_STATUS_OPTIONS,
} from '@/constants/documentStatuses';
// import RejectDocumentModal from './RejectDocumentModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import EnumerationModal from './EnumerationModal';
import generatePriceStatus from '@/utils/generatePriceStatus';

const ManageDocument = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const {
    listDocuments,
    currentDocument,
    openModalCreateAndUpdateDocument,
    openModalShowDocumentDetail,
    setOpenModalShowDocumentDetail,
    setListDocuments,
    setCurrentDocument,
    openModalDeleteDocument,
    deleteDocument,
    setOpenModalDeleteDocument,
    setOpenModalCreateAndUpdateDocument,
    // openModalRejectDocument,
    setOpenModalRejectDocument,
    // openModalApproveDocument,
    updateDocument,
    setOpenModalApproveDocument,
    setOpenModalShowEnumerationDocument,
    openModalShowEnumerationDocument,
  } = useDocumentStore();

  const { setListAuthors } = useAuthorStore();

  const { setListCategories } = useCategoryStore();

  const { setListPublishers } = usePublisherStore();

  const handleOpenModalCreateAndUpdateDocument = (document: IDocument | null) => {
    setCurrentDocument(document);
    setOpenModalCreateAndUpdateDocument(true);
  };

  const handleCloseModalCreateAndUpdateDocument = () => {
    setOpenModalCreateAndUpdateDocument(false);
    setCurrentDocument(null);
  };

  const handleOpenModalShowDocumentDetail = (document: IDocument) => {
    setCurrentDocument(document);
    setOpenModalShowDocumentDetail(true);
  };

  const handleCloseModalShowDocumentDetail = () => {
    setOpenModalShowDocumentDetail(false);
    setCurrentDocument(null);
  };

  const handleOpenModalDeleteDocument = (document: IDocument) => {
    setCurrentDocument(document);
    setOpenModalDeleteDocument(true);
  };

  const handleCloseModalDeleteDocument = () => {
    setOpenModalDeleteDocument(false);
    setCurrentDocument(null);
  };

  // const handleOpenModalApproveDocument = (document: IDocument) => {
  //   setCurrentDocument(document);
  //   setOpenModalApproveDocument(true);
  // };

  const handleCloseModalApproveDocument = () => {
    setOpenModalApproveDocument(false);
    setCurrentDocument(null);
  };

  // const handleOpenModalRejectDocument = (document: IDocument) => {
  //   setCurrentDocument(document);
  //   setOpenModalRejectDocument(true);
  // };

  const handleCloseModalRejectDocument = () => {
    setOpenModalRejectDocument(false);
    setCurrentDocument(null);
  };

  const handleOpenModalShowEnumeration = (document: IDocument) => {
    setCurrentDocument(document);
    setOpenModalShowEnumerationDocument(true);
  };

  const handleCloseModalShowEnumeration = () => {
    setOpenModalShowEnumerationDocument(false);
    setCurrentDocument(null);
  };

  const handleConfirmDeleteDocument = async () => {
    if (!currentDocument) return;
    setIsLoading(true);
    try {
      const response = await DocumentService.deleteDocument(currentDocument?.id as string);
      if (response && response.statusCode === 200) {
        deleteDocument(currentDocument?.id as string);
        handleCloseModalDeleteDocument();
        toast.success('Xoá tài liệu thành công');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Xoá tài liệu thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmApproveDocument = async (point: number) => {
    if (!currentDocument) return;
    setIsLoading(true);
    try {
      const response = await DocumentService.approveDocument(currentDocument?.id as string, point);
      if (response && response.statusCode === 200) {
        updateDocument({
          ...currentDocument,
          status: DOCUMENT_STATUSES.APPROVED,
        });
        handleCloseModalApproveDocument();
        toast.success('Duyệt tài liệu thành công');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Duyệt tài liệu thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmRejectDocument = async (reason: string) => {
    if (!currentDocument?.id) return;
    try {
      const response = await DocumentService.rejectDocument(currentDocument?.id, reason);
      if (response && response.statusCode === 200) {
        updateDocument({
          ...currentDocument,
          status: DOCUMENT_STATUSES.REJECTED,
          rejectedReason: reason,
        });
        handleCloseModalRejectDocument();
        toast.success('Từ chối tài liệu thành công');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Từ chối tài liệu thất bại');
    }
  };

  const fetchAuthors = useCallback(async () => {
    try {
      const response = await AuthorService.getAuthors();
      if (response && response.statusCode === 200) {
        setListAuthors(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  }, [setListAuthors]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await CategoryService.getCategories();
      if (response && response.statusCode === 200) {
        setListCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [setListCategories]);

  const fetchPublishers = useCallback(async () => {
    try {
      const response = await PublisherService.getPublishers();
      if (response && response.statusCode === 200) {
        setListPublishers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch publishers:', error);
    }
  }, [setListPublishers]);

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await DocumentService.getDocuments();
      if (response && response.statusCode === 200) {
        setListDocuments(response.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [setListDocuments]);

  const columns = useMemo(
    () => [
      {
        id: 'image',
        title: <div className='text-center'>Ảnh</div>,
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
        title: <div className='text-center'>Thông số</div>,
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
        id: 'status',
        title: 'Trạng thái',
        render: (document: IDocument) => {
          const price = generatePriceStatus(document.point);

          return (
            <div className='flex items-center justify-center gap-2 flex-col'>
              <span
                className='p-2 rounded-full text-xs font-medium text-slate-700'
                style={{ backgroundColor: DOCUMENT_STATUS_COLORS[document.status] || '#e0e7ff' }}
              >
                {DOCUMENT_STATUS_LABELS[document.status] || 'Chưa xác định'}
              </span>

              <span
                className='p-2 rounded-full text-xs font-medium text-slate-700 min-w-20 text-center'
                style={{ backgroundColor: price.color || '#e0e7ff' }}
              >
                {price.label}
              </span>
            </div>
          );
        },
      },
      {
        id: 'actions',
        title: 'Tác vụ',
        render: (document: IDocument) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon'>
                <MoreVertical className='w-5 h-5 text-gray-700' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem
                onClick={() => handleOpenModalShowDocumentDetail(document)}
                className='flex items-center gap-2'
              >
                <Eye className='w-4 h-4 text-blue-500' /> Xem chi tiết
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenModalShowEnumeration(document)}
                className='flex items-center gap-2'
              >
                <Eye className='w-4 h-4 text-blue-500' /> Xem thống kê
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenModalCreateAndUpdateDocument(document)}
                className='flex items-center gap-2'
              >
                <Edit className='w-4 h-4 text-green-500' /> Chỉnh sửa
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleOpenModalDeleteDocument(document)}
                className='flex items-center gap-2'
              >
                <Trash className='w-4 h-4 text-red-500' /> Xoá
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [],
  );
  const filteredDocuments = useMemo(() => {
    return listDocuments?.filter((doc) => {
      const matchesSearch = doc.name?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? doc.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [listDocuments, search, statusFilter]);

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    fetchPublishers();
    fetchDocuments();
  }, [fetchAuthors, fetchCategories, fetchPublishers, fetchDocuments]);

  return (
    <CardScroll title='Danh sách tài liệu'>
      <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
        <div className='flex gap-4 mb-4'>
          <Input
            placeholder='Tìm theo tên tài liệu...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-xs'
          />

          <Select
            value={statusFilter ?? 'all'}
            onValueChange={(val) => setStatusFilter(val === 'all' ? null : val)}
          >
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='Chọn trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả trạng thái</SelectItem>
              {DOCUMENT_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => handleOpenModalCreateAndUpdateDocument(null)}>
          <Plus className='w-4 h-4 mr-2' /> Thêm mới
        </Button>
      </div>
      <TableCustom data={filteredDocuments ?? []} columns={columns} />
      <CreateAndUpdateDocumentModal
        open={openModalCreateAndUpdateDocument}
        onClose={handleCloseModalCreateAndUpdateDocument}
        currentDocument={currentDocument}
      />
      <ShowDocumentDetailModal
        open={openModalShowDocumentDetail}
        onClose={handleCloseModalShowDocumentDetail}
        document={currentDocument}
        onApprove={handleConfirmApproveDocument}
        onReject={handleConfirmRejectDocument}
      />
      <ModalConfirm
        title='Xoá tài liệu'
        description='Bạn có chắc chắn muốn xoá tài liệu này không?'
        onConfirm={handleConfirmDeleteDocument}
        type='delete'
        open={openModalDeleteDocument}
        onClose={handleCloseModalDeleteDocument}
        isConfirming={isLoading}
      />
      <EnumerationModal
        open={openModalShowEnumerationDocument}
        onClose={handleCloseModalShowEnumeration}
      />
      {/* <ModalConfirm
        title='Duyệt tài liệu'
        description='Bạn có chắc chắn muốn duyệt cho tài liệu này không?'
        onConfirm={handleConfirmApproveDocument}
        type='confirm'
        open={openModalApproveDocument}
        onClose={handleCloseModalApproveDocument}
        isConfirming={isLoading}
      />
      <RejectDocumentModal
        open={openModalRejectDocument}
        onClose={handleCloseModalRejectDocument}
        onReject={handleConfirmRejectDocument}
      /> */}
    </CardScroll>
  );
};

export default ManageDocument;
