import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  ShieldCheck, 
  Send, 
  Loader2, 
  Building, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { updatePageSEO, isValidEmail, isValidPhone } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { AppointmentFormData } from '../types';

export const BookInspectionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialZip = searchParams.get('zip') || '';

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: initialZip ? `ZIP: ${initialZip}` : '',
    propertyType: 'residential-single',
    inspectionType: 'Comprehensive 21-Point Forensic Roof Inspection',
    preferredDate: '',
    preferredTimeSlot: 'Morning (8:00 AM - 12:00 PM)',
    includeDroneScan: true,
    notes: '',
    consentGiven: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    updatePageSEO(
      "Book a Roof Inspection | 21-Point Forensic Assessment",
      "Schedule a certified roof inspection. Comprehensive decking, shingle, flashing, and aerial drone diagnostics with clear written reports."
    );
  }, []);

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch confirmation.';
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Valid phone number is required (at least 7 to 10 digits).';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required for inspection report delivery.';
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Valid email is required.';
    }
    if (!formData.propertyAddress.trim()) {
      errs.propertyAddress = 'Property address is required.';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date.';
    }
    if (!formData.consentGiven) {
      errs.consentGiven = 'Consent is required to dispatch inspection.';
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
      const res = await fetch('/api/leads/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit inspection request.');
      }

      setAppointmentId(data.leadId || `APT-${Date.now().toString(36).toUpperCase()}`);
      setIsSubmitted(true);
    } catch {
      // Offline fallback
      const fallbackId = `APT-${Date.now().toString(36).toUpperCase()}`;
      const stored = JSON.parse(localStorage.getItem('rooftop_appointment_leads') || '[]');
      stored.push({
        ...formData,
        id: fallbackId,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('rooftop_appointment_leads', JSON.stringify(stored));
      setAppointmentId(fallbackId);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-warm py-8 sm:py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <Breadcrumbs items={[{ label: 'Book an Inspection' }]} />

        {/* Hero Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-copper" />
            <span>Certified Forensic Inspection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-navy tracking-tight mb-4">
            Schedule Your Roof Inspection
          </h1>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed">
            Protect your property with an itemized 21-point evaluation. Our certified inspectors examine shingles, underlayment, flashing, valley armor, and ventilation to diagnose issues before costly interior damage occurs.
          </p>
        </div>

        {/* Main Grid: Form on Left, Features / Checklist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form Container (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-lg">
            {isSubmitted ? (
              <div className="py-8 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-2">
                  Inspection Request Confirmed!
                </h2>
                <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-brand-navy">{formData.fullName}</strong>. Your inspection appointment has been logged under ID <strong className="font-mono text-brand-copper">{appointmentId}</strong> for <strong className="text-brand-navy">{formData.preferredDate}</strong> ({formData.preferredTimeSlot}).
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 mb-8 max-w-md mx-auto text-left space-y-2">
                  <div className="flex items-center justify-between font-semibold text-brand-navy">
                    <span>What Happens Next?</span>
                    <span className="text-brand-copper">Dispatch Protocol</span>
                  </div>
                  <p>1. Our dispatch manager calls to confirm arrival window and safety access.</p>
                  <p>2. Inspector conducts full perimeter, eave, valley, and ridge diagnostic.</p>
                  <p>3. You receive an itemized photographic report with honest recommendations.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Home</span>
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-bold text-sm transition-colors"
                  >
                    <span>Explore Our Roofing Services</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {serverError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Honeypot */}
                <input
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Section 1: Property & Contact Info */}
                <div>
                  <h3 className="font-heading font-bold text-base text-brand-navy mb-4 pb-2 border-b border-brand-border flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-copper" />
                    <span>1. Contact & Location Information</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Smith"
                        className={`w-full px-3.5 py-2 text-sm rounded border ${errors.fullName ? 'border-red-500' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 000-0000"
                        className={`w-full px-3.5 py-2 text-sm rounded border ${errors.phone ? 'border-red-500' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                      />
                      {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-3.5 py-2 text-sm rounded border ${errors.email ? 'border-red-500' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Property Address & ZIP <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.propertyAddress}
                        onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                        placeholder="123 Oak St, Austin, TX 78701"
                        className={`w-full px-3.5 py-2 text-sm rounded border ${errors.propertyAddress ? 'border-red-500' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                      />
                      {errors.propertyAddress && <p className="text-[11px] text-red-600 mt-1">{errors.propertyAddress}</p>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Inspection Type & Property Classification */}
                <div>
                  <h3 className="font-heading font-bold text-base text-brand-navy mb-4 pb-2 border-b border-brand-border flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-copper" />
                    <span>2. Inspection Scope & Property Category</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Property Classification
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm rounded border border-brand-border focus:ring-2 focus:ring-brand-copper outline-none bg-white"
                      >
                        <option value="residential-single">Single-Family Residential Home</option>
                        <option value="residential-multi">Multi-Family / Townhome / HOA</option>
                        <option value="commercial">Commercial / Retail Facility</option>
                        <option value="industrial">Industrial / Warehouse</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Primary Reason for Inspection
                      </label>
                      <select
                        value={formData.inspectionType}
                        onChange={(e) => setFormData({ ...formData, inspectionType: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm rounded border border-brand-border focus:ring-2 focus:ring-brand-copper outline-none bg-white"
                      >
                        <option value="Comprehensive 21-Point Forensic Roof Inspection">Comprehensive 21-Point Forensic Inspection</option>
                        <option value="Storm & Hail Damage Insurance Assessment">Storm & Hail Damage Insurance Assessment</option>
                        <option value="Active Water Leak Diagnostic">Active Water Leak Diagnostic</option>
                        <option value="Pre-Purchase Home Inspection Audit">Pre-Purchase Home Inspection Audit</option>
                        <option value="Commercial Preventative Maintenance Audit">Commercial Preventative Maintenance Audit</option>
                      </select>
                    </div>
                  </div>

                  {/* Drone 4K scan toggle */}
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-brand-border bg-slate-50 cursor-pointer hover:bg-white transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.includeDroneScan}
                      onChange={(e) => setFormData({ ...formData, includeDroneScan: e.target.checked })}
                      className="rounded text-brand-copper focus:ring-brand-copper border-slate-300"
                    />
                    <div className="flex items-center gap-2 text-xs text-brand-navy font-semibold">
                      <Camera className="w-4 h-4 text-brand-copper" />
                      <span>Include 4K High-Resolution Aerial Drone Scan (Recommended for steep pitches and hard-to-reach valleys)</span>
                    </div>
                  </label>
                </div>

                {/* Section 3: Scheduling */}
                <div>
                  <h3 className="font-heading font-bold text-base text-brand-navy mb-4 pb-2 border-b border-brand-border flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-copper" />
                    <span>3. Preferred Date & Time Window</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        min={minDateString}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className={`w-full px-3.5 py-2 text-sm rounded border ${errors.preferredDate ? 'border-red-500' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none bg-white`}
                      />
                      {errors.preferredDate && <p className="text-[11px] text-red-600 mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                        Preferred Arrival Window
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm rounded border border-brand-border focus:ring-2 focus:ring-brand-copper outline-none bg-white"
                      >
                        <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                        <option value="Late Afternoon (4:00 PM - 6:30 PM)">Late Afternoon (4:00 PM - 6:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                      Notes or Gate / Access Codes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Access instructions, pet notices, or observed interior leak locations..."
                      className="w-full px-3.5 py-2 text-sm rounded border border-brand-border focus:ring-2 focus:ring-brand-copper outline-none"
                    />
                  </div>
                </div>

                {/* Consent & Submit */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consentGiven}
                      onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                      className="mt-1 rounded text-brand-copper focus:ring-brand-copper border-brand-border"
                    />
                    <span className="text-xs text-brand-muted leading-tight">
                      I confirm that I am the property owner or authorized decision-maker and authorize {siteConfig.companyName} to schedule an on-site structural roof evaluation.
                    </span>
                  </label>
                  {errors.consentGiven && <p className="text-[11px] text-red-600 mt-1">{errors.consentGiven}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full py-4 px-6 rounded bg-brand-copper hover:bg-brand-copper-hover text-white font-extrabold text-base transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Inspection Booking...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Inspection Request</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: 21-Point Checklist & Inspection Standards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl">
              <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-copper" />
                <span>What Our 21-Point Inspection Covers</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-copper/20 text-brand-copper flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Roof Shingle & Tile Surface Integrity</strong>
                    <span>Check for granule loss, thermal blistering, cracked tiles, and hail fractures.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-copper/20 text-brand-copper flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Chimney, Skylight & Wall Flashing</strong>
                    <span>Inspect step flashing, counter-flashing, and degraded mastic caulk seals.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-copper/20 text-brand-copper flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Valley Armor & Water Diversion</strong>
                    <span>Check high-volume water convergence lines for debris damming and rust.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-copper/20 text-brand-copper flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Sub-Decking Structural Health</strong>
                    <span>Test for soft, rotted, or sagging CDX plywood decking beneath felt.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-copper/20 text-brand-copper flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block">Attic & Ridge Ventilation Balance</strong>
                    <span>Confirm intake soffit airflow and ridge exhaust prevent moisture buildup.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Urgent Dispatch Box */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h4 className="font-heading font-bold text-amber-900 text-base mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Active Water Leak Emergency?</span>
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed mb-4">
                If water is actively penetrating into living spaces or ceilings, do not wait for a standard scheduled appointment. Contact our priority tarping dispatch directly.
              </p>
              <a
                href={`tel:${siteConfig.contact.phonePlaceholder.replace(/\D/g, '')}`}
                className="w-full py-2.5 px-4 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Call Emergency Dispatch: {siteConfig.contact.phonePlaceholder}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
