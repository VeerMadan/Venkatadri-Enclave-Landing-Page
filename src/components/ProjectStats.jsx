import React from 'react';
import { ShieldCheck, CheckCircle2, Award, Zap, Compass, Key } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectStats() {
  const highlights = [
    { title: "HPA & BMRDA Approved", subtitle: "Hoskote Planning Authority Sanctioned", icon: Award },
    { title: "A & E Khata Titles", subtitle: "100% Clear Marketable Ownership", icon: ShieldCheck },
    { title: "Ready for Registration", subtitle: "On-Spot Demarcation & Bank Loans", icon: Key },
    { title: "30 Ft Wide CC Roads", subtitle: "Asphalt Concrete with Curbstones", icon: Compass },
    { title: "100% Underground Grid", subtitle: "Concealed Electricity & Water Network", icon: Zap },
    { title: "Limited 55 Plots", subtitle: "Low-Density 6-Acre Community", icon: CheckCircle2 },
  ];

  return (
    <section className="py-10 sm:py-14 bg-page-alt border-y border-theme-subtle relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 420, damping: 22, delay: (index % 6) * 0.06 }}
                className="glass-panel glass-panel-hover rounded-xl p-3 text-center flex flex-col items-center justify-center space-y-1.5 group cursor-pointer transform-gpu will-change-transform"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-main-color group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[9.5px] text-sub-color mt-0.5 leading-tight">
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


