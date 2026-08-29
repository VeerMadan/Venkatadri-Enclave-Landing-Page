import React from 'react';
import { Phone, MessageSquare, Calendar, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StickyMobileBar({ onOpenModal }) {
  return (
    <>
      {/* Floating Desktop WhatsApp Bubble */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          href="https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I'm%20interested%20in%20Venkatadri%20Enclave%20plots."
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Chat"
          className="w-13 h-13 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl flex items-center justify-center transition-all border border-emerald-400/30 group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-15 bg-slate-950/90 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-xl whitespace-nowrap border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            WhatsApp Sales
          </span>
        </motion.a>
      </div>

      {/* Floating Mobile Glass Bubbles Navigation */}
      <div className="fixed bottom-4 left-3 right-3 max-w-sm mx-auto z-40 md:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="pointer-events-auto glass-panel rounded-full p-1.5 px-2 border border-amber-400/25 backdrop-blur-2xl bg-page-main/85 shadow-2xl flex items-center justify-between gap-1.5 neo-shadow"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            href="tel:+919900090049"
            className="flex-1 py-2 px-1 rounded-full glass-panel text-amber-500 flex flex-col items-center justify-center text-[9.5px] font-bold border border-amber-500/20"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
            <span>Call</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            href="https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I'm%20interested%20in%20Venkatadri%20Enclave."
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 px-1 rounded-full glass-panel text-emerald-400 flex flex-col items-center justify-center text-[9.5px] font-bold border border-emerald-500/20"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
            <span>WhatsApp</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onOpenModal('brochure')}
            className="flex-1 py-2 px-1 rounded-full glass-panel text-sub-color flex flex-col items-center justify-center text-[9.5px] font-semibold border border-white/10"
          >
            <Download className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
            <span>Brochure</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onOpenModal('visit')}
            className="flex-[1.3] py-2 px-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex flex-col items-center justify-center text-[9.5px] font-extrabold shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 mb-0.5" />
            <span>Book Visit</span>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}


