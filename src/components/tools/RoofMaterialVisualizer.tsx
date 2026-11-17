import React, { useState } from 'react';
import { Layers, ShieldCheck, Sun, Wind, Clock, ArrowRight } from 'lucide-react';
import { RoofMaterialProfile } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';

const MATERIAL_PROFILES: RoofMaterialProfile[] = [
  {
    id: "standing-seam",
    name: "Standing Seam Architectural Metal",
    category: "Metal Systems",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80",
    description: "Concealed fastener 24-gauge Galvalume steel with baked-on Kynar 500® resin finish. Unrivaled modern aesthetic with continuous interlocking weather seams.",
    lifespan: "50+ Years",
    warranty: "Lifetime Architectural",
    windResistance: "140+ MPH Rated",
    solarReflectance: "Energy Star Cool Roof (SRI 68)",
    bestFor: "Contemporary homes, modern farmhouses, high-wind and coastal zones",
    relativeCost: "$$$$"
  },
  {
    id: "arch-shingle",
    name: "Architectural Heavyweight Shingles",
    category: "Asphalt Systems",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80",
    description: "Multi-layered fiberglass asphalt shingles with embedded ceramic-coated granules. Engineered for high tear resistance and dimensional shadow lines.",
    lifespan: "25 – 30 Years",
    warranty: "50-Yr Limited Transferable",
    windResistance: "130 MPH Rated",
    solarReflectance: "Moderate (Cool Color Options Available)",
    bestFor: "Traditional residential neighborhoods, suburban family homes",
    relativeCost: "$$"
  },
  {
    id: "tpo-membrane",
    name: "TPO Single-Ply Commercial Membrane",
    category: "Low-Slope / Flat Systems",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    description: "Heat-welded thermoplastic polyolefin membrane providing monolithic watertight protection. Highly reflective white surface dramatically lowers summer AC loads.",
    lifespan: "25 – 30 Years",
    warranty: "20-Yr Commercial NDL",
    windResistance: "120 MPH Rated",
    solarReflectance: "High Reflectance (SRI 102)",
    bestFor: "Flat roofs, commercial facilities, modern low-slope residences",
    relativeCost: "$$$"
  },
  {
    id: "composite-slate",
    name: "Synthetic Engineered Slate",
    category: "Composite Systems",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Engineered from virgin polymers and recycled rubber to capture the authentic chiseled texture of natural quarried slate at one-third of the structural weight.",
    lifespan: "50+ Years",
    warranty: "50-Yr Manufacturer Warranty",
    windResistance: "135 MPH Rated",
    solarReflectance: "Class 4 Impact Resistant",
    bestFor: "Historic restorations, luxury custom builds, steep-pitch roofs",
    relativeCost: "$$$$"
  }
];

export const RoofMaterialVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(MATERIAL_PROFILES[0].id);

  const activeMaterial = MATERIAL_PROFILES.find((m) => m.id === selectedId) || MATERIAL_PROFILES[0];

  return (
    <section className="py-20 px-4 sm:px-6 bg-brand-warm border-t border-brand-border" id="materials-visualizer">
      <div className="max-w-content mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-copper-light text-brand-copper border border-brand-copper/20 text-xs font-bold uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5" />
            Material Specification
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight">
            Compare Roofing Materials & Architectural Profiles
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-muted">
            Select a roofing profile below to review structural weight, solar reflectivity, wind resistance, and architectural suitability.
          </p>
        </div>

        {/* Material Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {MATERIAL_PROFILES.map((mat) => {
            const isSelected = selectedId === mat.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedId(mat.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-brand-navy text-white border-brand-copper shadow-lg ring-1 ring-brand-copper'
                    : 'bg-white text-brand-dark border-brand-border hover:bg-slate-50'
                }`}
              >
                <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-brand-copper' : 'text-brand-muted'}`}>
                  {mat.category}
                </span>
                <span className="block text-xs sm:text-sm font-bold leading-snug">
                  {mat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Showcase Card */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Material Photography */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px] bg-brand-slate">
            <ResponsiveImage
              src={activeMaterial.image}
              alt={activeMaterial.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded bg-brand-navy/90 text-brand-copper border border-slate-700 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                Cost Tier: {activeMaterial.relativeCost}
              </span>
            </div>
          </div>

          {/* Right: Technical Specs & Guidance */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-copper block mb-1">
                {activeMaterial.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                {activeMaterial.name}
              </h3>
              <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                {activeMaterial.description}
              </p>
            </div>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-brand-warm text-brand-copper flex items-center justify-center shrink-0 border border-brand-border">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">Expected Lifespan</span>
                  <span className="text-sm font-bold text-brand-navy">{activeMaterial.lifespan}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-brand-warm text-brand-copper flex items-center justify-center shrink-0 border border-brand-border">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">Wind Uplift Rating</span>
                  <span className="text-sm font-bold text-brand-navy">{activeMaterial.windResistance}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-brand-warm text-brand-copper flex items-center justify-center shrink-0 border border-brand-border">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">Thermal & Solar</span>
                  <span className="text-sm font-bold text-brand-navy">{activeMaterial.solarReflectance}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-brand-warm text-brand-copper flex items-center justify-center shrink-0 border border-brand-border">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">Warranty Protection</span>
                  <span className="text-sm font-bold text-brand-navy">{activeMaterial.warranty}</span>
                </div>
              </div>
            </div>

            {/* Best For Note */}
            <div className="p-3.5 rounded-xl bg-brand-warm/60 border border-brand-border text-xs text-brand-dark">
              <span className="font-bold text-brand-navy block mb-0.5">Architectural Recommendation:</span>
              <span>{activeMaterial.bestFor}</span>
            </div>

            {/* CTA Link */}
            <div className="pt-2">
              <a
                href={`/request-estimate?notes=Inquiry%20for%20${encodeURIComponent(activeMaterial.name)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-navy hover:bg-brand-slate text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Request {activeMaterial.name} Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
