import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxClouds() {
  const { scrollY } = useScroll();

  // Lightweight, butter-smooth spring physics
  const smoothY = useSpring(scrollY, {
    stiffness: 75,
    damping: 20,
    mass: 0.5
  });

  // Layer 1: Drifts gently upwards as user scrolls down
  const cloud1Y = useTransform(smoothY, [0, 1600], [0, -180]);
  // Layer 2: Drifts downwards with inverse parallax depth
  const cloud2Y = useTransform(smoothY, [0, 1600], [-40, 140]);
  // Layer 3: Slow horizon drift
  const cloud3Y = useTransform(smoothY, [0, 1600], [0, -90]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden select-none">
      {/* Cloud 1: Top Left Fluffy Cloud Cluster (Upward Parallax) */}
      <motion.div
        style={{ y: cloud1Y }}
        className="absolute -top-6 -left-12 w-[340px] sm:w-[540px] md:w-[680px] transform-gpu will-change-transform opacity-75 dark:opacity-35"
      >
        <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
          <path
            d="M80 180C50 180 20 160 20 125C20 95 45 75 75 75C85 75 95 78 105 82C120 45 160 20 210 20C265 20 310 50 325 95C340 85 365 80 390 80C440 80 480 115 480 160C480 165 479 170 477 175C490 170 505 168 520 168C560 168 590 190 590 220C590 230 580 240 560 240L60 240C30 240 20 220 20 200C20 188 35 180 80 180Z"
            fill="url(#cloudGradA)"
          />
          <defs>
            <linearGradient id="cloudGradA" x1="50" y1="20" x2="550" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="0.4" stopColor="#F1F5F9" stopOpacity="0.85" />
              <stop offset="0.8" stopColor="#E2E8F0" stopOpacity="0.7" />
              <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cloud 2: Right Mid-Level Billowing Cloud (Downward Parallax) */}
      <motion.div
        style={{ y: cloud2Y }}
        className="absolute top-1/4 -right-16 w-[360px] sm:w-[580px] md:w-[720px] transform-gpu will-change-transform opacity-70 dark:opacity-30"
      >
        <svg viewBox="0 0 650 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-md">
          <path
            d="M550 200C580 200 610 180 610 145C610 115 585 95 555 95C545 95 535 98 525 102C510 65 470 30 415 30C355 30 310 65 295 110C280 100 255 95 230 95C175 95 130 135 130 180C130 185 131 190 133 195C120 190 105 188 90 188C50 188 20 210 20 240C20 250 30 260 50 260L620 260C640 260 650 245 650 225C650 210 620 200 550 200Z"
            fill="url(#cloudGradB)"
          />
          <defs>
            <linearGradient id="cloudGradB" x1="600" y1="30" x2="50" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="0.35" stopColor="#FEF3C7" stopOpacity="0.8" />
              <stop offset="0.75" stopColor="#E2E8F0" stopOpacity="0.65" />
              <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.45" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cloud 3: Left Lower Drift (Upward Parallax) */}
      <motion.div
        style={{ y: cloud3Y }}
        className="absolute top-2/3 -left-20 w-[320px] sm:w-[500px] md:w-[620px] transform-gpu will-change-transform opacity-60 dark:opacity-25"
      >
        <svg viewBox="0 0 550 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-sm">
          <path
            d="M60 160C35 160 15 145 15 120C15 95 35 78 60 78C70 78 80 81 88 85C100 50 135 30 180 30C230 30 270 58 285 98C298 90 320 85 342 85C385 85 420 115 420 155C430 150 445 148 458 148C490 148 515 168 515 195C515 205 505 215 490 215L45 215C25 215 15 200 15 185C15 170 35 160 60 160Z"
            fill="url(#cloudGradC)"
          />
          <defs>
            <linearGradient id="cloudGradC" x1="20" y1="30" x2="500" y2="215" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#F8FAFC" stopOpacity="0.75" />
              <stop offset="1" stopColor="#E2E8F0" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
