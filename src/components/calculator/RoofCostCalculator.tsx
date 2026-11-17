import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Wind, 
  CreditCard, 
  Layers, 
  Info
} from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  minRate: number;
  maxRate: number;
  lifespan: string;
  windRating: number;
  warranty: string;
  tag: string;
}

const MATERIALS: MaterialOption[] = [
  {
    id: 'asphalt-shingle',
    name: 'Architectural Asphalt Shingles',
    minRate: 4.80,
    maxRate: 6.90,
    lifespan: '25 – 30 Years',
    windRating: 130,
    warranty: '50-Yr Limited Manufacturer',
    tag: 'Most Popular Value'
  },
  {
    id: 'standing-seam-metal',
    name: 'Standing Seam Architectural Metal',
    minRate: 11.50,
    maxRate: 16.50,
    lifespan: '50+ Years',
    windRating: 140,
    warranty: 'Lifetime Architectural Warranty',
    tag: 'Maximum Durability'
  },
  {
    id: 'tpo-membrane',
    name: 'TPO Single-Ply Flat Membrane',
    minRate: 7.20,
    maxRate: 10.40,
    lifespan: '25 – 30 Years',
    windRating: 120,
    warranty: '20-Yr Commercial NDL',
    tag: 'Ideal for Low-Slope'
  },
  {
    id: 'synthetic-slate',
    name: 'Composite Synthetic Slate',
    minRate: 13.00,
    maxRate: 18.50,
    lifespan: '50+ Years',
    windRating: 135,
    warranty: '50-Yr Transferable Warranty',
    tag: 'Luxury Aesthetic'
  }
];

export const RoofCostCalculator: React.FC = () => {
  const navigate = useNavigate();
  const formId = useId();

  // State
  const [sqFootage, setSqFootage] = useState<number>(2200);
  const [pitch, setPitch] = useState<'low' | 'standard' | 'steep'>('standard');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('asphalt-shingle');
  const [tearOffLayers, setTearOffLayers] = useState<number>(1);

  // Pitch Multipliers (roof slope increases surface area)
  const pitchMultipliers = {
    low: 1.05,       // 2:12 - 4:12 slope
    standard: 1.18,  // 5:12 - 8:12 slope
    steep: 1.35,     // 9:12+ slope
  };

  const selectedMat = MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0];
  const effectiveArea = Math.round(sqFootage * pitchMultipliers[pitch]);
  
  // Tear-off labor per sq ft ($1.10 per layer)
  const tearOffCost = tearOffLayers * 1.10 * effectiveArea;

  const minTotal = Math.round((effectiveArea * selectedMat.minRate) + tearOffCost);
  const maxTotal = Math.round((effectiveArea * selectedMat.maxRate) + tearOffCost);

  // Approximate 60-month financing calculation (assuming 7.9% APR)
  const monthlyEstimate = Math.round((minTotal * 1.20) / 60);

  const handleLockInEstimate = () => {
    // Pre-populate /request-estimate with calculation details
    const params = new URLSearchParams({
      service: selectedMat.id.includes('metal') ? 'roof-installation' : 'roof-installation',
      notes: `Calculator estimate for ${sqFootage} sq ft (${pitch} pitch, ${selectedMat.name}): $${minTotal.toLocaleString()} - $${maxTotal.toLocaleString()}`
    });
    navigate(`/request-estimate?${params.toString()}`);
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 px-3 sm:px-6 bg-brand-navy text-white relative overflow-hidden" id="calculator">
      {/* Decorative background glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-slate/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-copper/20 border border-brand-copper/30 text-brand-copper text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Instant Estimator
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Interactive Roof Cost & Financing Calculator
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Estimate project pricing, materials, and monthly financing brackets tailored to your property size and architectural preferences.
          </p>
        </div>

        {/* Main Grid: Inputs on Left, Output Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-brand-slate/90 border border-slate-700 rounded-2xl p-3.5 sm:p-8 backdrop-blur-sm space-y-5 sm:space-y-7 shadow-xl">
            {/* 1. Square Footage Slider & Presets */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={`${formId}-sqft`} className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <span>1. Estimated Home / Roof Size</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal hidden sm:inline">(Floor Footprint)</span>
                </label>
                <span className="text-base sm:text-lg font-black text-brand-copper font-mono">
                  {sqFootage.toLocaleString()} sq. ft.
                </span>
              </div>

              <input
                id={`${formId}-sqft`}
                type="range"
                min="1000"
                max="5000"
                step="100"
                value={sqFootage}
                onChange={(e) => setSqFootage(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-copper"
              />

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
                {[1400, 2000, 2800, 3800].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSqFootage(size)}
                    className={`py-1.5 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold rounded border transition-colors text-center ${
                      sqFootage === size
                        ? 'bg-brand-copper text-white border-brand-copper shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {size.toLocaleString()} <span className="hidden sm:inline">sq ft</span><span className="sm:hidden">sqft</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Roof Pitch (Slope) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                2. Roof Pitch & Architecture
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {[
                  { id: 'low', label: 'Low / Gentle', shortLabel: 'Low Pitch', sub: 'Flat or 2:12 to 4:12', shortSub: 'Flat - 4:12' },
                  { id: 'standard', label: 'Standard Pitch', shortLabel: 'Standard', sub: 'Walkable 5:12 to 8:12', shortSub: '5:12 - 8:12' },
                  { id: 'steep', label: 'Steep Architectural', shortLabel: 'Steep', sub: 'Steep pitch 9:12+', shortSub: '9:12+ Slope' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPitch(item.id as any)}
                    className={`p-2 sm:p-3 text-center sm:text-left rounded-lg sm:rounded-xl border transition-all ${
                      pitch === item.id
                        ? 'bg-brand-navy border-brand-copper shadow-md ring-1 ring-brand-copper'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span className="block text-[11px] sm:text-xs font-bold text-white truncate sm:whitespace-normal">
                      <span className="sm:hidden">{item.shortLabel}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </span>
                    <span className="block text-[9px] sm:text-[11px] text-slate-400 mt-0.5 truncate sm:whitespace-normal">
                      <span className="sm:hidden">{item.shortSub}</span>
                      <span className="hidden sm:inline">{item.sub}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Material Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                3. Choose Roofing System
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {MATERIALS.map((mat) => {
                  const isSelected = selectedMaterialId === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterialId(mat.id)}
                      className={`p-2.5 sm:p-3.5 text-left rounded-xl border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-brand-navy border-brand-copper shadow-md ring-1 ring-brand-copper'
                          : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-copper bg-brand-copper/10 px-1.5 py-0.5 rounded">
                            {mat.tag}
                          </span>
                        </div>
                        <span className="block text-xs sm:text-sm font-bold text-white leading-snug">
                          {mat.name}
                        </span>
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300">
                        <span>{mat.lifespan}</span>
                        <span className="font-semibold text-brand-copper font-mono">
                          ${mat.minRate.toFixed(2)} - ${mat.maxRate.toFixed(2)}/sq ft
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Tear-Off Layers */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                4. Existing Roof Tear-Off
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {[
                  { layers: 0, label: '0 Layers (New Deck / Construction)', shortLabel: '0 Layers', shortSub: 'New Deck' },
                  { layers: 1, label: '1 Layer (Standard Tear-Off)', shortLabel: '1 Layer', shortSub: 'Standard' },
                  { layers: 2, label: '2 Layers (Multiple Old Shingles)', shortLabel: '2+ Layers', shortSub: 'Multiple' },
                ].map((t) => (
                  <button
                    key={t.layers}
                    type="button"
                    onClick={() => setTearOffLayers(t.layers)}
                    className={`py-2 px-1.5 sm:px-2.5 text-center rounded-lg border transition-colors ${
                      tearOffLayers === t.layers
                        ? 'bg-brand-copper text-white border-brand-copper shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span className="block text-[11px] sm:text-xs font-bold leading-tight">
                      <span className="sm:hidden">{t.shortLabel}</span>
                      <span className="hidden sm:inline">{t.label}</span>
                    </span>
                    <span className="block sm:hidden text-[9px] text-slate-300/80 mt-0.5">
                      {t.shortSub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Calculation Output Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-slate via-[#1B2A3A] to-brand-navy border-2 border-brand-copper/50 rounded-2xl p-4 sm:p-8 shadow-2xl space-y-4 sm:space-y-6">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-copper bg-brand-copper/15 px-2.5 py-1 rounded-full border border-brand-copper/30 inline-block mb-2 sm:mb-3">
                Estimated Project Range
              </span>
              <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                ${minTotal.toLocaleString()} – ${maxTotal.toLocaleString()}
              </div>
              <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-slate-400">
                *Itemized ballpark including deck inspection, underlayment barrier, flashing, and debris disposal.
              </p>
            </div>

            {/* Financing Callout */}
            <div className="p-3 sm:p-4 rounded-xl bg-brand-navy/90 border border-slate-700 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-brand-copper/20 flex items-center justify-center text-brand-copper shrink-0">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs uppercase font-bold text-slate-400 block tracking-wider truncate">
                    Flexible Financing
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-white truncate block">
                    From ${monthlyEstimate} / mo
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-brand-copper uppercase tracking-wider shrink-0">
                0% APR Avail.
              </span>
            </div>

            {/* Technical Specs Breakdown */}
            <div className="space-y-2.5 sm:space-y-3 pt-2 text-[11px] sm:text-xs border-t border-slate-700">
              <div className="flex items-center justify-between text-slate-300 gap-2">
                <span className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper" />
                  <span>Selected System:</span>
                </span>
                <span className="font-bold text-white text-right truncate">{selectedMat.name}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper" />
                  <span>Expected Lifespan:</span>
                </span>
                <span className="font-bold text-white">{selectedMat.lifespan}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper" />
                  <span>Engineered Wind Rating:</span>
                </span>
                <span className="font-bold text-white">{selectedMat.windRating} MPH</span>
              </div>

              <div className="flex items-center justify-between text-slate-300 gap-2">
                <span className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper" />
                  <span>Warranty Tier:</span>
                </span>
                <span className="font-bold text-white text-right truncate">{selectedMat.warranty}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-4 space-y-2.5 sm:space-y-3">
              <button
                type="button"
                onClick={handleLockInEstimate}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-brand-copper to-brand-copper-hover hover:from-brand-copper-hover hover:to-[#B3581E] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-copper/30 active:translate-y-0.5 text-center"
              >
                <span>Lock In Estimate & Book</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-400 text-center">
                <Info className="w-3.5 h-3.5 text-brand-copper shrink-0" />
                <span>Zero obligation. On-site technician confirms measurements.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
