import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxClouds() {
  const { scrollY } = useScroll();

  // Responsive spring smoothing
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 24,
    mass: 0.5
  });

  // =========================================================================
  // 1. ANIME-WIND: Vertical Air / Streamlines (From mvk-iktara.vercel.app)
  // Shoots upward with staggered offsets as the user scrolls
  // =========================================================================
  const windY1 = useTransform(smoothY, [50, 550], ["40vh", "-65vh"]);
  const windY2 = useTransform(smoothY, [80, 600], ["45vh", "-70vh"]);
  const windY3 = useTransform(smoothY, [60, 520], ["35vh", "-60vh"]);
  const windY4 = useTransform(smoothY, [90, 620], ["50vh", "-75vh"]);
  const windY5 = useTransform(smoothY, [70, 570], ["40vh", "-65vh"]);

  const windScaleY = useTransform(smoothY, [50, 250, 550], [0.35, 1.2, 0.5]);
  const windOpacity = useTransform(smoothY, [50, 180, 420, 580], [0, 1, 0.9, 0]);

  // Secondary ambient wind lines for deeper page scroll
  const deepWindY = useTransform(smoothY, [1200, 2600], ["60vh", "-80vh"]);
  const deepWindOpacity = useTransform(smoothY, [1200, 1500, 2200, 2600], [0, 0.7, 0.7, 0]);

  // =========================================================================
  // 2. ANIME-CLOUD: Volumetric Cloud Billows (From mvk-iktara.vercel.app)
  // Explodes upward, scales from 0 to 4.2x, then balloons to 18x to reveal site
  // =========================================================================
  const cloud1Y = useTransform(smoothY, [200, 550, 850], ["60vh", "-10vh", "-25vh"]);
  const cloud1Scale = useTransform(smoothY, [200, 550, 850], [0.1, 3.8, 16]);
  const cloud1Opacity = useTransform(smoothY, [200, 380, 680, 850], [0, 0.92, 0.92, 0]);

  const cloud2Y = useTransform(smoothY, [240, 600, 900], ["65vh", "-15vh", "-30vh"]);
  const cloud2Scale = useTransform(smoothY, [240, 600, 900], [0.1, 4.2, 18]);
  const cloud2Opacity = useTransform(smoothY, [240, 420, 720, 900], [0, 0.95, 0.95, 0]);

  const cloud3Y = useTransform(smoothY, [220, 580, 880], ["55vh", "-5vh", "-20vh"]);
  const cloud3Scale = useTransform(smoothY, [220, 580, 880], [0.1, 3.5, 15]);
  const cloud3Opacity = useTransform(smoothY, [220, 400, 700, 880], [0, 0.9, 0.9, 0]);

  const cloud4Y = useTransform(smoothY, [260, 640, 950], ["70vh", "-20vh", "-35vh"]);
  const cloud4Scale = useTransform(smoothY, [260, 640, 950], [0.1, 4.5, 20]);
  const cloud4Opacity = useTransform(smoothY, [260, 450, 750, 950], [0, 0.96, 0.96, 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden flex items-end justify-center select-none">
      
      {/* ======================================================================= */}
      {/* 5 VERTICAL AIR / WIND STREAMLINES (Matching mvk-iktara.vercel.app)       */}
      {/* ======================================================================= */}
      <motion.div
        style={{ y: windY1, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[12%] w-[2px] h-[45vh] bg-gradient-to-t from-white/0 via-white to-white/0 shadow-[0_0_18px_#fff] dark:shadow-[0_0_18px_#fff] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY2, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[32%] w-[3px] h-[65vh] bg-gradient-to-t from-white/0 via-amber-200 to-white/0 shadow-[0_0_22px_#fff] dark:shadow-[0_0_22px_#fff] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY3, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[58%] w-[1.5px] h-[38vh] bg-gradient-to-t from-white/0 via-white to-white/0 shadow-[0_0_14px_#fff] dark:shadow-[0_0_14px_#fff] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY4, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[78%] w-[3px] h-[55vh] bg-gradient-to-t from-white/0 via-amber-100 to-white/0 shadow-[0_0_18px_#fff] dark:shadow-[0_0_18px_#fff] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY5, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[92%] w-[2px] h-[42vh] bg-gradient-to-t from-white/0 via-white to-white/0 shadow-[0_0_16px_#fff] dark:shadow-[0_0_16px_#fff] transform-gpu will-change-transform"
      />

      {/* Deep Page Ambient Wind Lines (Repeat deeper down the page) */}
      <motion.div
        style={{ y: deepWindY, opacity: deepWindOpacity }}
        className="absolute bottom-0 left-[22%] w-[2px] h-[50vh] bg-gradient-to-t from-white/0 via-white to-white/0 shadow-[0_0_15px_#fff] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: deepWindY, opacity: deepWindOpacity }}
        className="absolute bottom-0 right-[25%] w-[2px] h-[55vh] bg-gradient-to-t from-white/0 via-amber-200 to-white/0 shadow-[0_0_15px_#fff] transform-gpu will-change-transform"
      />

      {/* ======================================================================= */}
      {/* 4 VOLUMETRIC CLOUD BILLOWS (Matching mvk-iktara.vercel.app)             */}
      {/* ======================================================================= */}
      {/* Cloud 1: Bottom Left (60vw x 60vw) */}
      <motion.div
        style={{ y: cloud1Y, scale: cloud1Scale, opacity: cloud1Opacity }}
        className="anime-cloud absolute bottom-0 left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-tr from-white via-slate-100 to-amber-50 dark:from-[#0d1219] dark:via-[#161d28] dark:to-[#1f2737] rounded-full blur-[4px] shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] transform-gpu will-change-transform"
      />

      {/* Cloud 2: Bottom Mid-Left (80vw x 80vw) */}
      <motion.div
        style={{ y: cloud2Y, scale: cloud2Scale, opacity: cloud2Opacity }}
        className="anime-cloud absolute bottom-[-10%] left-[20%] w-[80vw] h-[80vw] bg-gradient-to-tr from-white via-slate-50 to-white dark:from-[#0b0e14] dark:via-[#141b26] dark:to-[#1a2332] rounded-full blur-[8px] shadow-[0_0_60px_rgba(0,0,0,0.18)] dark:shadow-[0_0_60px_rgba(0,0,0,0.7)] transform-gpu will-change-transform"
      />

      {/* Cloud 3: Bottom Right (50vw x 50vw) */}
      <motion.div
        style={{ y: cloud3Y, scale: cloud3Scale, opacity: cloud3Opacity }}
        className="anime-cloud absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tl from-white via-amber-50 to-slate-100 dark:from-[#0d1219] dark:via-[#161d28] dark:to-[#1f2737] rounded-full blur-[4px] shadow-[0_0_45px_rgba(0,0,0,0.15)] dark:shadow-[0_0_45px_rgba(0,0,0,0.6)] transform-gpu will-change-transform"
      />

      {/* Cloud 4: Bottom Center-Right Enormous Billow (100vw x 100vw) */}
      <motion.div
        style={{ y: cloud4Y, scale: cloud4Scale, opacity: cloud4Opacity }}
        className="anime-cloud absolute bottom-[-20%] right-[25%] w-[100vw] h-[100vw] bg-gradient-to-t from-white via-white to-slate-50 dark:from-[#070a0f] dark:via-[#0e141c] dark:to-[#141b25] rounded-full blur-[10px] shadow-[0_0_70px_rgba(0,0,0,0.2)] dark:shadow-[0_0_70px_rgba(0,0,0,0.8)] transform-gpu will-change-transform"
      />

    </div>
  );
}
