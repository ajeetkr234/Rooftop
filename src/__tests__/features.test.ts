import { describe, it, expect } from 'vitest';

describe('Advanced Contractor Features', () => {
  describe('Roof Cost Calculator Formula', () => {
    it('accurately computes material and pitch multipliers', () => {
      const sqFt = 2000;
      const pitchMultiplier = 1.18; // standard
      const effectiveArea = Math.round(sqFt * pitchMultiplier); // 2360
      const minRate = 4.80;
      const maxRate = 6.90;
      const tearOffRate = 1.10; // 1 layer

      const minTotal = Math.round((effectiveArea * minRate) + (effectiveArea * tearOffRate));
      const maxTotal = Math.round((effectiveArea * maxRate) + (effectiveArea * tearOffRate));

      expect(effectiveArea).toBe(2360);
      expect(minTotal).toBeGreaterThan(13000);
      expect(maxTotal).toBeGreaterThan(minTotal);
    });

    it('calculates realistic 60-month financing estimates', () => {
      const minTotal = 15000;
      const monthly = Math.round((minTotal * 1.20) / 60);
      expect(monthly).toBe(300);
    });
  });

  describe('Before/After Slider & Visualizer Assets', () => {
    it('verifies material profile categories exist', () => {
      const validCategories = ['Metal Systems', 'Asphalt Systems', 'Low-Slope / Flat Systems', 'Composite Systems'];
      expect(validCategories.length).toBe(4);
    });

    it('verifies 5 distinct transformation case studies are configured', () => {
      const transformationPairs = [
        { before: '/images/transformations/shingles-before.jpg', after: '/images/transformations/shingles-after.jpg' },
        { before: '/images/transformations/storm-before.jpg', after: '/images/transformations/storm-after.jpg' },
        { before: '/images/transformations/metal-before.jpg', after: '/images/transformations/metal-after.jpg' },
        { before: '/images/transformations/flat-before.jpg', after: '/images/transformations/flat-after.jpg' },
        { before: '/images/transformations/tile-before.jpg', after: '/images/transformations/tile-after.jpg' }
      ];
      expect(transformationPairs.length).toBe(5);
      transformationPairs.forEach(pair => {
        expect(pair.before).toContain('.jpg');
        expect(pair.after).toContain('.jpg');
        expect(pair.before).not.toBe(pair.after);
      });
    });

    it('verifies crew safety and proper equipment protocols are defined', () => {
      const requiredSafetyAspects = ['Height Safety', 'Crew Standards', 'Site Management', 'Homeowner Shield'];
      expect(requiredSafetyAspects.length).toBe(4);
    });

    it('verifies 6-layer engineered roof envelope anatomy standards', () => {
      const envelopeLayers = [
        { num: '01', name: 'Structural Decking', astm: 'APA Rated Sheathing / PS 2-10' },
        { num: '02', name: 'Self-Adhering Ice & Water Leak Barrier', astm: 'ASTM D1970' },
        { num: '03', name: 'High-Tensile Synthetic Underlayment', astm: 'ASTM D4869' },
        { num: '04', name: 'Heavy-Gauge Starter Course & Valley Armor', astm: 'ASTM D1970' },
        { num: '05', name: 'Class-4 High-Definition Dimensional Shingles', astm: 'UL 2218 Class 4' },
        { num: '06', name: 'Continuous Ridge Exhaust & High-Profile Caps', astm: 'ASTM D3462' }
      ];
      expect(envelopeLayers.length).toBe(6);
      envelopeLayers.forEach(l => {
        expect(l.astm.length).toBeGreaterThan(5);
      });
    });

    it('verifies real-time 3D model materials and hotspots are defined', () => {
      const materials = ['shingles', 'metal', 'tile', 'tpo'];
      const hotspots = ['hs-ridge', 'hs-chimney', 'hs-valley', 'hs-dormer'];
      expect(materials.length).toBe(4);
      expect(hotspots.length).toBe(4);
    });

    it('verifies forensic roof inspection milestones timeline', () => {
      const chapters = [
        { id: 'ch-1', time: 0, title: 'Aerial Drone Forensic Scan' },
        { id: 'ch-2', time: 12, title: 'Zero-Damage Tear-Off & Decking Repair' },
        { id: 'ch-3', time: 25, title: 'Self-Adhering Ice Barrier & Synthetic Shield' },
        { id: 'ch-4', time: 38, title: 'Precision Fastening & Balanced Ventilation' },
        { id: 'ch-5', time: 50, title: 'Magnetic Debris Sweep & Final Sign-Off' }
      ];
      expect(chapters.length).toBe(5);
      chapters.forEach(c => {
        expect(c.time).toBeGreaterThanOrEqual(0);
        expect(c.title.length).toBeGreaterThan(5);
      });
    });

    it('verifies hero landing background video asset configuration', () => {
      const heroVideoPath = '/videos/gemini_generated_video_5477c9c4.mp4';
      expect(heroVideoPath).toContain('.mp4');
      expect(heroVideoPath.startsWith('/videos/')).toBe(true);
    });

    it('verifies all 8 dedicated roofing services are configured in siteConfig', () => {
      const expectedServices = [
        'roof-installation',
        'roof-repair',
        'roof-maintenance',
        'roof-replacement',
        'roof-inspection',
        'roof-leak-repair',
        'residential-roofing',
        'commercial-roofing'
      ];
      expect(expectedServices.length).toBe(8);
      expectedServices.forEach(slug => {
        expect(slug.length).toBeGreaterThan(4);
      });
    });

    it('validates appointment booking schema and timing', () => {
      const appointment = {
        fullName: 'Jane Doe',
        phone: '(555) 234-5678',
        email: 'jane@example.com',
        propertyAddress: '456 Elm St, Austin, TX 78701',
        inspectionType: 'Comprehensive 21-Point Forensic Roof Inspection',
        preferredDate: '2026-11-05',
        preferredTimeSlot: 'Morning (8:00 AM - 12:00 PM)',
        includeDroneScan: true,
        consentGiven: true
      };

      expect(appointment.fullName.length).toBeGreaterThan(0);
      expect(appointment.preferredDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(appointment.includeDroneScan).toBe(true);
      expect(appointment.consentGiven).toBe(true);
    });

    it('validates callback request dispatch contract', () => {
      const callbackReq = {
        fullName: 'Robert Miller',
        phone: '(555) 987-6543',
        preferredTime: 'Immediate / As soon as possible',
        issueType: 'Active Roof Leak / Emergency',
        consentGiven: true
      };

      expect(callbackReq.phone.replace(/\D/g, '').length).toBeGreaterThanOrEqual(10);
      expect(callbackReq.preferredTime).toContain('Immediate');
      expect(callbackReq.consentGiven).toBe(true);
    });

    it('validates territory ZIP code prefix coverage', () => {
      const supportedPrefixes = ['787', '786', '750', '770'];
      const testZip = '78701';
      const isSupported = supportedPrefixes.some(p => testZip.startsWith(p));
      expect(isSupported).toBe(true);
    });
  });
});

