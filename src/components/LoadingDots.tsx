'use client';

import { useEffect, useState } from 'react';

interface LoadingDotsProps {
  text?: string;
}

export default function LoadingDots({ text = 'Thinking' }: LoadingDotsProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center">
      <span className="text-gray-400">{text}</span>
      <span className="w-8 text-left">{dots}</span>
    </span>
  );
} 