import React, { useState } from 'react';
import { Map, Eye, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MasterPlanViewer({ onOpenModal }) {
  const [activeView, setActiveView] = useState('blueprint');

  const legend = [
    { label: "30 × 40", color: "#EF4444" },
    { label: "30 × 45", color: "#14B8A6" },
    { label: "30 × 50", color: "#3B82F6" },
    { label: "Odd Plots", color: "#EAB308" },
    { label: "Park Zone", color: "#10B981" },
    { label: "Civic Amenity (CA)", color: "#94A3B8" }
  ];

  return (
    <section id="master-plan" className="py-12 sm:py-20 bg-page-alt relative border-t border-theme-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Layout Blueprint
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Master Plan & <span className="gold-gradient-text">Layout Overview</span>
          </h2>
          <p className="text-xs text-sub-color mt-1">
            6 Acres • 111 Villa Plots • 3 Dedicated Gateways • 30 Ft Wide Roads
          </p>
        </div>

        {/* Minimal Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-full neo-inset">
            <button
              onClick={() => setActiveView('blueprint')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'blueprint'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Blueprint Map</span>
            </button>
            <button
              onClick={() => setActiveView('panoramic')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'panoramic'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sunset Boulevard</span>
            </button>
            <button
              onClick={() => setActiveView('aerial')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'aerial'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-sub-color hover:text-main-color'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>3D Aerial View</span>
            </button>
          </div>

          {/* Minimal Legend Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-sub-color">
            {legend.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-panel">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Layout Visualizer Window */}
        <div className="glass-panel rounded-3xl p-3 sm:p-5 border-theme-subtle relative overflow-hidden group shadow-lg">
          <div className="relative rounded-2xl overflow-hidden bg-black/5 dark:bg-black/40 flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
            <img
              src={
                activeView === 'blueprint' 
                  ? "/images/master-layout-plan.jpg" 
                  : activeView === 'panoramic'
                  ? "/images/grand-entrance-panoramic.jpg"
                  : "/images/aerial-layout-view.jpg"
              }
              alt="MVK Venkatadri Enclave Master Plan"
              className="w-full h-auto max-h-[700px] object-contain rounded-xl transition-all duration-300"
            />
            {activeView === 'blueprint' && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full neo-inset text-[10px] text-amber-500 font-mono flex items-center gap-1">
                <Compass className="w-3 h-3" />
                <span>NORTH ⬆</span>
              </div>
            )}
          </div>

          <div className="mt-4 px-2 flex flex-wrap items-center justify-between gap-2 text-xs text-sub-color">
            <div className="flex items-center gap-3">
              <span>Numbered Plots 1 to 111 • Immediate Demarcation</span>
              <a
                href="#plot-finder"
                className="inline-flex items-center gap-1 text-amber-500 font-bold hover:underline"
              >
                <span>Interactive Plot Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <button
              onClick={() => onOpenModal('visit')}
              className="text-amber-500 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Book Site Walk to Choose Plot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}


