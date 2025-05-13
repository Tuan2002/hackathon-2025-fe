import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BsFillPencilFill } from 'react-icons/bs';

const configs = [
  { label: 'Số lượng tài liệu nổi bật ở trang chủ', defaultValue: 5 },
  { label: 'Số lượng cột hiển thị của tài liệu nổi bật', defaultValue: 5 },
  { label: 'Số lượng phản hồi hiển thị ở trang chủ', defaultValue: 5 },
  { label: 'Số lượng bài viết hiển thị ở trang chủ', defaultValue: 5 },
];

const OtherConfig = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Các thông số hệ thống</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {configs.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between pb-3 border-b last:border-none'
          >
            <span className='text-sm font-medium'>{item.label}</span>
            <div className='flex items-center gap-2'>
              <Input type='number' defaultValue={item.defaultValue} className='w-20 h-9 text-sm' />
              <Button size='icon' variant='outline' className='w-8 h-8 p-0 border-gray-300'>
                <BsFillPencilFill className='w-4 h-4 text-gray-600' />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OtherConfig;
