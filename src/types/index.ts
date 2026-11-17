export type ServiceCategory = 'installation' | 'repair' | 'maintenance';

export interface RoofingProject {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  location: string;
  servicePerformed: string;
  description: string;
  isDemonstrationWork: boolean;
  image: string;
  thumbnail: string;
  completionTimeline?: string;
  roofSystem?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'general' | 'installation' | 'repair' | 'maintenance' | 'estimates';
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  publishedDate: string;
}

export interface ServiceAreaItem {
  id: string;
  regionName: string;
  status: 'active' | 'evaluating';
  coverageDescription: string;
  disclaimer: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceRequested: string;
  propertyAddress: string;
  inquiryDetails: string;
  preferredContactMethod: 'phone' | 'email';
  consentGiven: boolean;
  honeypot?: string;
}

export interface UploadedPhoto {
  name: string;
  data: string; // base64 data url
  size: number;
}

export interface EstimateFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: 'residential-single' | 'residential-multi' | 'commercial' | 'industrial' | 'other';
  requiredService: string;
  propertyAddress: string;
  description: string;
  preferredContactMethod: 'phone' | 'email';
  preferredInspectionDate?: string;
  photoAttachmentsDescription?: string;
  photos?: UploadedPhoto[];
  consentGiven: boolean;
  honeypot?: string;
}

export interface CallbackFormData {
  fullName: string;
  phone: string;
  preferredTime: string;
  issueType: string;
  propertyAddress?: string;
  consentGiven: boolean;
  honeypot?: string;
}

export interface AppointmentFormData {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  inspectionType: string;
  preferredDate: string;
  preferredTimeSlot: string;
  includeDroneScan: boolean;
  notes?: string;
  consentGiven: boolean;
  honeypot?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export interface CustomerReview {
  id: string;
  authorName: string;
  rating: number;
  serviceType: string;
  propertyLocation?: string;
  reviewText: string;
  submittedAt: string;
  platform: 'website' | 'google';
  isVerifiedCustomer?: boolean;
}

export interface ReviewFormData {
  authorName: string;
  email: string;
  rating: number;
  serviceType: string;
  propertyLocation?: string;
  reviewText: string;
  recommendToOthers: boolean;
  honeypot?: string;
}

export interface RoofCalculationResult {
  approxSquareFootage: number;
  pitchMultiplier: number;
  selectedMaterial: string;
  materialName: string;
  estimatedMinCost: number;
  estimatedMaxCost: number;
  monthlyFinancingEstimated: number;
  lifespanYears: string;
  windRatingMph: number;
  recommendedWarranty: string;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  location: string;
  serviceScope: string;
  beforeImage: string;
  afterImage: string;
  details: string;
}

export interface RoofMaterialProfile {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  lifespan: string;
  warranty: string;
  windResistance: string;
  solarReflectance: string;
  bestFor: string;
  relativeCost: '$$' | '$$$' | '$$$$';
}

export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'archived';



