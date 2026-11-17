import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { X, Phone, ChevronRight, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { setBodyScrollLocked } from '../../utils';
import { Button } from '../ui/Buttons';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close when path changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Handle escape key & body scroll lock
  useEffect(() => {
    if (isOpen) {
      setBodyScrollLocked(true);
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        setBodyScrollLocked(false);
      };
    } else {
      setBodyScrollLocked(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 xl:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div 
        ref={menuRef}
        className="relative ml-auto w-full max-w-sm bg-brand-slate text-white shadow-2xl flex flex-col h-full z-10 overflow-y-auto"
      >
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-copper" />
            <span className="font-heading font-extrabold text-sm tracking-wide text-white">
              {siteConfig.companyName}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-md hover:bg-slate-700 focus-visible:outline-brand-copper"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-5 border-b border-slate-700 bg-brand-navy">
          <Button
            to="/request-estimate"
            variant="primary"
            size="md"
            className="w-full flex items-center justify-center gap-2"
            onClick={onClose}
          >
            <span>Request an Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="mt-3 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-brand-copper" />
            <span>{siteConfig.contact.phonePlaceholder}</span>
          </a>
        </div>

        {/* Links */}
        <nav className="p-5 space-y-1 flex-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
            Navigation
          </div>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded text-sm font-semibold transition-colors ${
                isActive ? 'bg-brand-copper text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </NavLink>

          <div className="pt-2 pb-1">
            <span className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Roofing Services
            </span>
          </div>

          <NavLink
            to="/services"
            end
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Overview & All Services</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/roof-installation"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Roof Installation</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/roof-repair"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Roof Repair</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/roof-maintenance"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Roof Maintenance</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/roof-replacement"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Roof Replacement</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/roof-inspection"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Inspection & Drone Scan</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/roof-leak-repair"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-red-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span className="text-red-400 font-semibold">🚨 Emergency Leak Repair</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/residential-roofing"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Residential Roofing</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/services/commercial-roofing"
            className={({ isActive }) =>
              `flex items-center justify-between pl-6 pr-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'text-brand-copper bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`
            }
          >
            <span>Commercial Flat Roofing</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </NavLink>

          <NavLink
            to="/book-inspection"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 my-2 rounded text-sm font-bold bg-brand-copper/20 text-brand-copper border border-brand-copper/30 ${
                isActive ? 'bg-brand-copper text-white' : ''
              }`
            }
          >
            <span>Book 21-Point Inspection</span>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </NavLink>

          <div className="pt-3 pb-1">
            <span className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Company & Work
            </span>
          </div>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-copper text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <span>Projects & Gallery</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-copper text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <span>About Us</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </NavLink>

          <NavLink
            to="/service-areas"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-copper text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <span>Service Areas</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </NavLink>

          <a
            href="/#reviews"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <span>Customer Reviews</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </a>

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-copper text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <span>Roofing Resources</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-copper text-white' : 'text-slate-200 hover:bg-slate-800'
              }`
            }
          >
            <span>Contact & Inquiries</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </NavLink>

          <NavLink
            to="/admin"
            className="flex items-center justify-between px-3 py-2.5 mt-2 rounded text-sm font-bold bg-slate-900 border border-slate-700 text-brand-copper hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Owner & Admin Portal</span>
            </span>
            <ChevronRight className="w-4 h-4 opacity-75" />
          </NavLink>
        </nav>

        {/* Footer info */}
        <div className="p-5 border-t border-slate-700 text-xs text-slate-400">
          <p>{siteConfig.contact.businessHoursWeekday}</p>
        </div>
      </div>
    </div>
  );
};

