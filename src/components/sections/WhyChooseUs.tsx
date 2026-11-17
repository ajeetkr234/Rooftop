import React from 'react';
import { Calculator, MessagesSquare, CheckCircle, ShieldAlert, Layers, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: "Clear, Itemized Estimates",
      shortTitle: "Itemized Estimates",
      description: "Detailed breakdowns explaining labor, underlayment, flashing fabrication, and finish roofing materials without hidden fees.",
      shortDesc: "Transparent breakdowns without hidden fees.",
      icon: Calculator
    },
    {
      title: "Professional Communication",
      shortTitle: "Direct Contact",
      description: "A single designated point of contact keeping you informed at every milestone from inspection through final clean-up.",
      shortDesc: "Single point of contact from start to finish.",
      icon: MessagesSquare
    },
    {
      title: "Meticulous Attention to Detail",
      shortTitle: "Meticulous Detail",
      description: "Careful precision around critical water-shedding junctions: chimneys, valleys, step flashings, and skylights.",
      shortDesc: "Water-tight valley and flashing precision.",
      icon: CheckCircle
    },
    {
      title: "Safety-Conscious Workmanship",
      shortTitle: "OSHA Compliant",
      description: "Strict OSHA-compliant tie-offs, safety harnesses, perimeter fall protection, and daily magnetic sweep debris cleanup.",
      shortDesc: "Certified fall-protection & magnetic cleanups.",
      icon: ShieldAlert
    },
    {
      title: "Appropriate Architectural Materials",
      shortTitle: "Tailored Systems",
      description: "We install roofing systems tailored to your specific building pitch, weight limits, and local micro-climate conditions.",
      shortDesc: "Engineered for local climate & roof pitch.",
      icon: Layers
    },
    {
      title: "Dependable Project Coordination",
      shortTitle: "On-Time Schedule",
      description: "Realistic timeline scheduling, timely material drop deliveries, and prompt site cleanup upon job completion.",
      shortDesc: "Prompt deliveries & on-time completions.",
      icon: Clock
    }
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-20 px-3 sm:px-6 bg-brand-warm">
      <div className="max-w-content mx-auto">
        <SectionHeading
          eyebrow="Craftsmanship & Reliability"
          title="Why Work With Our Roofing Team"
          description="We take a transparent, engineering-first approach to roofing, ensuring your investment delivers maximum weather protection and peace of mind."
        />

        {/* Responsive Grid: Compact 2-Col on Mobile (prevents tall 1,000px scroll), 2-Col Tablet, 3-Col Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="p-3 sm:p-6 rounded-xl bg-white border border-brand-border shadow-sm hover:border-brand-copper/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-brand-slate text-brand-copper flex items-center justify-center mb-2 sm:mb-4 shrink-0 shadow-sm">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xs sm:text-base lg:text-lg font-bold text-brand-navy tracking-tight leading-snug">
                    <span className="sm:hidden">{item.shortTitle}</span>
                    <span className="hidden sm:inline">{item.title}</span>
                  </h3>
                  <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm text-brand-muted leading-tight sm:leading-relaxed">
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
