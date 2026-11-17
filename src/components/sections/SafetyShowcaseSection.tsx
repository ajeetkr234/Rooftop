import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  HardHat, 
  CheckCircle2, 
  Sparkles,
  Maximize2,
  ArrowRight,
  Camera,
  Shield,
  FileCheck
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export interface SafetyProtocolItem {
  id: string;
  tabTitle: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  description: string;
  keyPractices: {
    heading: string;
    detail: string;
  }[];
  equipmentSpec: string;
}

export const SAFETY_PROTOCOLS: SafetyProtocolItem[] = [
  {
    id: "safe-1",
    tabTitle: "Fall Arrest & Anchors",
    title: "100% Fall Arrest & Certified Ridge Anchoring",
    category: "Height Safety",
    badge: "OSHA 1926.502",
    image: "/images/safety/worker-harness.jpg",
    description: "Every technician working above 6 feet is permanently secured using OSHA-compliant full-body harnesses, shock-absorbing lanyards, and certified structural ridge anchors.",
    keyPractices: [
      {
        heading: "5,000-lb Tensile Ridge Anchors",
        detail: "Mechanically fastened directly into structural roof framing, never superficial decking."
      },
      {
        heading: "Shock-Absorbing SRL Lifelines",
        detail: "Self-retracting lifelines minimize free-fall distance to under 2 feet with zero line drag."
      },
      {
        heading: "Daily Pre-Climb Inspections",
        detail: "Mandatory morning audits of all webbing, carabiners, and D-rings prior to ladder ascent."
      }
    ],
    equipmentSpec: "Class A / ANSI Z359.11 Full-Body Harnesses"
  },
  {
    id: "safe-2",
    tabTitle: "Complete PPE Uniform",
    title: "Complete Personal Protective Equipment (PPE) Uniform",
    category: "Crew Standards",
    badge: "ANSI Compliant PPE",
    image: "/images/safety/worker-metal-crew.jpg",
    description: "Our crews maintain a strict professional uniform standard with high-visibility reflective vests, OSHA-approved hard hats, impact-resistant eye protection, and specialized roof-grip safety boots.",
    keyPractices: [
      {
        heading: "High-Visibility Class 2 Workwear",
        detail: "Fluorescent vests with reflective silver banding ensure maximum crew visibility across jobsite perimeters."
      },
      {
        heading: "UV400 Ballistic Eye Protection",
        detail: "Polycarbonate safety glasses protect against flying coil-nail fragments, dust, and optical glare."
      },
      {
        heading: "Traction-Engineered Roofing Boots",
        detail: "Soft-compound rubber outsoles deliver maximum friction on steep 8/12+ pitches without scuffing shingles."
      }
    ],
    equipmentSpec: "ANSI Z89.1 Hard Hats & ANSI Z87.1+ Eye Protection"
  },
  {
    id: "safe-3",
    tabTitle: "Quality Supervision",
    title: "Dedicated Quality & Safety Supervision",
    category: "Site Management",
    badge: "OSHA-30 Lead Officer",
    image: "/images/safety/worker-supervisor-inspection.jpg",
    description: "A designated OSHA-trained safety lead conducts morning hazard assessments, checks weather windows, monitors steep-slope tie-offs, and documents digital quality checklists on every phase.",
    keyPractices: [
      {
        heading: "Morning Toolbox Safety Briefings",
        detail: "Daily pre-shift alignment covering slope angles, wind gusts, tie-off points, and power lines."
      },
      {
        heading: "Deck Integrity & Moisture Audits",
        detail: "Laser and probe verification of sub-decking soundness before any underlayment is fastened."
      },
      {
        heading: "Continuous Photographic Quality Control",
        detail: "Step-by-step digital photo logs of valley metal, ice shields, and flashing before shingles cover them."
      }
    ],
    equipmentSpec: "OSHA 30-Hour Certified Field Supervisors"
  },
  {
    id: "safe-4",
    tabTitle: "Property & Lawn Shield",
    title: "Ground-Level Landscape & Property Protection",
    category: "Homeowner Shield",
    badge: "Zero-Debris Protocol",
    image: "/images/safety/worker-ground-safety.jpg",
    description: "Your home's siding, windows, AC units, and prized landscaping are shielded by heavy-duty reinforced tarps. Continuous magnetic sweeping guarantees zero dropped nails left on your lawn or driveway.",
    keyPractices: [
      {
        heading: "Perimeter Catch-Netting & Tarping",
        detail: "Heavy canvas shields delicate flowerbeds, shrubbery, and exterior AC condenser fins from tear-off debris."
      },
      {
        heading: "Dual-Pass Industrial Magnetic Sweeping",
        detail: "High-strength magnetic sweepers comb grass, mulch, and driveways 4 times daily to eliminate errant nails."
      },
      {
        heading: "Daily Clean Yard Sign-Off",
        detail: "Zero overnight dumpsters blocking garage access without prior written homeowner consent."
      }
    ],
    equipmentSpec: "Industrial Magnetic Rakes & Siding Netting"
  }
];

export const SafetyShowcaseSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<SafetyProtocolItem>(SAFETY_PROTOCOLS[0]);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#090F1A] text-white relative overflow-hidden" id="safety">
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-copper animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-brand-copper" />
            <span>Jobsite Protocol & Safety Standards</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            How Our Crews Work: Certified Safety & Professional Equipment
          </h2>
          
          <p className="mt-3.5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            We hold our installation teams to uncompromising safety and craftsmanship standards. From 100% OSHA fall-arrest compliance to meticulous property shielding, we protect our workers and your home at every stage.
          </p>
        </div>

        {/* 4 Interactive Segmented Horizontal Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {SAFETY_PROTOCOLS.map((protocol, idx) => {
            const isActive = activeItem.id === protocol.id;
            return (
              <button
                key={protocol.id}
                type="button"
                onClick={() => setActiveItem(protocol)}
                className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-b from-[#182337] to-[#101928] border-brand-copper shadow-xl ring-1 ring-brand-copper/50'
                    : 'bg-[#0E1626]/80 border-slate-800/80 hover:bg-[#141E30] hover:border-slate-700 text-slate-300'
                }`}
              >
                {/* Active Top Highlight Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-copper via-amber-500 to-brand-copper" />
                )}

                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                    isActive 
                      ? 'bg-brand-copper text-white shadow-md' 
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    0{idx + 1}
                  </span>
                  
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isActive 
                      ? 'bg-brand-copper/20 text-brand-copper border border-brand-copper/30' 
                      : 'bg-slate-800/80 text-slate-400'
                  }`}>
                    {protocol.badge}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    {protocol.category}
                  </span>
                  <span className={`block font-bold text-sm sm:text-base leading-snug transition-colors ${
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {protocol.tabTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Unified 2-Column Showcase Stage */}
        <div className="bg-[#0D1524] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Side: High-Resolution Photographic Evidence (6 Cols) */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] bg-slate-950 overflow-hidden group">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1524] via-transparent to-black/30 opacity-70" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-slate-700 text-white font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-brand-copper" />
                  <span>{activeItem.badge}</span>
                </span>
                
                <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified On-Site Crew</span>
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-16 z-10 hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-800">
                <Camera className="w-3.5 h-3.5 text-brand-copper shrink-0" />
                <span className="truncate">Active jobsite photographic safety documentation</span>
              </div>

              {/* Lightbox / Zoom Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-all backdrop-blur-md shadow-lg z-10 group"
                title="Expand full photo"
                aria-label="View large photo"
              >
                <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform text-brand-copper" />
              </button>
            </div>

            {/* Right Side: Detailed Protocol Specs & Practices (6 Cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-copper mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Standard Operating Protocol</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-3">
                  {activeItem.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {activeItem.description}
                </p>

                {/* 3 Structured Practice Cards */}
                <div className="space-y-3">
                  {activeItem.keyPractices.map((practice, i) => (
                    <div 
                      key={i} 
                      className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3 hover:border-slate-600 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs sm:text-sm text-white leading-snug">
                          {practice.heading}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {practice.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Spec & Action CTA Footer */}
              <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FileCheck className="w-4 h-4 text-brand-copper shrink-0" />
                  <span>
                    <strong className="text-slate-200">Specification:</strong> {activeItem.equipmentSpec}
                  </span>
                </div>
                
                <Link
                  to="/request-estimate"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-brand-copper/30 shrink-0"
                >
                  <span>Schedule Safe Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Trust & Comprehensive Liability Guarantee Card */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#101A29] via-[#16253C] to-[#101A29] border border-slate-700/80 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-copper/10 border border-brand-copper/20 flex items-center justify-center text-brand-copper shrink-0 shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  $2,000,000+ Comprehensive General Liability & Full Workers' Compensation
                </h4>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  100% Insured
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {siteConfig.companyName} carries multi-million dollar liability protection and active workers' comp for every technician on your roof. You are 100% protected against any on-site accident or property damage claim.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-700/60">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-200">
              100% Tie-Off
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-200">
              Zero Dropped Nails
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-200">
              OSHA-30 Lead Officers
            </span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-slate-700"
            />
            <div className="mt-4 text-center">
              <h4 className="text-white font-bold text-lg">{activeItem.title}</h4>
              <p className="text-slate-300 text-xs mt-1">{activeItem.equipmentSpec}</p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 sm:-top-10 sm:-right-10 text-white hover:text-brand-copper text-sm font-bold bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
