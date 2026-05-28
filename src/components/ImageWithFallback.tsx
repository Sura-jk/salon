import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: 'Hair' | 'Skincare' | 'Nails' | 'Spa' | 'Facial' | 'Makeup';
  className?: string;
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  'Hair': 'https://images.unsplash.com/photo-1560869713-7d0a29430863?q=80&w=800&auto=format&fit=crop',
  'Skincare': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop',
  'Nails': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
  'Spa': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
  'Facial': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop',
  'Makeup': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop',
  'Default': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop'
};

const ImageWithFallback = ({ 
  src, 
  alt = 'Beauty service', 
  className, 
  fallbackCategory = 'Hair',
  ...props 
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  // If there's an error or no src, use the category-specific fallback image
  const displaySrc = (error || !src) 
    ? (CATEGORY_FALLBACKS[fallbackCategory] || CATEGORY_FALLBACKS['Default']) 
    : src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img 
        src={displaySrc} 
        alt={alt} 
        onError={() => setError(true)} 
        className="w-full h-full object-cover transition-opacity duration-500"
        {...props}
      />
      {/* Subtle overlay to ensure luxury feel if fallback triggers */}
      {(error || !src) && (
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center pointer-events-none">
          <Sparkles className="w-5 h-5 text-secondary opacity-40" />
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;