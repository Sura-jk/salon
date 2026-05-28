import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  className?: string;
}

const ImageWithFallback = ({ 
  src, 
  alt = 'Beauty service', 
  className, 
  fallbackText,
  ...props 
}: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div 
        className={cn(
          "w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-primary/95 via-secondary/40 to-primary/90 text-primary-foreground p-4 text-center select-none",
          className
        )}
      >
        <Sparkles className="w-8 h-8 text-secondary mb-2 animate-pulse" />
        <span className="font-serif text-xs font-semibold uppercase tracking-widest text-secondary-foreground block">
          {fallbackText || alt}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setError(true)} 
      className={cn("w-full h-full object-cover", className)}
      {...props}
    />
  );
};

export default ImageWithFallback;