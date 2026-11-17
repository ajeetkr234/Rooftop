import React, { useState } from 'react';
import { Phone, ArrowRight, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const EmergencyDispatchBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  if (isDismissed) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim() && address.trim()) {
      setIsSent(true);
    }
  };

  return (
    <>
      {/* Floating or Top Action Strip */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-brand-navy border-b border-red-900/40 text-white text-xs py-2.5 px-4 sm:px-6 relative z-30 shadow-md">
        <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="font-bold text-red-200">
              Active Water Leak Emergency?
            </span>
            <span className="text-slate-300 hidden md:inline">
              Our crews provide temporary weatherproofing and priority tarping.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Priority Tarping Dispatch</span>
            </button>

            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{siteConfig.contact.phonePlaceholder}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="Dismiss emergency banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-brand-navy/85 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden">
            <div className="bg-red-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-white" />
                <h3 className="font-extrabold text-base tracking-tight">Priority Tarping & Leak Dispatch</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded"
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
                    Our on-call supervisor has been notified for {address}. We will call {phone} shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setIsOpen(false);
                    }}
                    className="mt-4 px-5 py-2 rounded bg-brand-navy text-white text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    If rainwater is actively penetrating drywall or ceilings, enter your details below for emergency crew routing.
                  </p>

                  <div>
                    <label className="block text-xs font-bold uppercase text-brand-navy mb-1">
                      Phone Number for Immediate Callback *
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
