import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ShieldAlert, X, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface AnnouncementBarProps {
  onOpenCallback?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenCallback: _onOpenCallback }) => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim() && address.trim()) {
      setIsSent(true);
    }
  };

  return (
    <>
      {/* Single Unified, Clean Top Utility Bar */}
      <aside 
        aria-label="Service announcement and hours"
        className="bg-[#09101A] border-b border-slate-800/80 text-slate-300 text-xs py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 relative z-50 overflow-hidden"
      >
        <div className="max-w-content mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Dispatch & Territory Notice */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-300 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="font-medium truncate">
              Regional Dispatch Active <span className="text-slate-600 hidden md:inline">•</span> <span className="text-slate-400 hidden md:inline">Now Scheduling Seasonal Roof Inspections & Estimates</span>
            </span>
          </div>

          {/* Right: Hours & Single Direct Phone Line */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            <span className="hidden lg:inline text-slate-400 font-mono text-[11px]">
              Mon–Fri 7:30 AM – 5:30 PM
            </span>
            <span className="text-slate-700 hidden lg:inline">•</span>
            <Link
              to="/admin"
              className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-brand-copper transition-colors font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
              title="Contractor & Staff Portal"
            >
              <Lock className="w-3 h-3 text-brand-copper" />
              <span>Owner Portal</span>
            </Link>
            <span className="text-slate-700 hidden xl:inline">•</span>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-1 sm:gap-1.5 font-bold text-slate-200 hover:text-brand-copper transition-colors focus-visible:outline-brand-copper shrink-0 text-[11px] sm:text-xs"
              title="Call Contractor Directly"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-copper shrink-0" />
              <span className="hidden sm:inline">{siteConfig.contact.phonePlaceholder}</span>
              <span className="sm:hidden font-mono">(555) 019-ROOF</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Emergency Tarping Modal */}
      {emergencyModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="fixed inset-0 bg-brand-navy/85 backdrop-blur-sm" 
            onClick={() => setEmergencyModalOpen(false)} 
          />

          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden animate-fadeIn">
            <div className="bg-red-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-white" />
                <h3 className="font-extrabold text-base tracking-tight">Priority Tarping & Emergency Dispatch</h3>
              </div>
              <button 
                onClick={() => setEmergencyModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {isSent ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-lg text-brand-navy">Dispatch Alert Transmitted</h4>
                  <p className="text-xs text-brand-muted">
                    Our on-call supervisor has been notified for {address}. We will call {phone} immediately.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setEmergencyModalOpen(false);
                    }}
                    className="mt-4 px-5 py-2 rounded bg-brand-navy text-white text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEmergencySubmit} className="space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    If storm damage or active leaks are penetrating your property, submit your info below for rapid response dispatch.
                  </p>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-navy mb-1">
                      Phone Number for Rapid Callback *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-brand-border focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-navy mb-1">
                      Property Street Address & City *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, City"
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-brand-border focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Request Emergency Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Or Call Office Directly: {siteConfig.contact.phonePlaceholder}
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};