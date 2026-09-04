import React, { useRef } from 'react';
import { 
  ShieldCheck, MapPin, ChevronDown, Sparkles, 
  Award, Key, Compass, Zap, CheckCircle2 
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECT_INFO } from '../data/projectData';
import ParallaxClouds from './ParallaxClouds';

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

  const projectHighlights = [
    { title: "HPA & BMRDA Approved", subtitle: "Hoskote Planning Authority Sanctioned", icon: Award },
    { title: "A & E Khata Titles", subtitle: "100% Clear Marketable Ownership", icon: ShieldCheck },
    { title: "Ready for Registration", subtitle: "On-Spot Demarcation & Bank Loans", icon: Key },
    { title: "30 Ft Wide CC Roads", subtitle: "Asphalt Concrete with Curbstones", icon: Compass },
    { title: "100% Underground Grid", subtitle: "Concealed Electricity & Water Network", icon: Zap },
    { title: "Limited 55 Plots", subtitle: "Low-Density 6-Acre Community", icon: CheckCircle2 },
  ];

  // 1. Initial Scroll Cue Indicator:
  const hintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const hintY = useTransform(smoothProgress, [0, 0.08], [0, -12]);

  // 2. Background Architectural Canvas Zoom-Out & Parallax:
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.22, 0.55],
    [1.24, 1.0, 1.0]
  );
  const imageY = useTransform(
    smoothProgress,
    [0, 0.22, 0.55],
    ["-2%", "0%", "0%"]
  );

  // Background Canvas Opacity & Display:
  // Fades out completely to 0 as clouds envelop the screen, ZERO image or white gradient left!
  const bgCanvasOpacity = useTransform(
    smoothProgress,
    [0, 0.44, 0.58, 1.0],
    [1, 1, 0, 0]
  );
  const bgCanvasDisplay = useTransform(smoothProgress, (v) =>
    v > 0.60 ? "none" : "block"
  );

  // 3. Theme-Adaptive Gradient Veil (fades out synchronously with canvas)
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.22, 0.44, 0.58, 1.0],
    [0, 0, 0.95, 0.95, 0, 0]
  );
  const overlayY = useTransform(
    smoothProgress,
    [0, 0.05, 0.22, 0.58],
    ["12%", "12%", "0%", "0%"]
  );

  // 4. Foreground Hero Stage 1 (Title, Tagline, 4 Metric Boxes, Trust Badges)
  // Fully and cleanly dissolves to 0 before the clouds erupt!
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.16, 0.38, 0.46, 1.0],
    [0, 0, 1, 1, 0, 0]
  );
  const contentY = useTransform(
    smoothProgress,
    [0, 0.08, 0.16, 0.38, 0.48],
    [40, 40, 0, 0, -45]
  );
  const contentScale = useTransform(
    smoothProgress,
    [0, 0.08, 0.16, 0.38, 0.48],
    [0.96, 0.96, 1.0, 1.0, 0.90]
  );
  const pointerEvents = useTransform(smoothProgress, (v) =>
    v >= 0.12 && v <= 0.42 ? "auto" : "none"
  );
  const contentDisplay = useTransform(smoothProgress, (v) =>
    v > 0.47 ? "none" : "block"
  );

  // 5. Screen 2: Next Screen - Project Foundations Stage (Emerges under clouds!)
  const nextScreenOpacity = useTransform(
    smoothProgress,
    [0, 0.62, 0.74, 1.0],
    [0, 0, 1, 1]
  );
  const nextScreenY = useTransform(
    smoothProgress,
    [0, 0.62, 0.74, 1.0],
    [35, 35, 0, 0]
  );
  const nextScreenScale = useTransform(
    smoothProgress,
    [0, 0.62, 0.74, 1.0],
    [0.92, 0.92, 1.0, 1.0]
  );
  const nextScreenDisplay = useTransform(smoothProgress, (v) =>
    v < 0.60 ? "none" : "block"
  );
  const nextScreenPointerEvents = useTransform(smoothProgress, (v) =>
    v >= 0.70 ? "auto" : "none"
  );

  return (
    <div ref={containerRef} className="relative h-[200vh] sm:h-[225vh] w-full bg-page-main">
      {/* Sticky Viewport Stage */}
      <section 
        id="overview" 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-8 select-none bg-page-main"
      >
        {/* Background Architectural Canvas (Cleanly disappears when covered with clouds!) */}
        <motion.div
          style={{
            opacity: bgCanvasOpacity,
            display: bgCanvasDisplay
          }}
          className="absolute inset-0 z-0 overflow-hidden transform-gpu translate-z-0"
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 767px)" srcSet="/images/grand-entrance-mobile.jpg" />
            <source media="(min-width: 768px)" srcSet="/images/grand-entrance.jpg" />
            <motion.img
              src="/images/grand-entrance.jpg"
              alt="MVK Venkatadri Enclave Grand Entrance"
              style={{
                scale: imageScale,
                y: imageY
              }}
              className="w-full h-full object-cover object-center origin-center transform-gpu will-change-transform"
            />
          </picture>

          {/* Theme-Adaptive Gradient Veil (Fades out synchronously with canvas) */}
          <motion.div
            style={{ 
              opacity: overlayOpacity,
              y: overlayY 
            }}
            className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/85 to-[var(--bg-page)]/25 transition-colors duration-300 pointer-events-none will-change-transform will-change-opacity transform-gpu"
          />

          {/* Subtle Radial Vignette for Clean Contrast */}
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />

          {/* Top Atmospheric Blend (Seamlessly fades into page background with no hard line) */}
          <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Floating Foreground Content Stage 1 (Synchronously controlled by scroll curve) */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
            scale: contentScale,
            pointerEvents: pointerEvents,
            display: contentDisplay
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

        {/* Screen 2: Next Screen - Project Foundations Stage (Emerges as clouds part!) */}
        <motion.div
          style={{
            y: nextScreenY,
            opacity: nextScreenOpacity,
            scale: nextScreenScale,
            display: nextScreenDisplay,
            pointerEvents: nextScreenPointerEvents
          }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center will-change-transform my-auto"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel mb-3 sm:mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sub-color">
              BMRDA & HPA SANCTIONED • 6-ACRE GATED LAYOUT
            </span>
          </div>

          {/* Section Heading */}
          <div className="space-y-2 mb-5 sm:mb-7">
            <h2 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-main-color">
              The Foundations of <span className="gold-gradient-text">Venkatadri Enclave</span>
            </h2>
            <p className="text-xs sm:text-sm text-sub-color max-w-xl mx-auto leading-relaxed">
              Meticulously planned infrastructure engineered for high-appreciation villa living in North Bengaluru's fastest-growing corridor.
            </p>
          </div>

          {/* 6 Key Foundation Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 max-w-5xl mx-auto">
            {projectHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="glass-panel glass-panel-hover rounded-2xl p-3 sm:p-3.5 text-center flex flex-col items-center justify-center space-y-2 group cursor-pointer shadow-sm transform-gpu will-change-transform"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-main-color group-hover:text-amber-500 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[9.5px] text-sub-color mt-1 leading-tight line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Prompt to continue scrolling */}
          <div className="mt-5 sm:mt-7 flex items-center justify-center gap-1.5 text-xs text-sub-color">
            <span className="text-[11px] font-medium tracking-wide">Scroll down to explore Philosophy, Plots & Master Plan</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
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

        {/* Anime-Wind & Volumetric Pure White Clouds (Triggers strictly as image exits into next section!) */}
        <ParallaxClouds progress={smoothProgress} />

      </section>
    </div>
  );
}
