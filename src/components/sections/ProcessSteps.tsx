import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Search, 
  FileSpreadsheet, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Award
} from 'lucide-react';

interface WorkflowStep {
  step: string;
  phaseLabel: string;
  timeframe: string;
  title: string;
  shortDescription: string;
  icon: React.ElementType;
  deliverables: string[];
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    phaseLabel: "Initial Intake",
    timeframe: "Response in < 2 Hours",
    title: "Tell Us About Your Roof",
    shortDescription: "Submit your property address and observed concerns online, or call our dispatch desk directly.",
    icon: ClipboardCheck,
    deliverables: [
      "Dedicated roofing specialist assigned",
      "Satellite pitch & footprint pre-scan",
      "Zero-obligation initial consultation"
    ]
  },
  {
    step: "02",
    phaseLabel: "Forensic Audit",
    timeframe: "Scheduled in 24–48 Hours",
    title: "Arrange an On-Site Inspection",
    shortDescription: "A certified technician audits your shingles, flashing seals, valley intersections, and attic moisture.",
    icon: Search,
    deliverables: [
      "Itemized 21-point diagnostic report",
      "High-res forensic photo documentation",
      "Optional 4K aerial drone scan for steep pitches"
    ]
  },
  {
    step: "03",
    phaseLabel: "Scope & Pricing",
    timeframe: "Delivered Within 24 Hours",
    title: "Receive a Detailed Estimate",
    shortDescription: "Review a transparent, guaranteed line-item proposal with material tiers and financing options.",
    icon: FileSpreadsheet,
    deliverables: [
      "100% itemized fixed-price proposal",
      "Good / Better / Best material comparisons",
      "Manufacturer warranty tier specifications"
    ]
  },
  {
    step: "04",
    phaseLabel: "Build & Warranty",
    timeframe: "1–3 Days Execution",
    title: "Approve Scope & Schedule",
    shortDescription: "Materials are staged, certified crews execute the tear-off and install, followed by magnetic yard sweep.",
    icon: ShieldCheck,
    deliverables: [
      "100% OSHA fall-arrest safety protocols",
      "4-pass industrial magnetic nail sweep",
      "10-year contractor workmanship guarantee"
    ]
  }
];

export const ProcessSteps: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-[#090F1A] text-white relative overflow-hidden" id="process">
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-copper animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-brand-copper" />
            <span>Step-By-Step Contractor Workflow</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Roofing Process From Start to Finish
          </h2>

          <p className="mt-3.5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A straightforward, transparent path from your initial inquiry to completed roofing work, backed by itemized pricing, daily safety protocols, and lifetime warranty activation.
          </p>
        </div>

        {/* 4 Connected Step Cards with Responsive Progress Track */}
        <div className="relative">
          {/* Desktop Connecting Glowing Track */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-brand-copper/20 via-brand-copper/60 to-brand-copper/20 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
            {WORKFLOW_STEPS.map((stepItem) => {
              const Icon = stepItem.icon;
              return (
                <div 
                  key={stepItem.step}
                  className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#101A2A] to-[#0A121E] border border-slate-700/80 hover:border-brand-copper/70 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-brand-copper/10 hover:-translate-y-1.5 group"
                >
                  {/* Top Bar: Number Badge + Phase Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700 text-brand-copper flex items-center justify-center font-heading font-black text-lg group-hover:bg-brand-copper group-hover:text-white group-hover:border-brand-copper transition-all duration-300 shadow-md">
                        {stepItem.step}
                      </div>

                      <div className="text-right">
                        <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-brand-copper px-2 py-0.5 rounded bg-brand-copper/10 border border-brand-copper/20">
                          {stepItem.phaseLabel}
                        </span>
                      </div>
                    </div>

                    {/* Step Icon & Timeframe */}
                    <div className="flex items-center gap-2 mb-3 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-brand-copper/80 shrink-0" />
                      <span>{stepItem.timeframe}</span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-copper-light transition-colors leading-snug mb-2.5">
                      {stepItem.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {stepItem.shortDescription}
                    </p>

                    {/* Deliverable Checklist */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-2">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Key Milestones & Deliverables:
                      </span>
                      {stepItem.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Bottom Icon Watermark */}
                  <div className="mt-6 pt-3 flex items-center justify-between text-slate-500 group-hover:text-brand-copper/60 transition-colors">
                    <Icon className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1">
                      <span>Phase {stepItem.step}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Workflow Reassurance & Action Bar */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#101928] via-[#142339] to-[#101928] border border-slate-700/80 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-copper/15 border border-brand-copper/30 flex items-center justify-center text-brand-copper shrink-0 hidden sm:flex">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                Guaranteed Fixed-Price Estimates with Zero Hidden Scope Changes
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Every project milestone is documented in writing before crew staging begins.
              </p>
            </div>
          </div>

          <Link
            to="/request-estimate"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-brand-copper/30 active:translate-y-0.5 shrink-0 whitespace-nowrap"
          >
            <span>Start Step 1: Free Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
