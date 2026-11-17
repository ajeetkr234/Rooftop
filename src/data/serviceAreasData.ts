import { ServiceAreaItem } from '../types';

export const serviceAreasData: ServiceAreaItem[] = [
  {
    id: "metro-core",
    regionName: "Metropolitan Central Core [Placeholder Region]",
    status: "active",
    coverageDescription: "Full service coverage for Roof Installation, Leak Repair, and Scheduled Preventive Maintenance for single-family residences, commercial buildings, and multi-tenant facilities.",
    disclaimer: "Exact operational radius and zoning boundaries are subject to confirmation based on job site distance and municipal permitting requirements."
  },
  {
    id: "north-district",
    regionName: "Northern Regional District [Placeholder Region]",
    status: "active",
    coverageDescription: "Active service territory for architectural re-roofing, storm repair diagnostics, and commercial flat roof preventive programs.",
    disclaimer: "Inspection scheduling is organized into regional routes to minimize dispatch travel times and reduce client waiting windows."
  },
  {
    id: "south-valley",
    regionName: "Southern Valley & Surrounding Towns [Placeholder Region]",
    status: "active",
    coverageDescription: "Covering residential roof replacements, flashing replacements, low-slope membrane restorations, and annual inspection plans.",
    disclaimer: "Consultation availability varies based on seasonal scheduling. Submit your postal code or street address to confirm immediate dispatch availability."
  },
  {
    id: "extended-zone",
    regionName: "Extended Perimeter Territory [Evaluating on Request]",
    status: "evaluating",
    coverageDescription: "Available for large-scale roof replacements and commercial roofing projects upon initial project scope assessment.",
    disclaimer: "Travel coordination fees or distance thresholds may apply depending on project size and crew staging logistics."
  }
];

