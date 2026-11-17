import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { cn } from '../../utils';

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = "Frequently Asked Questions",
  description = "Get answers to common questions about roof installation, leak repairs, inspections, and project estimates.",
  eyebrow = "Help & Clarity",
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={cn("py-20 px-4 sm:px-6 bg-white border-t border-brand-border", className)}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${item.id}`;
            const headerId = `faq-header-${item.id}`;

            return (
              <div
                key={item.id}
                className="border border-brand-border rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-brand-warm/40 hover:bg-brand-warm transition-colors focus-visible:outline-brand-copper"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-brand-navy flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-brand-copper shrink-0 hidden sm:inline-block" />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-brand-navy shrink-0 transition-transform duration-200",
                      isOpen ? "rotate-180 text-brand-copper" : ""
                    )}
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="p-5 bg-white text-brand-dark text-sm leading-relaxed border-t border-brand-border/60 animate-fadeIn"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

