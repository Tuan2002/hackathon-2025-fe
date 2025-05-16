import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Download, Eye } from 'lucide-react';
import type { IDocument } from '@/types/documentType';
import RoutePaths from '@/routes/routePaths';

interface DocumentItemProps {
  document: IDocument;
}

const DocumentItem = ({ document }: DocumentItemProps) => {
  return (
    <Card className='overflow-hidden shadow-md transition hover:shadow-lg bg-white dark:bg-gray-800'>
      <img src={document.image} alt={document.name} className='w-full h-44 object-cover' />

      <div className='p-2 space-y-2'>
        <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 h-10 text-justify'>
          {document.name}
        </h3>

        <p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-2 h-10 text-justify'>
          {document.shortDescription}
        </p>

        <div className='text-xs text-gray-500 dark:text-gray-400'>
          <p>Tác giả: {document.authorName}</p>
          <p>NXB: {document.publisherName}</p>
        </div>

        <div className='flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400'>
          <span className='flex items-center gap-1'>
            <Eye size={14} /> {document.viewCount} lượt xem
          </span>
          <span className='flex items-center gap-1'>
            <Download size={14} /> {document.downloadCount} lượt tải
          </span>
        </div>

        <Link
          to={`${RoutePaths.DocumentDetail.replace(':categorySlug', document.categorySlug).replace(':documentSlug', document.slug)}`}
          className='block w-full text-center mt-3 bg-purple-600 text-white rounded-lg py-1.5 text-sm font-medium hover:bg-purple-700 transition'
        >
          Xem chi tiết
        </Link>
      </div>
    </Card>
  );
};

export default DocumentItem;
