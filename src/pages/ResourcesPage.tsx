import React, { useEffect, useState } from 'react';
import { Clock, Tag, ChevronDown, CheckCircle2 } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { resourcesData } from '../data/resourcesData';
import { faqsData } from '../data/faqsData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { CTASection } from '../components/sections/CTASection';

export const ResourcesPage: React.FC = () => {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(resourcesData[0].id);

  useEffect(() => {
    updatePageSEO(
      "Roofing Resources, Guides & Practical Advice",
      "Educational articles and technical guides for property owners. Seasonal maintenance tips, leak diagnosis, and replacement planning advice."
    );
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Resources & Guides' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
              Knowledge Base
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roofing Guides, Diagnostic Advice & Planning
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Clear, practical advice to help property managers and homeowners understand building envelope components, seasonal upkeep, and roofing investments.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto space-y-8">
          <SectionHeading
            eyebrow="Educational Guides"
            title="Practical Roofing Knowledge"
            description="Explore our architectural breakdowns covering common failure modes, seasonal checklists, and replacement best practices."
          />

          <div className="space-y-6 max-w-4xl mx-auto">
            {resourcesData.map((article) => {
              const isExpanded = expandedArticle === article.id;
              return (
                <article
                  key={article.id}
                  className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted mb-3">
                      <span className="px-2.5 py-0.5 rounded font-bold uppercase tracking-wider bg-brand-warm text-brand-copper border border-brand-border">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                      {article.title}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
                      {article.summary}
                    </p>

                    {/* Key Takeaways */}
                    <div className="mt-6 p-4 rounded-lg bg-brand-warm/60 border border-brand-border">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-2 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-brand-copper" />
                        <span>Key Takeaways for Property Owners</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-dark">
                        {article.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-copper mt-0.5 shrink-0" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expandable Full Content */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-brand-border space-y-4 text-sm text-brand-dark leading-relaxed animate-fadeIn">
                        {article.content.map((paragraph, pIdx) => (
                          <p key={pIdx}>{paragraph}</p>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-brand-border/60 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                        className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-copper transition-colors focus-visible:outline-brand-copper"
                      >
                        <span>{isExpanded ? 'Collapse Guide' : 'Read Complete Guide'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-brand-copper' : ''}`} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion
        items={faqsData}
        title="Roofing Knowledge & Common Questions"
        description="Quick reference answers to frequently asked technical and procedural questions."
      />

      {/* CTA */}
      <CTASection />
    </div>
  );
};
