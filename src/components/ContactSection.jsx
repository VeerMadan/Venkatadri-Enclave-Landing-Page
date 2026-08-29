import React, { useState } from 'react';
import { Phone, MessageSquare, ArrowRight, CheckCircle2, Car } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ onOpenModal }) {
  const [formData, setFormData] = useState({ name: '', phone: '', cab: 'yes' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-theme-subtle relative overflow-hidden">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
              Book Your Visit
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-main-color mt-3">
              Experience <span className="gold-gradient-text">Venkatadri Enclave</span>
            </h2>
            <p className="text-xs text-sub-color mt-1">
              Complimentary AC cab pickup & drop available across Bengaluru
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-main-color font-serif-luxury">Visit Slot Reserved!</h3>
              <p className="text-xs text-sub-color">
                Our site specialist will call you at <strong>+91 {formData.phone}</strong> to confirm your cab pickup.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3.5">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl neo-inset text-sub-color text-xs border-r-0">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-r-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex items-center justify-between text-xs px-1 text-sub-color">
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-500" /> Free AC Cab Pick-up:
                </span>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="cab"
                      checked={formData.cab === 'yes'}
                      onChange={() => setFormData({ ...formData, cab: 'yes' })}
                      className="accent-amber-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="cab"
                      checked={formData.cab === 'no'}
                      onChange={() => setFormData({ ...formData, cab: 'no' })}
                      className="accent-amber-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <span>Confirm Free Site Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Direct Instant Action Links */}
              <div className="flex items-center justify-center gap-4 pt-3 text-xs text-sub-color">
                <a
                  href="tel:+919900090049"
                  className="flex items-center gap-1 hover:text-amber-500 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> +91 99000 90049
                </a>
                <span>•</span>
                <a
                  href="https://wa.me/919900090049?text=Hi%20MVK%20Team%2C%20I%20would%20like%20to%20book%20a%20site%20visit%20for%20Venkatadri%20Enclave."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-emerald-500 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Sales
                </a>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}


