import React from 'react';
import { MapPin, FileCheck, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BrochureHeroBanner() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-4">
      {/* Top Architectural Showcase Banner (Left Phone Reference) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-theme-subtle min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-5 sm:p-7 group"
      >
        {/* Background Image with subtle zoom on load */}
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src="/images/grand-entrance-mobile.jpg"
          alt="Venkatadri Enclave Premium Residential Plots Bengaluru"
          className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform"
        />

        {/* Ambient Gradient Veil for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        {/* Brand Overlay Content */}
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 backdrop-blur-md text-[10px] text-amber-300 font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>BMRDA & HPA Sanctioned</span>
          </div>

          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-wide">
              VENKATADRI <span className="text-amber-400">ENCLAVE</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-white/80 font-medium tracking-wider uppercase mt-0.5">
              Premium Residential Plots in Bengaluru
            </p>
          </div>

          {/* 3 Pill Badges from Reference Image */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[10.5px] text-white font-medium">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Prime Location</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md">
              <FileCheck className="w-3 h-3 text-emerald-400" />
              <span>Clear Titles</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Great Connectivity</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
