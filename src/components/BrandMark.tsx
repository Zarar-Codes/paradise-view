import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

export function BrandMark({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="10" height="10" fill="#D9E600" />
      <rect x="16" y="2" width="10" height="10" stroke="#D9E600" strokeWidth="2" />
      <rect x="2" y="16" width="10" height="10" stroke="#FFFFFF" strokeWidth="2" />
      <polygon points="16,26 26,16 26,26" fill="#D9E600" />
    </svg>
  );
}

export function StarburstEmblem({
  className = 'w-20 h-20',
  color = '#D9E600',
}: {
  className?: string;
  color?: string;
}) {
  const rays = 14;
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: rays }).map((_, idx) => {
        const angle = (idx * 360) / rays;
        return (
          <polygon
            key={idx}
            points="60,8 65,44 55,44"
            fill={color}
            transform={`rotate(${angle} 60 60)`}
          />
        );
      })}
      <circle cx="60" cy="60" r="10" fill={color} />
    </svg>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackTitle,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#222222] text-[#E7E7E3] p-6 ${className}`}
      >
        <Mountain className="w-8 h-8 text-[#D9E600] mb-3" strokeWidth={1.5} />
        <span className="font-display text-sm tracking-wide text-center">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
