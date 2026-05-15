import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  variant?: 'primary' | 'accent';
  className?: string;
  as?: 'span' | 'em' | 'strong';
};

export function GradientText({ children, variant = 'primary', className, as: As = 'span' }: Props) {
  return (
    <As
      className={cn(
        variant === 'primary' ? 'text-gradient-primary' : 'text-gradient-accent',
        'not-italic',
        className,
      )}
    >
      {children}
    </As>
  );
}
