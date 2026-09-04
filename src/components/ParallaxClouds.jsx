import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxClouds() {
  const { scrollY } = useScroll();

  // Butter-smooth spring physics for organic momentum
  const smoothY = useSpring(scrollY, {
    stiffness: 90,
    damping: 22,
    mass: 0.5
  });

  // =========================================================================
  // SCROLL TRIGGER WINDOW: Starts AFTER the form field bottom (650px - 1600px)
  // Zero interference while visitor is reading or filling the form at the top!
  // =========================================================================

  // 1. GOLDEN AIR / WIND SPEED LINES (Golden Amber & Champagne Glow)
  const windY1 = useTransform(smoothY, [650, 1250], ["40vh", "-70vh"]);
  const windY2 = useTransform(smoothY, [700, 1320], ["45vh", "-75vh"]);
  const windY3 = useTransform(smoothY, [670, 1220], ["35vh", "-65vh"]);
  const windY4 = useTransform(smoothY, [720, 1360], ["50vh", "-80vh"]);
  const windY5 = useTransform(smoothY, [690, 1290], ["40vh", "-70vh"]);

  const windScaleY = useTransform(smoothY, [650, 950, 1350], [0.3, 1.4, 0.4]);
  // Strictly 0 opacity before 650px, so form is 100% clean!
  const windOpacity = useTransform(smoothY, [600, 700, 1150, 1380], [0, 1, 0.95, 0]);

  // Secondary ambient gold wind streaks deeper down the page
  const deepWindY = useTransform(smoothY, [1800, 3200], ["60vh", "-80vh"]);
  const deepWindOpacity = useTransform(smoothY, [1700, 2000, 2900, 3300], [0, 0.75, 0.75, 0]);

  // 2. VOLUMETRIC PURE WHITE CLOUDS (100% Radiant Puffy White in both Light & Dark Mode)
  // Erupts upwards past the form, expands to 4.2x, then blasts to 18x to part open!
  const cloud1Y = useTransform(smoothY, [750, 1150, 1550], ["65vh", "-10vh", "-28vh"]);
  const cloud1Scale = useTransform(smoothY, [750, 1150, 1550], [0.1, 4.0, 18]);
  const cloud1Opacity = useTransform(smoothY, [700, 880, 1350, 1580], [0, 0.96, 0.96, 0]);

  const cloud2Y = useTransform(smoothY, [790, 1200, 1600], ["70vh", "-15vh", "-32vh"]);
  const cloud2Scale = useTransform(smoothY, [790, 1200, 1600], [0.1, 4.5, 20]);
  const cloud2Opacity = useTransform(smoothY, [740, 920, 1400, 1620], [0, 0.98, 0.98, 0]);

  const cloud3Y = useTransform(smoothY, [770, 1180, 1580], ["60vh", "-5vh", "-25vh"]);
  const cloud3Scale = useTransform(smoothY, [770, 1180, 1580], [0.1, 3.8, 16]);
  const cloud3Opacity = useTransform(smoothY, [720, 900, 1380, 1600], [0, 0.95, 0.95, 0]);

  const cloud4Y = useTransform(smoothY, [820, 1250, 1650], ["75vh", "-20vh", "-38vh"]);
  const cloud4Scale = useTransform(smoothY, [820, 1250, 1650], [0.1, 4.8, 22]);
  const cloud4Opacity = useTransform(smoothY, [760, 960, 1450, 1680], [0, 0.98, 0.98, 0]);

  return (
    <div className="fixed inset-0 pointer-events-none z-25 overflow-hidden flex items-end justify-center select-none">
      
      {/* ======================================================================= */}
      {/* 5 GOLDEN AIR / WIND SPEED LINES (Triggers past form field bottom)       */}
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

      {/* Deep Page Ambient Golden Wind Lines */}
      <motion.div
        style={{ y: deepWindY, opacity: deepWindOpacity }}
        className="absolute bottom-0 left-[22%] w-[2px] h-[52vh] bg-gradient-to-t from-transparent via-amber-400/80 to-transparent shadow-[0_0_16px_rgba(245,158,11,0.6)] transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: deepWindY, opacity: deepWindOpacity }}
        className="absolute bottom-0 right-[25%] w-[2.5px] h-[58vh] bg-gradient-to-t from-transparent via-yellow-300/80 to-transparent shadow-[0_0_18px_rgba(253,224,71,0.6)] transform-gpu will-change-transform"
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
