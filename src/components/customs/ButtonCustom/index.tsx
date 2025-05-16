import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const ButtonCustom = ({
  children,
  isLoading,
  disabled,
  ...props
}: ButtonCustomProps & ButtonProps) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {children}
    </Button>
  );
};

export default ButtonCustom;
