import { describe, it, expect } from 'vitest';
import { siteConfig } from '../config/siteConfig';

describe('Site Configuration & Brand Integrity', () => {
  it('contains the core roofing services', () => {
    const serviceIds = siteConfig.services.map((s) => s.id);
    expect(serviceIds).toContain('roof-installation');
    expect(serviceIds).toContain('roof-repair');
    expect(serviceIds).toContain('roof-maintenance');
    expect(siteConfig.services.length).toBeGreaterThanOrEqual(3);
  });

  it('provides honest placeholders for company name and contact info without inventing details', () => {
    expect(siteConfig.companyName).toBe('YOUR ROOFING COMPANY');
    expect(siteConfig.isPhoneVerified).toBe(false);
    expect(siteConfig.isEmailVerified).toBe(false);
    expect(siteConfig.contact.phonePlaceholder).toContain('[Placeholder]');
    expect(siteConfig.contact.emailPlaceholder).toContain('[Placeholder]');
  });

  it('defines valid navigation links connecting all primary routes', () => {
    const paths = siteConfig.navLinks.map((l) => l.path);
    expect(paths).toContain('/');
    expect(paths).toContain('/services');
    expect(paths).toContain('/projects');
    expect(paths).toContain('/about');
    expect(paths).toContain('/service-areas');
    expect(paths).toContain('/resources');
    expect(paths).toContain('/contact');
  });

  it('defines 4-step transparent customer process', () => {
    expect(siteConfig.processSteps.length).toBe(4);
    expect(siteConfig.processSteps[0].step).toBe('01');
    expect(siteConfig.processSteps[3].step).toBe('04');
  });
});

