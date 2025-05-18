/* eslint-disable @typescript-eslint/no-explicit-any */
import DocumentService from '@/services/documentService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { IDocumentUser } from '@/types/documentType';

interface DownloadEnumerationTabProps {
  documentId?: string;
}

const DownloadEnumerationTab = ({ documentId }: DownloadEnumerationTabProps) => {
  const [downloadUsers, setDownloadUsers] = useState<IDocumentUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!documentId) return;
    const fetchDownloadUsers = async () => {
      setLoading(true);
      try {
        const response = await DocumentService.getDownloadUsers(documentId);
        if (response.statusCode === 200 || response.statusCode === 201) {
          setDownloadUsers(response.data);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra khi tải danh sách người tải xuống');
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadUsers();
  }, [documentId]);

  return (
    <div className='p-4'>
      {loading ? (
        <Skeleton className='h-8 w-full mb-2' />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'>#</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead>Tên người dùng</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {downloadUsers.length > 0 ? (
              downloadUsers.map((user, index) => (
                <TableRow key={user.userId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.userName} />
                      <AvatarFallback>{user.userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.userEmail}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  Chưa có người dùng nào tải xuống tài liệu này
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DownloadEnumerationTab;
