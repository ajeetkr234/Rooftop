import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Download, 
  Search, 
  Trash2, 
  Phone, 
  Mail, 
  Star, 
  RefreshCw, 
  LogOut, 
  AlertCircle,
  X,
  ExternalLink,
  Eye,
  LayoutDashboard,
  FileText,
  Calendar,
  PhoneCall,
  Globe,
  Briefcase,
  Settings,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Smartphone,
  Tablet,
  Monitor,
  Building,
  Home,
  Wrench,
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projectsData';

// Designated Pages Directory Definition
export interface DesignatedPage {
  id: string;
  title: string;
  route: string;
  category: 'Core' | 'Services' | 'Lead Tools' | 'Portfolio & Content' | 'Legal';
  badge: string;
  description: string;
  keyFeatures: string[];
  targetAudience: string;
  iconName: 'home' | 'wrench' | 'building' | 'calendar' | 'briefcase' | 'shield';
}

const renderPageIcon = (iconName: string) => {
  switch (iconName) {
    case 'home':
      return <Home className="w-4 h-4 text-brand-copper" />;
    case 'wrench':
      return <Wrench className="w-4 h-4 text-brand-copper" />;
    case 'building':
      return <Building className="w-4 h-4 text-brand-copper" />;
    case 'calendar':
      return <Calendar className="w-4 h-4 text-brand-copper" />;
    case 'briefcase':
      return <Briefcase className="w-4 h-4 text-brand-copper" />;
    case 'shield':
    default:
      return <ShieldCheck className="w-4 h-4 text-brand-copper" />;
  }
};

const DESIGNATED_PAGES: DesignatedPage[] = [
  // Core Navigation
  {
    id: 'page-home',
    title: 'Home Page',
    route: '/',
    category: 'Core',
    badge: 'Flagship Landing',
    description: 'High-converting architectural homepage featuring real-time 3D roof visualizer, trust metrics, instant cost calculator, jobsite safety, workflow steps, and customer testimonials.',
    keyFeatures: ['Interactive 3D Roof Shaders', 'Trust Indicators & FAA Badges', 'Jobsite Safety Standards', 'Recent Work Gallery', 'Quick Estimator Card'],
    targetAudience: 'Commercial & residential property owners, facility managers, new leads',
    iconName: 'home'
  },
  {
    id: 'page-about',
    title: 'About Our Company',
    route: '/about',
    category: 'Core',
    badge: 'Credentials & Story',
    description: 'Company background, OSHA certified safety protocols, licensing credentials, workmanship warranties, and core leadership standards.',
    keyFeatures: ['Master Contractor Credentials', '$2M+ Liability Insurance Proof', 'Crew Safety Equipment', 'Craftsmanship Warranty Terms'],
    targetAudience: 'Clients vetting contractor legitimacy, insurance adjusters, property managers',
    iconName: 'shield'
  },
  {
    id: 'page-contact',
    title: 'Contact Us & Direct Line',
    route: '/contact',
    category: 'Core',
    badge: 'Inquiry Terminal',
    description: 'Direct inquiry dispatch form, 24/7 emergency leak triage hotline, local dispatch headquarters map, and operating hours.',
    keyFeatures: ['Direct Contact Dispatch Form', 'Emergency Tarping Notice', 'Physical Office Location', 'Operating Hours'],
    targetAudience: 'Direct customer inquiries, urgent emergency repair requests',
    iconName: 'wrench'
  },
  {
    id: 'page-service-areas',
    title: 'Service Areas & Coverage',
    route: '/service-areas',
    category: 'Core',
    badge: 'Geographic Radius',
    description: 'Complete regional coverage map, designated county zones, rapid emergency dispatch radius, and municipal service guidelines.',
    keyFeatures: ['Interactive Regional Map', 'Priority Dispatch Radius', 'Commercial Service Zones', 'Municipal Permitting Notes'],
    targetAudience: 'Regional homeowners and commercial property owners verifying coverage',
    iconName: 'building'
  },

  // Services Hub & 8 Specific Services
  {
    id: 'page-services',
    title: 'Services Directory & Hub',
    route: '/services',
    category: 'Services',
    badge: 'Master Catalog',
    description: 'Comprehensive directory of all 8 roofing capabilities, material comparison matrix, warranty tiers, and contractor FAQs.',
    keyFeatures: ['8 Core Service Showcase', 'Roofing Material Comparison Matrix', 'Warranty Protection Levels', 'Service FAQ Accordions'],
    targetAudience: 'Clients researching roofing options and material suitability',
    iconName: 'wrench'
  },
  {
    id: 'page-roof-installation',
    title: 'Roof Installation',
    route: '/services/roof-installation',
    category: 'Services',
    badge: 'Core Service',
    description: 'Precision architectural roof installation for new construction and complete re-framing projects with lifetime warranty options.',
    keyFeatures: ['Complete Structural Deck Inspection', 'Synthetic Underlayment Systems', 'Balanced Ridge & Soffit Ventilation', 'Architectural Shingle & Metal'],
    targetAudience: 'General contractors, custom home builders, new property developers',
    iconName: 'home'
  },
  {
    id: 'page-roof-repair',
    title: 'Roof Repair',
    route: '/services/roof-repair',
    category: 'Services',
    badge: 'Core Service',
    description: 'Prompt forensic leak investigation, moisture mapping protocols, chimney flashing rebuilds, and damaged shingle restoration.',
    keyFeatures: ['Moisture Infiltration Mapping', 'Chimney & Valley Flashing Rebuilds', 'Emergency Leak Sealing', 'Storm Remediations'],
    targetAudience: 'Property owners with active roof leaks or visible exterior storm damage',
    iconName: 'wrench'
  },
  {
    id: 'page-roof-maintenance',
    title: 'Roof Maintenance',
    route: '/services/roof-maintenance',
    category: 'Services',
    badge: 'Core Service',
    description: 'Scheduled preventive maintenance programs, drain & scupper clearing, fastener sealing, and seasonal debris mitigation.',
    keyFeatures: ['21-Point Maintenance Protocol', 'Drain & Scupper Debris Clearing', 'Penetration & Sealant Renewal', 'Lifecycle Extension Plans'],
    targetAudience: 'Commercial facility managers, HOA board directors, proactive homeowners',
    iconName: 'wrench'
  },
  {
    id: 'page-roof-replacement',
    title: 'Roof Replacement',
    route: '/services/roof-replacement',
    category: 'Services',
    badge: 'Core Service',
    description: 'Full clean tear-offs, forensic wood substrate plywood replacement, ASTM ice/water barrier installation, and landscape protection.',
    keyFeatures: ['Zero-Debris Landscape Shielding', 'CDX Structural Plywood Re-decking', 'Class 4 Impact Resistance Options', 'Comprehensive Workmanship Warranty'],
    targetAudience: 'Owners of 15+ year old roofs experiencing chronic deterioration or hail damage',
    iconName: 'home'
  },
  {
    id: 'page-roof-inspection',
    title: 'Inspection & 4K Drone Scan',
    route: '/services/roof-inspection',
    category: 'Services',
    badge: 'Core Service',
    description: 'Certified forensic roof diagnostic inspections utilizing FAA-compliant 4K aerial drone zoom cameras and itemized diagnostic reports.',
    keyFeatures: ['FAA Part 107 Drone Scans', '21-Point Envelope Diagnostic Audit', 'Hail Crater & Wind Crease Mapping', 'Insurance Claim Ready Documentation'],
    targetAudience: 'Pre-purchase real estate buyers, insurance claims, fragile or steep pitches',
    iconName: 'shield'
  },
  {
    id: 'page-roof-leak-repair',
    title: 'Roof Leak Repair & Tarping',
    route: '/services/roof-leak-repair',
    category: 'Services',
    badge: 'Core Service',
    description: 'Rapid emergency water intrusion triage, pipe boot collar replacements, emergency protective tarping, and interior leak tracing.',
    keyFeatures: ['Priority Leak Dispatch', 'Emergency Heavy-Duty Tarping', 'Plumbing Pipe Boot Replacement', 'Interior Ceiling Water Triage'],
    targetAudience: 'Property owners with active rain intrusion needing immediate intervention',
    iconName: 'wrench'
  },
  {
    id: 'page-residential-roofing',
    title: 'Residential Roofing Systems',
    route: '/services/residential-roofing',
    category: 'Services',
    badge: 'Core Service',
    description: 'Architectural shingle, concealed-fastener standing-seam Galvalume steel, and concrete tile systems tailored for private homes.',
    keyFeatures: ['HD Dimensional Shingles', 'Standing-Seam Galvalume Steel', 'Spanish Clay & Concrete Tiles', 'Energy-Star Cool Roof Finishes'],
    targetAudience: 'Private homeowners, luxury residential architects, suburban estates',
    iconName: 'home'
  },
  {
    id: 'page-commercial-roofing',
    title: 'Commercial Flat Roofing',
    route: '/services/commercial-roofing',
    category: 'Services',
    badge: 'Core Service',
    description: 'Single-ply reflective TPO, EPDM synthetic rubber membranes, PVC, and seamless elastomeric silicone restorative coatings.',
    keyFeatures: ['Heat-Welded TPO Single-Ply', 'EPDM Synthetic Rubber Membranes', 'Fluid-Applied Silicone Coatings', 'Parapet Coping & Scupper Fabrication'],
    targetAudience: 'Commercial building owners, warehouse managers, industrial plant operators',
    iconName: 'building'
  },

  // Customer Tools & Lead Converters
  {
    id: 'page-book-inspection',
    title: 'Book 21-Point Inspection',
    route: '/book-inspection',
    category: 'Lead Tools',
    badge: 'Interactive Tool',
    description: 'Dedicated customer booking portal for scheduling comprehensive 21-point roof audits, drone scans, and date/slot selection.',
    keyFeatures: ['Calendar Date Picker', 'Morning / Afternoon Slot Selection', 'Drone Scan Add-on Option', 'Direct CRM Integration'],
    targetAudience: 'Ready-to-act customers requesting scheduled physical roof evaluations',
    iconName: 'calendar'
  },
  {
    id: 'page-request-estimate',
    title: 'Request an Estimate',
    route: '/request-estimate',
    category: 'Lead Tools',
    badge: 'Interactive Tool',
    description: 'Full-scope itemized roofing estimate builder with property specification selectors and multi-photo damage attachment uploader.',
    keyFeatures: ['Multi-Step Project Scope Form', 'Damage Photo File Uploader', 'Timeline & Contact Preference Options', 'Automatic Admin Notification'],
    targetAudience: 'High-intent prospective clients ready for transparent formal project proposals',
    iconName: 'wrench'
  },

  // Portfolio, Showcase & Resources
  {
    id: 'page-projects',
    title: 'Projects & Gallery',
    route: '/projects',
    category: 'Portfolio & Content',
    badge: 'Proof of Work',
    description: 'Curated architectural portfolio featuring standing seam steel, chimney repairs, commercial TPO, and shingle installations.',
    keyFeatures: ['Filter by Category (Installation, Repair, Maintenance)', 'High-Resolution Project Imagery', 'Material & Timeline Specifications', 'Verified Job Descriptions'],
    targetAudience: 'Prospective clients evaluating contractor workmanship quality and aesthetics',
    iconName: 'briefcase'
  },
  {
    id: 'page-resources',
    title: 'Resources & Roofing Guides',
    route: '/resources',
    category: 'Portfolio & Content',
    badge: 'Education & Trust',
    description: 'Comprehensive homeowner knowledge base, storm damage checklists, seasonal roof maintenance guides, and warranty explanations.',
    keyFeatures: ['Homeowner Seasonal Checklists', 'Storm Damage Assessment Protocols', 'Roofing Material Longevity Charts', 'Warranty Claim Guides'],
    targetAudience: 'Homeowners seeking guidance, DIY inspectors, clients preparing for consultations',
    iconName: 'briefcase'
  },

  // Legal & Privacy
  {
    id: 'page-privacy',
    title: 'Privacy Policy & Terms',
    route: '/privacy',
    category: 'Legal',
    badge: 'Compliance',
    description: 'Transparent consumer privacy policy detailing customer data protection, estimate request information handling, and cookie disclosure.',
    keyFeatures: ['Zero-Third-Party Sale Pledge', 'SSL Encrypted Form Transmissions', 'Data Storage Transparency', 'Compliance Disclosures'],
    targetAudience: 'Site visitors, privacy advocates, legal compliance auditors',
    iconName: 'shield'
  }
];

export const AdminDashboardPage: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'estimates' | 'appointments' | 'callbacks' | 'contacts' | 'reviews' | 'designated-pages' | 'projects' | 'settings'
  >('overview');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [pageCategoryFilter, setPageCategoryFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  
  // Modals
  const [photoPreview, setPhotoPreview] = useState<{ isOpen: boolean; url: string; title: string } | null>(null);
  const [pagePreviewModal, setPagePreviewModal] = useState<{ isOpen: boolean; page: DesignatedPage | null; device: 'desktop' | 'tablet' | 'mobile' }>({
    isOpen: false,
    page: null,
    device: 'desktop'
  });

  // State data
  const [data, setData] = useState<{
    stats: { 
      totalEstimates: number; 
      totalContacts: number; 
      totalReviews: number; 
      totalAppointments?: number;
      totalCallbacks?: number;
      totalLeads?: number;
      averageRating: string 
    };
    estimates: any[];
    contacts: any[];
    reviews: any[];
    callbacks?: any[];
    appointments?: any[];
  }>({
    stats: { totalEstimates: 0, totalContacts: 0, totalReviews: 0, averageRating: '5.0' },
    estimates: [],
    contacts: [],
    reviews: [],
    callbacks: [],
    appointments: []
  });

  useEffect(() => {
    updatePageSEO("Owner Operations & Admin Portal", "Manage incoming roofing estimates, customer inquiries, reviews, and site pages.");
    const savedPin = sessionStorage.getItem('rooftop_admin_pin');
    if (savedPin) {
      setPasscode(savedPin);
      fetchAdminData(savedPin);
    }
  }, []);

  const fetchAdminData = async (pin: string) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/overview', {
        headers: { 'x-admin-key': pin },
      });

      if (!res.ok) {
        throw new Error('Invalid PIN or server error');
      }

      const json = await res.json();
      setData(json);
      setIsAuthenticated(true);
      sessionStorage.setItem('rooftop_admin_pin', pin);
    } catch {
      // In standalone client demo fallback
      if (pin === 'roof2026') {
        const storedEstimates = JSON.parse(localStorage.getItem('rooftop_estimate_leads') || '[]');
        const storedContacts = JSON.parse(localStorage.getItem('rooftop_contact_leads') || '[]');
        const storedReviews = JSON.parse(localStorage.getItem('rooftop_customer_reviews') || '[]');
        const storedAppointments = JSON.parse(localStorage.getItem('rooftop_appointment_leads') || '[]');
        const storedCallbacks = JSON.parse(localStorage.getItem('rooftop_callback_leads') || '[]');

        setData({
          stats: {
            totalEstimates: storedEstimates.length,
            totalContacts: storedContacts.length,
            totalReviews: storedReviews.length,
            totalAppointments: storedAppointments.length,
            totalCallbacks: storedCallbacks.length,
            totalLeads: storedEstimates.length + storedContacts.length + storedAppointments.length + storedCallbacks.length,
            averageRating: '5.0'
          },
          estimates: storedEstimates,
          contacts: storedContacts,
          reviews: storedReviews,
          appointments: storedAppointments,
          callbacks: storedCallbacks
        });
        setIsAuthenticated(true);
        sessionStorage.setItem('rooftop_admin_pin', pin);
      } else {
        setAuthError('Incorrect Passcode. Default owner PIN is: roof2026');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminData(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rooftop_admin_pin');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleStatusChange = async (type: string, id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/leads/${type}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passcode,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchAdminData(passcode);
    } catch {
      setData((prev) => {
        let listKey = 'estimates';
        if (type === 'contact') listKey = 'contacts';
        else if (type === 'callback') listKey = 'callbacks';
        else if (type === 'appointment') listKey = 'appointments';

        const updated = ((prev as any)[listKey] || []).map((item: any) =>
          item.id === id ? { ...item, status: newStatus } : item
        );
        return { ...prev, [listKey]: updated };
      });
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await fetch(`/api/admin/leads/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': passcode },
      });
      fetchAdminData(passcode);
    } catch {
      setData((prev) => {
        let listKey = 'estimates';
        if (type === 'contact') listKey = 'contacts';
        else if (type === 'review') listKey = 'reviews';
        else if (type === 'callback') listKey = 'callbacks';
        else if (type === 'appointment') listKey = 'appointments';

        const updated = ((prev as any)[listKey] || []).filter((item: any) => item.id !== id);
        return { ...prev, [listKey]: updated };
      });
    }
  };

  const exportToCSV = (type: 'estimates' | 'appointments' | 'callbacks' | 'contacts' | 'reviews') => {
    const items = (data as any)[type] || [];
    if (items.length === 0) {
      alert(`No ${type} records to export.`);
      return;
    }

    const headers = Object.keys(items[0]).filter(k => k !== 'photos').join(',');
    const rows = items.map((item: any) =>
      Object.keys(item)
        .filter(k => k !== 'photos')
        .map((k) => `"${String(item[k] ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rooftop_${type}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered queries
  const filteredEstimates = (data.estimates || []).filter(
    (e) =>
      e.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.propertyAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAppointments = (data.appointments || []).filter(
    (a) =>
      a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.propertyAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.inspectionType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCallbacks = (data.callbacks || []).filter(
    (c) =>
      c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issueType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = (data.contacts || []).filter(
    (c) =>
      c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.propertyAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReviews = (data.reviews || []).filter(
    (r) =>
      r.authorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reviewText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.serviceType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPages = DESIGNATED_PAGES.filter((p) => {
    const matchesCategory = pageCategoryFilter === 'All' || p.category === pageCategoryFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keyFeatures.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalLeadsCount = 
    (data.estimates?.length || 0) + 
    (data.appointments?.length || 0) + 
    (data.callbacks?.length || 0) + 
    (data.contacts?.length || 0);

  // Approximate pipeline value calculation ($11,500 average roofing job estimate)
  const estimatedPipeline = ((data.estimates?.length || 0) * 11500) + ((data.appointments?.length || 0) * 8500);

  // Authentication View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4 selection:bg-brand-copper selection:text-white">
        <div className="max-w-md w-full bg-brand-slate border border-slate-700/80 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-copper/20 border border-brand-copper/40 text-brand-copper flex items-center justify-center mx-auto mb-3 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-copper font-bold block">
              Authorized Contractor Access Only
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">Owner Command Portal</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time lead dispatch, proposal triage, customer review moderation, and full-site page management.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Security Passcode
                </label>
                <button
                  type="button"
                  onClick={() => setPasscode('roof2026')}
                  className="text-[10px] text-brand-copper hover:underline font-mono"
                >
                  Quick-fill (roof2026)
                </button>
              </div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3.5 bg-brand-navy/90 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-brand-copper text-sm font-mono tracking-wider"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-brand-copper/30 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying PIN...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Unlock Owner Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-700/60 text-center">
            <a 
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>← Back to Public Website</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c141f] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-72 bg-brand-navy border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Bar */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-copper flex items-center justify-center text-white font-black text-sm shadow-md">
                R
              </div>
              <div>
                <span className="text-xs font-black tracking-wider text-white block">
                  {siteConfig.companyName}
                </span>
                <span className="text-[10px] font-mono uppercase text-brand-copper font-bold block">
                  Owner Portal v2.4
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live System Status Pill */}
        <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Live
          </span>
          <span className="text-slate-400 font-mono">18 Pages Active</span>
        </div>

        {/* Nav Links */}
        <div className="p-3 space-y-6 flex-grow overflow-y-auto">
          {/* Operations Section */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Operations & CRM
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Executive Overview</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('estimates')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'estimates'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Estimate Requests</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-200 font-mono">
                {data.estimates?.length || 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Inspection Bookings</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-200 font-mono">
                {data.appointments?.length || 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('callbacks')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'callbacks'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4" />
                <span>Urgent Callbacks</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-900/60 text-red-200 font-mono">
                {data.callbacks?.length || 0}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Mail className="w-4 h-4" />
                <span>Contact Inquiries</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-200 font-mono">
                {data.contacts?.length || 0}
              </span>
            </button>
          </div>

          {/* Reputation Section */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Reputation
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Star className="w-4 h-4" />
                <span>Customer Reviews</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-900/50 text-amber-300 font-mono">
                {data.reviews?.length || 0}
              </span>
            </button>
          </div>

          {/* Site Architecture & CMS Section */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Site Architecture & Pages
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('designated-pages')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'designated-pages'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Globe className="w-4 h-4" />
                <span>All Designated Pages</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 font-mono">
                18 Pages
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Projects Portfolio</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-200 font-mono">
                6 Cases
              </span>
            </button>
          </div>

          {/* Settings Section */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Configuration
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-brand-copper text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Company Settings</span>
              </span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer Strip */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Signed in as:</span>
            <span className="font-mono text-brand-copper font-bold">Owner</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-1.5 px-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold text-center transition-colors inline-flex items-center justify-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="py-1.5 px-2.5 rounded bg-red-950/60 hover:bg-red-900 text-red-200 text-[11px] font-bold transition-colors inline-flex items-center justify-center gap-1"
              title="Lock Admin Portal"
            >
              <LogOut className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0d1624] overflow-y-auto">
        {/* Top Header Bar */}
        <header className="p-4 sm:p-6 border-b border-slate-800 bg-brand-navy/90 sticky top-0 z-20 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Owner Command Center</span>
              <ChevronRight className="w-3 h-3 text-brand-copper" />
              <span className="text-brand-copper font-bold uppercase tracking-wider">
                {activeTab === 'designated-pages' ? 'All Designated Pages Directory' : activeTab}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight capitalize">
              {activeTab === 'overview' && 'Executive Lead & Operations Dashboard'}
              {activeTab === 'estimates' && 'Roofing Estimate Requests & Triage'}
              {activeTab === 'appointments' && 'Booked 21-Point Inspections'}
              {activeTab === 'callbacks' && 'Urgent Customer Callbacks'}
              {activeTab === 'contacts' && 'General Inquiries & Messages'}
              {activeTab === 'reviews' && 'Customer Reviews & Feedback Moderation'}
              {activeTab === 'designated-pages' && 'All 18 Designated Pages & Site Map'}
              {activeTab === 'projects' && 'Architectural Projects Portfolio'}
              {activeTab === 'settings' && 'Company Settings & Dispatch Config'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'designated-pages'
                    ? 'Search all 18 pages...'
                    : 'Search leads & records...'
                }
                className="pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none focus:border-brand-copper w-48 sm:w-60"
              />
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={() => fetchAdminData(passcode)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-copper' : ''}`} />
            </button>

            {/* Export CSV for data tabs */}
            {['estimates', 'appointments', 'callbacks', 'contacts', 'reviews'].includes(activeTab) && (
              <button
                type="button"
                onClick={() => exportToCSV(activeTab as any)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}

            {/* Direct Link to Public Site */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </a>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 4 Core KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 rounded-2xl bg-brand-navy border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Total Inquiries
                    </span>
                    <FileText className="w-4 h-4 text-brand-copper" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-white font-mono">
                    {totalLeadsCount}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    All Forms & Triage
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-brand-navy border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Pipeline Estimation
                    </span>
                    <Layers className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-emerald-400 font-mono">
                    ${(estimatedPipeline / 1000).toFixed(0)}k+
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                    ~${(11500).toLocaleString()}/Job Estimated Avg
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-brand-navy border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Inspections Booked
                    </span>
                    <Calendar className="w-4 h-4 text-brand-copper" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-white font-mono">
                    {data.appointments?.length || 0}
                  </div>
                  <span className="text-[11px] text-brand-copper font-semibold mt-1 block">
                    21-Point Drone Scans
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-brand-navy border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Customer Rating
                    </span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="mt-2 text-3xl font-black text-amber-400 font-mono flex items-center gap-1.5">
                    <span>{data.stats.averageRating}</span>
                    <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                    {data.reviews?.length || 0} Verified Testimonials
                  </span>
                </div>
              </div>

              {/* Quick Jump to Designated Pages Hub Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-slate via-brand-navy to-brand-slate border border-brand-copper/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-copper/20 text-brand-copper text-[10px] font-bold uppercase tracking-wider border border-brand-copper/30">
                    Full Website Management
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Explore & Audit All 18 Designated Pages
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Preview all 8 specific roofing services, lead calculators, 21-point drone scheduling, projects portfolio, and legal compliance pages directly inside your owner portal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('designated-pages')}
                  className="px-5 py-3 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Designated Pages Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Operations Breakdown: Estimates, Inspections, Callbacks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Estimates Preview */}
                <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-copper" />
                      Recent Estimates
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('estimates')}
                      className="text-xs text-brand-copper hover:underline font-semibold"
                    >
                      View All ({data.estimates?.length || 0})
                    </button>
                  </div>
                  {(!data.estimates || data.estimates.length === 0) ? (
                    <p className="text-xs text-slate-400 italic py-4">No estimate proposals submitted yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.estimates.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{item.fullName}</span>
                            <span className="font-mono text-[10px] text-brand-copper">{item.id}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 capitalize">{item.requiredService?.replace('-', ' ')} • {item.propertyType?.replace('-', ' ')}</p>
                          <p className="text-[11px] text-slate-400 truncate">{item.propertyAddress}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Inspections Preview */}
                <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      Inspection Bookings
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs text-brand-copper hover:underline font-semibold"
                    >
                      View All ({data.appointments?.length || 0})
                    </button>
                  </div>
                  {(!data.appointments || data.appointments.length === 0) ? (
                    <p className="text-xs text-slate-400 italic py-4">No inspection appointments logged yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.appointments.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{item.fullName}</span>
                            <span className="font-mono text-[10px] text-emerald-400">{item.preferredDate}</span>
                          </div>
                          <p className="text-[11px] text-slate-400">{item.preferredTimeSlot}</p>
                          <p className="text-[11px] text-slate-400 truncate">{item.propertyAddress}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Urgent Callbacks Preview */}
                <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-red-400" />
                      Priority Callbacks
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('callbacks')}
                      className="text-xs text-brand-copper hover:underline font-semibold"
                    >
                      View All ({data.callbacks?.length || 0})
                    </button>
                  </div>
                  {(!data.callbacks || data.callbacks.length === 0) ? (
                    <p className="text-xs text-slate-400 italic py-4">No urgent callback requests pending.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.callbacks.slice(0, 3).map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{item.fullName}</span>
                            <a href={`tel:${item.phone}`} className="text-brand-copper font-mono text-[11px] hover:underline font-bold">
                              {item.phone}
                            </a>
                          </div>
                          <p className="text-[11px] text-red-300 font-medium">{item.issueType}</p>
                          <p className="text-[10px] text-slate-400">Pref: {item.preferredTime}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALL DESIGNATED PAGES DIRECTORY */}
          {activeTab === 'designated-pages' && (
            <div className="space-y-6">
              {/* Filter pills & Counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-navy p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 flex-wrap">
                  {['All', 'Core', 'Services', 'Lead Tools', 'Portfolio & Content', 'Legal'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setPageCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                        pageCategoryFilter === cat
                          ? 'bg-brand-copper text-white shadow-sm'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {cat} {cat === 'All' ? `(${DESIGNATED_PAGES.length})` : `(${DESIGNATED_PAGES.filter(p => p.category === cat).length})`}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-slate-400 font-mono">
                  Showing {filteredPages.length} of {DESIGNATED_PAGES.length} designated pages
                </span>
              </div>

              {/* Grid of All 18 Designated Pages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className="p-6 rounded-2xl bg-brand-navy border border-slate-800 hover:border-brand-copper/60 transition-all shadow-md flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] uppercase font-bold border border-slate-700">
                          {page.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Live & Active
                        </span>
                      </div>

                      {/* Title & Route */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-brand-copper/15 flex items-center justify-center shrink-0">
                          {renderPageIcon(page.iconName)}
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-brand-copper transition-colors">
                          {page.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-brand-copper mt-1 mb-3">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{page.route}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {page.description}
                      </p>

                      {/* Key Features Chips */}
                      <div className="space-y-2 mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                          Key Features Included:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {page.keyFeatures.map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setPagePreviewModal({ isOpen: true, page, device: 'desktop' })}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                        title="Preview inside Admin Modal"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-copper" />
                        <span>Live Preview</span>
                      </button>

                      <a
                        href={page.route}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <span>Open Live</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ESTIMATES */}
          {activeTab === 'estimates' && (
            <div className="bg-brand-navy rounded-2xl border border-slate-800 shadow-md overflow-hidden">
              {filteredEstimates.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No estimate submissions found matching search. Inquiries from `/request-estimate` appear here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] tracking-widest border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Service & Property</th>
                        <th className="py-3 px-4">Property Address</th>
                        <th className="py-3 px-4">Damage Photos</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {filteredEstimates.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-brand-copper">{item.id}</td>
                          <td className="py-3.5 px-4 font-bold text-white">{item.fullName}</td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="flex items-center gap-1.5 font-semibold">
                              <Phone className="w-3 h-3 text-brand-copper" />
                              <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Mail className="w-3 h-3 text-brand-copper" />
                              <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-white block capitalize">{item.requiredService?.replace('-', ' ')}</span>
                            <span className="text-[11px] text-slate-400 capitalize">{item.propertyType?.replace('-', ' ')}</span>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">{item.propertyAddress}</td>
                          <td className="py-3.5 px-4">
                            {item.photos && item.photos.length > 0 ? (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {item.photos.map((p: any, pIdx: number) => {
                                  const photoUrl = typeof p === 'string' ? p : p.data;
                                  return (
                                    <img
                                      key={pIdx}
                                      src={photoUrl}
                                      alt="Damage thumbnail"
                                      onClick={() => setPhotoPreview({ isOpen: true, url: photoUrl, title: `${item.fullName} - Photo #${pIdx+1}` })}
                                      className="w-9 h-9 object-cover rounded border border-slate-700 cursor-pointer hover:scale-110 transition-transform shadow-sm"
                                      title="Click to view full image"
                                    />
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-500 italic">No attachments</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={item.status || 'new'}
                              onChange={(e) => handleStatusChange('estimate', item.id, e.target.value)}
                              className="text-xs font-semibold rounded px-2.5 py-1 border border-slate-700 bg-slate-900 text-white"
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="scheduled">🟢 Inspection Scheduled</option>
                              <option value="completed">🟣 Job Completed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete('estimate', item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="bg-brand-navy rounded-2xl border border-slate-800 shadow-md overflow-hidden">
              {filteredAppointments.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No inspection appointments booked yet. Submissions from `/book-inspection` appear here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] tracking-widest border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Appt ID</th>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Target Date & Slot</th>
                        <th className="py-3 px-4">Inspection Scope</th>
                        <th className="py-3 px-4">Address</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {filteredAppointments.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-brand-copper">{item.id}</td>
                          <td className="py-3.5 px-4 font-bold text-white">{item.fullName}</td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="font-semibold">{item.phone}</div>
                            <div className="text-slate-400">{item.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-white block">{item.preferredDate}</span>
                            <span className="text-[11px] text-slate-400">{item.preferredTimeSlot}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-200 block">{item.inspectionType}</span>
                            {item.includeDroneScan && (
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-brand-copper/20 text-brand-copper font-bold text-[10px]">
                                + 4K Drone Scan
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">{item.propertyAddress}</td>
                          <td className="py-3.5 px-4">
                            <select
                              value={item.status || 'new'}
                              onChange={(e) => handleStatusChange('appointment', item.id, e.target.value)}
                              className="text-xs font-semibold rounded px-2.5 py-1 border border-slate-700 bg-slate-900 text-white"
                            >
                              <option value="new">🟡 Pending Dispatch</option>
                              <option value="contacted">🔵 Time Confirmed</option>
                              <option value="scheduled">🟢 In Progress</option>
                              <option value="completed">🟣 Report Delivered</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete('appointment', item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CALLBACKS */}
          {activeTab === 'callbacks' && (
            <div className="bg-brand-navy rounded-2xl border border-slate-800 shadow-md overflow-hidden">
              {filteredCallbacks.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No urgent callback requests found. Inquiries submitted via the callback modal appear here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] tracking-widest border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Callback ID</th>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">Requested Window</th>
                        <th className="py-3 px-4">Primary Issue</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {filteredCallbacks.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-brand-copper">{item.id}</td>
                          <td className="py-3.5 px-4 font-bold text-white">{item.fullName}</td>
                          <td className="py-3.5 px-4 font-bold text-white">
                            <a href={`tel:${item.phone}`} className="text-brand-copper hover:underline font-mono">{item.phone}</a>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-300">{item.preferredTime}</td>
                          <td className="py-3.5 px-4 text-red-300 font-medium">{item.issueType}</td>
                          <td className="py-3.5 px-4 text-slate-400">{item.propertyAddress || 'Not specified'}</td>
                          <td className="py-3.5 px-4">
                            <select
                              value={item.status || 'new'}
                              onChange={(e) => handleStatusChange('callback', item.id, e.target.value)}
                              className="text-xs font-semibold rounded px-2.5 py-1 border border-slate-700 bg-slate-900 text-white"
                            >
                              <option value="new">🟡 Urgent / Uncalled</option>
                              <option value="contacted">🔵 Reached</option>
                              <option value="scheduled">🟢 Estimate Slated</option>
                              <option value="completed">🟣 Closed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete('callback', item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="bg-brand-navy rounded-2xl border border-slate-800 shadow-md overflow-hidden">
              {filteredContacts.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No contact inquiries recorded yet. Submissions from `/contact` appear here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] tracking-widest border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Ref ID</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Message Details</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      {filteredContacts.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-brand-copper">{c.id}</td>
                          <td className="py-3.5 px-4 font-bold text-white">{c.fullName}</td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="font-semibold text-slate-200">{c.phone}</div>
                            <div className="text-slate-400">{c.email}</div>
                          </td>
                          <td className="py-3.5 px-4 capitalize font-semibold text-slate-300">{c.serviceRequested?.replace('-', ' ')}</td>
                          <td className="py-3.5 px-4 max-w-sm text-slate-300 truncate">{c.inquiryDetails}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete('contact', c.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.length === 0 ? (
                  <div className="col-span-full p-12 text-center text-slate-400 bg-brand-navy rounded-2xl border border-slate-800">
                    No customer reviews submitted yet. Reviews submitted via the public site appear here for moderation.
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div key={rev.id} className="bg-brand-navy p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-4 h-4 ${star <= rev.rating ? 'fill-amber-400' : 'text-slate-700'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                            Approved & Live
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-white">{rev.authorName}</h4>
                        <span className="text-[11px] text-brand-copper font-semibold block mt-0.5">{rev.serviceType}</span>
                        <p className="mt-3 text-xs text-slate-300 italic leading-relaxed">"{rev.reviewText}"</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                        <span>{new Date(rev.submittedAt).toLocaleDateString()}</span>
                        <button
                          type="button"
                          onClick={() => handleDelete('review', rev.id)}
                          className="text-slate-400 hover:text-red-400 p-1"
                          title="Remove review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 8: PROJECTS PORTFOLIO */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="p-4 bg-brand-navy rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>Managing 6 Active Architectural Roofing Case Studies</span>
                <a href="/projects" target="_blank" rel="noreferrer" className="text-brand-copper hover:underline font-semibold flex items-center gap-1">
                  <span>View Public Projects Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((proj) => (
                  <div key={proj.id} className="rounded-2xl bg-brand-navy border border-slate-800 overflow-hidden shadow-md flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-white font-mono text-[10px] uppercase font-bold border border-slate-700">
                          {proj.categoryLabel}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-sm text-white">{proj.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                        <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                          <div><span className="font-semibold text-slate-300">Roof System:</span> {proj.roofSystem}</div>
                          <div><span className="font-semibold text-slate-300">Timeline:</span> {proj.completionTimeline}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div className="p-6 rounded-2xl bg-brand-navy border border-slate-800 space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-copper" />
                  Business & Dispatch Configuration
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Company Display Name</label>
                    <input
                      type="text"
                      disabled
                      value={siteConfig.companyName}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Inquiry Phone Line</label>
                    <input
                      type="text"
                      disabled
                      value={siteConfig.contact.phonePlaceholder}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Office Location</label>
                    <input
                      type="text"
                      disabled
                      value={siteConfig.contact.addressLine1}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-copper" />
                      <span>Operating Hours</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={siteConfig.contact.businessHoursWeekday}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                  <span className="font-bold text-slate-200 block">Instant Email Notifications</span>
                  <p className="text-slate-400 leading-relaxed">
                    Customer inquiries and reviews are permanently recorded to <code className="text-brand-copper font-mono">server/data/leads.json</code>. Direct SMTP / Nodemailer email forwarding can be pointed to any destination email in <code className="text-brand-copper font-mono">server/.env</code>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODAL 1: DAMAGE PHOTO VIEWER */}
      {photoPreview && photoPreview.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="font-bold text-sm text-slate-200 truncate">{photoPreview.title}</span>
              <button
                type="button"
                onClick={() => setPhotoPreview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={photoPreview.url}
                alt={photoPreview.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LIVE PAGE PREVIEW INSIDE ADMIN */}
      {pagePreviewModal && pagePreviewModal.isOpen && pagePreviewModal.page && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
            {/* Top Preview Bar */}
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-white">
                  {pagePreviewModal.page.title}
                </span>
                <span className="text-xs font-mono text-brand-copper bg-brand-navy px-2 py-0.5 rounded border border-slate-800">
                  {pagePreviewModal.page.route}
                </span>
              </div>

              {/* Viewport Device Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPagePreviewModal(prev => ({ ...prev, device: 'desktop' }))}
                  className={`p-1.5 rounded ${pagePreviewModal.device === 'desktop' ? 'bg-brand-copper text-white' : 'text-slate-400 hover:text-white'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPagePreviewModal(prev => ({ ...prev, device: 'tablet' }))}
                  className={`p-1.5 rounded ${pagePreviewModal.device === 'tablet' ? 'bg-brand-copper text-white' : 'text-slate-400 hover:text-white'}`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPagePreviewModal(prev => ({ ...prev, device: 'mobile' }))}
                  className={`p-1.5 rounded ${pagePreviewModal.device === 'mobile' ? 'bg-brand-copper text-white' : 'text-slate-400 hover:text-white'}`}
                  title="Mobile View (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pagePreviewModal.page.route}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Open Full Window</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setPagePreviewModal({ isOpen: false, page: null, device: 'desktop' })}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* IFrame Viewport Stage */}
            <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-slate-800 ${
                  pagePreviewModal.device === 'mobile'
                    ? 'w-[375px]'
                    : pagePreviewModal.device === 'tablet'
                    ? 'w-[768px]'
                    : 'w-full'
                }`}
              >
                <iframe
                  src={pagePreviewModal.page.route}
                  title={pagePreviewModal.page.title}
                  className="w-full h-full bg-white border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
