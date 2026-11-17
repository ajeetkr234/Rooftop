import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudLightning, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Search,
  CheckCircle2
} from 'lucide-react';

export const StormInspectionTool: React.FC = () => {
  const [zipInput, setZipInput] = useState<string>('');
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const stormSigns = [
    {
      title: "Granule Bruising & Pits",
      desc: "Hail impacts knock mineral granules off shingles, exposing black asphalt to rapid UV deterioration."
    },
    {
      title: "Horizontal Wind Creases",
      desc: "High winds lift shingle tabs, breaking the thermal sealant bond and creating invisible fold lines."
    },
    {
      title: "Dented Gutters & Soft Metals",
      desc: "Dents in aluminum downspouts, ridge vents, or AC fins are the primary evidence insurance adjusters look for."
    },
    {
      title: "Compromised Chimney Flashing",
      desc: "Violent storm buffeting shakes masonry joints, separating lead and copper step flashing from mortar."
    }
  ];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipInput.trim().length >= 3) {
      setHasChecked(true);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-white border-t border-brand-border" id="storm-assessment">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest">
              <CloudLightning className="w-3.5 h-3.5 text-brand-copper" />
              Storm & Hail Preparedness
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Post-Storm Roof Damage & Insurance Claims Assistance
            </h2>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Severe storms cause subtle, hidden envelope damage that often remains invisible from the ground until the next major downpour. We provide certified damage inspections with photographic reports for insurance claims.
            </p>

            {/* Storm Signs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {stormSigns.map((sign, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-brand-warm/60 border border-brand-border">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-brand-copper shrink-0" />
                    <h3 className="text-xs font-bold text-brand-navy">{sign.title}</h3>
                  </div>
                  <p className="text-[11px] text-brand-muted leading-relaxed">{sign.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-brand-muted">
              <ShieldCheck className="w-4 h-4 text-brand-copper shrink-0" />
              <span>We meet your insurance adjuster on-site to verify scope item-by-item.</span>
            </div>
          </div>

          {/* Right Interactive Card */}
          <div className="lg:col-span-6 bg-brand-slate text-white rounded-2xl p-6 sm:p-10 border border-slate-700 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-copper block mb-1">
                Regional Inspection Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Check Storm Assessment Availability
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Enter your property ZIP code or neighborhood to confirm inspection availability for wind or hail evaluations.
              </p>
            </div>

            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-brand-copper absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value);
                    setHasChecked(false);
                  }}
                  placeholder="Enter ZIP code (e.g. 90210)"
                  className="w-full pl-10 pr-4 py-3 bg-brand-navy border border-slate-600 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-copper"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-2 shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>Check Coverage</span>
              </button>
            </form>

            {hasChecked && (
              <div className="p-4 rounded-xl bg-brand-navy border border-brand-copper/40 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Crews Active in Territory</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our inspection teams are currently dispatched for storm-related assessments in this sector.
                </p>
                <Link
                  to={`/request-estimate?service=roof-repair&notes=Post-storm%20inspection%20requested%20for%20ZIP%20${zipInput}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-copper hover:text-white uppercase tracking-wider transition-colors pt-1"
                >
                  <span>Book Priority Storm Inspection →</span>
                </Link>
              </div>
            )}

            {/* Insurance Claims Steps */}
            <div className="pt-4 border-t border-slate-700/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                How Our Insurance Assistance Works:
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-brand-copper font-mono font-bold">1.</span>
                  <span>We conduct a 21-point photographic roof inspection before you call your carrier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-copper font-mono font-bold">2.</span>
                  <span>You receive an itemized estimate prepared using insurance-standard Xactimate® pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-copper font-mono font-bold">3.</span>
                  <span>Our project manager walks the roof with your adjuster to ensure nothing is missed.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
