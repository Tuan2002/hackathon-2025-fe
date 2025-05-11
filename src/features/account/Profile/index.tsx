import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AccountLayout from '@/layouts/AccountLayout';

export default function Profile() {
  return (
    <AccountLayout>
      <Card className='p-3 h-[calc(100vh-120px)] shadow-lg space-y-5'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold'>Thông tin cá nhân</h2>
          <Button className='bg-green-600 hover:bg-green-700 text-white'>Cập nhật</Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label>Tên tài khoản</Label>
            <Input value='admin' disabled />
          </div>

          <div>
            <Label>
              Họ và tên <span className='text-red-500'>*</span>
            </Label>
            <Input defaultValue='Nguyễn Tạ Quyền' />
          </div>

          <div>
            <Label>
              Email <span className='text-red-500'>*</span>
            </Label>
            <Input type='email' defaultValue='admin@gmail.com' />
          </div>

          <div>
            <Label>Điện thoại</Label>
            <Input type='tel' defaultValue='0123456789' />
          </div>

          <div>
            <Label>
              Ngày sinh <span className='text-red-500'>*</span>
            </Label>
            <Input type='date' defaultValue='2003-08-05' />
          </div>

          <div>
            <Label>Giới tính</Label>
            <Select defaultValue='Nam'>
              <SelectTrigger>
                <SelectValue placeholder='Chọn giới tính' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Nam'>Nam</SelectItem>
                <SelectItem value='Nữ'>Nữ</SelectItem>
                <SelectItem value='Khác'>Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </AccountLayout>
  );
}
