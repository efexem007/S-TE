'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
}

export default function Spotlight({ children, className = '', size = 600, color = 'rgba(0, 240, 255, 0.07)' }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--spotlight-x', `${x}px`);
      container.style.setProperty('--spotlight-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
      } as React.CSSProperties}
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at var(--spotlight-x) var(--spotlight-y), ${color}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
