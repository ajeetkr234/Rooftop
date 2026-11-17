import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, ShieldAlert, Wrench, Hammer, CheckSquare } from 'lucide-react';
import { updatePageSEO } from '../utils';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO("Page Not Found | 404", "The requested roofing page could not be found. Navigate back to our core services or homepage.");
  }, []);

  return (
    <div className="py-24 px-4 sm:px-6 bg-brand-warm flex items-center justify-center min-h-[60vh]">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-copper/15 text-brand-copper flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-copper bg-brand-copper-light px-3 py-1 rounded-full border border-brand-copper/30">
          404 Error: Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
          Looking for a Specific Roofing Service?
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          The page or address you entered does not exist or has been relocated. Explore our primary roofing services below:
        </p>

        {/* Quick Links to Key Services */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link
            to="/services/roof-installation"
            className="p-3 rounded-lg bg-white border border-brand-border hover:border-brand-copper transition-colors group"
          >
            <Hammer className="w-4 h-4 text-brand-copper mb-1" />
            <span className="block text-xs font-bold text-brand-navy group-hover:text-brand-copper">Installation</span>
          </Link>
          <Link
            to="/services/roof-repair"
            className="p-3 rounded-lg bg-white border border-brand-border hover:border-brand-copper transition-colors group"
          >
            <Wrench className="w-4 h-4 text-brand-copper mb-1" />
            <span className="block text-xs font-bold text-brand-navy group-hover:text-brand-copper">Leak Repair</span>
          </Link>
          <Link
            to="/services/roof-maintenance"
            className="p-3 rounded-lg bg-white border border-brand-border hover:border-brand-copper transition-colors group"
          >
            <CheckSquare className="w-4 h-4 text-brand-copper mb-1" />
            <span className="block text-xs font-bold text-brand-navy group-hover:text-brand-copper">Maintenance</span>
          </Link>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-brand-navy hover:bg-brand-slate text-white text-sm font-semibold transition-colors focus-visible:outline-brand-copper"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-copper transition-colors"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

