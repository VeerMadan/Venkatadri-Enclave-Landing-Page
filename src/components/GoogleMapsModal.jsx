import React from 'react';
import { X, MapPin, ExternalLink, Compass, Clock, Navigation, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GoogleMapsModal({ isOpen, onClose, locationItem }) {
  if (!isOpen || !locationItem) return null;

  const searchQuery = locationItem.mapQuery || `${locationItem.name}, Yelahanka, Bengaluru`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full glass-panel rounded-3xl p-5 sm:p-7 border-theme-subtle shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-theme-subtle shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest px-2.5 py-0.5 rounded-full badge-luxury flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" /> Proximity Map
              </span>
              <span className="text-[10px] text-sub-color">
                From Venkatadri Enclave
              </span>
            </div>
            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-main-color mt-1">
              {locationItem.name}
            </h3>
            <p className="text-xs text-sub-color mt-0.5 flex items-center gap-2">
              <span className="font-semibold text-amber-500">{locationItem.distance || 'Near Layout'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {locationItem.time || 'Short Drive'}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-sub-color hover:text-main-color bg-black/5 dark:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Google Maps Interactive Frame */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-black/10 dark:bg-black/40 border border-theme-subtle my-4">
          <iframe
            title={locationItem.name}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter saturate-110"
          />
        </div>

        {/* Route Snapshot Bar */}
        <div className="bg-page-alt rounded-2xl p-3 sm:p-4 border border-theme-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] text-sub-color uppercase tracking-wider block">Layout Strategic Advantage</span>
            <p className="text-xs font-medium text-main-color">
              {locationItem.highlight || 'Prime Bengaluru North connectivity hub with rapid signal-free access.'}
            </p>
          </div>

          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
