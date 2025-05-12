import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ColumnProps {
  id: string;
  title: string;
  headerClass?: string;
  cellClass?: string;
  render: (item: any, index: number) => React.ReactNode;
}

interface TableCustomProps {
  data: any[];
  columns: ColumnProps[];
  initialPageSize?: number;
}

const TableCustom = ({ data, columns, initialPageSize = 10 }: TableCustomProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }

    return pageNumbers.map((page, index) =>
      page === '...' ? (
        <span key={index} className='px-2 text-gray-500'>
          ...
        </span>
      ) : (
        <Button
          key={index}
          variant={page === currentPage ? 'default' : 'outline'}
          size='sm'
          className={`rounded-full px-3 h-8 text-sm ${
            page === currentPage
              ? 'bg-blue-600 text-white hover:bg-blue-600'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => handlePageChange(Number(page))}
        >
          {page}
        </Button>
      ),
    );
  };

  return (
    <div className='space-y-5'>
      <Table className='border-[1px] rounded-lg'>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.id} className={col.headerClass || ''}>
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={item.id}>
              {columns.map((col) => (
                <TableCell key={col.id} className={col.cellClass || ''}>
                  {col.render(item, startIndex + index)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {paginatedData.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className='text-center py-6'>
                Không có dữ liệu.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex items-center gap-3'>
            <span>Hiển thị:</span>
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className='w-20 h-8'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='5'>5</SelectItem>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
              </SelectContent>
            </Select>
            <span>dòng/trang</span>
          </div>

          <div className='flex items-center gap-2 flex-wrap'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className='h-8 px-3'
            >
              Trước
            </Button>

            {renderPageNumbers()}

            <Button
              variant='outline'
              size='sm'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='h-8 px-3'
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCustom;
