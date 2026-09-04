import React, { useState } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_INFO } from '../data/projectData';

export default function PriceCalculator({ onOpenModal }) {
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

  // Dynamic slider percentages for smooth glowing trail backgrounds
  const areaPercent = Math.min(100, Math.max(0, ((areaSqFt - 1000) / (3000 - 1000)) * 100));
  const downPaymentPercentVal = Math.min(100, Math.max(0, ((downPaymentPercent - 20) / (80 - 20)) * 100));
  const tenurePercent = Math.min(100, Math.max(0, ((tenureYears - 5) / (25 - 5)) * 100));

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
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Transparency
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Price & <span className="gold-gradient-text">EMI Calculator</span>
          </h2>
        </motion.div>

        {/* Calculator Main Grid */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 340, damping: 25 }}
          className="apple-living-glass rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center transform-gpu will-change-transform"
        >

          
          {/* Controls */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "1,200 sqft", val: 1200 },
                { label: "1,350 sqft", val: 1350 },
                { label: "1,500 sqft", val: 1500 },
                { label: "2,000 sqft", val: 2000 }
              ].map((p) => (
                <motion.button
                  key={p.val}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAreaSqFt(p.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    areaSqFt === p.val
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                      : 'neo-inset text-sub-color hover:text-main-color'
                  }`}
                >
                  {p.label}
                </motion.button>
              ))}
            </div>

            {/* Area Slider with Glowing Trail */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-sub-color">Plot Size:</span>
                <span className="text-amber-500 font-bold font-mono text-sm">{areaSqFt.toLocaleString('en-IN')} Sq.Ft</span>
              </div>
              <input
                type="range"
                min="1000"
                max="3000"
                step="50"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #fbbf24 ${areaPercent}%, rgba(148, 163, 184, 0.22) ${areaPercent}%, rgba(148, 163, 184, 0.22) 100%)`
                }}
                className="luxury-slider"
              />
            </div>

            {/* Down Payment Slider with Glowing Trail */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-sub-color">Down Payment ({downPaymentPercent}%):</span>
                <span className="text-emerald-500 font-bold font-mono text-sm">{formatLakhs(downPayment)}</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #34d399 ${downPaymentPercentVal}%, rgba(148, 163, 184, 0.22) ${downPaymentPercentVal}%, rgba(148, 163, 184, 0.22) 100%)`
                }}
                className="luxury-slider"
              />
            </div>

            {/* Tenure Slider with Glowing Trail */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-sub-color">Tenure:</span>
                <span className="text-main-color font-bold font-mono text-sm">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #fbbf24 ${tenurePercent}%, rgba(148, 163, 184, 0.22) ${tenurePercent}%, rgba(148, 163, 184, 0.22) 100%)`
                }}
                className="luxury-slider"
              />
            </div>

          </div>

          {/* Result Card */}
          <div className="md:col-span-5 apple-living-glass rounded-2xl p-6 flex flex-col justify-between space-y-4 text-center border-amber-500/25 shadow-xl">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-sub-color uppercase tracking-wider">Estimated Total Value</p>
              <p className="text-3xl font-extrabold text-main-color font-serif-luxury">{formatLakhs(baseCost)}</p>
              
              <div className="py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-center shadow-inner">
                <p className="text-[10px] text-amber-500 uppercase tracking-wider font-semibold">Monthly EMI</p>
                <p className="text-2xl font-black text-amber-500 font-mono mt-0.5">
                  ₹{emi.toLocaleString('en-IN')} <span className="text-xs font-normal text-sub-color">/mo</span>
                </p>
              </div>

              <div className="flex justify-between text-[11px] text-sub-color px-1">
                <span>Govt Reg & Stamp: ~{formatLakhs(stampDuty)}</span>
                <span>Bank Loan: {formatLakhs(loanAmount)}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I%20used%20the%20EMI%20calculator%20for%20a%20${areaSqFt}%20Sq.Ft%20plot%20(Estimated%20Total%3A%20${encodeURIComponent(formatLakhs(baseCost))}%2C%20EMI%3A%20%E2%82%B9${emi.toLocaleString('en-IN')}%2Fmo).%20Please%20share%20the%20official%20cost%20sheet%20breakdown.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Inquire Cost Sheet on WhatsApp</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}


