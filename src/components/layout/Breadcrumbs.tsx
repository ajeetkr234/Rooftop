import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumbs" className="py-2.5 px-4 sm:px-6 lg:px-8 bg-white/70 border-b border-brand-border/60 text-xs backdrop-blur-sm">
      <div className="max-w-content mx-auto flex items-center flex-wrap gap-2 text-brand-muted">
        <Link
          to="/"
          className="flex items-center gap-1.5 hover:text-brand-copper transition-colors focus-visible:outline-brand-copper font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-brand-border shrink-0" />
              {isLast || !item.path ? (
                <span className="font-bold text-brand-navy" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper font-medium"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
