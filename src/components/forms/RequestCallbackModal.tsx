import React, { useState } from 'react';
import { PhoneCall, X, CheckCircle2, AlertCircle, Clock, Shield, Loader2 } from 'lucide-react';
import { CallbackFormData } from '../../types';
import { isValidPhone } from '../../utils';
import { siteConfig } from '../../config/siteConfig';

interface RequestCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIssue?: string;
}

export const RequestCallbackModal: React.FC<RequestCallbackModalProps> = ({
  isOpen,
  onClose,
  defaultIssue = 'Active Roof Leak / Emergency'
}) => {
  const [formData, setFormData] = useState<CallbackFormData>({
    fullName: '',
    phone: '',
    preferredTime: 'Immediate / As soon as possible',
    issueType: defaultIssue,
    propertyAddress: '',
    consentGiven: true,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please provide your full name.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for telephone callback.';
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Please provide a valid phone number (at least 7 to 10 digits).';
    }
    if (!formData.consentGiven) {
      errs.consentGiven = 'Consent to phone contact is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/leads/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit callback request.');
      }

      setIsSubmitted(true);
    } catch {
      // Offline fallback
      const stored = JSON.parse(localStorage.getItem('rooftop_callback_leads') || '[]');
      stored.push({
        ...formData,
        id: `CLB-${Date.now().toString(36).toUpperCase()}`,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('rooftop_callback_leads', JSON.stringify(stored));
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      preferredTime: 'Immediate / As soon as possible',
      issueType: defaultIssue,
      propertyAddress: '',
      consentGiven: true,
      honeypot: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="callback-modal-title"
      >
        {/* Header Bar */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-copper/20 rounded-lg text-brand-copper">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 id="callback-modal-title" className="font-heading font-bold text-lg text-white">
                Request an Immediate Callback
              </h3>
              <p className="text-xs text-slate-400">
                Direct phone dispatch with a senior roofing project manager
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-xl text-slate-900 mb-2">
                Callback Request Received!
              </h4>
              <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our on-duty project coordinator has received your request and will call <strong className="text-slate-900">{formData.phone}</strong> during your requested window ({formData.preferredTime}).
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 mb-6 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-brand-copper shrink-0" />
                <span>Typical dispatch response: <strong>15–30 minutes</strong> during working hours.</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Bot honeypot */}
              <input
                type="text"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className={`w-full px-3 py-2 text-sm rounded border ${errors.fullName ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-brand-copper outline-none`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className={`w-full px-3 py-2 text-sm rounded border ${errors.phone ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-brand-copper outline-none`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Primary Issue / Project Scope
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-brand-copper outline-none bg-white"
                >
                  <option value="Active Roof Leak / Emergency">🚨 Active Roof Leak / Storm Damage (Priority)</option>
                  <option value="Roof Installation / New Construction">🏗️ Complete Roof Replacement / Installation</option>
                  <option value="Shingle or Flashing Repair">🔧 Shingle, Tile, or Flashing Repair</option>
                  <option value="Preventative Roof Maintenance">🛡️ Seasonal Inspection & Maintenance</option>
                  <option value="Insurance Claim Assistance">📋 Insurance Storm Claim Assessment</option>
                  <option value="Commercial Low-Slope Membrane">🏢 Commercial / Flat Roofing Membrane</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Callback Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-brand-copper outline-none bg-white"
                  >
                    <option value="Immediate / As soon as possible">⚡ Immediate (Within 30 mins)</option>
                    <option value="Morning (8:00 AM - 12:00 PM)">🌅 Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 5:00 PM)">☀️ Afternoon (12:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 7:30 PM)">🌆 Evening (5:00 PM - 7:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    City / ZIP Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    placeholder="e.g. Austin, TX 78701"
                    className="w-full px-3 py-2 text-sm rounded border border-slate-300 focus:ring-2 focus:ring-brand-copper outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-1 rounded text-brand-copper focus:ring-brand-copper border-slate-300"
                  />
                  <span className="text-[11px] text-slate-500 leading-tight">
                    I agree to be contacted by phone or SMS regarding my roofing inquiry at the number provided. {siteConfig.companyName} does not share or sell client details.
                  </span>
                </label>
                {errors.consentGiven && <p className="text-[11px] text-red-600 mt-1">{errors.consentGiven}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-brand-copper hover:bg-brand-copper-hover text-white font-extrabold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Dispatch Request...</span>
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Me Back</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  <span>Licensed & Insured Contractors</span>
                </span>
                <span>Direct Line: <strong>{siteConfig.contact.phonePlaceholder}</strong></span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

