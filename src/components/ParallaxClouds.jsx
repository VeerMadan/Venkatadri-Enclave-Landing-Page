import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ParallaxClouds() {
  const { scrollY } = useScroll();
  
  // Smooth spring physics for organic, buttery inertia
  const smoothY = useSpring(scrollY, {
    stiffness: 90,
    damping: 25,
    mass: 0.6
  });

  // Dual-layer parallax translations (layer 1 floats up, layer 2 drifts down)
  const cloudLayer1Y = useTransform(smoothY, [0, 2000], [0, -220]);
  const cloudLayer2Y = useTransform(smoothY, [0, 2000], [0, 160]);
  const cloudLayer3Y = useTransform(smoothY, [0, 2000], [-50, -320]);
  const cloudOpacity = useTransform(smoothY, [0, 600, 1800], [0.85, 0.6, 0.35]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Cloud Layer 1: High Altitude Ethereal Wisps (Drifts upwards on scroll) */}
      <motion.div
        style={{ y: cloudLayer1Y, opacity: cloudOpacity }}
        className="absolute -top-10 -left-20 w-[120vw] h-96 transform-gpu will-change-transform"
      >
        <svg
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter blur-2xl opacity-40 dark:opacity-20"
        >
          <path
            d="M200 280C240 220 320 200 400 240C460 160 580 150 680 210C760 130 920 140 1000 230C1080 200 1160 250 1180 300L0 350Z"
            fill="url(#cloudGrad1)"
          />
          <defs>
            <linearGradient id="cloudGrad1" x1="0" y1="0" x2="1000" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" stopOpacity="0.25" />
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cloud Layer 2: Mid-Level Soft Puffy Drifts (Moves downwards on scroll) */}
      <motion.div
        style={{ y: cloudLayer2Y, opacity: cloudOpacity }}
        className="absolute top-1/4 -right-24 w-[110vw] h-80 transform-gpu will-change-transform"
      >
        <svg
          viewBox="0 0 1000 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter blur-3xl opacity-35 dark:opacity-15"
        >
          <path
            d="M100 240C150 160 260 150 350 200C420 120 560 110 650 180C720 100 870 120 950 220C1000 180 1050 230 1070 270L0 300Z"
            fill="url(#cloudGrad2)"
          />
          <defs>
            <linearGradient id="cloudGrad2" x1="0" y1="100" x2="900" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF3C7" stopOpacity="0.3" />
              <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="1" stopColor="#FDE68A" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Cloud Layer 3: Horizon Glow Wisps */}
      <motion.div
        style={{ y: cloudLayer3Y, opacity: cloudOpacity }}
        className="absolute top-1/2 -left-10 w-full h-72 transform-gpu will-change-transform"
      >
        <svg
          viewBox="0 0 1200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter blur-2xl opacity-25 dark:opacity-10"
        >
          <path
            d="M50 220C120 140 280 140 380 200C480 110 640 100 760 180C860 120 1020 140 1120 220L0 260Z"
            fill="url(#cloudGrad3)"
          />
          <defs>
            <linearGradient id="cloudGrad3" x1="100" y1="50" x2="1100" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="1" stopColor="#F59E0B" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
