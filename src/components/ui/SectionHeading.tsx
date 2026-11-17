import React from 'react';
import { cn } from '../../utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'max-w-3xl mb-6 sm:mb-10 lg:mb-12',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 mb-2 sm:mb-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded border',
            dark
              ? 'bg-brand-copper/20 text-brand-copper border-brand-copper/30'
              : 'bg-brand-copper-light text-brand-copper border-brand-copper/20'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-balance leading-tight',
          dark ? 'text-white' : 'text-brand-navy'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-2 sm:mt-4 text-xs sm:text-base lg:text-lg leading-relaxed text-balance',
            dark ? 'text-slate-300' : 'text-brand-muted'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

