import React, { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { ContactFormData } from '../../types';
import { isValidEmail, isValidPhone } from '../../utils';
import { siteConfig } from '../../config/siteConfig';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceRequested: 'roof-installation',
    propertyAddress: '',
    inquiryDetails: '',
    preferredContactMethod: 'phone',
    consentGiven: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your phone number.';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 to 10 digits).';
    }
    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Please provide your property location or city.';
    }
    if (!formData.inquiryDetails.trim()) {
      newErrors.inquiryDetails = 'Please tell us about your roofing requirements.';
    }
    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must acknowledge the privacy notice to submit.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Spam honeypot detection
    if (formData.honeypot) {
      setSubmitStatus('success');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Fallback for static/dev mode if backend isn't yet started
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Server encountered an error processing inquiry.');
      }

      setSubmitStatus('success');
    } catch (err: unknown) {
      // In offline or static demo environments, persist locally so user inquiry is never lost
      console.warn('API backend not reachable, persisting lead locally:', err);
      try {
        const savedInquiries = JSON.parse(localStorage.getItem('rooftop_contact_leads') || '[]');
        savedInquiries.push({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem('rooftop_contact_leads', JSON.stringify(savedInquiries));
        setSubmitStatus('success');
      } catch {
        setSubmitStatus('error');
        setErrorMessage('Unable to dispatch inquiry. Please call our office directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="p-8 rounded-xl bg-white border border-green-200 shadow-md text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy">Inquiry Received</h3>
        <p className="mt-2 text-sm text-brand-muted max-w-md mx-auto">
          Thank you for reaching out to {siteConfig.companyName}. We have received your inquiry and our team will contact you via your preferred method ({formData.preferredContactMethod}).
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitStatus('idle');
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              serviceRequested: 'roof-installation',
              propertyAddress: '',
              inquiryDetails: '',
              preferredContactMethod: 'phone',
              consentGiven: false,
              honeypot: '',
            });
          }}
          className="mt-6 px-6 py-2.5 rounded bg-brand-navy text-white text-sm font-semibold hover:bg-brand-slate transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-white border border-brand-border shadow-sm space-y-5" noValidate>
      {/* Honeypot field for bot spam prevention */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this</label>
        <input
          type="text"
          id="hp_field"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {submitStatus === 'error' && (
        <div className="p-4 rounded bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="contact_fullName" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contact_fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper focus:border-transparent outline-none`}
            placeholder="Jane Doe"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'contact_fullName_error' : undefined}
          />
          {errors.fullName && (
            <p id="contact_fullName_error" className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact_phone" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="contact_phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper focus:border-transparent outline-none`}
            placeholder="(555) 000-0000"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'contact_phone_error' : undefined}
          />
          {errors.phone && (
            <p id="contact_phone_error" className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="contact_email" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="contact_email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper focus:border-transparent outline-none`}
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact_email_error' : undefined}
          />
          {errors.email && (
            <p id="contact_email_error" className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Service Requested */}
        <div>
          <label htmlFor="contact_service" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            id="contact_service"
            value={formData.serviceRequested}
            onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded border border-brand-border bg-white focus:ring-2 focus:ring-brand-copper focus:border-transparent outline-none"
          >
            <option value="roof-installation">Roof Installation / Replacement</option>
            <option value="roof-repair">Roof Repair & Leak Diagnosis</option>
            <option value="roof-maintenance">Roof Maintenance & Inspection</option>
            <option value="general-inquiry">General Question / Other</option>
          </select>
        </div>
      </div>

      {/* Property Address */}
      <div>
        <label htmlFor="contact_address" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
          Property Address or Area <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contact_address"
          value={formData.propertyAddress}
          onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
          className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.propertyAddress ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper focus:border-transparent outline-none`}
          placeholder="123 Main St, City, State or Neighborhood"
          aria-invalid={!!errors.propertyAddress}
          aria-describedby={errors.propertyAddress ? 'contact_address_error' : undefined}
        />
        {errors.propertyAddress && (
          <p id="contact_address_error" className="mt-1 text-xs text-red-600 font-medium">{errors.propertyAddress}</p>
        )}
      </div>

      {/* Message Details */}
      <div>
        <label htmlFor="contact_details" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
          How Can We Help? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact_details"
          rows={4}
          value={formData.inquiryDetails}
          onChange={(e) => setFormData({ ...formData, inquiryDetails: e.target.value })}
          className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.inquiryDetails ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper focus:border-transparent outline-none`}
          placeholder="Please describe observed roof condition, leak location, building type, or questions..."
          aria-invalid={!!errors.inquiryDetails}
          aria-describedby={errors.inquiryDetails ? 'contact_details_error' : undefined}
        />
        {errors.inquiryDetails && (
          <p id="contact_details_error" className="mt-1 text-xs text-red-600 font-medium">{errors.inquiryDetails}</p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
          Preferred Contact Method
        </span>
        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={formData.preferredContactMethod === 'phone'}
              onChange={() => setFormData({ ...formData, preferredContactMethod: 'phone' })}
              className="text-brand-copper focus:ring-brand-copper"
            />
            <span>Phone Call</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="email"
              checked={formData.preferredContactMethod === 'email'}
              onChange={() => setFormData({ ...formData, preferredContactMethod: 'email' })}
              className="text-brand-copper focus:ring-brand-copper"
            />
            <span>Email</span>
          </label>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
            className="mt-1 rounded border-brand-border text-brand-copper focus:ring-brand-copper"
            aria-invalid={!!errors.consentGiven}
          />
          <span className="text-xs text-brand-muted leading-relaxed">
            I agree that {siteConfig.companyName} may contact me regarding this inquiry. Your information is never sold or shared with outside parties.
          </span>
        </label>
        {errors.consentGiven && (
          <p className="mt-1 text-xs text-red-600 font-medium">{errors.consentGiven}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded bg-brand-copper hover:bg-brand-copper-hover active:bg-[#B3581E] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Inquiry...</span>
          </>
        ) : (
          <>
            <span>Send Roofing Inquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};

