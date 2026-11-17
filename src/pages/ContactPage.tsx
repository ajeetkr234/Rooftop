import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ContactForm } from '../components/forms/ContactForm';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    updatePageSEO(
      "Contact Us & Inquiries",
      "Get in touch with our roofing team. Request consultations, report active roof leaks, or arrange property inspections."
    );
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Contact Our Roofing Team
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Have a question about a replacement, an active leak, or routine maintenance? Send us an inquiry or reach out during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          {/* Transparency Disclaimer */}
          <div className="mb-10 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Contact Details Notice:</strong>
              Phone numbers, email addresses, and facility street locations below utilize centralized placeholder values until live corporate telecommunications are connected.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-brand-border shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">Office & Dispatch</h3>
                  <p className="mt-1 text-sm text-brand-muted">
                    Reach our project management team directly.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-brand-dark">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-brand-slate text-brand-copper flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-brand-muted tracking-wider">Direct Phone</span>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="font-bold text-brand-navy hover:text-brand-copper transition-colors"
                      >
                        {siteConfig.contact.phonePlaceholder}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-brand-slate text-brand-copper flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-brand-muted tracking-wider">Email Inquiries</span>
                      <a
                        href={`mailto:${siteConfig.contact.emailPlaceholder.split(' ')[0]}`}
                        className="font-semibold text-brand-navy hover:text-brand-copper transition-colors break-all"
                      >
                        {siteConfig.contact.emailPlaceholder}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-brand-slate text-brand-copper flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-brand-muted tracking-wider">Operations Facility</span>
                      <span className="text-brand-muted block mt-0.5">
                        {siteConfig.contact.addressLine1}
                        <br />
                        {siteConfig.contact.addressCityStateZip}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-brand-border/60">
                    <div className="w-10 h-10 rounded bg-brand-slate text-brand-copper flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-brand-muted tracking-wider">Hours of Operation</span>
                      <span className="text-brand-muted block mt-0.5">{siteConfig.contact.businessHoursWeekday}</span>
                      <span className="text-brand-muted block">{siteConfig.contact.businessHoursWeekend}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Estimate Quick Link */}
              <div className="bg-brand-slate text-white p-6 rounded-xl border border-slate-700 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-brand-copper">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Detailed Proposal Needed?</span>
                </div>
                <h4 className="text-lg font-bold text-white">Looking for a comprehensive estimate?</h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use our dedicated Estimate Request form to specify roof pitch, property type, and target inspection dates.
                </p>
                <div className="mt-4">
                  <a
                    href="/request-estimate"
                    className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-brand-copper hover:bg-brand-copper-hover text-white transition-colors"
                  >
                    Go to Estimate Form →
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-brand-navy">Send a Message</h2>
                <p className="text-sm text-brand-muted">
                  Fill in your details and roofing requirements below for a prompt response.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
