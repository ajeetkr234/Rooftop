import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../ui/Buttons';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Protect Your Property With Reliable Roofing Craftsmanship",
  description = "Get in touch today to schedule an evaluation or request an itemized proposal for roof installation, leak repair, or seasonal maintenance.",
  primaryButtonText = "Request an Estimate",
  primaryButtonLink = "/request-estimate"
}) => {
  return (
    <section className="bg-brand-navy py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden text-white">
      {/* Decorative accent element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
            Work With Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to={primaryButtonLink}
              variant="primary"
              size="lg"
              className="flex items-center gap-2 shadow-lg w-full sm:w-auto"
            >
              <span>{primaryButtonText}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>

            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-base font-semibold text-slate-200 hover:text-white bg-brand-slate hover:bg-slate-800 border border-slate-700 transition-colors w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-brand-copper" />
              <span>{siteConfig.contact.phonePlaceholder}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

