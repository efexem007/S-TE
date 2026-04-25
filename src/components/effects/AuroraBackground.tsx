'use client';

import { ReactNode } from 'react';

interface AuroraBackgroundProps {
  children?: ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[aurora_20s_ease_infinite] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(0, 240, 255, 0.4) 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[aurora_25s_ease_infinite_reverse] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 70% 60%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)',
            animationDelay: '-5s',
          }}
        />
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-[aurora_18s_ease_infinite] opacity-15"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(244, 63, 94, 0.3) 0%, transparent 50%)',
            animationDelay: '-10s',
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>

      {/* Inline keyframes for aurora */}
      <style jsx>{`
        @keyframes aurora {
          0% {
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(5%, -5%) rotate(5deg) scale(1.1);
          }
          66% {
            transform: translate(-3%, 3%) rotate(-3deg) scale(0.95);
          }
          100% {
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
