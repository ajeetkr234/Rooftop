import React from 'react';
import { Maximize2, Tag } from 'lucide-react';
import { RoofingProject } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';

interface ProjectCardProps {
  project: RoofingProject;
  onSelect: (project: RoofingProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      className="group cursor-pointer rounded-lg overflow-hidden bg-white border border-brand-border hover:border-brand-copper/50 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-brand-copper flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-slate">
        <ResponsiveImage
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 card-gradient-overlay opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase bg-brand-navy/90 text-brand-copper border border-slate-700 backdrop-blur-sm">
            {project.categoryLabel}
          </span>
        </div>

        {/* Enlarge icon badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-brand-navy/80 text-white backdrop-blur">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-brand-navy group-hover:text-brand-copper transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-1.5 truncate">
            <Tag className="w-3.5 h-3.5 text-brand-copper shrink-0" />
            <span className="truncate">{project.servicePerformed}</span>
          </div>
          <span className="text-[11px] font-semibold text-brand-copper uppercase tracking-wider shrink-0 ml-2">
            View Project
          </span>
        </div>
      </div>
    </div>
  );
};

