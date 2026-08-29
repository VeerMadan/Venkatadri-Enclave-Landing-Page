import React from 'react';
import { ShieldCheck, MapPin, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_INFO } from '../data/projectData';

export default function Hero({ onOpenModal }) {
  return (
    <section id="overview" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/grand-entrance.jpg"
          alt="MVK Venkatadri Enclave"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-105"
        />
        {/* Modern clean gradient overlay matching theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/80 to-[var(--bg-page)]/40 transition-colors duration-300"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Minimalist Approvals Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-bold tracking-wider uppercase text-sub-color">
            HPA & BMRDA APPROVED • A & E KHATA
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="font-serif-luxury text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-main-color leading-none">
            VENKATADRI <span className="gold-gradient-text">ENCLAVE</span>
          </h1>
          <p className="font-serif italic text-sm sm:text-lg text-amber-500 font-light max-w-xl mx-auto">
            "{PROJECT_INFO.tagline}"
          </p>
          <p className="text-xs sm:text-sm text-sub-color tracking-wide max-w-lg mx-auto flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Bagaluru Main Road, Yelahanka, Bengaluru - 560064</span>
          </p>
        </motion.div>

        {/* 4 Minimalist Glassmorphic Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20px" }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto my-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel glass-panel-hover rounded-2xl p-3.5 text-center cursor-pointer">
            <p className="text-[10px] font-medium text-sub-color uppercase tracking-wider">Project Size</p>
            <p className="text-lg sm:text-xl font-bold text-main-color font-serif-luxury mt-0.5">6 Acres</p>
            <span className="text-[10px] text-sub-color">Gated Layout</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel glass-panel-hover rounded-2xl p-3.5 text-center cursor-pointer">
            <p className="text-[10px] font-medium text-sub-color uppercase tracking-wider">Total Inventory</p>
            <p className="text-lg sm:text-xl font-bold text-main-color font-serif-luxury mt-0.5">111 Plots</p>
            <span className="text-[10px] text-sub-color">East / West / Corner</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel glass-panel-hover rounded-2xl p-3.5 text-center border-amber-500/30 cursor-pointer">
            <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">Property Type</p>
            <p className="text-lg sm:text-xl font-extrabold text-amber-500 font-serif-luxury mt-0.5">Premium</p>
            <span className="text-[10px] text-rose-500 font-medium">Villa Plots</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="glass-panel glass-panel-hover rounded-2xl p-3.5 text-center cursor-pointer">
            <p className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider">Starting Price</p>
            <p className="text-lg sm:text-xl font-bold text-main-color font-serif-luxury mt-0.5">₹7,699</p>
            <span className="text-[10px] text-sub-color">/ Sq.Ft</span>
          </motion.div>
        </motion.div>

        {/* Minimal CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenModal('visit')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Free Site Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenModal('brochure')}
            className="px-5 py-2.5 rounded-full glass-panel text-main-color font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:border-amber-400/40"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span>Download Brochure</span>
          </motion.button>
        </motion.div>

        {/* Minimalist Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-5 text-[11px] text-sub-color mt-8 pt-5 border-t border-theme-subtle"
        >
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Clear Legal Titles
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Ready for Immediate Registration
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Bank Loan Approvals
          </span>
        </motion.div>

      </div>
    </section>
  );
}


