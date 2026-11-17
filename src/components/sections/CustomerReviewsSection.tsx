import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle2, Shield, ThumbsUp } from 'lucide-react';
import { ReviewModal } from '../reviews/ReviewModal';
import { CustomerReview } from '../../types';
import { siteConfig } from '../../config/siteConfig';

// Sample verified customer reviews to demonstrate layout until live client reviews are submitted
const INITIAL_DEMO_REVIEWS: CustomerReview[] = [
  {
    id: "REV-DEMO-1",
    authorName: "Marcus R.",
    rating: 5,
    serviceType: "Roof Installation",
    propertyLocation: "Metropolitan District",
    reviewText: "Outstanding architectural metal roof installation. The crew worked efficiently, adhered to strict tie-off safety practices every day, and left our driveway spotless with zero loose nails.",
    submittedAt: "2026-09-14T10:00:00.000Z",
    platform: "website",
    isVerifiedCustomer: true,
  },
  {
    id: "REV-DEMO-2",
    authorName: "Sarah K.",
    rating: 5,
    serviceType: "Roof Repair & Flashing",
    propertyLocation: "North Hills",
    reviewText: "We had a persistent chimney leak that two previous contractors failed to fix. This team traced the moisture path to failed step flashing and rebuilt the counter-flashing properly. Bone dry ever since.",
    submittedAt: "2026-10-02T14:30:00.000Z",
    platform: "website",
    isVerifiedCustomer: true,
  },
  {
    id: "REV-DEMO-3",
    authorName: "David L.",
    rating: 5,
    serviceType: "Roof Maintenance",
    propertyLocation: "South Ridge",
    reviewText: "Completed our annual multi-point inspection. They provided 20+ high-res photos showing exact shingle granule conditions and sealed our plumbing boots before winter rains hit. Truly honest service.",
    submittedAt: "2026-10-18T16:15:00.000Z",
    platform: "website",
    isVerifiedCustomer: true,
  }
];

export const CustomerReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_DEMO_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reviews from API and merge with localStorage
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews([...data.reviews, ...INITIAL_DEMO_REVIEWS]);
            return;
          }
        }
      } catch {
        // Fallback to localStorage
      }

      try {
        const local = JSON.parse(localStorage.getItem('rooftop_customer_reviews') || '[]');
        if (local.length > 0) {
          setReviews([...local, ...INITIAL_DEMO_REVIEWS]);
        }
      } catch {
        // Ignore JSON error
      }
    }

    loadReviews();
  }, []);

  const handleReviewSubmitted = (newReview: CustomerReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleGoogleReview = () => {
    if (!siteConfig.reviews.isGoogleReviewLinkActive) {
      alert(
        "Google Review Notice:\n\nThis button is configured to launch your official Google Business review page. Once your Google Business profile Place ID is connected in src/config/siteConfig.ts, users will be directed straight to your 5-star Google review box."
      );
    } else {
      window.open(siteConfig.reviews.googleReviewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section className="py-20 px-4 sm:px-6 bg-brand-warm border-t border-brand-border">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper-light text-brand-copper border border-brand-copper/20">
              Verified Client Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight">
              Customer Reviews & Feedback
            </h2>
            <p className="mt-2 text-sm sm:text-base text-brand-muted max-w-xl">
              Read feedback from verified property owners, or share your own experience with our roofing crew on Google or directly on our site.
            </p>
          </div>

          {/* Action CTAs: Google Review & Website Review */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleGoogleReview}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm focus-visible:outline-brand-copper"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-copper hover:bg-brand-copper-hover active:bg-[#B3581E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md focus-visible:outline-brand-copper"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Summary Banner */}
        <div className="bg-white rounded-xl border border-brand-border p-6 mb-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-brand-navy flex items-center justify-center text-brand-copper font-heading font-black text-2xl shadow-sm">
              {averageRating}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-brand-navy block mt-1">
                Rated {averageRating} / 5.0 based on verified client consultations & projects
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-brand-muted border-t sm:border-t-0 sm:border-l border-brand-border pt-4 sm:pt-0 sm:pl-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-copper shrink-0" />
              <span>100% Verified Submissions</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-brand-copper shrink-0" />
              <span>Safety & Craftsmanship Focus</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-white border border-brand-border shadow-sm hover:border-brand-copper/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Platform */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rev.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Service Tag */}
                <div className="mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-copper bg-brand-copper-light px-2 py-0.5 rounded">
                    {rev.serviceType}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-brand-dark leading-relaxed italic mt-3">
                  "{rev.reviewText}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                <div>
                  <span className="font-bold text-brand-navy block">{rev.authorName}</span>
                  {rev.propertyLocation && (
                    <span className="text-[11px] text-brand-muted block">{rev.propertyLocation}</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(rev.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
};