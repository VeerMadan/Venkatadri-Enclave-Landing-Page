import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LeadModal({ isOpen, onClose, initialType = 'brochure', contextData = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plotType: '30x40'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
  };

  const getTitle = () => {
    if (initialType === 'visit') return 'Book Free Site Visit';
    if (initialType === 'quote') return `Quotation: ${contextData || 'Villa Plot'}`;
    if (initialType === 'calculator') return `Cost Sheet: ${contextData || 'Custom Plot'}`;
    return 'Brochure & Master Plan PDF';
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full glass-panel rounded-3xl p-6 sm:p-7 border-theme-subtle shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-sub-color hover:text-main-color bg-black/5 dark:bg-white/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-main-color font-serif-luxury">Request Received</h3>
            <p className="text-xs text-sub-color">
              Our team will WhatsApp you at <strong>+91 {formData.phone}</strong> with the details shortly.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-main-color text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest px-2.5 py-0.5 rounded-full badge-luxury">
                MVK Venkatadri
              </span>
              <h3 className="text-lg font-bold text-main-color mt-1.5">
                {getTitle()}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
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
                  className="w-full px-3.5 py-2.5 rounded-r-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <select
                  value={formData.plotType}
                  onChange={(e) => setFormData({ ...formData, plotType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color text-xs focus:outline-none focus:border-amber-500/50 bg-page-main"
                >
                  <option value="30x40">30 × 40 (1,200 SqFt) — ~₹92.38 L</option>
                  <option value="30x45">30 × 45 (1,350 SqFt) — ~₹1.03 Cr</option>
                  <option value="30x50">30 × 50 (1,500 SqFt) — ~₹1.15 Cr</option>
                  <option value="corner">Corner / Odd Plot</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <span>Submit Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


