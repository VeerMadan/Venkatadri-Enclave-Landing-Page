import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress into vertical movement for falling textures
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['-20%', '150%']);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none w-full h-full">
      {/* Dynamic Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      ></div>

      {/* Floating Glowing Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/10 blur-[120px]"
      />
      
      <motion.div 
        animate={{ 
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/5 blur-[150px]"
      />

      {/* Scrolling Textures / Falling Particles */}
      <motion.div style={{ y: y1 }} className="absolute top-0 left-[20%] w-px h-[40vh] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
      <motion.div style={{ y: y2 }} className="absolute top-[50%] right-[30%] w-px h-[60vh] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <motion.div style={{ y: y3 }} className="absolute top-[20%] left-[70%] w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      
      {/* Abstract floating shapes moving with scroll */}
      <motion.div 
        style={{ y: y1 }} 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-32 h-32 border border-white/5 rounded-full"
      />
      <motion.div 
        style={{ y: y2 }} 
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-[15%] w-48 h-48 border border-amber-500/5 rounded-full"
      />
    </div>
  );
}
