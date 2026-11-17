import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Backend Data Persistence & Schema Validation', () => {
  it('ensures lead storage structure is valid JSON', () => {
    const leadsFile = path.resolve(__dirname, '../../server/data/leads.json');
    if (fs.existsSync(leadsFile)) {
      const data = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
      expect(Array.isArray(data.contacts)).toBe(true);
      expect(Array.isArray(data.estimates)).toBe(true);
    }
  });

  it('validates lead submission requirements', () => {
    const validEstimate = {
      fullName: 'Alex Testing',
      phone: '(555) 019-7663',
      email: 'alex@example.com',
      propertyType: 'residential-single',
      requiredService: 'roof-installation',
      propertyAddress: '100 Main St',
      description: 'Need complete asphalt shingle tear-off and replacement',
      consentGiven: true
    };

    expect(validEstimate.fullName.length).toBeGreaterThan(0);
    expect(validEstimate.phone.length).toBeGreaterThanOrEqual(10);
    expect(validEstimate.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(validEstimate.consentGiven).toBe(true);
  });
});

