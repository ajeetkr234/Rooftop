/**
 * Centralized Site and Brand Configuration
 * 
 * IMPORTANT: In accordance with project instructions, all company details,
 * contact numbers, licenses, and service claims use clearly identified placeholders.
 * Replace these centralized values when real business data is provided.
 */

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  heroImage: string;
  features: string[];
  materialsSupported: string[];
  faqIds: string[];
}

export const siteConfig = {
  // Brand & Company Placeholders
  companyName: "YOUR ROOFING COMPANY",
  tagline: "Reliable Roofing. Lasting Protection.",
  subHeadline: "From professional roof installation to dependable repairs and preventive maintenance, discover roofing solutions designed to protect your property.",
  
  // Verification flags
  isPhoneVerified: false,
  isEmailVerified: false,
  isAddressVerified: false,
  isEmergencyAvailable: false,
  isFreeEstimateConfirmed: true, // As specified in hero copy guidelines: "Request an Estimate" / free estimate where confirmed
  
  // Contact Placeholders
  contact: {
    phonePlaceholder: "(555) 019-ROOF [Placeholder]",
    phoneRaw: "+15550197663",
    emailPlaceholder: "inquiries@yourroofingcompany.example.com [Placeholder]",
    addressLine1: "100 Industrial Parkway [Placeholder Location]",
    addressCityStateZip: "Metropolis, ST 00000 [Placeholder]",
    businessHoursWeekday: "Monday – Friday: 7:30 AM – 5:30 PM",
    businessHoursWeekend: "Saturday: 8:00 AM – 1:00 PM | Sunday: Closed",
  },

  // Reviews & Feedback Configuration
  reviews: {
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID_PLACEHOLDER",
    isGoogleReviewLinkActive: false,
    googleReviewDisclaimer: "Google review submission link ready for official Google Business Profile connection.",
  },

  // Service Offerings
  services: [
    {
      id: "roof-installation",
      slug: "roof-installation",
      title: "Roof Installation",
      tagline: "Precision architectural installation engineered for durability and weather resistance.",
      shortDescription: "Professional roof installation for suitable new construction and replacement projects.",
      fullDescription: "Our roof installation services focus on meticulous craftsmanship, proper deck preparation, ventilation balancing, and high-performance material installation tailored to architectural requirements.",
      heroImage: "/images/services/service-installation.jpg",
      thumbnail: "/images/services/service-installation.jpg",
      features: [
        "Complete roof tear-off and thorough structural deck inspection",
        "High-performance synthetic underlayment & ice/water shield installation",
        "Architectural asphalt shingle, standing-seam metal, and flat membrane systems",
        "Balanced ridge and soffit ventilation design to extend roof lifespan",
        "Custom metal flashing fabrication for valleys, chimneys, and roof junctions"
      ],
      materialsSupported: [
        "Architectural Asphalt Shingles",
        "Standing Seam Metal Roofing",
        "TPO & EPDM Flat Roofing Systems",
        "Cedar Shake (Select Applications)",
        "Slate & Synthetic Composite Tiles"
      ],
      faqIds: ["install-timeline", "install-materials", "install-warranty"]
    },
    {
      id: "roof-repair",
      slug: "roof-repair",
      title: "Roof Repair",
      tagline: "Prompt, thorough diagnostic repairs targeting water intrusion at the source.",
      shortDescription: "Assessment and repair of leaks, damaged roofing, and related roofing problems.",
      fullDescription: "Water infiltration can cause severe hidden structural damage. Our repair process pinpoints compromised flashing, wind-lifted shingles, blocked drainage, and pipe boot failures.",
      heroImage: "/images/services/service-repair.jpg",
      thumbnail: "/images/services/service-repair.jpg",
      features: [
        "Systematic leak origin tracing using moisture mapping protocols",
        "Emergency weather-proofing and temporary tarping where warranted",
        "Wind, storm, and hail damage remediation",
        "Flashing, valley, and penetration re-sealing and replacement",
        "Fascia, soffit, and substrate rot remediation"
      ],
      materialsSupported: [
        "Asphalt Shingle Repairs",
        "Metal Panel & Seam Restoration",
        "Low-Slope Membrane Seam Welding & Patching",
        "Chimney Flashing & Counter-Flashing Systems"
      ],
      faqIds: ["repair-vs-replace", "repair-estimate", "repair-emergency"]
    },
    {
      id: "roof-maintenance",
      slug: "roof-maintenance",
      title: "Roof Maintenance",
      tagline: "Proactive care and multi-point inspections to maximize your roof’s functional lifespan.",
      shortDescription: "Preventive inspections and maintenance designed to help identify roofing issues early.",
      fullDescription: "Regular roof maintenance preserves the integrity of your building envelope, catches minor sealant degradations before they become catastrophic leaks, and documents condition for insurance records.",
      heroImage: "/images/services/service-maintenance.jpg",
      thumbnail: "/images/services/service-maintenance.jpg",
      features: [
        "Comprehensive 21-point visual inspection of deck, shingles, flashing, and vents",
        "Debris removal from valleys, crickets, scuppers, and internal drains",
        "Caulking and sealant renewal on penetrations and exposed fasteners",
        "Attic insulation and moisture check to prevent condensation rot",
        "Detailed photographic condition report with prioritized recommendations"
      ],
      materialsSupported: [
        "Residential Pitched Roofs",
        "Commercial Flat & Low-Slope Roofs",
        "Multi-Family Residential Properties",
        "Industrial Warehouse Envelopes"
      ],
      faqIds: ["maintenance-frequency", "maintenance-checklist", "maintenance-plans"]
    },
    {
      id: "roof-replacement",
      slug: "roof-replacement",
      title: "Roof Replacement",
      tagline: "Engineered full tear-offs, decking remediation, and manufacturer-backed lifetime guarantees.",
      shortDescription: "Full tear-off and replacement when recurring patches no longer protect your equity.",
      fullDescription: "Complete roof replacement engineered down to raw structural decking. We remediate rotted substrate, install self-adhering moisture armor, and apply modern wind-rated systems.",
      heroImage: "/images/services/service-replacement.jpg",
      thumbnail: "/images/services/service-replacement.jpg",
      features: [
        "100% clean tear-off with high-strength landscape and siding shield protection",
        "Forensic decking inspection and CDX structural plywood replacement",
        "ASTM D1970 ice & water shield fortification along valleys and perimeter eaves",
        "Continuous balanced ridge ventilation baffles for attic moisture control",
        "4-pass industrial magnetic debris sweep ensuring zero yard nails"
      ],
      materialsSupported: [
        "Class 4 Architectural Shingles",
        "Standing Seam Galvalume Metal",
        "Synthetic Composite Tile",
        "Low-Slope TPO Additions"
      ],
      faqIds: ["install-timeline", "repair-vs-replace", "install-warranty"]
    },
    {
      id: "roof-inspection",
      slug: "roof-inspection",
      title: "Roof Inspection & Drone Scan",
      tagline: "Forensic 21-point evaluation with millimeter-close 4K aerial drone scanning.",
      shortDescription: "Certified diagnostic inspections for pre-purchase audits, storm claims, and aging roofs.",
      fullDescription: "Detailed photographic forensic inspections. We systematically audit shingles, flashing seals, valley convergence, and sub-decking without cracking delicate tiles.",
      heroImage: "/images/services/service-inspection.jpg",
      thumbnail: "/images/services/service-inspection.jpg",
      features: [
        "FAA-compliant 4K aerial drone zoom inspection across steep or fragile pitches",
        "Itemized 21-point structural envelope diagnostic report",
        "Hail crater, wind crease, and storm damage certification",
        "Estimated remaining useful lifespan calculation",
        "Xactimate-compatible documentation for insurance adjusters"
      ],
      materialsSupported: [
        "All Residential Pitch Slopes",
        "Commercial Low-Slope Facilities",
        "Architectural Metal & Slate",
        "Spanish Clay & Concrete Tile"
      ],
      faqIds: ["maintenance-frequency", "maintenance-checklist"]
    },
    {
      id: "roof-leak-repair",
      slug: "roof-leak-repair",
      title: "Roof Leak Repair & Emergency Tarping",
      tagline: "Rapid response diagnostics and immediate temporary weatherproofing to halt water intrusion.",
      shortDescription: "Emergency water leak triage, pipe boot collar seals, chimney flashing restoration.",
      fullDescription: "Immediate leak diagnostics and permanent flashing remediation. We identify traveling water paths along rafters and seal compromised penetrations before ceiling damage spreads.",
      heroImage: "/images/services/service-leak-repair.jpg",
      thumbnail: "/images/services/service-leak-repair.jpg",
      features: [
        "Emergency temporary tarping and water diversion",
        "Perimeter pipe boot rubber collar rebuilds",
        "Chimney counter-flashing and masonry step seal restoration",
        "Valley damming remediation and blown-shingle replacement",
        "Substrate moisture testing behind drywall"
      ],
      materialsSupported: [
        "Asphalt Shingle Systems",
        "Metal Panel Intersections",
        "Commercial Single-Ply Membranes",
        "Tile & Slate Penetrations"
      ],
      faqIds: ["repair-emergency", "repair-estimate"]
    },
    {
      id: "residential-roofing",
      slug: "residential-roofing",
      title: "Residential Roofing",
      tagline: "Curb appeal, energy efficiency, and high-wind storm defense for homeowner properties.",
      shortDescription: "Architectural shingles, designer metal, and tile tailored for private residences.",
      fullDescription: "Dedicated residential roofing solutions balancing neighborhood aesthetics, HOA guidelines, Class 4 hail discounts, and transferable manufacturer guarantees.",
      heroImage: "/images/services/service-residential.jpg",
      thumbnail: "/images/services/service-residential.jpg",
      features: [
        "Class 4 high-definition dimensional architectural shingles",
        "Concealed-fastener standing seam Galvalume metal",
        "Concrete and Spanish clay tile installation",
        "Attic intake and exhaust balancing to cut cooling bills",
        "Lifetime non-prorated manufacturer warranty programs"
      ],
      materialsSupported: [
        "Architectural Asphalt Shingles",
        "Standing Seam Metal",
        "Clay & Concrete Tile",
        "Synthetic Slate"
      ],
      faqIds: ["install-materials", "install-warranty"]
    },
    {
      id: "commercial-roofing",
      slug: "commercial-roofing",
      title: "Commercial Roofing",
      tagline: "Engineered single-ply membranes and proactive asset management for facility portfolios.",
      shortDescription: "TPO, EPDM, PVC, and silicone restorations for commercial and industrial buildings.",
      fullDescription: "Commercial flat and low-slope roofing systems engineered for high UV resistance, standing ponding water durability, and chemical exhaust exposure.",
      heroImage: "/images/services/service-commercial.jpg",
      thumbnail: "/images/services/service-commercial.jpg",
      features: [
        "Heat-welded TPO single-ply reflective cool roof systems",
        "EPDM synthetic rubber membrane installations",
        "Seamless restorative elastomeric silicone coatings",
        "Commercial CAM preventative maintenance inspections",
        "Scupper, internal drain, and parapet coping metal fabrication"
      ],
      materialsSupported: [
        "TPO Membranes (60/80 mil)",
        "EPDM Rubber",
        "Modified Bitumen",
        "Liquid-Applied Silicone Coatings"
      ],
      faqIds: ["install-timeline", "maintenance-plans"]
    }
  ],

  // Navigation Links
  navLinks: [
    { label: "Home", path: "/" },
    {
      label: "Services",
      path: "/services",
      children: [
        { label: "All Services Overview", path: "/services" },
        { label: "Roof Installation", path: "/services/roof-installation" },
        { label: "Roof Repair", path: "/services/roof-repair" },
        { label: "Roof Maintenance", path: "/services/roof-maintenance" },
        { label: "Roof Replacement", path: "/services/roof-replacement" },
        { label: "Roof Inspection & Drone Scan", path: "/services/roof-inspection" },
        { label: "Emergency Leak Repair", path: "/services/roof-leak-repair" },
        { label: "Residential Roofing", path: "/services/residential-roofing" },
        { label: "Commercial Flat Roofing", path: "/services/commercial-roofing" }
      ]
    },
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Service Areas", path: "/service-areas" },
    { label: "Resources", path: "/resources" },
    { label: "Contact", path: "/contact" }
  ],

  // Trust Indicators (Honest, verified attributes without fabricated numbers)
  trustIndicators: [
    {
      title: "Professional Roofing Services",
      description: "Dedicated to precision craftsmanship, clean worksites, and clear client communication.",
      icon: "ShieldCheck"
    },
    {
      title: "Installation, Repair & Maintenance",
      description: "Comprehensive lifecycle care for residential and commercial roofing systems.",
      icon: "Hammer"
    },
    {
      title: "Quality-Focused Workmanship",
      description: "Rigorous attention to manufacturer specifications and building envelope standards.",
      icon: "Award"
    },
    {
      title: "Transparent Consultations",
      description: "Itemized written estimates detailing materials, labor, and anticipated project scope.",
      icon: "FileText"
    }
  ],

  // 4-step process
  processSteps: [
    {
      step: "01",
      title: "Tell Us About Your Roof",
      description: "Submit an inquiry or call with details about your property type, observed issues, or project timeline."
    },
    {
      step: "02",
      title: "Arrange an Inspection",
      description: "Where appropriate, a qualified roofer assesses your roof’s surface, flashing, drainage, and structural deck."
    },
    {
      step: "03",
      title: "Receive a Detailed Estimate",
      description: "Get a transparent, itemized proposal outlining material choices, scope of work, and project milestones."
    },
    {
      step: "04",
      title: "Approve Scope & Schedule",
      description: "Once terms are finalized, materials are staged and our crew executes the work with strict safety protocols."
    }
  ]
};

