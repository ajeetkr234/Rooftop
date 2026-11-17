import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { ResponsiveImage } from '../ui/ResponsiveImage';

export interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  ctaText: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  slug,
  title,
  description,
  image,
  features,
  ctaText,
}) => {
  return (
    <div className="flex flex-col bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Image Container - Sleeker aspect ratio on mobile to prevent excessive height */}
      <div className="relative aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-brand-slate">
        <ResponsiveImage
          src={image}
          alt={`${title} roofing work`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 card-gradient-overlay" />
        <div className="absolute bottom-2 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4">
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-brand-copper bg-brand-navy/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded backdrop-blur-sm border border-slate-700">
            Core Service
          </span>
        </div>
      </div>

      {/* Content - Compact padding on mobile, expansive on desktop */}
      <div className="p-3.5 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-brand-navy tracking-tight group-hover:text-brand-copper transition-colors">
            {title}
          </h3>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
            {description}
          </p>

          {/* Mobile concise feature chips: saves ~120px of height per card */}
          <div className="mt-2.5 flex flex-wrap gap-1 sm:hidden">
            {features.slice(0, 2).map((feat, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-brand-warm text-slate-700 border border-brand-border/80">
                <Check className="w-2.5 h-2.5 text-brand-copper shrink-0" />
                <span className="truncate max-w-[200px]">{feat}</span>
              </span>
            ))}
          </div>

          {/* Desktop full key items list */}
          <ul className="hidden sm:block mt-4 lg:mt-5 space-y-2 border-t border-brand-border/60 pt-3 lg:pt-4">
            {features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-brand-dark">
                <Check className="w-3.5 h-3.5 text-brand-copper mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Link */}
        <div className="mt-3 pt-2.5 sm:mt-5 sm:pt-4 border-t border-brand-border/40">
          <Link
            to={`/services/${slug}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-brand-navy group-hover:text-brand-copper transition-colors focus-visible:outline-brand-copper"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 text-brand-copper" />
          </Link>
        </div>
      </div>
    </div>
  );
};

