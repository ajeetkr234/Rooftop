import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ArrowRight, Star, Lock } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { ReviewModal } from '../reviews/ReviewModal';

export const SiteFooter: React.FC = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  return (
    <footer className="bg-brand-navy border-t border-slate-800 text-slate-400 text-sm">
      {/* Top CTA Strip */}
      <div className="border-b border-slate-800/80 bg-brand-slate py-8 px-4 sm:px-6">
        <div className="max-w-content mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to protect your property with reliable roofing?
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Request an itemized project estimate or schedule an inspection.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/request-estimate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-semibold transition-colors focus-visible:outline-brand-copper"
            >
              <span>Request an Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors border border-slate-700 focus-visible:outline-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-content mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-brand-copper flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                {siteConfig.companyName}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Professional roof installation, dependable repairs, and preventive maintenance engineered for residential and commercial structures.
            </p>
            <div className="pt-2 text-xs text-slate-500 border-t border-slate-800 max-w-sm">
              <span className="font-semibold text-slate-400">Notice:</span> Business address, phone numbers, and portfolio items on this website are structured placeholders ready for official company configuration.
            </div>
          </div>

          {/* Roofing Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Roofing Capabilities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/services/roof-installation" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Roof Installation
                </Link>
              </li>
              <li>
                <Link to="/services/roof-replacement" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Complete Replacement
                </Link>
              </li>
              <li>
                <Link to="/services/roof-repair" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Roof Repair & Diagnostics
                </Link>
              </li>
              <li>
                <Link to="/services/roof-leak-repair" className="hover:text-red-400 transition-colors focus-visible:outline-brand-copper">
                  Emergency Leak Repair
                </Link>
              </li>
              <li>
                <Link to="/services/roof-inspection" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  21-Point Drone Inspection
                </Link>
              </li>
              <li>
                <Link to="/services/roof-maintenance" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Preventive Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services/residential-roofing" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Residential Roofing
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-roofing" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Commercial Flat Roofing
                </Link>
              </li>
              <li>
                <Link to="/book-inspection" className="text-brand-copper font-bold hover:underline">
                  Book an Inspection →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Company & Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  About Our Approach
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Roofing Guides & Advice
                </Link>
              </li>
              <li>
                <Link to="/request-estimate" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Request an Estimate
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="flex items-center gap-1.5 text-brand-copper hover:text-white transition-colors focus-visible:outline-brand-copper font-medium"
                >
                  <Star className="w-3.5 h-3.5 fill-brand-copper" />
                  <span>Share a Review</span>
                </button>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-brand-copper transition-colors focus-visible:outline-brand-copper">
                  Privacy Policy
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  to="/admin" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-brand-copper hover:text-white hover:border-brand-copper transition-colors text-xs font-bold"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Owner Command Portal →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors focus-visible:outline-brand-copper"
              >
                <Phone className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                <span>{siteConfig.contact.phonePlaceholder}</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.emailPlaceholder.split(' ')[0]}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors focus-visible:outline-brand-copper break-all"
              >
                <Mail className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                <span>{siteConfig.contact.emailPlaceholder}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                <span>
                  {siteConfig.contact.addressLine1}
                  <br />
                  {siteConfig.contact.addressCityStateZip}
                </span>
              </div>

              <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
                <div>{siteConfig.contact.businessHoursWeekday}</div>
                <div>{siteConfig.contact.businessHoursWeekend}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Notice
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Contact Support
            </Link>
            <Link to="/resources" className="hover:text-slate-300 transition-colors">
              Resources
            </Link>
            <Link to="/admin" className="text-slate-400 hover:text-brand-copper transition-colors flex items-center gap-1 font-mono text-[11px]">
              <Lock className="w-3 h-3 text-brand-copper" />
              <span>Owner Access</span>
            </Link>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />
    </footer>
  );
};

