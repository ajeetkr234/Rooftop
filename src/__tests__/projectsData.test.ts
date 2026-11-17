import { describe, it, expect } from 'vitest';
import { projectsData } from '../data/projectsData';

describe('Project Gallery Data Integrity', () => {
  it('flags all sample items with demonstration disclosures', () => {
    projectsData.forEach((project) => {
      expect(project.isDemonstrationWork).toBe(true);
      expect(project.location).toContain('[Demonstration Portfolio]');
      expect(project.title.length).toBeGreaterThan(5);
      expect(project.description.length).toBeGreaterThan(15);
      expect(project.image).toMatch(/^(\/images\/|https:\/\/)/);
      expect(project.thumbnail).toMatch(/^(\/images\/|https:\/\/)/);
    });
  });

  it('contains projects across all 3 core services', () => {
    const categories = new Set(projectsData.map((p) => p.category));
    expect(categories.has('installation')).toBe(true);
    expect(categories.has('repair')).toBe(true);
    expect(categories.has('maintenance')).toBe(true);
  });
});

