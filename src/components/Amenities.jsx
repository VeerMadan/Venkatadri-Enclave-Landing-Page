import React from 'react';
import { 
  ShieldCheck, DoorOpen, Zap, Droplets, Waves, Database, 
  Sparkles, Trees, Gamepad2, Armchair, Footprints, Layers 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Amenities() {
  const amenities = [
    { title: "24/7 Gated Security", tag: "Guardhouse & CCTV", icon: ShieldCheck },
    { title: "Grand 3-Gate Entry", tag: "Architectural Arch", icon: DoorOpen },
    { title: "30 Ft Wide CC Roads", tag: "Concrete Avenues", icon: Layers },
    { title: "Underground Power", tag: "Concealed Grid", icon: Zap },
    { title: "Piped Water to Plots", tag: "Dedicated Line", icon: Droplets },
    { title: "Storm Water Drainage", tag: "Heavy-Duty Drains", icon: Waves },
    { title: "Overhead Water Tank", tag: "High-Pressure OHT", icon: Database },
    { title: "Deep Borewells", tag: "24/7 Supply", icon: Sparkles },
    { title: "Landscaped Gardens", tag: "Green Parks", icon: Trees },
    { title: "Children's Play Area", tag: "Safe Soft Turf", icon: Gamepad2 },
    { title: "Leisure Gazebos", tag: "Seating Alcoves", icon: Armchair },
    { title: "Jogging Tracks", tag: "Tree-Lined Path", icon: Footprints },
  ];

  return (
    <section id="amenities" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Infrastructure
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            World-Class <span className="gold-gradient-text">Amenities</span>
          </h2>
        </motion.div>

        {/* 12 Amenities Minimalist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 20, delay: (idx % 4) * 0.1 }}
                className="glass-panel glass-panel-hover rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-main-color group-hover:text-amber-500 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-sub-color mt-0.5 truncate">
                    {item.tag}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



