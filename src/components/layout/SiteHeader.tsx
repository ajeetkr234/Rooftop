import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Menu,
  ArrowRight,
  Hammer,
  Wrench,
  CheckSquare,
  RefreshCw,
  Home,
  Building2,
  Camera,
  Droplets,
  Calculator,
  PhoneCall,
  Lock
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { MobileNavigation } from './MobileNavigation';

interface SiteHeaderProps {
  onOpenCallback?: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onOpenCallback: _onOpenCallback }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#101C2C] border-b border-slate-800 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 focus-visible:outline-brand-copper rounded py-1 shrink min-w-0 group"
          aria-label={`${siteConfig.companyName} Homepage`}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-brand-copper via-[#D97736] to-[#A34E1A] flex items-center justify-center text-white shadow-md border border-amber-500/20 group-hover:scale-105 group-hover:shadow-brand-copper/30 transition-all duration-300 shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <span className="block font-heading font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-white leading-none truncate">
              {siteConfig.companyName}
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-brand-copper mt-0.5 sm:mt-1 truncate">
              Architectural Roofing
            </span>
          </div>
        </Link>

        {/* Clean, Spacious Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm font-medium"
          aria-label="Main menu"
        >
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center gap-1.5 py-2 transition-colors duration-150 relative ${isActive || servicesDropdownOpen
                  ? 'text-brand-copper font-bold'
                  : 'text-slate-300 hover:text-white'
                }`
              }
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-brand-copper' : 'text-slate-400'}`} />
              {servicesDropdownOpen && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-copper rounded-full" />
              )}
            </NavLink>

            {/* Redesigned Architectural Mega-Menu Dropdown */}
            {servicesDropdownOpen && (
              <div
                className="absolute top-full -left-2 w-[820px] pt-3 z-50 animate-fadeIn"
                role="menu"
              >
                <div className="bg-[#0B1320]/98 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-5 text-white ring-1 ring-white/10">
                  {/* Top Status & Accreditation Bar */}
                  <div className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-copper animate-pulse" />
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-200">
                        Architectural Roofing Capabilities
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[10px] font-medium text-slate-400">
                      <span className="text-slate-300">Licensed & Bonded</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 inline" /> OSHA-10 Certified
                      </span>
                    </div>
                  </div>

                  {/* 3-Column Split: Core Services (4) | Systems & Diagnostics (4) | Spotlight Card (1) */}
                  <div className="grid grid-cols-12 gap-5">

                    {/* Left Column (4 Cols): Core Services */}
                    <div className="col-span-4 space-y-1.5">
                      <div className="px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-copper/90 border-b border-slate-800/80 flex items-center justify-between">
                        <span>Core Craftsmanship</span>
                        <span className="text-slate-500 font-mono text-[9px]">01 — 04</span>
                      </div>

                      {/* 1. Roof Installation */}
                      <Link
                        to="/services/roof-installation"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-brand-copper group-hover:text-white group-hover:border-brand-copper transition-all">
                          <Hammer className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-brand-copper-light transition-colors leading-snug">
                            Roof Installation
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">New architectural shingles & framing</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>

                      {/* 2. Roof Repair */}
                      <Link
                        to="/services/roof-repair"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 group-hover:bg-brand-copper group-hover:text-white group-hover:border-brand-copper transition-all">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-brand-copper-light transition-colors leading-snug">
                            Roof Repair
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">Flashing, valleys & leak remedies</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>

                      {/* 3. Roof Maintenance */}
                      <Link
                        to="/services/roof-maintenance"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all">
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors leading-snug">
                            Roof Maintenance
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">Annual 21-pt inspection & clearing</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>

                      {/* 4. Roof Replacement */}
                      <Link
                        to="/services/roof-replacement"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 transition-all">
                          <RefreshCw className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors leading-snug flex items-center gap-1.5">
                            <span>Roof Replacement</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Lifetime
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">Full clean tear-offs to CDX decking</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>
                    </div>

                    {/* Middle Column (4 Cols): Systems & Diagnostics */}
                    <div className="col-span-4 space-y-1.5">
                      <div className="px-2 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-copper/90 border-b border-slate-800/80 flex items-center justify-between">
                        <span>Systems & Diagnostics</span>
                        <span className="text-slate-500 font-mono text-[9px]">05 — 08</span>
                      </div>

                      {/* 5. Inspection & 4K Drone */}
                      <Link
                        to="/services/roof-inspection"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-sky-300 transition-colors leading-snug flex items-center gap-1.5">
                            <span>Inspection & Drone</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                              4K FAA
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">Forensic aerial diagnostic scans</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>

                      {/* 6. Emergency Leak Triage */}
                      <Link
                        to="/services/roof-leak-repair"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600 transition-all">
                          <Droplets className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-rose-300 transition-colors leading-snug flex items-center gap-1.5">
                            <span>Emergency Triage</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-rose-500/25 text-rose-300 border border-rose-500/30 animate-pulse">
                              Priority
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">Storm leak dispatch & heavy tarping</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>

                      {/* 7. Residential Systems */}
                      <Link
                        to="/services/residential-roofing"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                          <Home className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors leading-snug">
                            Residential Systems
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">HOA shingles, standing seam & tile</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>

                      {/* 8. Commercial Flat Roofing */}
                      <Link
                        to="/services/commercial-roofing"
                        className="flex items-start gap-3 p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700/60 transition-all duration-150 group"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors leading-snug flex items-center gap-1.5">
                            <span>Commercial Flat Roof</span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              TPO
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">EPDM, cool roofs & restorations</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-copper group-hover:translate-x-0.5 transition-all self-center opacity-0 group-hover:opacity-100" />
                      </Link>
                    </div>

                    {/* Right Spotlight Sidebar (4 Cols): Calculator & Emergency Card */}
                    <div className="col-span-4 bg-gradient-to-br from-[#131F33] via-[#0E1726] to-[#0A101A] border border-slate-700/80 rounded-xl p-3.5 flex flex-col justify-between shadow-inner relative overflow-hidden">
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-brand-copper/15 rounded-full blur-xl pointer-events-none" />

                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>Dispatch Active</span>
                        </div>

                        <div className="font-bold text-xs text-white mb-1">
                          Instant Roof Estimator
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          Estimate material & installation costs for architectural shingles, seam metal, or commercial TPO.
                        </p>

                        <Link
                          to="/request-estimate"
                          className="mt-3 flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold transition-all shadow-md group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <span className="flex items-center gap-1.5">
                            <Calculator className="w-3.5 h-3.5" />
                            <span>Launch Calculator</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      {/* Direct Emergency Dispatch */}
                      <div className="pt-3 mt-3 border-t border-slate-700/60">
                        <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                          Active Leak Emergency?
                        </span>
                        <a
                          href="tel:18005557663"
                          className="mt-1 flex items-center gap-1.5 font-bold text-xs text-rose-300 hover:text-white transition-colors"
                        >
                          <PhoneCall className="w-3 h-3 text-rose-400 shrink-0" />
                          <span>(800) 555-ROOF (24/7)</span>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Utility Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/90 flex items-center justify-between text-xs bg-slate-900/70 rounded-xl px-4 py-2.5">
                    <Link
                      to="/book-inspection"
                      className="text-brand-copper hover:text-brand-copper-hover font-bold flex items-center gap-2 transition-colors"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Book Forensic 21-Point Inspection</span>
                      <span className="text-[10px] font-normal text-slate-400 ml-1 hidden sm:inline">• Free On-Site Diagnostic</span>
                    </Link>

                    <Link
                      to="/services"
                      className="text-slate-300 hover:text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 transition-colors group"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <span>All 8 Services & Material Matrix</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-copper group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `py-2 transition-colors duration-150 relative ${isActive
                ? 'text-brand-copper font-bold'
                : 'text-slate-300 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Projects</span>
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-copper rounded-full" />}
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `py-2 transition-colors duration-150 relative ${isActive
                ? 'text-brand-copper font-bold'
                : 'text-slate-300 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>About</span>
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-copper rounded-full" />}
              </>
            )}
          </NavLink>

          <NavLink
            to="/service-areas"
            className={({ isActive }) =>
              `py-2 transition-colors duration-150 relative ${isActive
                ? 'text-brand-copper font-bold'
                : 'text-slate-300 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Service Areas</span>
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-copper rounded-full" />}
              </>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `py-2 transition-colors duration-150 relative ${isActive
                ? 'text-brand-copper font-bold'
                : 'text-slate-300 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Contact</span>
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-copper rounded-full" />}
              </>
            )}
          </NavLink>
        </nav>

        {/* Clean, High-Impact Right CTA Button & Owner Portal */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <Link
            to="/admin"
            className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Contractor Owner Command Portal"
          >
            <Lock className="w-3.5 h-3.5 text-brand-copper" />
            <span className="hidden 2xl:inline text-[11px] font-mono">Owner Portal</span>
          </Link>

          <Link
            to="/request-estimate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-copper to-[#B3581E] hover:from-brand-copper-hover hover:to-[#9E4A15] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-brand-copper/30 active:translate-y-0.5 whitespace-nowrap"
          >
            <span>Request an Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile & Tablet Trigger (< 1280px) */}
        <div className="flex xl:hidden items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            to="/request-estimate"
            className="hidden sm:inline-flex px-3 sm:px-3.5 py-1.5 rounded-md bg-brand-copper hover:bg-brand-copper-hover text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap"
          >
            Estimate
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 focus-visible:outline-brand-copper shrink-0"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Accessible Mobile Nav Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
