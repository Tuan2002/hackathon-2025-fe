import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, FilePlus, BarChart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminDashboard = () => {
  // Dữ liệu mẫu
  const newUsers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', date: '2025-05-01' },
    { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', date: '2025-05-03' },
    { id: 3, name: 'Lê Văn C', email: 'c@gmail.com', date: '2025-05-05' },
  ];

  const newDocuments = [
    { id: 1, title: 'Giáo trình ReactJS', category: 'Công nghệ thông tin', date: '2025-05-04' },
    { id: 2, title: 'Lịch sử thế giới', category: 'Lịch sử', date: '2025-05-06' },
    { id: 3, title: 'Ngữ pháp tiếng Anh', category: 'Ngôn ngữ', date: '2025-05-07' },
  ];

  return (
    <div className='space-y-8'>
      {/* 4 ô thống kê */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        <Card className='shadow-md dark:bg-gray-800'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-base'>Người dùng mới</CardTitle>
            <Users className='w-6 h-6 text-blue-600 dark:text-blue-400' />
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>123</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Trong tháng này</p>
          </CardContent>
        </Card>

        <Card className='shadow-md dark:bg-gray-800'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-base'>Tổng tài liệu</CardTitle>
            <BookOpen className='w-6 h-6 text-green-600 dark:text-green-400' />
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>560</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Tài liệu hiện có</p>
          </CardContent>
        </Card>

        <Card className='shadow-md dark:bg-gray-800'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-base'>Lượt truy cập</CardTitle>
            <BarChart className='w-6 h-6 text-orange-500 dark:text-orange-400' />
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>8500</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Trong tháng này</p>
          </CardContent>
        </Card>

        <Card className='shadow-md dark:bg-gray-800'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-base'>Tài liệu mới</CardTitle>
            <FilePlus className='w-6 h-6 text-purple-600 dark:text-purple-400' />
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-bold'>35</p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Trong tuần này</p>
          </CardContent>
        </Card>
      </div>

      {/* Bảng người dùng mới */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        <Card className='shadow-md dark:bg-gray-800'>
          <CardHeader>
            <CardTitle>Người dùng mới</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bảng tài liệu mới */}
        <Card className='shadow-md dark:bg-gray-800'>
          <CardHeader>
            <CardTitle>Tài liệu mới</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên tài liệu</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Ngày thêm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
