'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { ReactNode } from 'react';
import ButtonCustom from '../ButtonCustom';

interface ModalCustomProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  showFooter?: boolean;
  showHeader?: boolean;
  isFullHeight?: boolean;
  onConfirm?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  isConfirming?: boolean;
}

const ModalCustom = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showFooter = true,
  showHeader = true,
  onConfirm,
  isFullHeight = true,
  isConfirming = false,
}: ModalCustomProps) => {
  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  }[size];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        hideCloseButton
        className={`${sizeClass} rounded-xl p-0 overflow-hidden border 
        bg-white dark:bg-gray-500 dark:border-gray-700 
        shadow-xl gap-2`}
      >
        {showHeader && (
          <DialogHeader className='p-2 border-b bg-gray-100 dark:bg-gray-600 dark:border-gray-600'>
            <DialogTitle className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
              {title}
            </DialogTitle>
          </DialogHeader>
        )}

        <div
          className={`p-2 ${isFullHeight ? 'max-h-[calc(100vh-200px)] overflow-y-auto' : ''}
            [&::-webkit-scrollbar]:w-1 
            [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
            [&::-webkit-scrollbar-thumb]:rounded-full 
            [&::-webkit-scrollbar-track]:bg-gray-200 dark:[&::-webkit-scrollbar-track]:bg-gray-600`}
        >
          {children}
        </div>

        {showFooter && (
          <DialogFooter className='flex justify-end gap-3 border-t p-2 bg-gray-50 dark:bg-gray-600 dark:border-gray-600'>
            {footer ? (
              footer
            ) : (
              <>
                <Button variant='outline' className='w-28' onClick={onClose}>
                  Huỷ
                </Button>
                <ButtonCustom isLoading={isConfirming} className='w-28' onClick={onConfirm}>
                  Xác nhận
                </ButtonCustom>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCustom;
