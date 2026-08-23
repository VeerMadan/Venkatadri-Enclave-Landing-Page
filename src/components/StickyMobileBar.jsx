import React from 'react';
import { Phone, MessageSquare, Calendar, Download } from 'lucide-react';

export default function StickyMobileBar({ onOpenModal }) {
  return (
    <>
      {/* Floating Desktop WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <a
          href="https://wa.me/919845012345?text=Hi%20MVK%20Team%2C%20I'm%20interested%20in%20Venkatadri%20Enclave%20Gundur%20plots."
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Chat"
          className="w-12 h-12 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all border border-emerald-400/30 group"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute right-14 bg-black/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg whitespace-nowrap border border-theme-subtle opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp Sales
          </span>
        </a>
      </div>

      {/* Sticky Mobile Bottom Glass Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-panel border-t border-theme-subtle p-2 px-3 flex items-center justify-between gap-1.5 shadow-2xl">
        <a
          href="tel:+919845012345"
          className="flex-1 py-2 rounded-xl glass-panel text-amber-500 flex flex-col items-center justify-center text-[10px] font-semibold"
        >
          <Phone className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
          <span>Call</span>
        </a>

        <a
          href="https://wa.me/919845012345?text=Hi%20MVK%20Team%2C%20I'm%20interested%20in%20Venkatadri%20Enclave."
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2 rounded-xl glass-panel text-emerald-500 flex flex-col items-center justify-center text-[10px] font-semibold"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-500 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenModal('brochure')}
          className="flex-1 py-2 rounded-xl glass-panel text-sub-color flex flex-col items-center justify-center text-[10px] font-semibold"
        >
          <Download className="w-3.5 h-3.5 text-amber-500 mb-0.5" />
          <span>Brochure</span>
        </button>

        <button
          onClick={() => onOpenModal('visit')}
          className="flex-1.5 py-2 rounded-xl bg-amber-400 text-slate-950 flex flex-col items-center justify-center text-[10px] font-bold shadow"
        >
          <Calendar className="w-3.5 h-3.5 mb-0.5" />
          <span>Book Visit</span>
        </button>
      </div>
    </>
  );
}


