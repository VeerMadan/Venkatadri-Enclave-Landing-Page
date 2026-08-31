import React, { useRef } from 'react';
import { ShieldCheck, MapPin, ArrowRight, Download, ChevronDown, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROJECT_INFO } from '../data/projectData';

export default function Hero({ onOpenModal }) {
  const containerRef = useRef(null);

  // Direct GPU-accelerated scroll progress (Zero extra RAF overhead)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Foreground Content Transformations (Pure GPU compositor properties: translate3d, opacity, scale)
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.94]);
  const pointerEvents = useTransform(scrollYProgress, (v) => (v > 0.35 ? "none" : "auto"));

  // Background Veil Dissolve
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);

  // Background Image Zoom & Illumination (Direct GPU scale & translation)
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1.0, 1.14]);
  const imageY = useTransform(scrollYProgress, [0, 0.8], ["0%", "-2.5%"]);

  // Sunrise Glow Bloom (Hardware accelerated opacity)
  const glowOpacity = useTransform(scrollYProgress, [0.05, 0.45, 0.8], [0, 0.65, 0.25]);

  // Scroll Hint Indicator
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[135vh] sm:h-[145vh] w-full">
      {/* Sticky Viewport Stage */}
      <section 
        id="overview" 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-8 select-none"
      >
        {/* Background Architectural Canvas */}
        <div className="absolute inset-0 z-0 overflow-hidden transform-gpu translate-z-0">
          <motion.img
            src="/images/grand-entrance.jpg"
            alt="MVK Venkatadri Enclave Grand Entrance"
            style={{
              scale: imageScale,
              y: imageY
            }}
            className="w-full h-full object-cover object-center origin-center transform-gpu will-change-transform"
          />

          {/* Golden Sunrise Glow */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu translate-z-0 will-change-transform"
          >
            <div className="w-[80vw] max-w-[600px] h-[80vw] max-h-[600px] rounded-full bg-gradient-to-tr from-amber-500/35 via-amber-300/25 to-orange-400/20 blur-[70px] pointer-events-none" />
          </motion.div>

          {/* Theme-Adaptive Gradient Veil (Dissolves upward on scroll) */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/85 to-[var(--bg-page)]/25 transition-colors duration-300 pointer-events-none will-change-opacity"
          />

          {/* Subtle Radial Vignette for Contrast */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />
        </div>

        {/* Floating Foreground Content Stage */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
            pointerEvents: pointerEvents
          }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center will-change-transform my-auto"
        >
          {/* Approvals Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel mb-4 sm:mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-sub-color">
              HPA & BMRDA APPROVED • A & E KHATA
            </span>
          </motion.div>

          {/* Hero Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.08 }}
            className="space-y-2 sm:space-y-3"
          >
            <h1 className="font-serif-luxury text-3xl min-[380px]:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-main-color leading-none drop-shadow-sm">
              VENKATADRI <span className="gold-gradient-text">ENCLAVE</span>
            </h1>
            <p className="font-serif italic text-xs sm:text-base md:text-lg text-amber-500 font-light max-w-xl mx-auto">
              "{PROJECT_INFO.tagline}"
            </p>
            <p className="text-[11px] sm:text-xs text-sub-color tracking-wide max-w-lg mx-auto flex items-center justify-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Bagaluru Main Road, Yelahanka, Bengaluru - 560064</span>
            </p>
          </motion.div>

          {/* 4 Minimalist Glassmorphic Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-3xl mx-auto my-5 sm:my-7"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glass-panel glass-panel-hover rounded-2xl p-2.5 sm:p-3.5 text-center cursor-pointer shadow-sm">
              <p className="text-[9.5px] sm:text-[10px] font-medium text-sub-color uppercase tracking-wider">Project Size</p>
              <p className="text-base sm:text-xl font-bold text-main-color font-serif-luxury mt-0.5">6 Acres</p>
              <span className="text-[9.5px] sm:text-[10px] text-sub-color">Gated Layout</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glass-panel glass-panel-hover rounded-2xl p-2.5 sm:p-3.5 text-center cursor-pointer shadow-sm">
              <p className="text-[9.5px] sm:text-[10px] font-medium text-sub-color uppercase tracking-wider">Total Inventory</p>
              <p className="text-base sm:text-xl font-bold text-main-color font-serif-luxury mt-0.5">111 Plots</p>
              <span className="text-[9.5px] sm:text-[10px] text-sub-color">East / West / Corner</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glass-panel glass-panel-hover rounded-2xl p-2.5 sm:p-3.5 text-center border-amber-500/30 cursor-pointer shadow-sm">
              <p className="text-[9.5px] sm:text-[10px] font-semibold text-amber-500 uppercase tracking-wider">Property Type</p>
              <p className="text-base sm:text-xl font-extrabold text-amber-500 font-serif-luxury mt-0.5">Premium</p>
              <span className="text-[9.5px] sm:text-[10px] text-rose-500 font-medium">Villa Plots</span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="glass-panel glass-panel-hover rounded-2xl p-2.5 sm:p-3.5 text-center cursor-pointer shadow-sm">
              <p className="text-[9.5px] sm:text-[10px] font-medium text-emerald-500 uppercase tracking-wider">Starting Price</p>
              <p className="text-base sm:text-xl font-bold text-main-color font-serif-luxury mt-0.5">₹7,699</p>
              <span className="text-[9.5px] sm:text-[10px] text-sub-color">/ Sq.Ft</span>
            </motion.div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenModal('visit')}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Free Site Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenModal('brochure')}
              className="px-4 sm:px-5 py-2.5 rounded-full glass-panel text-main-color font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:border-amber-400/40 shadow-sm"
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
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-sub-color mt-5 sm:mt-6 pt-4 border-t border-theme-subtle"
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

        </motion.div>

        {/* Elegant Scroll Cue Pill (Fades away as you scroll) */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase text-sub-color/80 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-amber-500" />
          </motion.div>
        </motion.div>

      </section>
    </div>
  );
}


