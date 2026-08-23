import React from 'react';
import { 
  ShieldCheck, DoorOpen, Zap, Droplets, Waves, Database, 
  Sparkles, Trees, Gamepad2, Armchair, Footprints, Layers 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Amenities() {
  const amenities = [
    { title: "24×7 Gated Security", subtitle: "Guard room & perimeter surveillance", icon: ShieldCheck },
    { title: "Grand Entrance Plaza", subtitle: "3 Dedicated entry gateways", icon: DoorOpen },
    { title: "30 Ft Wide CC Roads", subtitle: "Concrete avenues & pedestrian paths", icon: Layers },
    { title: "Underground Power", subtitle: "Concealed electric lines & streetlights", icon: Zap },
    { title: "Underground Water", subtitle: "Concealed pipeline to every plot", icon: Droplets },
    { title: "Stormwater Drainage", subtitle: "Heavy-duty underground sewer system", icon: Waves },
    { title: "Overhead Water Tank", subtitle: "High-capacity dedicated reservoir", icon: Database },
    { title: "Exclusive Borewells", subtitle: "Sustainable 24/7 water supply", icon: Sparkles },
    { title: "Landscaped Gardens", subtitle: "Manicured parks & evergreen trees", icon: Trees },
    { title: "Children's Play Area", subtitle: "Safe outdoor activity arena", icon: Gamepad2 },
    { title: "Leisure Gazebos", subtitle: "Seating zones for relaxation", icon: Armchair },
    { title: "Jogging Tracks", subtitle: "Walk-friendly tree-lined avenues", icon: Footprints },
  ];

  return (
    <section id="amenities" className="py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Infrastructure
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            World-Class <span className="gold-gradient-text">Amenities</span>
          </h2>
          <p className="text-xs text-sub-color mt-1">
            Concealed underground utilities • Zero wire clutter • Enduring concrete roads
          </p>
        </div>

        {/* 12 Amenities Minimalist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.025 }}
                className="glass-panel glass-panel-hover rounded-2xl p-4 flex flex-col justify-between space-y-3 group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-main-color group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-sub-color mt-0.5 leading-snug">
                    {item.subtitle}
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


