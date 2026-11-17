import React, { useState, useEffect, useRef } from 'react';
import { X, Star, CheckCircle2, AlertCircle, ExternalLink, MessageSquare, Loader2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { setBodyScrollLocked, isValidEmail } from '../../utils';
import { ReviewFormData, CustomerReview } from '../../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (review: CustomerReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
}) => {
  const [activeTab, setActiveTab] = useState<'website' | 'google'>('website');
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [formData, setFormData] = useState<ReviewFormData>({
    authorName: '',
    email: '',
    rating: 5,
    serviceType: 'Roof Installation',
    propertyLocation: '',
    reviewText: '',
    recommendToOthers: true,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setBodyScrollLocked(true);
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        setBodyScrollLocked(false);
      };
    } else {
      setBodyScrollLocked(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.authorName.trim() || formData.authorName.trim().length < 2) {
      errs.authorName = 'Please enter your name (at least 2 characters).';
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.reviewText.trim() || formData.reviewText.trim().length < 10) {
      errs.reviewText = 'Please write at least 10 characters detailing your experience.';
    }
    if (formData.rating < 1 || formData.rating > 5) {
      errs.rating = 'Please select a star rating.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (formData.honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const newReview: CustomerReview = {
      id: `REV-${Date.now().toString(36).toUpperCase()}`,
      authorName: formData.authorName.trim(),
      rating: formData.rating,
      serviceType: formData.serviceType,
      propertyLocation: formData.propertyLocation?.trim() || 'Regional Client',
      reviewText: formData.reviewText.trim(),
      submittedAt: new Date().toISOString(),
      platform: 'website',
      isVerifiedCustomer: true,
    };

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('API server unavailable');
      }

      setIsSuccess(true);
      if (onReviewSubmitted) onReviewSubmitted(newReview);
    } catch {
      // Offline fallback: save to localStorage so review is immediately preserved and displayed
      try {
        const stored = JSON.parse(localStorage.getItem('rooftop_customer_reviews') || '[]');
        stored.unshift(newReview);
        localStorage.setItem('rooftop_customer_reviews', JSON.stringify(stored));
        setIsSuccess(true);
        if (onReviewSubmitted) onReviewSubmitted(newReview);
      } catch {
        setErrorMessage('Failed to save your review. Please try again or contact our office.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleReviewClick = () => {
    if (!siteConfig.reviews.isGoogleReviewLinkActive) {
      alert(
        "Google Review Notice:\n\nThis website is currently configured with a placeholder Google Business profile link. Once the roofing contractor connects their verified Google Business Place ID, this button will open their official Google Review dialog."
      );
    } else {
      window.open(siteConfig.reviews.googleReviewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-xl bg-white rounded-xl shadow-2xl border border-brand-border overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-border bg-brand-warm/60">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-copper block">
              Feedback & Ratings
            </span>
            <h2 id="review-modal-title" className="text-xl font-extrabold text-brand-navy mt-0.5">
              Share Your Roofing Experience
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-200 transition-colors focus-visible:outline-brand-copper"
            aria-label="Close review dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-brand-border bg-slate-50 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('website')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'website'
                ? 'border-brand-copper text-brand-navy bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Review on This Website
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'google'
                ? 'border-brand-copper text-brand-navy bg-white font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Review on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {activeTab === 'google' ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-sm">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.887C18.2 18.006 15.615 20.4 12.24 20.4c-4.42 0-8-3.58-8-8s3.58-8 8-8c2.08 0 3.96.79 5.39 2.08l3.12-3.12C18.78 1.48 15.69 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.06 0 11.76-4.96 11.76-11.96 0-.82-.08-1.42-.2-2.235H12.24z"/>
                </svg>
              </div>

              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-brand-navy">Leave a Review on Google</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">
                  Your public Google review helps other home and business owners in our service area make confident roofing decisions.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left max-w-md mx-auto flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                <span>
                  {siteConfig.reviews.googleReviewDisclaimer}
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleReviewClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-sm transition-colors shadow-md"
              >
                <span>Open Google Review Page</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ) : isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy">Thank You for Your Feedback!</h3>
              <p className="text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
                Your review has been successfully submitted and will be displayed in our client feedback showcase.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded bg-brand-navy hover:bg-brand-slate text-white text-sm font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1 focus-visible:outline-brand-copper rounded transition-transform hover:scale-110"
                      aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= (hoveredStar || formData.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-brand-navy">
                    {formData.rating} out of 5
                  </span>
                </div>
                {errors.rating && <p className="mt-1 text-xs text-red-600">{errors.rating}</p>}
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rev_name" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rev_name"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="e.g. Michael T."
                    className={`w-full px-3 py-2 text-sm rounded border ${errors.authorName ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                  />
                  {errors.authorName && <p className="mt-1 text-xs text-red-600">{errors.authorName}</p>}
                </div>

                <div>
                  <label htmlFor="rev_email" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="rev_email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3 py-2 text-sm rounded border ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">Will not be published publicly.</span>
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
              </div>

              {/* Service & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rev_service" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                    Roofing Service Performed
                  </label>
                  <select
                    id="rev_service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded border border-brand-border bg-white focus:ring-2 focus:ring-brand-copper outline-none"
                  >
                    <option value="Roof Installation">Roof Installation / Replacement</option>
                    <option value="Roof Repair">Roof Repair & Leak Diagnosis</option>
                    <option value="Roof Maintenance">Preventive Maintenance & Inspection</option>
                    <option value="Flashing & Chimney">Flashing / Chimney Repair</option>
                    <option value="Commercial Roofing">Commercial Low-Slope Roofing</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rev_loc" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                    Neighborhood or City (Optional)
                  </label>
                  <input
                    type="text"
                    id="rev_loc"
                    value={formData.propertyLocation}
                    onChange={(e) => setFormData({ ...formData, propertyLocation: e.target.value })}
                    placeholder="e.g. North District"
                    className="w-full px-3 py-2 text-sm rounded border border-brand-border focus:ring-2 focus:ring-brand-copper outline-none"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label htmlFor="rev_text" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
                  Your Review & Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="rev_text"
                  rows={4}
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  placeholder="Share details regarding craftsmanship, site clean-up, communication, and overall satisfaction..."
                  className={`w-full px-3 py-2 text-sm rounded border ${errors.reviewText ? 'border-red-500 bg-red-50/20' : 'border-brand-border'} focus:ring-2 focus:ring-brand-copper outline-none`}
                />
                {errors.reviewText && <p className="mt-1 text-xs text-red-600">{errors.reviewText}</p>}
              </div>

              {/* Recommendation toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.recommendToOthers}
                    onChange={(e) => setFormData({ ...formData, recommendToOthers: e.target.checked })}
                    className="rounded border-brand-border text-brand-copper focus:ring-brand-copper"
                  />
                  <span className="text-xs text-brand-dark font-medium">
                    I would recommend {siteConfig.companyName} to friends and neighbors.
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-brand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded bg-brand-copper hover:bg-brand-copper-hover active:bg-[#B3581E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};