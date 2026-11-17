import { describe, it, expect } from 'vitest';
import { cn, isValidEmail, isValidPhone } from '../utils';

describe('Utility & Validation Functions', () => {
  describe('cn (Tailwind Class Merging)', () => {
    it('merges class names and handles conflict resolution', () => {
      const result = cn('px-4 py-2', 'px-6', { 'bg-red-500': true, 'bg-blue-500': false });
      expect(result).toContain('px-6');
      expect(result).not.toContain('px-4');
      expect(result).toContain('bg-red-500');
    });
  });

  describe('isValidEmail', () => {
    it('accepts standard valid email addresses', () => {
      expect(isValidEmail('jane.doe@example.com')).toBe(true);
      expect(isValidEmail('contractor@roofing.org')).toBe(true);
      expect(isValidEmail('lead+estimator@domain.co.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('missing-domain@')).toBe(false);
      expect(isValidEmail('@nodomain.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('accepts standard 10-digit formats with dashes, parens, or spaces', () => {
      expect(isValidPhone('(555) 019-7663')).toBe(true);
      expect(isValidPhone('555-019-7663')).toBe(true);
      expect(isValidPhone('5550197663')).toBe(true);
      expect(isValidPhone('+1 555 019 7663')).toBe(true);
      expect(isValidPhone('88756611')).toBe(true);
      expect(isValidPhone('555-0197')).toBe(true);
    });

    it('rejects phone numbers with insufficient digits', () => {
      expect(isValidPhone('555-123')).toBe(false);
      expect(isValidPhone('12345')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });
});

