'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock, Trash2, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type?: 'delete' | 'lock' | 'confirm' | 'warning';
}

const iconMap: Record<string, ReactNode> = {
  delete: <Trash2 className='text-red-500 w-14 h-14' />,
  lock: <Lock className='text-yellow-500 w-14 h-14' />,
  confirm: <CheckCircle className='text-green-500 w-14 h-14' />,
  warning: <AlertTriangle className='text-orange-500 w-14 h-14' />,
};

const ModalConfirm = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  type = 'confirm',
}: ModalConfirmProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent hideCloseButton className='max-w-sm rounded-2xl p-6 text-center shadow-xl'>
        <div className='flex justify-center mb-4'>
          <div
            className={cn(
              'rounded-full p-3 shadow-inner',
              type === 'delete' && 'bg-red-50',
              type === 'lock' && 'bg-yellow-50',
              type === 'confirm' && 'bg-green-50',
              type === 'warning' && 'bg-orange-50',
            )}
          >
            {iconMap[type]}
          </div>
        </div>
        <DialogHeader className='text-center'>
          <h2 className='text-xl font-semibold text-center'>{title}</h2>
        </DialogHeader>
        <p className='text-sm text-gray-500 '>{description}</p>

        <div className='flex justify-center gap-3 mt-6'>
          <Button variant='outline' className='w-28' onClick={onClose}>
            Huỷ
          </Button>
          <Button
            className={cn(
              'w-28',
              type === 'delete' && 'bg-red-500 hover:bg-red-600',
              type === 'lock' && 'bg-yellow-500 hover:bg-yellow-600',
              type === 'confirm' && 'bg-green-500 hover:bg-green-600',
              type === 'warning' && 'bg-orange-500 hover:bg-orange-600',
            )}
            onClick={onConfirm}
          >
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConfirm;
