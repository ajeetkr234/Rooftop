import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AreaMatch {
  zipPrefix: string;
  regionName: string;
  status: 'primary' | 'extended' | 'commercial-only';
  dispatchSpeed: string;
  windZone: string;
  notes: string;
}

const SERVICE_REGIONS: AreaMatch[] = [
  {
    zipPrefix: '787',
    regionName: 'Austin Metro & Travis County',
    status: 'primary',
    dispatchSpeed: 'Same-Day / 24-Hour Dispatch',
    windZone: '130 MPH Wind-Rated Systems',
    notes: 'Full residential tear-offs, 24/7 priority emergency tarping, commercial flat roofing.'
  },
  {
    zipPrefix: '786',
    regionName: 'Central Texas Hill Country & Surrounding Counties',
    status: 'primary',
    dispatchSpeed: '24–48 Hour Inspection Dispatch',
    windZone: 'Class 4 Hail Resistance Standard',
    notes: 'Standing seam metal and architectural shingle installation and repair.'
  },
  {
    zipPrefix: '750',
    regionName: 'North Texas / DFW Corridor',
    status: 'extended',
    dispatchSpeed: '48-Hour Scheduled Dispatch',
    windZone: 'High-Impact Storm Resistance',
    notes: 'Serving full replacement projects, hail insurance restorations, and commercial.'
  },
  {
    zipPrefix: '770',
    regionName: 'Greater Gulf Coast & Harris County',
    status: 'extended',
    dispatchSpeed: 'Scheduled Dispatch',
    windZone: '150 MPH Coastal Hurricane Tie-Downs',
    notes: 'Commercial flat roofing and complete residential replacements.'
  }
];

export const ServiceAreaZipChecker: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<AreaMatch | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    setHasSearched(true);
    // Prefix lookup
    const match = SERVICE_REGIONS.find(r => cleanZip.startsWith(r.zipPrefix));
    if (match) {
      setSearchResult(match);
    } else {
      // If 5 digits are entered but doesn't match primary database
      if (/^\d{5}$/.test(cleanZip)) {
        setSearchResult({
          zipPrefix: cleanZip.slice(0, 3),
          regionName: `Regional Territory (ZIP ${cleanZip})`,
          status: 'extended',
          dispatchSpeed: 'Evaluated by Project Dispatch',
          windZone: 'Engineered per Local Municipal Code',
          notes: 'Available for full roof replacements, commercial systems, and storm restorations.'
        });
      } else {
        setSearchResult(null);
      }
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-copper/10 border border-brand-copper/30 text-brand-copper text-xs font-bold uppercase tracking-wider mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Territory Dispatch Finder</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
          Check Service Availability for Your ZIP Code
        </h3>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Verify our local crew coverage, emergency dispatch speeds, and regional wind-load building code compliance for your property.
        </p>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={zipInput}
              onChange={(e) => {
                setZipInput(e.target.value);
                setHasSearched(false);
              }}
              placeholder="Enter 5-digit ZIP (e.g. 78701)"
              maxLength={10}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-copper"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-brand-copper hover:bg-brand-copper-hover text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Check Area</span>
          </button>
        </form>

        {/* Search Results Display */}
        {hasSearched && (
          <div className="text-left animate-fadeIn">
            {searchResult ? (
              <div className="p-5 rounded-xl bg-slate-800/80 border border-brand-copper/40 shadow-inner">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3 border-b border-slate-700/80 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">
                        {searchResult.regionName}
                      </h4>
                      <span className="text-xs text-emerald-400 font-semibold">
                        {searchResult.status === 'primary' ? '★ Active Primary Service Territory' : '✓ Extended Service Territory'}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-xs font-mono text-brand-copper border border-slate-700">
                    ZIP: {zipInput.trim()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-700/60 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-copper shrink-0" />
                    <div>
                      <span className="block text-slate-400 text-[10px] uppercase font-bold">Dispatch Response</span>
                      <span className="text-slate-200 font-medium">{searchResult.dispatchSpeed}</span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-900/60 rounded border border-slate-700/60 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-copper shrink-0" />
                    <div>
                      <span className="block text-slate-400 text-[10px] uppercase font-bold">Code Standard</span>
                      <span className="text-slate-200 font-medium">{searchResult.windZone}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {searchResult.notes}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-400">
                    Ready to schedule an on-site structural assessment?
                  </span>
                  <Link
                    to={`/book-inspection?zip=${encodeURIComponent(zipInput.trim())}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-copper hover:bg-brand-copper-hover text-white text-xs font-bold rounded-lg transition-colors shadow"
                  >
                    <span>Book Inspection for This ZIP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <h4 className="font-heading font-bold text-white text-sm mb-1">
                  Area Inquire Required
                </h4>
                <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                  ZIP "{zipInput.trim()}" is outside our standard automated dispatch database. We evaluate commercial installations and larger residential tear-offs across all adjacent counties.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  <span>Contact Our Dispatch Team Directly</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
