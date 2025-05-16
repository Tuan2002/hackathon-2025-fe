import { useState, useEffect } from 'react';

interface PaginationCustomProps {
  totalItems: number;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  onChangePage: (page: number, pageSize: number) => void;
}

const PaginationCustom = ({
  totalItems,
  pageSizeOptions = [5, 10, 15, 20],
  defaultPageSize = 10,
  onChangePage,
}: PaginationCustomProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    onChangePage(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-wrap items-center justify-between mt-8 gap-4'>
      <div className='flex items-center gap-3'>
        {/* Tổng số phần tử */}
        <div className='text-sm text-gray-700 dark:text-gray-300'>
          Tổng số: <span className='font-semibold'>{totalItems}</span>
        </div>

        {/* Chọn số trang */}
        <div className='flex items-center gap-2'>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className='border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}/trang
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chuyển trang */}
      <div className='flex items-center gap-3'>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className='px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition'
        >
          Trang trước
        </button>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          Trang {currentPage}/{totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className='px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition'
        >
          Trang tiếp
        </button>
      </div>
    </div>
  );
};

export default PaginationCustom;
