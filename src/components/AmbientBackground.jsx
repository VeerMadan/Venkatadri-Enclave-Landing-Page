import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress into vertical movement for falling textures
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['-20%', '150%']);

  // Mouse tracking for crazy interactive iOS-like parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to center of screen
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Spring physics for ultra-fluid movement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  
  const moveX1 = useTransform(springX, x => x * 0.15);
  const moveY1 = useTransform(springY, y => y * 0.15);
  const moveX2 = useTransform(springX, x => x * -0.1);
  const moveY2 = useTransform(springY, y => y * -0.1);

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

      {/* Floating Glowing Blobs with Interactive Mouse Parallax */}
      <motion.div 
        style={{ x: moveX1, y: moveY1 }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/10 blur-[120px]"
      />
      
      <motion.div 
        style={{ x: moveX2, y: moveY2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/5 blur-[150px]"
      />

      {/* Scrolling Textures / Falling Particles */}
      <motion.div style={{ y: y1 }} className="absolute top-0 left-[20%] w-px h-[40vh] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
      <motion.div style={{ y: y2 }} className="absolute top-[50%] right-[30%] w-px h-[60vh] bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <motion.div style={{ y: y3 }} className="absolute top-[20%] left-[70%] w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      
      {/* Abstract floating shapes moving with scroll & mouse */}
      <motion.div 
        style={{ y: y1, x: moveX2 }} 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-32 h-32 border border-white/5 rounded-full"
      />
      <motion.div 
        style={{ y: y2, x: moveX1 }} 
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-[15%] w-48 h-48 border border-amber-500/5 rounded-full"
      />
    </div>
  );
}
