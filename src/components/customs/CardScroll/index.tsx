import { Card } from '@/components/ui/card';

interface CardScrollProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  isFullHeight?: boolean;
}

const CardScroll = ({
  children,
  title = 'Tiêu đề mặc định',
  showHeader = true,
  isFullHeight = true,
}: CardScrollProps) => {
  return (
    <Card className='rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
      {showHeader && (
        <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
          <h4 className='text-base font-semibold text-gray-800 dark:text-gray-100'>{title}</h4>
        </div>
      )}
      <div
        className='p-4 overflow-auto max-h-[calc(100vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-track]:bg-gray-200'
        style={{ height: isFullHeight ? 'calc(100vh - 140px)' : 'auto' }}
      >
        {children}
      </div>
    </Card>
  );
};

export default CardScroll;
