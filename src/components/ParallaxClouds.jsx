import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxClouds({ progress: externalProgress }) {
  // Fallback internal scroll if external progress is not passed
  const { scrollYProgress } = useScroll();
  const internalSmooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.5
  });

  const progress = externalProgress || internalSmooth;

  // =========================================================================
  // SCROLL TRIGGER CURVE: Plays strictly WHEN SCROLLING PAST THE HERO IMAGE!
  // [0.0 -> 0.75]: Main image & text STAY completely clear with zero obstruction.
  // [0.75 -> 1.0]: Golden wind lines shoot up and pure white clouds burst open!
  // =========================================================================

  // 1. GOLDEN AIR / WIND SPEED LINES (0.75 -> 0.98)
  const windY1 = useTransform(progress, [0.75, 0.95], ["40vh", "-75vh"]);
  const windY2 = useTransform(progress, [0.77, 0.97], ["45vh", "-80vh"]);
  const windY3 = useTransform(progress, [0.76, 0.94], ["35vh", "-70vh"]);
  const windY4 = useTransform(progress, [0.78, 0.98], ["50vh", "-85vh"]);
  const windY5 = useTransform(progress, [0.76, 0.96], ["40vh", "-75vh"]);

  const windScaleY = useTransform(progress, [0.75, 0.86, 0.98], [0.3, 1.4, 0.4]);
  // 100% dormant/invisible while user is admiring the main picture (< 0.74)
  const windOpacity = useTransform(progress, [0.73, 0.77, 0.92, 0.98], [0, 1, 0.9, 0]);

  // 2. VOLUMETRIC PURE WHITE CLOUD BILLOWS (0.78 -> 1.0)
  // Erupts upward, expands to 4.5x, then balloons to 20x to part open into next section!
  const cloud1Y = useTransform(progress, [0.79, 0.91, 1.0], ["65vh", "-10vh", "-30vh"]);
  const cloud1Scale = useTransform(progress, [0.79, 0.91, 1.0], [0.1, 4.2, 18]);
  const cloud1Opacity = useTransform(progress, [0.77, 0.83, 0.94, 1.0], [0, 0.96, 0.96, 0]);

  const cloud2Y = useTransform(progress, [0.81, 0.93, 1.0], ["70vh", "-15vh", "-35vh"]);
  const cloud2Scale = useTransform(progress, [0.81, 0.93, 1.0], [0.1, 4.6, 20]);
  const cloud2Opacity = useTransform(progress, [0.79, 0.85, 0.95, 1.0], [0, 0.98, 0.98, 0]);

  const cloud3Y = useTransform(progress, [0.80, 0.92, 1.0], ["60vh", "-5vh", "-28vh"]);
  const cloud3Scale = useTransform(progress, [0.80, 0.92, 1.0], [0.1, 4.0, 16]);
  const cloud3Opacity = useTransform(progress, [0.78, 0.84, 0.94, 1.0], [0, 0.95, 0.95, 0]);

  const cloud4Y = useTransform(progress, [0.82, 0.94, 1.0], ["75vh", "-20vh", "-40vh"]);
  const cloud4Scale = useTransform(progress, [0.82, 0.94, 1.0], [0.1, 5.0, 22]);
  const cloud4Opacity = useTransform(progress, [0.80, 0.86, 0.96, 1.0], [0, 0.98, 0.98, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex items-end justify-center select-none">
      
      {/* ======================================================================= */}
      {/* 5 GOLDEN AIR / WIND SPEED LINES (Triggers strictly as image exits)       */}
      {/* ======================================================================= */}
      <motion.div
        style={{ y: windY1, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[12%] w-[2.5px] h-[48vh] bg-gradient-to-t from-transparent via-amber-400 to-transparent shadow-[0_0_18px_rgba(245,158,11,0.85)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY2, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[32%] w-[3.5px] h-[68vh] bg-gradient-to-t from-transparent via-amber-300 to-transparent shadow-[0_0_24px_rgba(251,191,36,0.95)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY3, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[58%] w-[2px] h-[42vh] bg-gradient-to-t from-transparent via-yellow-200 to-transparent shadow-[0_0_16px_rgba(254,240,138,0.9)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY4, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[78%] w-[3.5px] h-[58vh] bg-gradient-to-t from-transparent via-amber-400 to-transparent shadow-[0_0_22px_rgba(245,158,11,0.9)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: windY5, scaleY: windScaleY, opacity: windOpacity }}
        className="anime-wind absolute bottom-0 left-[92%] w-[2.5px] h-[46vh] bg-gradient-to-t from-transparent via-amber-300 to-transparent shadow-[0_0_18px_rgba(251,191,36,0.85)] transform-gpu will-change-transform"
      />

      {/* ======================================================================= */}
      {/* 4 PURE RADIANT WHITE CLOUD BILLOWS (Bright, Fluffy, 100% White)        */}
      {/* ======================================================================= */}
      {/* Cloud 1: Bottom Left (60vw x 60vw) */}
      <motion.div
        style={{ y: cloud1Y, scale: cloud1Scale, opacity: cloud1Opacity }}
        className="anime-cloud absolute bottom-0 left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-tr from-white via-white/95 to-slate-100 rounded-full blur-[4px] shadow-[0_0_60px_rgba(255,255,255,0.7),0_20px_50px_rgba(0,0,0,0.15)] transform-gpu will-change-transform"
      />

      {/* Cloud 2: Bottom Mid-Left (80vw x 80vw) */}
      <motion.div
        style={{ y: cloud2Y, scale: cloud2Scale, opacity: cloud2Opacity }}
        className="anime-cloud absolute bottom-[-10%] left-[20%] w-[80vw] h-[80vw] bg-gradient-to-tr from-white via-white to-slate-50 rounded-full blur-[8px] shadow-[0_0_70px_rgba(255,255,255,0.8),0_25px_60px_rgba(0,0,0,0.18)] transform-gpu will-change-transform"
      />

      {/* Cloud 3: Bottom Right (50vw x 50vw) */}
      <motion.div
        style={{ y: cloud3Y, scale: cloud3Scale, opacity: cloud3Opacity }}
        className="anime-cloud absolute bottom-[5%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tl from-white via-white/95 to-amber-50/50 rounded-full blur-[4px] shadow-[0_0_55px_rgba(255,255,255,0.7),0_20px_45px_rgba(0,0,0,0.15)] transform-gpu will-change-transform"
      />

      {/* Cloud 4: Bottom Center-Right Enormous Billow (100vw x 100vw) */}
      <motion.div
        style={{ y: cloud4Y, scale: cloud4Scale, opacity: cloud4Opacity }}
        className="anime-cloud absolute bottom-[-20%] right-[25%] w-[100vw] h-[100vw] bg-gradient-to-t from-white via-white to-slate-100 rounded-full blur-[10px] shadow-[0_0_80px_rgba(255,255,255,0.85),0_30px_70px_rgba(0,0,0,0.2)] transform-gpu will-change-transform"
      />

    </div>
  );
}
