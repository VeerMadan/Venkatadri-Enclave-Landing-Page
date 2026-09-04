import React, { useState } from 'react';
import { GraduationCap, Hospital, Compass, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { LOCATION_DATA } from '../data/projectData';

export default function LocationMatrix({ onSelectLocation }) {
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { id: 'education', label: 'Education', count: '13', icon: GraduationCap },
    { id: 'healthcare', label: 'Healthcare', count: '9', icon: Hospital },
    { id: 'connectivity', label: 'Connectivity', count: '9', icon: Compass },
  ];

  const list = LOCATION_DATA[activeTab] || [];

  return (
    <section id="location" className="py-12 sm:py-20 bg-page-alt relative border-t border-theme-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-8"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Proximity
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Strategic <span className="gold-gradient-text">Location</span>
          </h2>
          <p className="text-xs text-sub-color mt-1">
            Bagaluru Main Road, Yelahanka, Bengaluru - 560064 • Click any destination for interactive Google Map
          </p>
        </motion.div>

        {/* Minimal Tabs with Sliding Indicator */}
        <div className="relative flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 rounded-full neo-inset max-w-md mx-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 z-10 ${
                  isActive
                    ? 'text-slate-950 font-bold'
                    : 'text-sub-color hover:text-main-color'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="location-tab-highlight"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.5)] -z-10"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                <span className="text-[10px] opacity-75">({t.count})</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[360px] sm:max-h-none overflow-y-auto pr-1 scrollbar-thin"
        >
          {list.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectLocation && onSelectLocation(item)}
              className={`glass-panel rounded-xl p-3 flex items-center justify-between transition-all cursor-pointer group hover:scale-[1.02] hover:border-amber-400/60 shadow-sm ${
                idx === 0 && activeTab === 'education'
                  ? 'border-amber-400/50 bg-amber-500/[0.05]'
                  : 'hover:border-amber-400/30'
              }`}
            >
              <div className="space-y-0.5 pr-2 min-w-0">
                {idx === 0 && activeTab === 'education' && (
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider block">
                    Near Layout (350M)
                  </span>
                )}
                <h4 className="text-xs font-bold text-main-color group-hover:text-amber-500 transition-colors truncate flex items-center gap-1">
                  <span>{item.name}</span>
                  <MapPin className="w-2.5 h-2.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </h4>
                <p className="text-[10px] text-sub-color truncate">
                  {item.highlight}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-amber-500 font-mono group-hover:underline">
                  {item.distance}
                </span>
                <p className="text-[9px] text-sub-color">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Map link button */}
        <div className="mt-6 text-center">
          <a
            href="https://maps.google.com/?q=Bagaluru+Main+Road+Yelahanka+Bengaluru+560064"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel text-xs font-semibold text-amber-500 hover:border-amber-400/40 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Open Location on Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5 text-sub-color" />
          </a>
        </div>

      </div>
    </section>
  );
}



