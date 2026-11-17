import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Privacy Policy & Data Use Disclosure",
      "Information regarding how user inquiry data is collected, stored, and used for roofing estimates. Ready for business legal customization."
    );
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-16 px-4 sm:px-6">
        <div className="max-w-content mx-auto max-w-3xl">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
            Legal & Data Disclosures
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Privacy Policy & Form Data Disclosure
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Last Updated: [Placeholder Date for Company Review]
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-xl border border-brand-border shadow-sm text-brand-dark text-sm sm:text-base leading-relaxed">
          {/* Review Notice */}
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Notice for Website Owner & Legal Counsel:</strong>
              This document is a structured preliminary disclosure outlining the website's technical data handling mechanisms. It must be reviewed and customized by the company's designated legal representative prior to commercial production.
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-3">1. Information We Collect</h2>
            <p className="text-brand-muted">
              We collect information that you voluntarily submit through our Contact and Estimate Request forms. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-brand-muted">
              <li>Contact details: Name, email address, telephone number.</li>
              <li>Property details: Street address, municipality, and property classification (residential or commercial).</li>
              <li>Project scope: Observed roof conditions, leak descriptions, and preferred inspection dates.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-3">2. How We Use Submitted Information</h2>
            <p className="text-brand-muted">
              Submitted data is used strictly for legitimate contracting operations:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-brand-muted">
              <li>Preparing itemized estimates and roofing proposals.</li>
              <li>Coordinating on-site roof inspections with certified technicians.</li>
              <li>Responding to specific technical inquiries submitted through our contact form.</li>
            </ul>
            <p className="mt-2 font-semibold text-brand-navy">
              We never sell, rent, or lease customer contact information to third-party marketing brokers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-3">3. Technical Logs & Cookies</h2>
            <p className="text-brand-muted">
              Our web servers may log standard connection metadata (such as IP address, browser type, and timestamp) solely for rate limiting, DDoS mitigation, and spam abuse prevention. We do not employ third-party behavioral ad tracking trackers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-3">4. Security Measures</h2>
            <p className="text-brand-muted">
              All web transmissions are encrypted in transit via Transport Layer Security (TLS/HTTPS). Stored database records are protected behind authenticated backend boundaries with rate limiting and automated spam filters.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-navy mb-3">5. Data Retention & Deletion Requests</h2>
            <p className="text-brand-muted">
              Property owners may request the review, update, or deletion of their submitted estimate records at any time by contacting our office at{' '}
              <span className="font-mono text-brand-navy">{siteConfig.contact.emailPlaceholder}</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
