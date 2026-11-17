import React from 'react';
import { ShieldCheck, Hammer, Award, FileText } from 'lucide-react';

export const TrustIndicator: React.FC = () => {
  const indicators = [
    {
      title: "Professional Services",
      fullTitle: "Professional Roofing Services",
      description: "Dedicated to precision craftsmanship, clean worksites, and clear client communication.",
      shortDesc: "Precision craftsmanship & clean worksites",
      icon: ShieldCheck
    },
    {
      title: "Lifecycle Care",
      fullTitle: "Installation, Repair & Maintenance",
      description: "Comprehensive lifecycle care for residential and commercial roofing systems.",
      shortDesc: "Comprehensive residential & commercial care",
      icon: Hammer
    },
    {
      title: "Quality Workmanship",
      fullTitle: "Quality-Focused Workmanship",
      description: "Rigorous attention to manufacturer specifications and building envelope standards.",
      shortDesc: "Strict building envelope standards",
      icon: Award
    },
    {
      title: "Written Estimates",
      fullTitle: "Transparent Consultations",
      description: "Itemized written estimates detailing materials, labor, and anticipated project scope.",
      shortDesc: "Clear written proposals & scope",
      icon: FileText
    }
  ];

  return (
    <section id="trust-indicators" className="bg-white border-y border-brand-border py-4 sm:py-8 lg:py-10 px-3 sm:px-6 scroll-mt-24">
      <div className="max-w-content mx-auto">
        {/* Responsive Grid: Compact 2x2 on Mobile, 2x2 on Tablet, 4-Col Ribbon on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {indicators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5 p-2.5 sm:p-4 rounded-xl bg-brand-warm/60 border border-brand-border/70 hover:border-brand-copper/50 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-navy flex items-center justify-center text-brand-copper shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm lg:text-base font-bold text-brand-navy tracking-tight leading-snug">
                    <span className="sm:hidden">{item.title}</span>
                    <span className="hidden sm:inline">{item.fullTitle}</span>
                  </h3>
                  <p className="mt-0.5 sm:mt-1.5 text-[10px] sm:text-xs lg:text-sm text-brand-muted leading-tight sm:leading-relaxed">
                    <span className="sm:hidden">{item.shortDesc}</span>
                    <span className="hidden sm:inline">{item.description}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

