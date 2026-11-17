import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../utils';

const VERIFIED_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80";

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  className?: string;
  fallbackText?: string;
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  className = '',
  fallbackText = 'Roofing Workmanship',
  priority = false,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
    setTriedFallback(false);
  }, [src]);

  const aspectClasses = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    auto: '',
  }[aspectRatio];

  const handleImageError = () => {
    if (!triedFallback && currentSrc !== VERIFIED_FALLBACK_IMAGE) {
      // Attempt verified fallback before showing placeholder card
      setTriedFallback(true);
      setCurrentSrc(VERIFIED_FALLBACK_IMAGE);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gradient-to-br from-brand-slate to-brand-navy text-slate-300 flex flex-col items-center justify-center p-6 text-center border border-slate-700/60 rounded-md',
          aspectClasses,
          className
        )}
        role="img"
        aria-label={`${alt} (Demonstration placeholder)`}
      >
        <div className="w-12 h-12 rounded-full bg-brand-slate/80 border border-brand-copper/30 flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6 text-brand-copper" />
        </div>
        <span className="text-xs uppercase tracking-widest text-slate-200 font-bold">
          {fallbackText}
        </span>
        <span className="text-[11px] text-slate-400 mt-1">
          Architectural Roofing Portfolio
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-brand-slate/10', aspectClasses, className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-brand-slate/20 animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...rest}
      />
    </div>
  );
};
