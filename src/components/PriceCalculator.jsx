import React, { useState } from 'react';
import { Sparkles, Calculator, Building2, ShieldCheck, Landmark, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_INFO } from '../data/projectData';

export default function PriceCalculator() {
  const [areaSqFt, setAreaSqFt] = useState(1200);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const interestRate = 8.5;

  const baseCost = areaSqFt * PROJECT_INFO.baseRatePerSqFt;
  const stampDuty = Math.round(baseCost * 0.066);
  const downPayment = Math.round((baseCost * downPaymentPercent) / 100);
  const loanAmount = baseCost - downPayment;

  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const formatLakhs = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    return `₹${(val / 100000).toFixed(2)} L`;
  };

  // Percentage calculations for glowing slider trails
  const areaPercent = Math.min(100, Math.max(0, ((areaSqFt - 1000) / (3000 - 1000)) * 100));
  const downPaymentSliderPercent = Math.min(100, Math.max(0, ((downPaymentPercent - 20) / (80 - 20)) * 100));
  const tenurePercent = Math.min(100, Math.max(0, ((tenureYears - 5) / (25 - 5)) * 100));

  const presets = [
    { label: "1,200 sqft (30×40)", val: 1200 },
    { label: "1,350 sqft (30×45)", val: 1350 },
    { label: "1,500 sqft (30×50)", val: 1500 },
    { label: "2,000 sqft (Odd)", val: 2000 },
    { label: "2,400 sqft (40×60)", val: 2400 }
  ];

  return (
    <section id="calculator" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning</span>
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Price & <span className="gold-gradient-text">EMI Calculator</span>
          </h2>
          <p className="text-xs text-sub-color mt-1.5">
            Interactive investment estimate based on ₹{PROJECT_INFO.baseRatePerSqFt.toLocaleString('en-IN')}/Sq.Ft base rate
          </p>
        </motion.div>

        {/* Calculator Main Living Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 340, damping: 25 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-white/12 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center transform-gpu will-change-transform"
        >
          
          {/* Left Controls: Sliders with Glowing Trails */}
          <div className="md:col-span-7 space-y-7">
            
            {/* Quick Presets with Sliding Indicator Pill */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-main-color">Popular Plot Dimensions:</span>
                <span className="text-[11px] text-amber-500 font-mono">Instant Presets</span>
              </div>
              <div className="flex flex-wrap gap-2 p-1 rounded-2xl neo-inset">
                {presets.map((p) => {
                  const isActive = areaSqFt === p.val;
                  return (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setAreaSqFt(p.val)}
                      className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-slate-950 font-bold'
                          : 'text-sub-color hover:text-main-color'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="calc-preset-pill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.5)] -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Area Slider with Glowing Trail */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-sub-color font-medium">Selected Plot Footprint:</span>
                <span className="text-amber-500 font-bold font-mono text-sm px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">
                  {areaSqFt.toLocaleString('en-IN')} Sq.Ft
                </span>
              </div>

              {/* Glowing Interactive Track */}
              <div className="relative h-4 flex items-center">
                {/* Background Rail */}
                <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 shadow-inner overflow-hidden">
                  {/* Glowing Trail Fill */}
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_14px_rgba(245,158,11,0.85),0_0_5px_rgba(251,191,36,0.9)] transition-all duration-75"
                    style={{ width: `${areaPercent}%` }}
                  />
                </div>

                {/* Range Input with Touch Grabber */}
                <input
                  type="range"
                  min="1000"
                  max="3000"
                  step="50"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  className="luxury-slider absolute inset-0 w-full h-full z-10"
                  aria-label="Plot Size in Square Feet"
                />
              </div>
              <div className="flex justify-between text-[10px] text-sub-color font-mono">
                <span>1,000 Sq.Ft (Compact)</span>
                <span>2,000 Sq.Ft</span>
                <span>3,000 Sq.Ft (Estate)</span>
              </div>
            </div>

            {/* Down Payment Slider with Glowing Trail */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-sub-color font-medium">Down Payment Ratio ({downPaymentPercent}%):</span>
                <span className="text-emerald-500 font-bold font-mono text-sm px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  {formatLakhs(downPayment)}
                </span>
              </div>

              {/* Glowing Interactive Track */}
              <div className="relative h-4 flex items-center">
                <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 shadow-inner overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.85),0_0_5px_rgba(52,211,153,0.9)] transition-all duration-75"
                    style={{ width: `${downPaymentSliderPercent}%` }}
                  />
                </div>

                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="luxury-slider absolute inset-0 w-full h-full z-10"
                  aria-label="Down Payment Percentage"
                />
              </div>
              <div className="flex justify-between text-[10px] text-sub-color font-mono">
                <span>20% (Max Bank Loan)</span>
                <span>50%</span>
                <span>80% (Self-Funded)</span>
              </div>
            </div>

            {/* Loan Tenure Slider with Glowing Trail */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-sub-color font-medium">Financing Tenure:</span>
                <span className="text-main-color font-bold font-mono text-sm px-2.5 py-0.5 rounded-full bg-slate-500/10 border border-slate-500/25">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>

              {/* Glowing Interactive Track */}
              <div className="relative h-4 flex items-center">
                <div className="absolute inset-x-0 h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80 shadow-inner overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_14px_rgba(245,158,11,0.85),0_0_5px_rgba(251,191,36,0.9)] transition-all duration-75"
                    style={{ width: `${tenurePercent}%` }}
                  />
                </div>

                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="luxury-slider absolute inset-0 w-full h-full z-10"
                  aria-label="Loan Tenure in Years"
                />
              </div>
              <div className="flex justify-between text-[10px] text-sub-color font-mono">
                <span>5 Years (Rapid Payoff)</span>
                <span>15 Years</span>
                <span>25 Years (Lowest EMI)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Result Dossier & Pure Informational Cost Card */}
          <div className="md:col-span-5 neo-inset rounded-3xl p-6 flex flex-col justify-between space-y-5 border border-white/30 dark:border-white/10 shadow-lg">
            
            <div className="space-y-4">
              <div className="text-center pb-2 border-b border-theme-subtle">
                <p className="text-[11px] font-semibold text-sub-color uppercase tracking-wider">
                  Estimated Total Plot Value
                </p>
                <p className="text-3xl sm:text-4xl font-extrabold text-main-color font-serif-luxury mt-1">
                  {formatLakhs(baseCost)}
                </p>
                <p className="text-[10.5px] text-sub-color mt-0.5">
                  @ ₹{PROJECT_INFO.baseRatePerSqFt.toLocaleString('en-IN')}/Sq.Ft • Clear Title Demarcated
                </p>
              </div>

              {/* Monthly EMI Hero Capsule */}
              <div className="py-3 px-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center shadow-sm">
                <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                  Indicative Monthly EMI
                </p>
                <p className="text-2xl sm:text-3xl font-black text-amber-500 font-mono mt-0.5">
                  ₹{emi.toLocaleString('en-IN')} <span className="text-xs font-normal text-sub-color">/month</span>
                </p>
                <p className="text-[9.5px] text-sub-color mt-1">
                  Calculated @ {interestRate}% p.a. indicative interest for {tenureYears} years
                </p>
              </div>

              {/* Itemized Cost Breakdown List */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between items-center text-sub-color py-1 border-b border-theme-subtle/50">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Down Payment ({downPaymentPercent}%):</span>
                  </span>
                  <span className="font-bold text-main-color font-mono">{formatLakhs(downPayment)}</span>
                </div>

                <div className="flex justify-between items-center text-sub-color py-1 border-b border-theme-subtle/50">
                  <span className="flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Bank Loan Amount:</span>
                  </span>
                  <span className="font-bold text-emerald-500 font-mono">{formatLakhs(loanAmount)}</span>
                </div>

                <div className="flex justify-between items-center text-sub-color py-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Govt Registration & Stamp:</span>
                  </span>
                  <span className="font-bold text-main-color font-mono">~{formatLakhs(stampDuty)}</span>
                </div>
              </div>
            </div>

            {/* Informational Assurance Note & WhatsApp Assistance */}
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-theme-subtle text-[11px] text-sub-color leading-relaxed">
                <p>
                  <strong className="text-main-color">Approved Project:</strong> SBI, HDFC, ICICI & leading nationalized banks sanction up to 80% loan with immediate Khata registration on site.
                </p>
              </div>

              <a
                href={`https://wa.me/919900090049?text=${encodeURIComponent(`Hi MVK Team! I checked the calculator for a ${areaSqFt} Sq.Ft plot (Est. ${formatLakhs(baseCost)}). Could you share the approved bank loan sheet for this configuration?`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask Bank Loan Details on WhatsApp</span>
              </a>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}


