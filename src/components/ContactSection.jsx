import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ExternalLink, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStoredSiteSettings } from '../data/siteSettings';

export default function ContactSection() {
  const [settings, setSettings] = useState(getStoredSiteSettings());

  useEffect(() => {
    const updateSettings = () => setSettings(getStoredSiteSettings());
    window.addEventListener('mvk_settings_updated', updateSettings);
    return () => window.removeEventListener('mvk_settings_updated', updateSettings);
  }, []);

  return (
    <section id="contact" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Living Glass Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 320, damping: 25 }}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/50 dark:border-white/12 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)] relative overflow-hidden"
        >
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury inline-flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Site Concierge Desk</span>
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-main-color mt-3">
              Site Office & <span className="gold-gradient-text">Information Desk</span>
            </h2>
            <p className="text-xs sm:text-sm text-sub-color mt-1.5 leading-relaxed">
              Open 7 days a week for layout walk-throughs, title deed inspections & on-spot plot demarcations.
            </p>
          </div>

          {/* 3-Column Concierge Informational Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            
            {/* Card 1: Site Address & Location */}
            <div className="neo-inset rounded-2xl p-5 space-y-3 flex flex-col justify-between border border-white/30 dark:border-white/10">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-main-color font-serif-luxury">
                  Layout Location
                </h3>
                <p className="text-xs text-sub-color leading-relaxed">
                  Sy No. 42/1, Bagaluru Main Road, Yelahanka, Bengaluru - 560064
                </p>
                <p className="text-[11px] text-amber-500 font-medium">
                  📍 15 Mins from KIA Airport Trunk Road
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Bagaluru+Main+Road+Yelahanka+Bengaluru+560064"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl glass-panel text-xs font-semibold text-amber-500 hover:border-amber-400/50 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2: Visiting Hours */}
            <div className="neo-inset rounded-2xl p-5 space-y-3 flex flex-col justify-between border border-white/30 dark:border-white/10">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-main-color font-serif-luxury">
                  Visiting Hours
                </h3>
                <p className="text-xs text-sub-color leading-relaxed">
                  Monday to Sunday: <br />
                  <strong className="text-main-color font-mono">9:00 AM – 6:30 PM</strong>
                </p>
                <p className="text-[11px] text-emerald-500 font-medium">
                  ✓ Site open all 7 days including holidays
                </p>
              </div>

              <div className="py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 border border-theme-subtle text-[11px] text-sub-color text-center">
                <span>Site engineers present for demarcation</span>
              </div>
            </div>

            {/* Card 3: Direct Sales Desk */}
            <div className="neo-inset rounded-2xl p-5 space-y-3 flex flex-col justify-between border border-white/30 dark:border-white/10">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-main-color font-serif-luxury">
                  Direct Assistance
                </h3>
                <p className="text-xs text-sub-color leading-relaxed">
                  Have questions regarding plot approvals, bank loans, or boundary demarcations?
                </p>
                <p className="text-[11px] text-sub-color font-mono">
                  {settings.salesPhone || '+91 99000 90049'}
                </p>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${settings.salesPhoneRaw || '9900090049'}`}
                  className="w-full py-2 px-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow hover:bg-amber-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Site Desk</span>
                </a>

                <a
                  href={settings.whatsappUrl || "https://wa.me/919900090049"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

          </div>

          {/* Legal Clear Title Guarantee Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-main-color">100% Clear Marketable Titles • Ready for Registration</p>
                <p className="text-sub-color text-[11px]">HPA & BMRDA Sanctioned • Individual A & E Khata Demarcations</p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-semibold text-amber-500 px-3 py-1 rounded-full neo-inset">
              LP No: HPA/LAO/12/2023-24
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
