import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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

  return (
    <section id="calculator" className="py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Transparent Pricing
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Plot Cost & <span className="gold-gradient-text">EMI Estimator</span>
          </h2>
        </div>

        {/* Minimalist Glass Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-theme-subtle grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
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
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setAreaSqFt(p.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    areaSqFt === p.val
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'neo-inset text-sub-color hover:text-main-color'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Area Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-sub-color">Plot Size:</span>
                <span className="text-amber-500 font-bold font-mono">{areaSqFt.toLocaleString('en-IN')} Sq.Ft</span>
              </div>
              <input
                type="range"
                min="1000"
                max="3000"
                step="50"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-sub-color">Down Payment ({downPaymentPercent}%):</span>
                <span className="text-emerald-500 font-bold font-mono">{formatLakhs(downPayment)}</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Tenure Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-sub-color">Tenure:</span>
                <span className="text-main-color font-bold font-mono">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

          </div>

          {/* Result Card */}
          <div className="md:col-span-5 neo-inset rounded-2xl p-6 flex flex-col justify-between space-y-4 text-center">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold text-sub-color uppercase tracking-wider">Estimated Total Value</p>
              <p className="text-3xl font-extrabold text-main-color font-serif-luxury">{formatLakhs(baseCost)}</p>
              
              <div className="py-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
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

            <button
              onClick={() => onOpenModal('calculator', `${areaSqFt} SqFt Cost Sheet`)}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:bg-amber-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Full Price Sheet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}


