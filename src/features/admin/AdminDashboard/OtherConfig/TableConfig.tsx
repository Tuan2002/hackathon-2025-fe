import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IConfig } from '@/types/configType';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Edit, Eye, MoreVertical, Trash } from 'lucide-react';

interface ITableConfigProps {
  listConfigs: IConfig[];
  onUpdate: (config: IConfig | null) => void;
  onDelete: (config: IConfig) => void;
  onShowDetail: (config: IConfig) => void;
  activeConfig?: IConfig | null;
}
const TableConfig = ({
  listConfigs,
  onUpdate,
  onDelete,
  onShowDetail,
  activeConfig,
}: ITableConfigProps) => {
  return (
    <div className='divide-y-2 divide-gray-200 dark:divide-gray-700'>
      {listConfigs.map((config, idx) => (
        <div
          key={idx}
          className='mb-2 flex items-center gap-4 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all'
        >
          {/* Cot: STT */}
          <div className='w-10 text-center font-bold'>
            <span className='text-gray-700 dark:text-gray-300'>{idx + 1}</span>
          </div>
          {/* Cột 1: tên gói cấu hình */}
          <div className='flex-1'>
            <span
              className={`text-gray-700 dark:text-gray-300 line-clamp-1 px-2 p-1 rounded-full ${config.id === activeConfig?.id ? 'bg-green-100' : 'bg-red-100'}`}
            >
              {config.name}
            </span>
          </div>
          {/* Cột 3: action dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon'>
                <MoreVertical className='w-5 h-5 text-gray-700 dark:text-gray-300' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuItem
                onClick={() => onShowDetail(config)}
                className='flex items-center gap-2'
              >
                <Eye className='w-4 h-4 text-green-500' />
                <span>Hiển thị</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onUpdate(config)}
                className='flex items-center gap-2'
              >
                <Edit className='w-4 h-4 text-green-500' />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(config)}
                className='flex items-center gap-2'
              >
                <Trash className='w-4 h-4 text-red-500' />
                <span>Xoá</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

export default TableConfig;
