import React from 'react';
import { 
  ShieldCheck, DoorOpen, Zap, Droplets, Waves, Database, 
  Sparkles, Trees, Gamepad2, Armchair, Footprints, Layers 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Amenities({ onSelectLocation }) {
  const amenities = [
    { title: "24/7 Gated Security", tag: "Guardhouse & CCTV", icon: ShieldCheck, desc: "Triple security checkposts at Entry 1, 2 & 3 with HD night-vision CCTV coverage." },
    { title: "Grand 3-Gate Entry", tag: "Architectural Arch", icon: DoorOpen, desc: "Stately 40-foot wide architectural entrance arches with manicured palm boulevards." },
    { title: "30 Ft Wide CC Roads", tag: "Concrete Avenues", icon: Layers, desc: "High-grade M30 concrete avenues designed for 30+ year heavy vehicular durability." },
    { title: "Underground Power", tag: "Concealed Grid", icon: Zap, desc: "100% underground armoured electric cabling and LED street lighting network." },
    { title: "Piped Water to Plots", tag: "Dedicated Line", icon: Droplets, desc: "Individual water inlet valves demarcated directly to each of the 111 villa plots." },
    { title: "Storm Water Drainage", tag: "Heavy-Duty Drains", icon: Waves, desc: "Concealed RCC box storm water network preventing any monsoon waterlogging." },
    { title: "Overhead Water Tank", tag: "High-Pressure OHT", icon: Database, desc: "Integrated high-capacity overhead reservoir ensuring uninterrupted gravity supply." },
    { title: "Deep Borewells", tag: "24/7 Supply", icon: Sparkles, desc: "Multiple high-yield deep aquifer borewells backed by automated pump controls." },
    { title: "Landscaped Gardens", tag: "Green Parks", icon: Trees, desc: "North sector central park with indigenous trees, native flora and oxygen corridors." },
    { title: "Children's Play Area", tag: "Safe Soft Turf", icon: Gamepad2, desc: "Equipped with rubberized play equipment, sandbox, and safety-padded fencing." },
    { title: "Leisure Gazebos", tag: "Seating Alcoves", icon: Armchair, desc: "Pergolas and granite seating pavilions surrounded by flowering shrubs." },
    { title: "Jogging Tracks", tag: "Tree-Lined Path", icon: Footprints, desc: "Continuous asphalt paved perimeter walking and jogging tracks for morning fitness." },
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
          <p className="text-xs text-sub-color mt-1">
            Built to exact BMRDA & HPA specifications • Click any infrastructure item for map location
          </p>
        </motion.div>

        {/* 12 Amenities Minimalist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectLocation && onSelectLocation({
                  name: `Venkatadri Enclave: ${item.title}`,
                  highlight: item.desc,
                  distance: 'On-Site Layout Infrastructure',
                  time: 'Inside Community',
                  mapQuery: 'Bagaluru Main Road, Yelahanka, Bengaluru'
                })}
                transition={{ type: "spring", stiffness: 380, damping: 22, delay: (idx % 4) * 0.06 }}
                className="apple-living-glass rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 group cursor-pointer transform-gpu will-change-transform shadow-md"
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



