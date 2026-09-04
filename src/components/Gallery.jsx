import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { GALLERY_ITEMS } from '../data/projectData';

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="gallery" className="py-12 sm:py-20 bg-page-alt relative border-t border-theme-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
            Gallery
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
            Visual <span className="gold-gradient-text">Showcase</span>
          </h2>
        </motion.div>

        {/* Minimal Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32, scale: 0.90 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ scale: 1.025, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 24, delay: idx * 0.1 }}
              onClick={() => setSelectedImg(item)}
              className="glass-panel rounded-2xl overflow-hidden group cursor-pointer relative border border-white/50 dark:border-white/10 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.18)] transform-gpu will-change-transform"
            >

              <div className="relative h-64 sm:h-72 overflow-hidden bg-black/40">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full neo-inset text-[10px] font-bold text-amber-400">
                  {item.category}
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <h4 className="font-serif-luxury text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full glass-panel rounded-2xl overflow-hidden p-3 border-theme-subtle"
          >
            <div className="flex items-center justify-between pb-3 px-2">
              <span className="text-xs font-bold text-white">{selectedImg.title}</span>
              <button
                onClick={() => setSelectedImg(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={selectedImg.src}
              alt={selectedImg.title}
              className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}


