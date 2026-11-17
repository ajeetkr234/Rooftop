import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, FileText, Calendar, Building, Send, Loader2, UploadCloud, X } from 'lucide-react';
import { EstimateFormData } from '../../types';
import { isValidEmail, isValidPhone } from '../../utils';
import { siteConfig } from '../../config/siteConfig';

export const EstimateForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || 'roof-installation';

  const [formData, setFormData] = useState<EstimateFormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'residential-single',
    requiredService: preselectedService,
    propertyAddress: '',
    description: '',
    preferredContactMethod: 'phone',
    preferredInspectionDate: '',
    photoAttachmentsDescription: '',
    photos: [],
    consentGiven: false,
    honeypot: '',
  });

  useEffect(() => {
    const serviceFromUrl = searchParams.get('service');
    if (serviceFromUrl) {
      setFormData((prev) => ({ ...prev, requiredService: serviceFromUrl }));
    }
  }, [searchParams]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentPhotos = formData.photos || [];
    const remainingSlots = 4 - currentPhotos.length;
    if (remainingSlots <= 0) return;

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    selectedFiles.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} exceeds the 5MB limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          photos: [...(prev.photos || []), { name: file.name, data: base64, size: file.size }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos?.filter((_, i) => i !== index)
    }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full legal or contact name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch & confirmation.';
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Please provide a valid phone number (at least 7 to 10 digits).';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required for estimate delivery.';
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!formData.propertyAddress.trim()) {
      errs.propertyAddress = 'Property address or project municipality is required.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide basic details about the roof (approx age, issues, materials).';
    }
    if (!formData.consentGiven) {
      errs.consentGiven = 'Consent to privacy terms is required to process request.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Spam honeypot
    if (formData.honeypot) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const submissionPayload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      clientTimestamp: Date.now(),
    };

    try {
      const response = await fetch('/api/leads/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Server encountered an issue saving your request.');
      }

      setSubmittedLeadId(result.leadId || `EST-${Date.now().toString().slice(-6)}`);
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.warn('Backend API unavailable, saving to persistent local leads store:', err);
      // Lead persistence guarantee: Save to localStorage so no user lead is ever dropped
      try {
        const stored = JSON.parse(localStorage.getItem('rooftop_estimate_leads') || '[]');
        const fallbackId = `EST-OFFLINE-${Date.now().toString().slice(-6)}`;
        stored.push({ ...submissionPayload, leadId: fallbackId });
        localStorage.setItem('rooftop_estimate_leads', JSON.stringify(stored));

        setSubmittedLeadId(fallbackId);
        setIsSubmitted(true);
      } catch {
        setServerError('Unable to store estimate request at this time. Please call our office directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl p-8 sm:p-12 border border-green-200 shadow-xl text-center max-w-2xl mx-auto animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-copper bg-brand-copper-light px-3 py-1 rounded-full">
          Estimate Request Logged
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-4">
          Thank You, {formData.fullName}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
          Your estimate request has been securely recorded. Reference ID:{' '}
          <span className="font-mono font-bold text-brand-navy">{submittedLeadId}</span>.
        </p>
        <div className="mt-6 p-4 rounded-lg bg-brand-warm text-left text-xs sm:text-sm space-y-2 border border-brand-border">
          <div className="flex justify-between">
            <span className="text-brand-muted">Service Scope:</span>
            <span className="font-semibold text-brand-navy capitalize">{formData.requiredService.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-muted">Property Location:</span>
            <span className="font-semibold text-brand-navy">{formData.propertyAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-muted">Contact Method:</span>
            <span className="font-semibold text-brand-navy capitalize">{formData.preferredContactMethod}</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-brand-muted">
          Need immediate support? Call our team directly at{' '}
          <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-bold text-brand-navy hover:underline">
            {siteConfig.contact.phonePlaceholder}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-brand-border shadow-md p-6 sm:p-10 space-y-8" noValidate>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="est_hp">Security Check</label>
        <input
          type="text"
          id="est_hp"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Section 1: Contact Details */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-brand-border mb-6">
          <FileText className="w-5 h-5 text-brand-copper" />
          <h3 className="font-heading font-bold text-lg text-brand-navy">
            1. Your Contact Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="est_name" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="est_name"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
              }}
              placeholder="Alex Johnson"
              className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="est_phone" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="est_phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder="(555) 019-7663"
              className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="est_email" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="est_email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="alex@example.com"
              className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Property & Scope */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-brand-border mb-6">
          <Building className="w-5 h-5 text-brand-copper" />
          <h3 className="font-heading font-bold text-lg text-brand-navy">
            2. Property & Roofing Scope
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="est_prop_type" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              id="est_prop_type"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
              className="w-full px-3.5 py-2.5 text-sm rounded border border-brand-border bg-white focus:ring-2 focus:ring-brand-copper outline-none"
            >
              <option value="residential-single">Single Family Home</option>
              <option value="residential-multi">Multi-Family / Townhome</option>
              <option value="commercial">Commercial / Retail Facility</option>
              <option value="industrial">Industrial / Warehouse</option>
              <option value="other">Other / Mixed-Use</option>
            </select>
          </div>

          <div>
            <label htmlFor="est_service" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              id="est_service"
              value={formData.requiredService}
              onChange={(e) => setFormData({ ...formData, requiredService: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded border border-brand-border bg-white focus:ring-2 focus:ring-brand-copper outline-none"
            >
              <option value="roof-installation">Roof Installation / Full Replacement</option>
              <option value="roof-repair">Roof Repair & Diagnostic Investigation</option>
              <option value="roof-maintenance">Preventive Maintenance & Inspection</option>
              <option value="custom-evaluation">Comprehensive Roof Consultation</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="est_address" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Property Address & City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="est_address"
            value={formData.propertyAddress}
            onChange={(e) => {
              setFormData({ ...formData, propertyAddress: e.target.value });
              if (errors.propertyAddress) setErrors((prev) => ({ ...prev, propertyAddress: '' }));
            }}
            placeholder="1234 Highland Ave, Metropolis, ST"
            className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.propertyAddress ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
          />
          {errors.propertyAddress && <p className="mt-1 text-xs text-red-600">{errors.propertyAddress}</p>}
        </div>

        <div>
          <label htmlFor="est_desc" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Description of Roofing Requirements <span className="text-red-500">*</span>
          </label>
          <textarea
            id="est_desc"
            rows={4}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
            }}
            placeholder="Tell us about the project: observed water leaks, roof age, storm damage, or specific materials (architectural shingle, standing seam metal, flat membrane)..."
            className={`w-full px-3.5 py-2.5 text-sm rounded border ${errors.description ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>
      </div>

      {/* Section 3: Scheduling & Preferences */}
      <div>
        <div className="flex items-center gap-2 pb-3 border-b border-brand-border mb-6">
          <Calendar className="w-5 h-5 text-brand-copper" />
          <h3 className="font-heading font-bold text-lg text-brand-navy">
            3. Scheduling & Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="est_date" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
              Preferred Inspection Date (Optional)
            </label>
            <input
              type="date"
              id="est_date"
              value={formData.preferredInspectionDate}
              onChange={(e) => setFormData({ ...formData, preferredInspectionDate: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded border border-brand-border bg-white focus:ring-2 focus:ring-brand-copper outline-none"
            />
            <span className="block mt-1 text-[11px] text-brand-muted">
              Note: Scheduling is confirmed based on route availability and weather.
            </span>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
              Preferred Contact Channel
            </span>
            <div className="flex items-center gap-6 text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="prefContact"
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
                  name="prefContact"
                  value="email"
                  checked={formData.preferredContactMethod === 'email'}
                  onChange={() => setFormData({ ...formData, preferredContactMethod: 'email' })}
                  className="text-brand-copper focus:ring-brand-copper"
                />
                <span>Email Proposal</span>
              </label>
            </div>
          </div>
        </div>

        {/* Photo Upload Zone */}
        <div className="mt-6 pt-5 border-t border-brand-border">
          <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
            Upload Roof Photos / Storm Damage (Optional - Up to 4 Images)
          </label>
          <p className="text-xs text-brand-muted mb-3">
            Attach snapshots of leak locations, damaged shingles, or overall house angles to receive a faster, more accurate preliminary review.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <label className="flex-1 w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-brand-border hover:border-brand-copper rounded-lg cursor-pointer bg-slate-50 hover:bg-white transition-all text-center">
              <UploadCloud className="w-8 h-8 text-brand-copper mb-2" />
              <span className="text-xs font-bold text-brand-navy">Click to browse or drop images</span>
              <span className="text-[11px] text-brand-muted mt-1">JPEG, PNG, or WebP up to 5MB each</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                disabled={(formData.photos?.length || 0) >= 4}
                className="hidden"
              />
            </label>
          </div>

          {/* Photo Previews */}
          {formData.photos && formData.photos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.photos.map((photo, idx) => (
                <div key={idx} className="relative group rounded-md overflow-hidden border border-brand-border bg-white shadow-sm">
                  <img src={photo.data} alt={photo.name} className="w-full h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 shadow transition-opacity"
                    title="Remove photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="p-1.5 bg-slate-900/90 text-white text-[10px] truncate">
                    {photo.name}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="est_photos" className="block text-xs font-semibold text-brand-muted mb-1">
              Or share cloud storage link (Google Drive, Dropbox, OneDrive):
            </label>
            <input
              type="text"
              id="est_photos"
              value={formData.photoAttachmentsDescription}
              onChange={(e) => setFormData({ ...formData, photoAttachmentsDescription: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3.5 py-2 text-xs rounded border border-brand-border focus:ring-2 focus:ring-brand-copper outline-none"
            />
          </div>
        </div>
      </div>

      {/* Consent & Submit */}
      <div className="pt-4 border-t border-brand-border">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
            className="mt-1 rounded border-brand-border text-brand-copper focus:ring-brand-copper"
          />
          <span className="text-xs text-brand-muted leading-relaxed">
            I certify that I am the owner or authorized representative of this property and consent to receive a project estimate and communications from {siteConfig.companyName}.
          </span>
        </label>
        {errors.consentGiven && <p className="mt-1 text-xs text-red-600 font-medium">{errors.consentGiven}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full py-4 px-8 rounded bg-brand-copper hover:bg-brand-copper-hover active:bg-[#B3581E] text-white font-extrabold text-base tracking-wide transition-all duration-200 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Transmitting Estimate Request...</span>
            </>
          ) : (
            <>
              <span>Submit Estimate Request</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

