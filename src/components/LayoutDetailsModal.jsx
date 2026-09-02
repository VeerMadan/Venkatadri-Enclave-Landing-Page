import React, { useState } from 'react';
import { X, Map, Compass, Layers, ShieldCheck, Trees, Database, Zap, Download, ArrowRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LayoutDetailsModal({ isOpen, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const zoningBreakdown = [
    { label: "Total Layout Area", val: "6.0 Acres", detail: "Gated Residential Community" },
    { label: "Total Plotted Units", val: "111 Plots", detail: "East & West Facing with Individual Khata" },
    { label: "Internal Avenues", val: "30 Ft Wide", detail: "Asphalt Concrete with Pedestrian Curbs" },
    { label: "Security Gateways", val: "3 Gateways", detail: "Dedicated Entry 1, Entry 2 & Entry 3" },
    { label: "Green Park Zone (A)", val: "North Sector", detail: "Landscaped Garden with Jogging Track & Gazebo" },
    { label: "Civic Amenities (CA)", val: "SE Quadrant", detail: "Designated Community Utility & Recreation Area" },
    { label: "Overhead Tank (B) & Pump (C)", val: "Integrated", detail: "High-pressure continuous potable water supply" },
    { label: "Power & Drainage", val: "Underground", detail: "Concealed electricity conduits & storm drains" }
  ];

  const plotDimensionLegend = [
    { size: "30 × 40 Ft", area: "1,200 Sq.Ft", color: "#EF4444", desc: "Standard Villa Plot (Most Popular)" },
    { size: "30 × 45 Ft", area: "1,350 Sq.Ft", color: "#10B981", desc: "Plots 22 & 23 (North Facing)" },
    { size: "30 × 50 Ft", area: "1,500 Sq.Ft", color: "#3B82F6", desc: "Plots 24, 25, 26, 27, 28 (Avenue Frontage)" },
    { size: "Odd / Corner Plots", area: "1,450 - 1,850 Sq.Ft", color: "#EAB308", desc: "Corner plots with dual-road visibility" }
  ];

  const handleScrollToMatrix = () => {
    onClose();
    const el = document.getElementById('plot-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full glass-panel rounded-3xl p-5 sm:p-8 border-theme-subtle shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-theme-subtle shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest px-2.5 py-0.5 rounded-full badge-luxury">
                Certified Master Layout CAD
              </span>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> HPA & BMRDA Approved
              </span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-main-color mt-1">
              Venkatadri Enclave <span className="gold-gradient-text">Layout Specifications</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-sub-color hover:text-main-color bg-black/5 dark:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto space-y-6 pt-4 pr-1 scrollbar-thin flex-1">
          {/* Visual Blueprint Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-black/10 dark:bg-black/50 border border-theme-subtle group">
            <img
              src="/images/master-layout-plan.jpg"
              alt="MVK Venkatadri Enclave Certified Master Plan"
              className={`w-full object-contain transition-all duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'max-h-[380px] sm:max-h-[460px] cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-none">
              <div className="px-3 py-1 rounded-full neo-inset text-[10px] text-amber-500 font-mono flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>NORTH ⬆</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="pointer-events-auto p-1.5 rounded-full glass-panel text-main-color hover:text-amber-500 cursor-pointer text-xs"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl pointer-events-none">
              <span>Click image to {isZoomed ? 'zoom out' : 'zoom in (150%)'}</span>
              <span>Official Sanctioned Layout Drawing</span>
            </div>
          </div>

          {/* Dimension Types Legend */}
          <div>
            <h4 className="text-xs font-bold text-main-color uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" /> Dimension Classification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {plotDimensionLegend.map((item) => (
                <div key={item.size} className="glass-panel rounded-xl p-3 border-theme-subtle">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-xs font-bold text-main-color">{item.size}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-amber-500 mt-1">{item.area}</p>
                  <p className="text-[10px] text-sub-color mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Zoning Grid */}
          <div>
            <h4 className="text-xs font-bold text-main-color uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-amber-500" /> Infrastructure & Zoning Highlights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {zoningBreakdown.map((item, idx) => (
                <div key={idx} className="glass-panel rounded-xl p-3 border-theme-subtle">
                  <span className="text-[10px] text-sub-color uppercase tracking-wider block">{item.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-main-color block mt-0.5">{item.val}</span>
                  <span className="text-[9.5px] text-sub-color mt-0.5 block">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-theme-subtle flex flex-wrap items-center justify-between gap-3 shrink-0">
          <a
            href="/images/master-layout-plan.jpg"
            download="MVK_Venkatadri_Enclave_Master_Layout.jpg"
            className="px-4 py-2 rounded-xl glass-panel text-xs text-main-color font-semibold hover:border-amber-400/40 flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-500" />
            <span>Download High-Res Plan</span>
          </a>

          <button
            onClick={handleScrollToMatrix}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Interactive Plot Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
