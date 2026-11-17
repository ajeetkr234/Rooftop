import React, { useEffect, useState } from 'react';
import { updatePageSEO } from '../utils';
import { projectsData } from '../data/projectsData';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProjectCard } from '../components/sections/ProjectCard';
import { ProjectLightbox } from '../components/sections/ProjectLightbox';
import { CTASection } from '../components/sections/CTASection';
import { RoofingProject, ServiceCategory } from '../types';
import { AlertCircle, Filter } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');
  const [selectedProject, setSelectedProject] = useState<RoofingProject | null>(null);

  useEffect(() => {
    updatePageSEO(
      "Project Gallery & Sample Roofing Portfolio",
      "Explore roofing projects across standing seam metal, architectural shingles, commercial TPO membrane repairs, and seasonal preventive maintenance."
    );
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  const currentIdx = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handlePrev = () => {
    if (currentIdx > 0) {
      setSelectedProject(filteredProjects[currentIdx - 1]);
    }
  };

  const handleNext = () => {
    if (currentIdx < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[currentIdx + 1]);
    }
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Projects & Gallery' }]} />

      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-content mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
              Workmanship Showcase
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Roofing Project Gallery & Sample Portfolio
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore our roofing systems across residential architectural shingles, custom standing-seam metals, and commercial flat membranes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-brand-warm">
        <div className="max-w-content mx-auto">
          {/* Honest Demonstration Notice */}
          <div className="mb-10 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block">Portfolio Transparency Notice:</strong>
              The items below represent curated architectural demonstration case studies displaying our technical capabilities, material specifications, and repair workflows. Authentic verified company project photography will be populated upon final business deployment.
            </div>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-border">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy">
              <Filter className="w-4 h-4 text-brand-copper" />
              <span>Filter by Service:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Project category filters">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-brand-dark hover:bg-slate-100 border border-brand-border'
                }`}
              >
                All Projects ({projectsData.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('installation')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === 'installation'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-brand-dark hover:bg-slate-100 border border-brand-border'
                }`}
              >
                Installation
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('repair')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === 'repair'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-brand-dark hover:bg-slate-100 border border-brand-border'
                }`}
              >
                Repairs & Flashing
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('maintenance')}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeFilter === 'maintenance'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-brand-dark hover:bg-slate-100 border border-brand-border'
                }`}
              >
                Maintenance & Inspections
              </button>
            </div>
          </div>

          {/* Grid of Projects */}
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-brand-border">
              <h3 className="text-lg font-bold text-brand-navy">No projects found in this category.</h3>
              <p className="mt-2 text-sm text-brand-muted">Try selecting "All Projects" to view the complete demonstration gallery.</p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-4 py-2 rounded bg-brand-navy text-white text-xs font-semibold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Your Roofing Project?"
        description="Contact our estimators today for an itemized proposal tailored to your architectural specifications."
      />

      {/* Accessible Project Lightbox Modal */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIdx > 0}
        hasNext={currentIdx < filteredProjects.length - 1}
      />
    </div>
  );
};
