import React, { useState } from 'react';
import { Award, TrendingUp, Key, Flame, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQS } from '../data/projectData';

export default function WhyInvest() {
  const [openFaq, setOpenFaq] = useState(0);

  const reasons = [
    { title: "HPA & BMRDA Approved", subtitle: "Clear individual A & E Khata titles", icon: Award },
    { title: "Growth Corridor", subtitle: "Epicenter of STRR & KIA Airport link", icon: TrendingUp },
    { title: "Ready for Registration", subtitle: "Immediate demarcation & bank loans", icon: Key },
    { title: "55 Limited Plots", subtitle: "Low-density boutique community", icon: Flame },
  ];

  return (
    <section id="why-us" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Why Choose Us
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            The <span className="gold-gradient-text">MVK Advantage</span>
          </h2>
        </motion.div>

        {/* 4 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="glass-panel glass-panel-hover rounded-2xl p-4 space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-main-color group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-sub-color leading-relaxed">
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-main-color text-center mb-5">
            Key Questions Answered
          </h3>

          {FAQS.slice(0, 3).map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden transition-all border-theme-subtle"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="text-xs font-semibold text-main-color">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-3 pt-1 text-xs text-sub-color leading-relaxed border-t border-theme-subtle bg-black/[0.02] dark:bg-black/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



