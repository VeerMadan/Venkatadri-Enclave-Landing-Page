import React, { useState } from 'react';
import { Map, Eye, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MasterPlanViewer({ onOpenModal, onSelectPlotType }) {
  const [activeView, setActiveView] = useState('blueprint');
  const [selectedLegend, setSelectedLegend] = useState(null);

  const legend = [
    { label: "30 × 40", type: "30x40", count: "85 Plots", color: "#EF4444", desc: "1,200 Sq.Ft Standard Villa Plots" },
    { label: "30 × 45", type: "30x45", count: "2 Plots", color: "#10B981", desc: "1,350 Sq.Ft Plots 22 & 23 (North Facing)" },
    { label: "30 × 50", type: "30x50", count: "5 Plots", color: "#3B82F6", desc: "1,500 Sq.Ft Plots 24–28 (Avenue Frontage)" },
    { label: "Odd Plots", type: "odd", count: "19 Plots", color: "#EAB308", desc: "1,450–1,850 Sq.Ft Corner & Boundary Plots" },
    { label: "Park Zone (A)", type: "zone", count: "North Sector", color: "#10B981", desc: "Landscaped Garden with Jogging Path & Gazebos" },
    { label: "Civic Amenity (CA)", type: "zone", count: "SE Quadrant", color: "#94A3B8", desc: "Designated Community Utility Area" }
  ];

  const handleLegendClick = (item) => {
    if (selectedLegend?.label === item.label) {
      setSelectedLegend(null);
    } else {
      setSelectedLegend(item);
    }
  };

  const handleJumpToMatrix = (plotType) => {
    const el = document.getElementById('plot-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onSelectPlotType) {
      onSelectPlotType(plotType);
    }
  };

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

          {/* Interactive Legend Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            {legend.map((item) => {
              const isSelected = selectedLegend?.label === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLegendClick(item)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md scale-105'
                      : 'glass-panel text-sub-color hover:text-main-color hover:border-amber-400/40'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-75">({item.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Legend Spotlight Strip */}
        {selectedLegend && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedLegend.color }}></span>
              <div>
                <span className="font-bold text-main-color">{selectedLegend.label}</span>
                <span className="text-sub-color ml-2">— {selectedLegend.desc}</span>
              </div>
            </div>
            {selectedLegend.type !== 'zone' && (
              <button
                onClick={() => handleJumpToMatrix(selectedLegend.type)}
                className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px] hover:brightness-110 flex items-center gap-1 cursor-pointer"
              >
                <span>Filter in Plot Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Layout Visualizer Window */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="glass-panel rounded-3xl p-3 sm:p-5 border-theme-subtle relative overflow-hidden group shadow-lg transform-gpu will-change-transform"
        >
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
              loading="lazy"
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
          </div>

        </motion.div>

      </div>
    </section>
  );
}


