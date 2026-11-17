import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Wind, 
  Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface EnvelopeLayer {
  number: string;
  name: string;
  category: string;
  thickness: string;
  astmStandard: string;
  color: string;
  accentBorder: string;
  bgGradient: string;
  isometricOffset: number; // Y offset in exploded view
  primaryFunction: string;
  engineeringDetails: string[];
  competitorShortcut: string; // What low-cost contractors skip
  protectionBadges: { icon: string; label: string }[];
}

export interface RoofingSystemType {
  id: string;
  name: string;
  subtitle: string;
  warrantyScore: string;
  windRating: string;
  layers: EnvelopeLayer[];
}

const ROOFING_SYSTEMS: RoofingSystemType[] = [
  {
    id: 'architectural-shingles',
    name: 'Architectural Shingle System',
    subtitle: 'ASTM-Certified Multi-Layer Defense Envelope',
    warrantyScore: '50-Year Non-Prorated',
    windRating: '130+ MPH Wind Certified',
    layers: [
      {
        number: '06',
        name: 'Continuous Ridge Exhaust & High-Profile Caps',
        category: 'Thermal Dynamics & Exhaust',
        thickness: 'High-Impact Copolymer Core',
        astmStandard: 'ASTM D3462 / Miami-Dade Compliant',
        color: '#E06D2B',
        accentBorder: 'border-amber-500',
        bgGradient: 'from-amber-600/80 to-amber-800/90',
        isometricOffset: 0,
        primaryFunction: 'Continuously exhausts hot, humid attic air while blocking wind-driven rain and snow ingress.',
        engineeringDetails: [
          'Calculated 18 sq. inches net free area per linear foot of ventilation',
          'Internal weather-filter baffling prevents insect and hurricane snow intrusion',
          'Class 4 impact-rated ridge cap shingles hand-fastened with 2-inch galvanized nails'
        ],
        competitorShortcut: 'Cheap contractors use cut-up 3-tab shingles for ridge caps, which crack and blow off in 50 MPH gusts.',
        protectionBadges: [
          { icon: 'wind', label: '130 MPH Blow-Off Rating' },
          { icon: 'flame', label: 'Class A Fire Rated' }
        ]
      },
      {
        number: '05',
        name: 'Class-4 High-Definition Dimensional Shingles',
        category: 'Primary Weather Armor',
        thickness: 'Multi-Ply Laminated Fiberglass',
        astmStandard: 'UL 2218 Class 4 / ASTM D3161',
        color: '#2B3B4E',
        accentBorder: 'border-slate-400',
        bgGradient: 'from-slate-700 to-slate-900',
        isometricOffset: 45,
        primaryFunction: 'Withstands direct 2-inch hail impacts, dissipates thermal solar UV, and sheds bulk rainwater.',
        engineeringDetails: [
          'High-tack thermoset sealant line activates under summer sunlight for bond strength',
          'Algae-resistant copper-infused granules preserve color aesthetics',
          '6-nail steep-slope fastening pattern engineered into reinforced nailing zones'
        ],
        competitorShortcut: 'Low-cost roofers only place 4 nails per shingle in improper high positions, voiding your manufacturer wind warranty.',
        protectionBadges: [
          { icon: 'shield', label: 'UL 2218 Class 4 Hail Impact' },
          { icon: 'sun', label: 'Cool Roof SRI 29+' }
        ]
      },
      {
        number: '04',
        name: 'Heavy-Gauge Starter Course & Valley Armor',
        category: 'Perimeter Uplift Seal',
        thickness: 'Self-Sealing SBS Strip & 24-Ga Copper',
        astmStandard: 'ASTM D1970 / ASTM B370',
        color: '#C05A1F',
        accentBorder: 'border-orange-500',
        bgGradient: 'from-orange-700 to-amber-900',
        isometricOffset: 90,
        primaryFunction: 'Locks down roof perimeter eaves and rakes against extreme negative pressure uplift.',
        engineeringDetails: [
          'Factory-applied adhesive strip directly on the roof eave edge',
          'W-valley open metal flashings allow swift water shed without gravel collection',
          'Zero-cut continuous starter strips prevent shingle tier peel-back'
        ],
        competitorShortcut: 'Unscrupulous contractors flip upside-down regular shingles on the edge, creating weak adhesive points that blow off first.',
        protectionBadges: [
          { icon: 'wind', label: 'Perimeter Wind Lock' },
          { icon: 'droplets', label: 'Torrential Valley Flow' }
        ]
      },
      {
        number: '03',
        name: 'High-Tensile Synthetic Underlayment',
        category: 'Secondary Moisture Barrier',
        thickness: 'Woven Polyolefin Multi-Layer (30-mil)',
        astmStandard: 'ASTM D4869 / ASTM D226 Type II',
        color: '#1B5B82',
        accentBorder: 'border-sky-500',
        bgGradient: 'from-sky-800 to-blue-950',
        isometricOffset: 135,
        primaryFunction: 'Provides 25x stronger tear resistance than traditional felt and creates a breathable moisture shield.',
        engineeringDetails: [
          'Polypropylene non-woven walking surface provides slip resistance for worker safety',
          'Vapor-permeable engineered micro-pores allow internal structural moisture to escape',
          'Fastened with ring-shank plastic cap nails every 12 inches for air seal'
        ],
        competitorShortcut: 'Budget bids use cheap 15-lb organic paper felt which wrinkles, tears in minor wind, and rots when damp.',
        protectionBadges: [
          { icon: 'droplets', label: 'Zero-Tear Moisture Shield' },
          { icon: 'shield', label: 'UV-Protected 180 Days' }
        ]
      },
      {
        number: '02',
        name: 'Self-Adhering Ice & Water Leak Barrier',
        category: 'Critical Vulnerability Armor',
        thickness: 'Modified SBS Polymer Asphalt (60-mil)',
        astmStandard: 'ASTM D1970 High-Temperature',
        color: '#162332',
        accentBorder: 'border-indigo-400',
        bgGradient: 'from-slate-800 to-indigo-950',
        isometricOffset: 180,
        primaryFunction: 'Forms an impenetrable self-sealing watertight gasket around every nail penetration and vulnerable junction.',
        engineeringDetails: [
          'Directly adheres to roof deck along eaves (minimum 2 courses), valleys, and around chimneys',
          'Rubberized SBS bitumen flows around shank of nails to seal against ice dam hydrostatic pressure',
          'High-temp rating prevents membrane migration under dark summer shingles'
        ],
        competitorShortcut: 'Competitors skip ice & water barrier entirely or only use a narrow 18-inch strip, causing catastrophic winter ceiling leaks.',
        protectionBadges: [
          { icon: 'droplets', label: '100% Watertight Nail Gasket' },
          { icon: 'shield', label: 'Ice Dam Hydrostatic Seal' }
        ]
      },
      {
        number: '01',
        name: 'Structural Decking & H-Clip Reinforcement',
        category: 'Substrate Foundation',
        thickness: '1/2" CDX Exterior-Grade Plywood / OSB',
        astmStandard: 'APA Rated Sheathing / PS 2-10',
        color: '#654321',
        accentBorder: 'border-amber-700',
        bgGradient: 'from-amber-900 to-stone-900',
        isometricOffset: 225,
        primaryFunction: 'Provides the rigid, high-load structural foundation supporting the entire roofing envelope.',
        engineeringDetails: [
          'Inspected for dry-rot, sag, and delamination prior to installation of underlayment',
          'Staggered joints with steel H-clips between rafters to prevent edge buckling',
          'Re-nailed into roof trusses with 8d ring-shank nails at 6" on center'
        ],
        competitorShortcut: 'Unethical roofers shingle directly over rotted, sponging plywood to avoid the cost of replacement deck boards.',
        protectionBadges: [
          { icon: 'shield', label: 'APA Rated Structural Deck' },
          { icon: 'wind', label: '60 PSF Snow & Live Load' }
        ]
      }
    ]
  },
  {
    id: 'standing-seam-metal',
    name: 'Standing Seam Metal System',
    subtitle: 'Architectural 24-Gauge Concealed Fastener System',
    warrantyScore: '50+ Year Lifetime Spec',
    windRating: '140+ MPH Rated',
    layers: [
      {
        number: '05',
        name: 'Continuous Ventilated Metal Ridge Cap & Z-Flashing',
        category: 'Ventilation & Crown Detail',
        thickness: '24-Gauge Galvalume Steel',
        astmStandard: 'ASTM A792 / Kynar 500 FPV',
        color: '#C05A1F',
        accentBorder: 'border-amber-500',
        bgGradient: 'from-amber-600 to-amber-900',
        isometricOffset: 0,
        primaryFunction: 'Architectural ridge cap locked onto perforated Z-closures, permitting thermal exhaust without water penetration.',
        engineeringDetails: [
          'Concealed hemmed closures eliminate all exposed screws at ridge apex',
          'High-performance Kynar 500 PVDF factory finish resists chalking and fading',
          'Continuous baffled exhaust balances indoor attic temperature'
        ],
        competitorShortcut: 'Amateur installers screw exposed rubber-washer screws through the top of the ridge, causing leaks within 5 years.',
        protectionBadges: [
          { icon: 'wind', label: 'Zero Exposed Fasteners' },
          { icon: 'sun', label: 'Kynar 500 Color Retention' }
        ]
      },
      {
        number: '04',
        name: '24-Gauge Standing Seam Panels & Hidden Expansion Clips',
        category: 'Primary Architectural Metal Armor',
        thickness: '24-Gauge Galvalume Steel (1.5" Mechanical Rib)',
        astmStandard: 'UL 580 Class 90 / ASTM E1592',
        color: '#2B3B4E',
        accentBorder: 'border-slate-400',
        bgGradient: 'from-slate-700 to-slate-900',
        isometricOffset: 55,
        primaryFunction: 'Precision roll-formed metal panels with vertical ribs that interlock seamlessly over hidden thermal expansion clips.',
        engineeringDetails: [
          'Concealed floating clips allow panels to freely expand and contract through seasonal temperature extremes',
          'Mechanically seamed seams engineered to withstand category-5 hurricane uplift',
          'Non-combustible Class A fire rated assembly with zero vulnerability to sparks or embers'
        ],
        competitorShortcut: 'Competitors sell cheap corrugated screw-down metal panels with 2,000+ exposed rubber screws that degrade and leak.',
        protectionBadges: [
          { icon: 'shield', label: 'UL 580 Class 90 Wind Uplift' },
          { icon: 'flame', label: 'Class A Non-Combustible' }
        ]
      },
      {
        number: '03',
        name: 'High-Temperature SBS Self-Adhering Metal Underlayment',
        category: 'High-Thermal Moisture Shield',
        thickness: '50-mil High-Temp Bitumen Barrier (260°F Rated)',
        astmStandard: 'ASTM D1970 / High-Temp Thermal Rating',
        color: '#1B5B82',
        accentBorder: 'border-sky-500',
        bgGradient: 'from-sky-800 to-blue-950',
        isometricOffset: 110,
        primaryFunction: 'Withstands extreme conductive heat generated under dark metal panels while maintaining self-sealing nail grip.',
        engineeringDetails: [
          'Engineered polymer formulation rated up to 260°F without asphalt liquefaction or slippage',
          'Continuous 100% full-deck coverage beneath metal panels provides dual waterproofing redundancy',
          'Self-sealing around clip screws to prevent thermal bridge condensation'
        ],
        competitorShortcut: 'Low-cost installers use standard shingle underlayment that melts and sticks to the bottom of hot metal sheets.',
        protectionBadges: [
          { icon: 'flame', label: '260°F High-Temp Rating' },
          { icon: 'droplets', label: '100% Redundant Deck Seal' }
        ]
      },
      {
        number: '02',
        name: 'Acoustic & Thermal Separation Slip Sheet',
        category: 'Acoustic Damping & Panel Glide',
        thickness: 'Engineered Synthetic Glide Layer',
        astmStandard: 'ASTM D8257 Breathable Separation',
        color: '#162332',
        accentBorder: 'border-indigo-400',
        bgGradient: 'from-slate-800 to-indigo-950',
        isometricOffset: 165,
        primaryFunction: 'Dampens rain resonance sound and eliminates thermal movement friction against the waterproofing underlayment.',
        engineeringDetails: [
          'Low-friction micro-fiber surface allows metal panels to glide silently during daily sun cycles',
          'Reduces interior rain sound levels to match conventional asphalt shingle roofs',
          'Prevents abrasive wear between metal panel undersides and waterproofing membranes'
        ],
        competitorShortcut: 'Skipping slip sheets causes loud pinging/popping noises during sunrise and sunset that frustrate homeowners.',
        protectionBadges: [
          { icon: 'shield', label: 'Sound-Damped Rain Decibels' },
          { icon: 'sun', label: 'Smooth Thermal Expansion' }
        ]
      },
      {
        number: '01',
        name: 'Precision-Leveled Decking & Eave Drip Edge Anchor',
        category: 'Substrate Foundation',
        thickness: '5/8" Tongue-and-Groove CDX Decking',
        astmStandard: 'APA Structural 1 Rated',
        color: '#654321',
        accentBorder: 'border-amber-700',
        bgGradient: 'from-amber-900 to-stone-900',
        isometricOffset: 220,
        primaryFunction: 'Ultra-flat, deflection-tested wood decking prevents visual oil-canning and uneven panel reflections.',
        engineeringDetails: [
          'Planar laser verified to within 1/8" across 10 feet to eliminate waviness (oil canning)',
          'Heavy 24-gauge continuous eave drip edge cleat locks bottom hems in place',
          'Fastened with structural screws to resist deflection under deep regional snow loads'
        ],
        competitorShortcut: 'Installing metal over uneven or wavy roof decks creates ugly visible creases and ripples across the roofline.',
        protectionBadges: [
          { icon: 'shield', label: 'Laser-Flat Oil-Canning Defense' },
          { icon: 'wind', label: 'Continuous Cleat Eave Lock' }
        ]
      }
    ]
  }
];

export const RoofAnatomyViewer: React.FC = () => {
  const [activeSystemId, setActiveSystemId] = useState<string>('architectural-shingles');
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(true);

  const activeSystem = ROOFING_SYSTEMS.find(s => s.id === activeSystemId) || ROOFING_SYSTEMS[0];
  const selectedLayer = activeSystem.layers[selectedLayerIndex] || activeSystem.layers[0];

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0D1520] text-white relative overflow-hidden border-t border-slate-800" id="anatomy">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b2a3a15_1px,transparent_1px),linear-gradient(to_bottom,#1b2a3a15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-copper/15 border border-brand-copper/30 text-brand-copper text-xs font-bold uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Architectural Envelope Anatomy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Anatomy of an Engineered Roof
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              A premium roof is not just surface shingles or metal sheets—it is a calibrated 6-layer building envelope. Explore each engineered defense layer below to see why our systems never leak.
            </p>
          </div>

          {/* System Mode Switcher & Exploded View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl bg-slate-900/90 border border-slate-700/80 p-1 shadow-inner">
              {ROOFING_SYSTEMS.map((system) => (
                <button
                  key={system.id}
                  type="button"
                  onClick={() => {
                    setActiveSystemId(system.id);
                    setSelectedLayerIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeSystemId === system.id
                      ? 'bg-brand-copper text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {system.name.split(' ')[0]} System
                </button>
              ))}
            </div>

            {/* Exploded / Assembled 3D Toggle */}
            <button
              type="button"
              onClick={() => setIsExploded(!isExploded)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-md"
              title="Toggle Exploded vs Assembled Cross-Section"
            >
              <Maximize2 className={`w-3.5 h-3.5 text-brand-copper transition-transform ${isExploded ? 'rotate-45' : ''}`} />
              <span>{isExploded ? 'View Assembled' : 'Explode Layers (3D)'}</span>
            </button>
          </div>
        </div>

        {/* System Overview Pill Banner */}
        <div className="mb-8 p-4 rounded-xl bg-brand-slate/80 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-copper animate-pulse" />
            <span className="font-extrabold text-white text-sm">{activeSystem.name}</span>
            <span className="text-slate-400 hidden sm:inline">• {activeSystem.subtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Warranty: <strong className="text-white">{activeSystem.warrantyScore}</strong></span>
            </span>
            <span className="flex items-center gap-1.5 hidden md:flex">
              <Wind className="w-4 h-4 text-sky-400" />
              <span>Wind Uplift: <strong className="text-white">{activeSystem.windRating}</strong></span>
            </span>
          </div>
        </div>

        {/* Main Interactive Grid: Exploded Cross-Section Diagram + Deep-Dive Spec Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive 3D Exploded Cross-Section Visualization (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[560px]">
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-brand-copper" />
                <span>Interactive Envelope Cross-Section</span>
              </span>
              <span className="text-[10px] text-brand-copper font-mono bg-brand-copper/10 px-2 py-0.5 rounded border border-brand-copper/20">
                Click any layer to inspect
              </span>
            </div>

            {/* Interactive Layer Visual Stack */}
            <div className="relative py-8 flex flex-col items-center justify-center flex-1">
              <div className="w-full max-w-md relative flex flex-col items-center gap-3">
                {activeSystem.layers.map((layer, idx) => {
                  const isSelected = selectedLayerIndex === idx;
                  const offsetSpacing = isExploded ? idx * 8 : idx * 1.5;

                  return (
                    <div
                      key={layer.number}
                      onClick={() => setSelectedLayerIndex(idx)}
                      style={{
                        transform: `translateY(${isExploded ? 0 : -offsetSpacing}px)`,
                        transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className={`w-full group cursor-pointer relative transition-all duration-300 rounded-xl p-3.5 border ${
                        isSelected 
                          ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-brand-copper shadow-[0_0_20px_rgba(217,119,54,0.35)] scale-[1.02] z-30 ring-1 ring-brand-copper' 
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/70 hover:border-slate-500 z-10'
                      }`}
                    >
                      {/* Left Layer Number & Color Tab */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span 
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-transform ${
                              isSelected 
                                ? 'bg-brand-copper text-white scale-110 shadow-md' 
                                : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                            }`}
                          >
                            {layer.number}
                          </span>
                          <div>
                            <div className="font-extrabold text-xs sm:text-sm text-white group-hover:text-brand-copper transition-colors leading-snug">
                              {layer.name}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {layer.category}
                            </div>
                          </div>
                        </div>

                        {/* ASTM Spec Pill */}
                        <div className="text-right shrink-0">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                            isSelected 
                              ? 'bg-brand-copper/20 text-brand-copper border-brand-copper/40 font-bold' 
                              : 'bg-slate-900 text-slate-400 border-slate-700'
                          }`}>
                            {layer.astmStandard.split('/')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Isometric Depth Edge Accent */}
                      <div 
                        className={`h-1.5 w-full mt-2.5 rounded-full transition-opacity ${
                          isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
                        }`}
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Graphic Legend */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span>Structural Deck (Bottom)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>Weather Atmosphere (Top)</span>
                <span className="w-2 h-2 rounded-full bg-brand-copper" />
              </span>
            </div>
          </div>

          {/* RIGHT: Deep-Dive Technical Engineering Spec Panel (6 Cols) */}
          <div className="lg:col-span-6 bg-brand-slate rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[560px]">
            <div>
              {/* Layer Category & Number Breadcrumb */}
              <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-brand-copper text-white font-black text-xs">
                    LAYER {selectedLayer.number} OF 06
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {selectedLayer.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-copper font-bold">
                  {selectedLayer.thickness}
                </span>
              </div>

              {/* Layer Title & ASTM Standard */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {selectedLayer.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-slate-400">Standard:</span>
                <span className="font-mono text-green-400 font-bold bg-green-950/60 px-2 py-0.5 rounded border border-green-800/60">
                  {selectedLayer.astmStandard}
                </span>
              </div>

              {/* Primary Function Box */}
              <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-copper block mb-1">
                  Primary Envelope Function
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {selectedLayer.primaryFunction}
                </p>
              </div>

              {/* Engineering Specifications Checklist */}
              <div className="mt-6 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Precision Installation Protocols
                </span>
                {selectedLayer.engineeringDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-copper shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* High-Value Educational Alert: "What Low-Cost Contractors Skip" */}
              <div className="mt-6 p-4 rounded-xl bg-red-950/40 border border-red-800/60">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>The Low-Bid Danger (What Cheap Contractors Skip)</span>
                </div>
                <p className="text-xs text-red-200/90 leading-relaxed">
                  {selectedLayer.competitorShortcut}
                </p>
              </div>
            </div>

            {/* Bottom Actions: Specs Sheet CTA & Estimate Link */}
            <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {selectedLayer.protectionBadges.map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[11px] font-semibold text-slate-200">
                    <Sparkles className="w-3 h-3 text-brand-copper" />
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>

              <Link
                to="/request-estimate"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-brand-copper/30 shrink-0"
              >
                <span>Quote This System</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom 4-Pillar Engineering Guarantee */}
        <div className="mt-14 pt-10 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block font-heading font-black text-xl sm:text-2xl text-brand-copper">ASTM D1970</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">Self-Sealing Leak Barrier</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">Dual-course valley & eave protection</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block font-heading font-black text-xl sm:text-2xl text-brand-copper">UL 2218 Class 4</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">Severe Hail Impact Rating</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">Insurance discount eligible</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block font-heading font-black text-xl sm:text-2xl text-brand-copper">130+ MPH</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">Wind Blow-Off Guarantee</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">6-nail steep-slope fastening</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="block font-heading font-black text-xl sm:text-2xl text-brand-copper">50-Year Non-Prorated</span>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">Manufacturer Warranty</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">Transferable to future buyers</span>
          </div>
        </div>

      </div>
    </section>
  );
};
