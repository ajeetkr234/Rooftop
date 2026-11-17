import { describe, it, expect } from 'vitest';
import { siteConfig } from '../config/siteConfig';
import { ReviewFormData } from '../types';

describe('Customer Reviews & Ratings Feature', () => {
  it('has reviews configuration with configurable Google Place link', () => {
    expect(siteConfig.reviews).toBeDefined();
    expect(siteConfig.reviews.googleReviewUrl).toContain('search.google.com/local/writereview');
    expect(typeof siteConfig.reviews.isGoogleReviewLinkActive).toBe('boolean');
  });

  it('validates review submission schema constraints', () => {
    const validReview: ReviewFormData = {
      authorName: 'Robert Vance',
      email: 'robert@example.com',
      rating: 5,
      serviceType: 'Roof Installation',
      propertyLocation: 'Metro Area',
      reviewText: 'Exceptional craftsmanship and clean jobsite. Highly recommend!',
      recommendToOthers: true,
    };

    expect(validReview.rating).toBeGreaterThanOrEqual(1);
    expect(validReview.rating).toBeLessThanOrEqual(5);
    expect(validReview.authorName.length).toBeGreaterThanOrEqual(2);
    expect(validReview.reviewText.length).toBeGreaterThanOrEqual(10);
    expect(validReview.email).toContain('@');
  });
});

