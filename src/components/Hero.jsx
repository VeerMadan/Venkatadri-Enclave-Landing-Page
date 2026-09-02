import React, { useRef } from 'react';
import { ShieldCheck, MapPin, ArrowRight, Download, ChevronDown, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECT_INFO } from '../data/projectData';

export default function Hero({ onOpenModal }) {
  const containerRef = useRef(null);

  // Direct GPU-accelerated scroll progress tracking through extended runway container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Snappy physics spring for ultra-luxurious, stutter-free trackpad & wheel interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001
  });

  // 1. Initial Scroll Cue Indicator:
  // Starts visible on gate view, quickly and gracefully dissolves as scroll begins (0.0 -> 0.08)
  const hintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const hintY = useTransform(smoothProgress, [0, 0.08], [0, -12]);

  // 2. Background Architectural Canvas Zoom-Out & Parallax:
  // - Starts zoomed into the grand entrance archway at 1.26
  // - Smoothly zooms out to 1.0 by 0.38 as user enters the layout
  // - Stays locked in pristine resolution across the reading & exploration phase (0.38 -> 0.82)
  // - Gentle subtle parallax continuation (1.0 -> 1.03) during section handoff (0.82 -> 1.0)
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.38, 0.82, 1.0],
    [1.26, 1.0, 1.0, 1.03]
  );
  const imageY = useTransform(
    smoothProgress,
    [0, 0.38, 0.82, 1.0],
    ["-2%", "0%", "0%", "-3%"]
  );

  // 3. Theme-Adaptive Gradient Veil:
  // - Rises and fades in smoothly as the gate zooms out (0.06 -> 0.35)
  // - Maintains optimal contrast throughout the entire dwell window (0.35 -> 0.82)
  // - Seamlessly blends into the incoming section
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.06, 0.35, 0.82, 1.0],
    [0, 0, 0.95, 0.95, 0.85]
  );
  const overlayY = useTransform(
    smoothProgress,
    [0, 0.06, 0.35, 1.0],
    ["12%", "12%", "0%", "0%"]
  );

  // 4. Foreground Hero Stage (Title, Tagline, 4 Metric Boxes, CTAs, Trust Badges):
  // - Stays hidden at the start to showcase the majestic entrance gate (0.0 -> 0.16)
  // - Smoothly elevates and fades in (0.16 -> 0.38)
  // - ROCK-SOLID DWELL & READING ZONE (0.38 -> 0.82):
  //   Holds completely stable, centered, and 100% interactive for generous scroll travel (~900px)!
  //   Completely eliminates the bug where text and boxes rushed away too quickly.
  // - Graceful Exit Curve (0.82 -> 1.0):
  //   Softly floats upward (-35px) and gently dims so ProjectStats rolls in naturally.
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.16, 0.38, 0.82, 1.0],
    [0, 0, 1, 1, 0.2]
  );
  const contentY = useTransform(
    smoothProgress,
    [0, 0.16, 0.38, 0.82, 1.0],
    [45, 45, 0, 0, -35]
  );
  const contentScale = useTransform(
    smoothProgress,
    [0, 0.16, 0.38, 0.82, 1.0],
    [0.96, 0.96, 1.0, 1.0, 0.98]
  );
  const pointerEvents = useTransform(smoothProgress, (v) =>
    v >= 0.25 && v <= 0.88 ? "auto" : "none"
  );

  return (
    <div ref={containerRef} className="relative h-[270vh] sm:h-[310vh] w-full">
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

          {/* Theme-Adaptive Gradient Veil (Fades and rises up from bottom on scroll to frame text & cards) */}
          <motion.div
            style={{ 
              opacity: overlayOpacity,
              y: overlayY 
            }}
            className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/85 to-[var(--bg-page)]/25 transition-colors duration-300 pointer-events-none will-change-transform will-change-opacity transform-gpu"
          />

          {/* Subtle Radial Vignette for Clean Contrast */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />
        </div>

        {/* Floating Foreground Content Stage (Synchronously controlled by scroll curve) */}
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel mb-3 sm:mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-sub-color">
              HPA & BMRDA APPROVED • A & E KHATA
            </span>
          </div>

          {/* Hero Typography */}
          <div className="space-y-2 sm:space-y-2.5">
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
          </div>

          {/* 4 Minimalist Glassmorphic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-3xl mx-auto my-4 sm:my-6">
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
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenModal('visit')}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Free Site Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <motion.a
              href="/v-e_brochure.pdf"
              download="MVK_Venkatadri_Enclave_Brochure.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-5 py-2.5 rounded-full glass-panel text-main-color font-semibold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:border-amber-400/40 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-500" />
              <span>Download Brochure</span>
            </motion.a>
          </div>

          {/* Minimalist Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-sub-color mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-theme-subtle">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Clear Legal Titles
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Ready for Immediate Registration
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Bank Loan Approvals
            </span>
          </div>

        </motion.div>

        {/* Initial Gate View Cue Pill (Visible on load, fades on scroll) */}
        <motion.div
          style={{
            opacity: hintOpacity,
            y: hintY
          }}
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="px-4 py-2 rounded-full glass-panel border border-amber-400/30 backdrop-blur-md flex items-center gap-2 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-main-color flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Scroll to Enter
            </span>
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-amber-400" />
          </motion.div>
        </motion.div>

      </section>
    </div>
  );
}
