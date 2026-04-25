'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextRevealProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

export default function TextReveal({
  children,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  splitBy = 'words',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const items = splitBy === 'chars'
      ? el.querySelectorAll('.text-reveal-item')
      : el.querySelectorAll('.text-reveal-item');

    gsap.set(items, { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, delay, stagger, duration, splitBy]);

  const splitText = () => {
    if (splitBy === 'chars') {
      return children.split('').map((char, i) => (
        <span key={i} className="text-reveal-item inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
    if (splitBy === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="text-reveal-item inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }
    // lines — split by newlines
    return children.split('\n').map((line, i) => (
      <span key={i} className="text-reveal-item block">
        {line}
      </span>
    ));
  };

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={containerRef as any} className={className}>
      {splitText()}
    </Tag>
  );
}
