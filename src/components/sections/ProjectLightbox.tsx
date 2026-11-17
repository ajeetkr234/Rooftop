import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Tag, Clock, Layers, AlertCircle } from 'lucide-react';
import { RoofingProject } from '../../types';
import { setBodyScrollLocked } from '../../utils';
import { ResponsiveImage } from '../ui/ResponsiveImage';

interface ProjectLightboxProps {
  project: RoofingProject | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      setBodyScrollLocked(true);
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowLeft' && hasPrev) {
          onPrev();
        } else if (e.key === 'ArrowRight' && hasNext) {
          onNext();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        setBodyScrollLocked(false);
        previouslyFocusedElementRef.current?.focus();
      };
    }
  }, [project, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Project details for ${project.title}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-navy/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-4xl bg-brand-slate rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-brand-navy/90 text-white">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold tracking-wider uppercase bg-brand-copper text-white">
              {project.categoryLabel}
            </span>
            {project.isDemonstrationWork && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                <AlertCircle className="w-3 h-3" />
                Sample Demonstration Work
              </span>
            )}
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-brand-copper transition-colors"
            aria-label="Close project lightbox (Escape)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 text-white">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-slate-700 bg-black/40">
            <ResponsiveImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              priority
            />

            {/* Previous & Next overlay buttons */}
            {hasPrev && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-navy/80 hover:bg-brand-navy text-white backdrop-blur shadow-md border border-slate-700 transition-colors focus-visible:outline-brand-copper"
                aria-label="Previous project (Left arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {hasNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-brand-navy/80 hover:bg-brand-navy text-white backdrop-blur shadow-md border border-slate-700 transition-colors focus-visible:outline-brand-copper"
                aria-label="Next project (Right arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700 text-xs">
            <div className="flex items-start gap-2.5">
              <Tag className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
              <div>
                <span className="block text-slate-400 font-semibold uppercase tracking-wider">Service Scope</span>
                <span className="text-slate-200 mt-0.5 block">{project.servicePerformed}</span>
              </div>
            </div>

            {project.roofSystem && (
              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider">Roofing System</span>
                  <span className="text-slate-200 mt-0.5 block">{project.roofSystem}</span>
                </div>
              </div>
            )}

            {project.completionTimeline && (
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-copper mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider">Timeline</span>
                  <span className="text-slate-200 mt-0.5 block">{project.completionTimeline}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

