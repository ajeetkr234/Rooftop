import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ChevronDown, ChevronUp, Sparkles, Layers } from 'lucide-react';
import { updatePageSEO } from '../utils';
import { siteConfig } from '../config/siteConfig';
import { projectsData } from '../data/projectsData';
import { faqsData } from '../data/faqsData';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustIndicator } from '../components/sections/TrustIndicator';
import { ServiceCard } from '../components/sections/ServiceCard';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { ProcessSteps } from '../components/sections/ProcessSteps';
import { ProjectCard } from '../components/sections/ProjectCard';
import { ProjectLightbox } from '../components/sections/ProjectLightbox';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { CustomerReviewsSection } from '../components/sections/CustomerReviewsSection';
import { CTASection } from '../components/sections/CTASection';
import { RoofCostCalculator } from '../components/calculator/RoofCostCalculator';
import { BeforeAfterSlider } from '../components/portfolio/BeforeAfterSlider';
import { RoofMaterialVisualizer } from '../components/tools/RoofMaterialVisualizer';
import { RoofAnatomyViewer } from '../components/tools/RoofAnatomyViewer';
import { StormInspectionTool } from '../components/tools/StormInspectionTool';
import { SafetyShowcaseSection } from '../components/sections/SafetyShowcaseSection';
import { SectionHeading } from '../components/ui/SectionHeading';
import { RoofingProject } from '../types';

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<RoofingProject | null>(null);
  
  // "View More" state controls to eliminate endless vertical scrolling
  const [showAllServices, setShowAllServices] = useState<boolean>(false);
  const [showAdvancedTools, setShowAdvancedTools] = useState<boolean>(false);

  useEffect(() => {
    updatePageSEO(
      `${siteConfig.companyName} | Reliable Roofing. Lasting Protection.`,
      "Professional roof installation, dependable repairs, and preventive maintenance designed to protect your property. Clear itemized estimates."
    );
  }, []);

  const featuredProjects = projectsData.slice(0, 3);
  const currentProjectIndex = selectedProject
    ? featuredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handlePrevProject = () => {
    if (currentProjectIndex > 0) {
      setSelectedProject(featuredProjects[currentProjectIndex - 1]);
    }
  };

  const handleNextProject = () => {
    if (currentProjectIndex < featuredProjects.length - 1) {
      setSelectedProject(featuredProjects[currentProjectIndex + 1]);
    }
  };

  // Initially show 3 primary core services; expand to show all 8 on "View More"
  const displayedServices = showAllServices ? siteConfig.services : siteConfig.services.slice(0, 3);

  return (
    <div className="scroll-smooth">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Indicators */}
      <TrustIndicator />

      {/* Quick Jump Strip - Effortless single-tap access to bottom content without scrolling */}
      <nav 
        aria-label="Section Quick Jump" 
        className="bg-[#0b131f] border-y border-slate-800/80 py-2.5 px-4 sticky top-0 z-30 shadow-md backdrop-blur-md overflow-x-auto"
      >
        <div className="max-w-content mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 text-xs whitespace-nowrap">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden md:inline mr-1">
            Quick Jump:
          </span>
          <a href="#services" className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors">
            Services
          </a>
          <a href="#calculator" className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors">
            Cost Calculator
          </a>
          <a href="#projects" className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors">
            Projects
          </a>
          <a href="#safety" className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors">
            Safety
          </a>
          <a href="#reviews" className="px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-[11px] font-bold border border-amber-500/30 transition-colors flex items-center gap-1">
            <span>★ Reviews</span>
          </a>
          <a href="#faq" className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition-colors">
            FAQ
          </a>
          <a href="#estimate" className="px-3 py-1 rounded-full bg-brand-copper hover:bg-brand-copper-hover text-white text-[11px] font-bold shadow-sm transition-colors">
            Get Estimate ↓
          </a>
        </div>
      </nav>

      {/* 3. Core Roofing Services with "View More" Toggle */}
      <section id="services" className="py-8 sm:py-16 lg:py-20 px-3 sm:px-6 bg-brand-warm scroll-mt-12">
        <div className="max-w-content mx-auto">
          <SectionHeading
            eyebrow="Specialized Capabilities"
            title="Comprehensive Roofing Services"
            description="Engineered weather-resistance for residential and commercial structures through every phase of your roof's lifecycle."
          />

          {/* Service Cards Grid - 3 compact cards shown initially on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
            {displayedServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                slug={service.slug}
                title={service.title}
                description={service.shortDescription}
                image={service.thumbnail}
                features={service.features}
                ctaText={`Explore ${service.title.replace('Roof ', '')}`}
              />
            ))}
          </div>

          {/* "View More" Toggle Controls */}
          <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setShowAllServices(!showAllServices)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-navy hover:bg-brand-slate text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <span>
                {showAllServices 
                  ? 'Show Fewer Services' 
                  : `View More Services (${siteConfig.services.length - 3} More Capabilities)`
                }
              </span>
              <ChevronDown className={`w-4 h-4 text-brand-copper transition-transform duration-300 ${showAllServices ? 'rotate-180' : ''}`} />
            </button>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-copper transition-colors focus-visible:outline-brand-copper py-1.5"
            >
              <span>View Detailed Service Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Before & After Interactive Comparison Slider */}
      <div id="before-after">
        <BeforeAfterSlider />
      </div>

      {/* 5. Why Choose Us */}
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>

      {/* 6. Interactive Roof Cost & Financing Calculator */}
      <div id="calculator" className="scroll-mt-12">
        <RoofCostCalculator />
      </div>

      {/* 7. Featured Projects Gallery */}
      <section id="projects" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-y border-brand-border scroll-mt-12">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper-light text-brand-copper border border-brand-copper/20">
                Sample Work Portfolio
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight">
                Featured Roofing Projects
              </h2>
              <p className="mt-2 text-sm sm:text-base text-brand-muted max-w-xl">
                Demonstrating precision flashing fabrication, metal seam installation, and comprehensive shingle replacements.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-brand-navy hover:bg-brand-slate text-white text-sm font-semibold transition-colors focus-visible:outline-brand-copper shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive Architectural Tools & 3D Visualizers under "View More" */}
      <section id="architectural-tools" className="scroll-mt-12">
        {!showAdvancedTools ? (
          /* Compact Teaser Banner when Collapsed: Saves thousands of vertical pixels */
          <div className="py-12 px-4 sm:px-6 bg-gradient-to-b from-[#0D1624] to-[#09101A] text-white border-y border-slate-800">
            <div className="max-w-content mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-copper/20 border border-brand-copper/30 text-brand-copper text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Architectural Tools</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  3D Anatomy & Material Comparison Visualizers
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Inspect the 6-layer structural roof anatomy cross-section, compare materials side-by-side, or use the post-storm hail diagnostic tool.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAdvancedTools(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-brand-copper/30 shrink-0 flex items-center justify-center gap-2 active:scale-95"
              >
                <Layers className="w-4 h-4" />
                <span>View More: 3D Tools & Visualizers</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Full Tools View */
          <div className="space-y-0 animate-fadeIn">
            <RoofMaterialVisualizer />
            <RoofAnatomyViewer />
            <StormInspectionTool />

            {/* Collapse Button */}
            <div className="p-6 bg-[#080E17] text-center border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setShowAdvancedTools(false);
                  document.getElementById('architectural-tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-700"
              >
                <span>Collapse 3D Visualizer Tools</span>
                <ChevronUp className="w-4 h-4 text-brand-copper" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 9. Roofing Process */}
      <div id="process">
        <ProcessSteps />
      </div>

      {/* 9.5 Jobsite Safety & Professional Worker Equipment Standards */}
      <div id="safety" className="scroll-mt-12">
        <SafetyShowcaseSection />
      </div>

      {/* 11. Service Area Overview */}
      <section id="service-areas" className="py-14 sm:py-20 px-4 sm:px-6 bg-brand-warm scroll-mt-12">
        <div className="max-w-content mx-auto">
          <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-10 lg:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest uppercase rounded bg-brand-copper-light text-brand-copper border border-brand-copper/20">
                Regional Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                Serving Properties Across the Regional Territory
              </h2>
              <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
                We coordinate roofing crews across central metropolitan zones and surrounding residential communities. Check our coverage map or submit your address to confirm scheduling availability.
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-brand-muted">
                <MapPin className="w-4 h-4 text-brand-copper shrink-0" />
                <span>Operational territory subject to municipal permitting and distance thresholds.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <Link
                to="/service-areas"
                className="px-6 py-3 rounded bg-brand-navy hover:bg-brand-slate text-white text-sm font-semibold text-center transition-colors focus-visible:outline-brand-copper"
              >
                Explore Service Areas
              </Link>
              <Link
                to="/request-estimate"
                className="px-6 py-3 rounded bg-brand-copper hover:bg-brand-copper-hover text-white text-sm font-semibold text-center transition-colors focus-visible:outline-brand-copper"
              >
                Check My Address
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Verified Customer Reviews & Feedback */}
      <div id="reviews" className="scroll-mt-12">
        <CustomerReviewsSection />
      </div>

      {/* 13. FAQ Accordion */}
      <div id="faq" className="scroll-mt-12">
        <FAQAccordion items={faqsData.slice(0, 6)} />
      </div>

      {/* 14. Final CTA */}
      <div id="estimate" className="scroll-mt-12">
        <CTASection />
      </div>

      {/* Accessible Project Lightbox */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        hasPrev={currentProjectIndex > 0}
        hasNext={currentProjectIndex < featuredProjects.length - 1}
      />
    </div>
  );
};


