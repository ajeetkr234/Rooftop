import { RoofingProject } from '../types';

/**
 * Project Portfolio & Showcase Data
 * Note: Per project guidelines, demonstration imagery is clearly labeled as sample work
 * to prevent misleading or fabricated claims until verified project photos are supplied.
 */
export const projectsData: RoofingProject[] = [
  {
    id: "proj-1",
    title: "Architectural Standing-Seam Metal Roof",
    category: "installation",
    categoryLabel: "Roof Installation",
    location: "Sample Project Location [Demonstration Portfolio]",
    servicePerformed: "Full standing-seam installation with concealed fasteners & snow retention system",
    description: "A complete roof replacement featuring custom dark slate standing-seam panels engineered for 140mph wind uplift ratings and lifetime durability.",
    isDemonstrationWork: true,
    image: "/images/projects/project-standing-seam.jpg",
    thumbnail: "/images/projects/project-standing-seam.jpg",
    completionTimeline: "5 Work Days",
    roofSystem: "24-Gauge Standing Seam Steel"
  },
  {
    id: "proj-2",
    title: "Storm Damage Flashing & Shingle Restoration",
    category: "repair",
    categoryLabel: "Roof Repair",
    location: "Sample Project Location [Demonstration Portfolio]",
    servicePerformed: "Valley leak diagnosis, wood deck replacement & chimney counter-flashing rebuild",
    description: "Systematic leak investigation revealed failed step flashing around masonry chimney. Decayed substrate removed, waterproof ice membrane installed, and hand-bent copper flashing applied.",
    isDemonstrationWork: true,
    image: "/images/projects/project-chimney-repair.jpg",
    thumbnail: "/images/projects/project-chimney-repair.jpg",
    completionTimeline: "1 Work Day",
    roofSystem: "Dimensional Asphalt & Copper Flashing"
  },
  {
    id: "proj-3",
    title: "Commercial Low-Slope Preventive Maintenance",
    category: "maintenance",
    categoryLabel: "Roof Maintenance",
    location: "Sample Project Location [Demonstration Portfolio]",
    servicePerformed: "21-Point seasonal maintenance, scupper clearing & membrane seam reinforcement",
    description: "Annual preventive inspection on a 18,000 sq.ft facility. Re-caulked all parapet coping joints, hot-air welded loose lap seams, and cleared internal stormwater drain strainers.",
    isDemonstrationWork: true,
    image: "/images/projects/project-commercial-tpo.jpg",
    thumbnail: "/images/projects/project-commercial-tpo.jpg",
    completionTimeline: "Periodic Maintenance Plan",
    roofSystem: "60-mil TPO Membrane"
  },
  {
    id: "proj-4",
    title: "High-Pitch Architectural Shingle Replacement",
    category: "installation",
    categoryLabel: "Roof Installation",
    location: "Sample Project Location [Demonstration Portfolio]",
    servicePerformed: "Complete tear-off, enhanced ventilation baffle setup & Class 4 impact shingles",
    description: "Residential complete tear-off of aged 3-tab shingles. Upgraded to Class 4 impact-resistant architectural shingles with intake soffit baffles to balance thermal airflow.",
    isDemonstrationWork: true,
    image: "/images/projects/project-high-pitch.jpg",
    thumbnail: "/images/projects/project-high-pitch.jpg",
    completionTimeline: "3 Work Days",
    roofSystem: "Architectural Asphalt Shingles"
  },
  {
    id: "proj-5",
    title: "Wind-Driven Shingle Crease & Ridge Repair",
    category: "repair",
    categoryLabel: "Roof Repair",
    location: "Sample Project Location [Demonstration Portfolio]",
    servicePerformed: "Blown-off ridge cap replacement, wind-creased shingle swaps & nail pop sealing",
    description: "Post-storm inspection detected unsealed windward tabs and torn ridge vents. Installed high-wind ridge components with mechanical fasteners and polymer sealant.",
    isDemonstrationWork: true,
    image: "/images/projects/project-ridge-repair.jpg",
    thumbnail: "/images/projects/project-ridge-repair.jpg",
    completionTimeline: "Same-Day Repair",
    roofSystem: "Modified Bitumen Ridge & Shingles"
  },
  {
    id: "proj-6",
    title: "Multi-Unit Property Semi-Annual Inspection",
    category: "maintenance",
    categoryLabel: "Roof Maintenance",
    location: "Sample Project Location [Demonstration Portfolio]",
    servicePerformed: "Comprehensive photographic inspection, gutter debris flushing & penetration check",
    description: "Preventive evaluation covering 6 residential townhome buildings. Documented early granule depletion and resealed pipe penetration boots to avert water entry.",
    isDemonstrationWork: true,
    image: "/images/projects/project-multi-unit-inspection.jpg",
    thumbnail: "/images/projects/project-multi-unit-inspection.jpg",
    completionTimeline: "Scheduled Bi-Annual Service",
    roofSystem: "Mixed Asphalt & Metal Flashing"
  }
];
