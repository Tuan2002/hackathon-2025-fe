/* eslint-disable @typescript-eslint/no-explicit-any */
import DocumentService from '@/services/documentService';
import React, { useEffect, useState } from 'react';
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

interface FavoriteEnumerationTabProps {
  documentId?: string;
}

const FavoriteEnumerationTab = ({ documentId }: FavoriteEnumerationTabProps) => {
  const [favoriteUsers, setFavoriteUsers] = useState<IDocumentUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!documentId) return;
    const fetchFavoriteUsers = async () => {
      setLoading(true);
      try {
        const response = await DocumentService.getFavoriteUsers(documentId);
        if (response.statusCode === 200 || response.statusCode === 201) {
          setFavoriteUsers(response.data);
        }
      } catch (error: any) {
        toast.error(error?.message || 'Có lỗi xảy ra khi tải danh sách người tải xuống');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteUsers();
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
            {favoriteUsers.length > 0 ? (
              favoriteUsers.map((user, index) => (
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
                  Chưa có người dùng nào yêu thích tài liệu này
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default FavoriteEnumerationTab;
