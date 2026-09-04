import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { PLOT_TYPES } from '../data/projectData';

export default function PlotConfigurations({ onOpenModal }) {
  const [activeId, setActiveId] = useState(PLOT_TYPES[0].id);
  const current = PLOT_TYPES.find((p) => p.id === activeId) || PLOT_TYPES[0];

  return (
    <section id="plots" className="py-12 sm:py-20 bg-page-alt relative border-t border-theme-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Plot Dimensions
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Select Your <span className="gold-gradient-text">Villa Footprint</span>
          </h2>
          <p className="text-xs sm:text-sm text-sub-color mt-1.5">
            Base Rate: <strong className="text-amber-500 font-serif">₹7,699/Sq.Ft</strong> • East & West Facing Available
          </p>
        </div>

        {/* Minimal Neomorphic Tabs with Sliding Indicator */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 rounded-full neo-inset max-w-xl mx-auto">
          {PLOT_TYPES.map((plot) => {
            const isActive = activeId === plot.id;
            return (
              <button
                key={plot.id}
                type="button"
                onClick={() => setActiveId(plot.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2 z-10 ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-sub-color hover:text-main-color'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="plot-config-highlight"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.5)] -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: plot.color }}
                ></span>
                <span>{plot.dimensions}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Plot Feature Glass Card */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="glass-panel rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-white/50 dark:border-white/12 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)] relative overflow-hidden transform-gpu will-change-transform"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Info */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded text-[11px] font-bold text-white shadow"
                  style={{ backgroundColor: current.color }}
                >
                  {current.dimensions}
                </span>
                <span className="text-[11px] text-amber-500 px-2 py-0.5 rounded badge-luxury font-semibold">
                  {current.facing}
                </span>
              </div>

              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-main-color">
                {current.name}
              </h3>
              <p className="text-xs text-sub-color leading-relaxed">
                {current.description}
              </p>

              {/* Minimal Specs with Spring Hover */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="neo-inset rounded-xl p-3 text-center cursor-pointer">
                  <p className="text-[10px] text-sub-color">Area</p>
                  <p className="text-sm font-bold text-main-color font-serif-luxury mt-0.5">
                    {typeof current.areaSqFt === 'number' ? `${current.areaSqFt} SqFt` : current.areaSqFt}
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="neo-inset rounded-xl p-3 text-center cursor-pointer">
                  <p className="text-[10px] text-sub-color">Rate</p>
                  <p className="text-sm font-bold text-amber-500 font-serif-luxury mt-0.5">₹7,699</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="neo-inset rounded-xl p-3 text-center cursor-pointer">
                  <p className="text-[10px] text-sub-color">Est. Price</p>
                  <p className="text-sm font-bold text-emerald-500 font-serif-luxury mt-0.5">
                    {current.estPrice}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right: Action */}
            <div className="md:col-span-5 flex flex-col justify-center space-y-3 neo-inset p-5 rounded-2xl border border-white/30 dark:border-white/10">
              <div className="space-y-1.5">
                {current.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-sub-color">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/919900090049?text=${encodeURIComponent(`Hi MVK Team! I am interested in ${current.name} (${current.dimensions}, ${current.areaSqFt} SqFt) at Venkatadri Enclave. Can you share the latest availability?`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>Enquire via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#plot-finder"
                className="text-center text-[11px] text-amber-500 font-semibold hover:underline block pt-1"
              >
                Explore Live 111-Plot Inventory Matrix ↓
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}



