'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={contentRef}
        className={cn(
          'glass-strong rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl',
          'animate-[scaleIn_0.3s_ease-out]',
          className
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 glass border-b border-white/10">
          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="p-2 rounded-full hover:bg-white/10 transition-colors ml-auto"
          >
            <X className="w-5 h-5 text-text-light/70" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
