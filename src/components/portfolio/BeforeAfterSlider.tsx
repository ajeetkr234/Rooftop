import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, Shield } from 'lucide-react';
import { BeforeAfterPair } from '../../types';

interface BeforeAfterTransformationItem extends BeforeAfterPair {
  stats: { label: string; value: string };
  scopeBadge: string;
}

const TRANSFORMATIONS: BeforeAfterTransformationItem[] = [
  {
    id: "ba-1",
    title: "Aged Weathered Shingles → High-Definition Dimensional Shingles",
    location: "Highland Ridge Residence",
    serviceScope: "Full tear-off, synthetic underlayment, architectural charcoal dimensional shingles",
    scopeBadge: "Architectural Shingles",
    beforeImage: "/images/transformations/shingles-before.jpg",
    afterImage: "/images/transformations/shingles-after.jpg",
    details: "Replaced 24-year-old curling, granule-depleted asphalt shingles with Class-4 impact-resistant dimensional shingles, crisp architectural ridge caps, and leak-proof ice & water barrier.",
    stats: { label: "Impact Rating", value: "Class 4 UL 2218" }
  },
  {
    id: "ba-2",
    title: "Severe Storm & Hail Damage → Precision Flashed Shingle Restoration",
    location: "Oakridge Hillside Property",
    serviceScope: "Decking repair, masonry step flashing, Class-4 impact shingles & ridge vents",
    scopeBadge: "Storm Restoration",
    beforeImage: "/images/transformations/storm-before.jpg",
    afterImage: "/images/transformations/storm-after.jpg",
    details: "Repaired structural wind tear, bruised shingles, and dented chimney flashing following severe hail. Restored with custom-bent aluminum step flashing and continuous ridge ventilation.",
    stats: { label: "Wind Warranty", value: "130 MPH" }
  },
  {
    id: "ba-3",
    title: "Corroded Screwed Sheet Metal → Architectural Standing Seam Steel",
    location: "Pinewood Modern Residence",
    serviceScope: "Concealed fastener 24-gauge standing seam metal, high-temp underlayment",
    scopeBadge: "Standing Seam Metal",
    beforeImage: "/images/transformations/metal-before.jpg",
    afterImage: "/images/transformations/metal-after.jpg",
    details: "Upgraded old rusting corrugated metal sheets with precision 24-gauge dark bronze standing seam steel featuring concealed fasteners, zero exposed screws, and 50+ year longevity.",
    stats: { label: "Expected Lifespan", value: "50+ Years" }
  },
  {
    id: "ba-4",
    title: "Ponding Aged Black EPDM → Reflective White Heat-Welded TPO",
    location: "Metro Commerce Center",
    serviceScope: "Tapered polyiso insulation, 60-mil white TPO membrane, commercial scuppers",
    scopeBadge: "Commercial Flat Roof",
    beforeImage: "/images/transformations/flat-before.jpg",
    afterImage: "/images/transformations/flat-after.jpg",
    details: "Eliminated persistent water ponding and failing seam tape on an aged flat roof by mechanically fastening tapered slope insulation and heat-welding a high-reflectance cool-roof TPO membrane.",
    stats: { label: "Solar Reflectance", value: "87% SRI" }
  },
  {
    id: "ba-5",
    title: "Crumbling Broken Spanish Clay Tiles → Restored Terra Cotta S-Tile",
    location: "Sunridge Valley Villa",
    serviceScope: "Tile reset, dual-ply SBS underlayment, mortar bird stops & sealed ridge",
    scopeBadge: "Spanish Clay Tile",
    beforeImage: "/images/transformations/tile-before.jpg",
    afterImage: "/images/transformations/tile-after.jpg",
    details: "Stripped broken and displaced clay tiles, replaced degraded underlayment with self-adhering SBS waterproofing membrane, re-aligned authentic terra-cotta S-tiles, and installed custom copper flashings.",
    stats: { label: "Fire Rating", value: "Class A Rated" }
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = TRANSFORMATIONS[activeItemIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 px-3 sm:px-6 bg-brand-warm border-t border-brand-border" id="before-after">
      <div className="max-w-content mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-10">
          <div className="max-w-2xl mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-copper-light text-brand-copper border border-brand-copper/20 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Real Transformation Evidence
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight">
              Before & After Roofing Transformations
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-brand-muted max-w-xl">
              Drag the interactive split handle horizontally to see the dramatic difference between worn, leaking roofs and our finished architectural installations.
            </p>
          </div>

          {/* Project Switcher: Responsive 5-Column Grid on Desktop, Swipeable Pill Bar on Mobile/Tablet */}
          <div className="w-full">
            {/* Desktop Full-Width 5-Column Grid (Zero overflow, zero cutoff) */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-3">
              {TRANSFORMATIONS.map((item, idx) => {
                const isSelected = activeItemIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveItemIndex(idx);
                      setSliderPosition(50);
                    }}
                    className={`p-3 text-left rounded-xl border transition-all group ${
                      isSelected
                        ? 'bg-brand-navy text-white border-brand-navy shadow-lg ring-2 ring-brand-copper'
                        : 'bg-white text-slate-700 border-brand-border hover:border-brand-copper/40 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-brand-copper text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}>
                        Project 0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-brand-copper" />
                      )}
                    </div>
                    <div className={`text-xs xl:text-sm font-extrabold truncate ${
                      isSelected ? 'text-white' : 'text-brand-navy'
                    }`}>
                      {item.scopeBadge}
                    </div>
                    <div className={`text-[11px] truncate mt-0.5 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {item.location}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile & Tablet Swipeable Pill Bar */}
            <div className="lg:hidden -mx-1 px-1">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
                {TRANSFORMATIONS.map((item, idx) => {
                  const isSelected = activeItemIndex === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveItemIndex(idx);
                        setSliderPosition(50);
                      }}
                      className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full sm:rounded-lg border transition-all shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-1 ring-brand-copper'
                          : 'bg-white text-slate-700 border-brand-border hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-brand-copper text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        0{idx + 1}
                      </span>
                      <span>
                        <span className="hidden sm:inline">{item.scopeBadge}</span>
                        <span className="sm:hidden">{item.scopeBadge.split(' ')[0]}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-xl p-3 sm:p-8">
          <div
            ref={containerRef}
            tabIndex={0}
            role="slider"
            aria-label="Before and after roof comparison slider (Use left and right arrow keys to adjust)"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            className="relative w-full aspect-[16/11] sm:aspect-[16/9] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-700/60 shadow-inner focus-visible:ring-2 focus-visible:ring-brand-copper outline-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* After Image (Full background layer) */}
            <img
              src={activeItem.afterImage}
              alt={`${activeItem.title} - Completed Craftsmanship`}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />

            {/* Top-Right After Badge */}
            <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-lg bg-brand-navy/90 border border-slate-700 text-white font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              <span>After: Finished Roof</span>
            </div>

            {/* Before Image (Revealed via CSS clipPath for pixel-perfect alignment) */}
            <img
              src={activeItem.beforeImage}
              alt={`${activeItem.title} - Before Condition`}
              className="absolute inset-0 w-full h-full object-cover object-center transition-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
              loading="eager"
            />

            {/* Top-Left Before Badge */}
            <div
              className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-lg bg-brand-copper/95 text-white font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-lg transition-opacity duration-200"
              style={{ opacity: sliderPosition > 12 ? 1 : 0 }}
            >
              <span>Before: Weathered / Damaged</span>
            </div>

            {/* Interactive Draggable Handle & Vertical Line */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none transition-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical Divider Line with drop shadow */}
              <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] -ml-[1px]" />

              {/* Circular Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -ml-[22px] w-11 h-11 rounded-full bg-white text-brand-navy border-2 border-brand-copper shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
                <ArrowLeftRight className="w-5 h-5 text-brand-copper" />
              </div>
            </div>

            {/* Bottom Helper Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-brand-navy/80 text-slate-300 text-[11px] font-semibold tracking-wide backdrop-blur-md border border-slate-700/80 pointer-events-none shadow-md hidden sm:flex items-center gap-1.5">
              <span>← Drag Slider or Use Arrow Keys →</span>
            </div>
          </div>

          {/* Details & Specs Card Below Image */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-brand-border/60 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="md:col-span-7 lg:col-span-8 space-y-1 sm:space-y-1.5 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-copper bg-brand-copper/10 px-2 py-0.5 rounded">
                  {activeItem.location}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  Verified Installation
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-extrabold text-brand-navy leading-snug">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-3 sm:line-clamp-none">
                {activeItem.details}
              </p>
            </div>

            <div className="md:col-span-5 lg:col-span-4 bg-brand-warm rounded-xl p-3 sm:p-4 border border-brand-border/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 min-w-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-brand-navy text-brand-copper flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block truncate">
                    {activeItem.stats.label}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-brand-navy block truncate">
                    {activeItem.stats.value}
                  </span>
                </div>
              </div>

              <a
                href="/request-estimate"
                className="w-full sm:w-auto text-center px-3.5 py-2 sm:py-2.5 rounded-lg bg-brand-copper hover:bg-brand-copper-hover text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0 flex items-center justify-center"
              >
                Quote This Roof
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
