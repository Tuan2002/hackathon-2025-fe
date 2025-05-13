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
const newDocuments = [
  { id: 1, title: 'Giáo trình ReactJS', category: 'Công nghệ thông tin', date: '2025-05-04' },
  { id: 2, title: 'Lịch sử thế giới', category: 'Lịch sử', date: '2025-05-06' },
  { id: 3, title: 'Ngữ pháp tiếng Anh', category: 'Ngôn ngữ', date: '2025-05-07' },
];
const NewDocumentTable = () => {
  return (
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
  );
};

export default NewDocumentTable;
