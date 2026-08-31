import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none w-full h-full select-none transform-gpu translate-z-0">
      {/* Lightweight GPU-friendly ambient gradients */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] rounded-full bg-amber-500/[0.07] dark:bg-amber-500/[0.09] blur-[80px] sm:blur-[100px] transform-gpu translate-z-0 will-change-transform" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] max-w-[700px] h-[60vw] max-h-[700px] rounded-full bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] blur-[90px] sm:blur-[120px] transform-gpu translate-z-0 will-change-transform" />
      <div className="absolute top-[35%] right-[5%] w-[35vw] max-w-[450px] h-[35vw] max-h-[450px] rounded-full bg-amber-400/[0.04] dark:bg-amber-400/[0.05] blur-[70px] transform-gpu translate-z-0 will-change-transform" />
    </div>
  );
}
