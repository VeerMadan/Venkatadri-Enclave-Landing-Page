import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxClouds({ progress: externalProgress }) {
  const { scrollY } = useScroll();

  // Snappy spring for buttery smooth scroll interpolation
  const internalSmooth = useSpring(useTransform(scrollY, [0, 4000], [0, 1]), {
    stiffness: 110,
    damping: 24,
    mass: 0.5
  });

  const progress = externalProgress || internalSmooth;

  // =========================================================================
  // 1. ANIME-WIND: Golden Air / Wind Streamlines (0.42 -> 0.82)
  // Shoots upward as the visitor scrolls past the main picture!
  // =========================================================================
  const windY1 = useTransform(progress, [0.42, 0.78], ["45vh", "-75vh"]);
  const windY2 = useTransform(progress, [0.45, 0.82], ["50vh", "-80vh"]);
  const windY3 = useTransform(progress, [0.43, 0.76], ["40vh", "-70vh"]);
  const windY4 = useTransform(progress, [0.46, 0.84], ["55vh", "-85vh"]);
  const windY5 = useTransform(progress, [0.44, 0.80], ["45vh", "-75vh"]);

  const windScaleY = useTransform(progress, [0.42, 0.60, 0.84], [0.3, 1.4, 0.4]);
  // Visible during the transition past the image
  const windOpacity = useTransform(progress, [0.40, 0.46, 0.76, 0.86], [0, 1, 0.9, 0]);

  // =========================================================================
  // 2. ANIME-CLOUD: Volumetric Pure White Cloud Billows (0.48 -> 0.92)
  // Explodes upward, scales from 0.1 to 4.5x, then balloons to 20x to part open!
  // =========================================================================
  const cloud1Y = useTransform(progress, [0.48, 0.70, 0.90], ["65vh", "-10vh", "-30vh"]);
  const cloud1Scale = useTransform(progress, [0.48, 0.70, 0.90], [0.1, 4.2, 18]);
  const cloud1Opacity = useTransform(progress, [0.46, 0.54, 0.82, 0.92], [0, 0.98, 0.98, 0]);

  const cloud2Y = useTransform(progress, [0.50, 0.73, 0.92], ["70vh", "-15vh", "-35vh"]);
  const cloud2Scale = useTransform(progress, [0.50, 0.73, 0.92], [0.1, 4.6, 20]);
  const cloud2Opacity = useTransform(progress, [0.48, 0.56, 0.84, 0.94], [0, 0.98, 0.98, 0]);

  const cloud3Y = useTransform(progress, [0.49, 0.71, 0.91], ["60vh", "-5vh", "-28vh"]);
  const cloud3Scale = useTransform(progress, [0.49, 0.71, 0.91], [0.1, 4.0, 16]);
  const cloud3Opacity = useTransform(progress, [0.47, 0.55, 0.83, 0.93], [0, 0.96, 0.96, 0]);

  const cloud4Y = useTransform(progress, [0.52, 0.75, 0.94], ["75vh", "-20vh", "-40vh"]);
  const cloud4Scale = useTransform(progress, [0.52, 0.75, 0.94], [0.1, 5.0, 22]);
  const cloud4Opacity = useTransform(progress, [0.50, 0.58, 0.86, 0.96], [0, 0.99, 0.99, 0]);

  // Ambient gentle cloud drift for ongoing atmosphere
  const ambientCloudY = useTransform(progress, [0, 1], [-20, -120]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex items-end justify-center select-none">
      
      {/* ======================================================================= */}
      {/* AMBIENT PERIPHERAL CLOUDS (Subtle wisps always present at edges)        */}
      {/* ======================================================================= */}
      <motion.div
        style={{ y: ambientCloudY }}
        className="absolute top-8 -left-16 w-80 sm:w-96 opacity-60 dark:opacity-30 transform-gpu will-change-transform"
      >
        <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
          <path
            d="M60 150C35 150 15 130 15 105C15 80 35 60 60 60C70 60 80 64 88 68C100 35 135 15 180 15C230 15 270 40 285 80C298 70 320 65 342 65C385 65 420 95 420 135L45 150Z"
            fill="url(#ambGrad1)"
          />
          <defs>
            <linearGradient id="ambGrad1" x1="0" y1="0" x2="420" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#F1F5F9" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        style={{ y: ambientCloudY }}
        className="absolute top-16 -right-16 w-80 sm:w-96 opacity-60 dark:opacity-30 transform-gpu will-change-transform"
      >
        <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
          <path
            d="M440 150C465 150 485 130 485 105C485 80 465 60 440 60C430 60 420 64 412 68C400 35 365 15 320 15C270 15 230 40 215 80C202 70 180 65 158 65C115 65 80 95 80 135L455 150Z"
            fill="url(#ambGrad2)"
          />
          <defs>
            <linearGradient id="ambGrad2" x1="500" y1="0" x2="80" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FEF3C7" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ======================================================================= */}
      {/* 5 GOLDEN AIR / WIND SPEED LINES (Triggers past main picture dwell)      */}
      {/* ======================================================================= */}
      <motion.div
        style={{ y: windY1, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[12%] w-[2.5px] h-[48vh] bg-gradient-to-t from-transparent via-amber-400 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.9)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY2, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[32%] w-[3.5px] h-[68vh] bg-gradient-to-t from-transparent via-amber-300 to-transparent shadow-[0_0_26px_rgba(251,191,36,0.95)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY3, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[58%] w-[2px] h-[42vh] bg-gradient-to-t from-transparent via-yellow-200 to-transparent shadow-[0_0_18px_rgba(254,240,138,0.9)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY4, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[78%] w-[3.5px] h-[58vh] bg-gradient-to-t from-transparent via-amber-400 to-transparent shadow-[0_0_24px_rgba(245,158,11,0.9)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY5, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[92%] w-[2.5px] h-[46vh] bg-gradient-to-t from-transparent via-amber-300 to-transparent shadow-[0_0_20px_rgba(251,191,36,0.9)] transform-gpu will-change-transform"
      />

      {/* ======================================================================= */}
      {/* 4 VOLUMETRIC PURE WHITE CLOUD BILLOWS (Bright, Fluffy, 100% White)     */}
      {/* ======================================================================= */}
      {/* Cloud 1: Bottom Left (60vw x 60vw) */}
      <motion.div
        style={{ y: cloud1Y, scale: cloud1Scale, opacity: cloud1Opacity }}
        className="anime-cloud absolute bottom-0 left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-tr from-white via-white/95 to-slate-100 rounded-full blur-[4px] shadow-[0_0_60px_rgba(255,255,255,0.8),0_20px_50px_rgba(0,0,0,0.15)] transform-gpu will-change-transform"
      />

      {/* Cloud 2: Bottom Mid-Left (80vw x 80vw) */}
      <motion.div
        style={{ y: cloud2Y, scale: cloud2Scale, opacity: cloud2Opacity }}
        className="anime-cloud absolute bottom-[-10%] left-[20%] w-[80vw] h-[80vw] bg-gradient-to-tr from-white via-white to-slate-50 rounded-full blur-[8px] shadow-[0_0_70px_rgba(255,255,255,0.85),0_25px_60px_rgba(0,0,0,0.18)] transform-gpu will-change-transform"
      />

      {/* Cloud 3: Bottom Right (50vw x 50vw) */}
      <motion.div
        style={{ y: cloud3Y, scale: cloud3Scale, opacity: cloud3Opacity }}
        className="anime-cloud absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tl from-white via-white/95 to-amber-50/50 rounded-full blur-[4px] shadow-[0_0_55px_rgba(255,255,255,0.8),0_20px_45px_rgba(0,0,0,0.15)] transform-gpu will-change-transform"
      />

      {/* Cloud 4: Bottom Center-Right Enormous Billow (100vw x 100vw) */}
      <motion.div
        style={{ y: cloud4Y, scale: cloud4Scale, opacity: cloud4Opacity }}
        className="anime-cloud absolute bottom-[-20%] right-[25%] w-[100vw] h-[100vw] bg-gradient-to-t from-white via-white to-slate-100 rounded-full blur-[10px] shadow-[0_0_80px_rgba(255,255,255,0.9),0_30px_70px_rgba(0,0,0,0.2)] transform-gpu will-change-transform"
      />

    </div>
  );
}
