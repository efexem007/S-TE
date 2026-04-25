import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[16px] bg-white p-6 transition-all duration-300',
        hover && 'hover:-translate-y-2 hover:shadow-card-hover',
        'shadow-card',
        className
      )}
    >
      {children}
    </div>
  );
}
