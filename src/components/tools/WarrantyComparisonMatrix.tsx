import React from 'react';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Link } from 'react-router-dom';

export const WarrantyComparisonMatrix: React.FC = () => {
  const tiers = [
    {
      name: "Standard Contractor Minimum",
      badge: "Standard Industry",
      highlight: false,
      materialWarranty: "10–25 Years (Prorated)",
      workmanship: "1–2 Years Limited",
      windCoverage: "Up to 60–90 MPH",
      tearOffDisposal: "Excluded (Owner Pays)",
      flashingCoverage: "1 Year Only",
      transferable: "Non-Transferable",
      bestFor: "Basic budget repairs or non-certified contractors"
    },
    {
      name: `${siteConfig.companyName} Architectural`,
      badge: "Our Standard Standard",
      highlight: true,
      materialWarranty: "30–50 Years Manufacturer",
      workmanship: "10-Year Craftsmanship Guarantee",
      windCoverage: "Up to 130 MPH Maximum",
      tearOffDisposal: "Fully Covered in Approved Claims",
      flashingCoverage: "10-Year Flashing & Valley Seal",
      transferable: "1-Time Free Transfer to New Buyer",
      bestFor: "Standard residential tear-offs and replacements"
    },
    {
      name: "Factory-Certified Lifetime Non-Prorated",
      badge: "Golden System Defense",
      highlight: false,
      materialWarranty: "50-Year 100% Non-Prorated",
      workmanship: "25-Year Manufacturer-Backed Workmanship",
      windCoverage: "Up to 140–150 MPH Hurricane Rated",
      tearOffDisposal: "100% Fully Reimbursed",
      flashingCoverage: "25-Year Full System Infiltration",
      transferable: "Fully Transferable (Adds Home Resale Value)",
      bestFor: "Long-term legacy homes, luxury estates, and commercial"
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-brand-border p-6 sm:p-8 shadow-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparent Protection Breakdown</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-navy mb-2">
          Multi-Tier Warranty Protection Comparison
        </h3>
        <p className="text-sm text-brand-muted leading-relaxed">
          Not all roof warranties are created equal. Understand exactly what separates standard cut-rate contractor promises from manufacturer-backed non-prorated guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
              tier.highlight
                ? 'bg-slate-900 text-white border-2 border-brand-copper shadow-2xl scale-[1.02]'
                : 'bg-slate-50 text-slate-800 border border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    tier.highlight
                      ? 'bg-brand-copper text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tier.badge}
                </span>
                {tier.highlight && <Award className="w-5 h-5 text-brand-copper" />}
              </div>

              <h4 className="font-heading font-extrabold text-lg mb-4">
                {tier.name}
              </h4>

              <div className="space-y-3.5 text-xs">
                <div className="pb-2.5 border-b border-slate-200/20">
                  <span className="block text-[10px] uppercase font-bold text-brand-muted mb-0.5">
                    Material Warranty
                  </span>
                  <span className="font-semibold">{tier.materialWarranty}</span>
                </div>

                <div className="pb-2.5 border-b border-slate-200/20">
                  <span className="block text-[10px] uppercase font-bold text-brand-muted mb-0.5">
                    Labor & Workmanship
                  </span>
                  <span className="font-semibold">{tier.workmanship}</span>
                </div>

                <div className="pb-2.5 border-b border-slate-200/20">
                  <span className="block text-[10px] uppercase font-bold text-brand-muted mb-0.5">
                    Wind Blow-Off Resistance
                  </span>
                  <span className="font-semibold">{tier.windCoverage}</span>
                </div>

                <div className="pb-2.5 border-b border-slate-200/20">
                  <span className="block text-[10px] uppercase font-bold text-brand-muted mb-0.5">
                    Tear-Off & Disposal
                  </span>
                  <span className="font-semibold">{tier.tearOffDisposal}</span>
                </div>

                <div className="pb-2.5 border-b border-slate-200/20">
                  <span className="block text-[10px] uppercase font-bold text-brand-muted mb-0.5">
                    Flashing & Penetration Seal
                  </span>
                  <span className="font-semibold">{tier.flashingCoverage}</span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase font-bold text-brand-muted mb-0.5">
                    Home Resale Transferability
                  </span>
                  <span className="font-semibold">{tier.transferable}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/20">
              <span className="block text-[11px] text-slate-400 mb-3">
                <strong>Best For:</strong> {tier.bestFor}
              </span>
              <Link
                to="/request-estimate"
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  tier.highlight
                    ? 'bg-brand-copper hover:bg-brand-copper-hover text-white shadow-md'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                <span>Select Warranty Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
