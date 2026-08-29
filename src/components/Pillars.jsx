import React from 'react';
import { Users, Compass, HeartHandshake, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pillars({ onOpenModal }) {
  const pillars = [
    {
      title: "Community",
      caption: "A welcoming neighborhood where children play freely and friendships flourish.",
      icon: Users,
      img: "/images/grand-entrance.jpg"
    },
    {
      title: "Connectivity",
      caption: "Fast access to KIA Airport, Tech Parks, and premier institutions.",
      icon: Compass,
      img: "/images/avenue-street-view.jpg"
    },
    {
      title: "Comfort",
      caption: "Tranquil green living with underground utilities and 30 ft concrete avenues.",
      icon: HeartHandshake,
      img: "/images/aerial-layout-view.jpg"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-page-main relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Philosophy
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Designed for Tomorrow, <span className="gold-gradient-text">Rooted in Harmony</span>
          </h2>
        </motion.div>

        {/* 3 Pillars */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group flex flex-col justify-between min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs text-sub-color leading-relaxed">
                    {item.caption}
                  </p>

                  <button
                    onClick={() => onOpenModal('visit')}
                    className="text-xs font-semibold text-amber-500 hover:text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>View Layout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


