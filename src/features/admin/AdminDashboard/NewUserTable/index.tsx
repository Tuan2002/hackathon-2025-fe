import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Dữ liệu mẫu
const newUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', date: '2025-05-01' },
  { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', date: '2025-05-03' },
  { id: 3, name: 'Lê Văn C', email: 'c@gmail.com', date: '2025-05-05' },
];

const NewUserTable = () => {
  return (
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
  );
};

export default NewUserTable;
