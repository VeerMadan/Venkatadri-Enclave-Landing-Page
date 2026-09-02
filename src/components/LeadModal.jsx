import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, AlertCircle, Phone, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveLead, checkRateLimit, validateIndianMobile } from '../data/leadsData';

export default function LeadModal({ isOpen, onClose, initialType = 'brochure', contextData = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plotType: '30x40'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState({ allowed: true, remaining: 3 });

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSubmitted(false);
      setIsSubmitting(false);
      const limit = checkRateLimit();
      setRateLimitInfo(limit);
      if (!limit.allowed) {
        setError(limit.message);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    // Only accept numeric digits, maximum 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: digitsOnly }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check rate limiter
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setError(rateCheck.message);
      return;
    }

    // Strict validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please enter your full name (minimum 2 characters).');
      return;
    }

    const phoneVal = validateIndianMobile(formData.phone);
    if (!phoneVal.isValid) {
      setError(phoneVal.error);
      return;
    }

    setIsSubmitting(true);

    const result = await saveLead({
      name: formData.name,
      phone: phoneVal.formatted,
      type: initialType,
      plotType: formData.plotType,
      plotNumber: contextData || ''
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    } else {
      setError(result.error || 'Failed to submit request. Please try again.');
    }
  };

  const getTitle = () => {
    if (initialType === 'visit') return 'Book Free Site Visit';
    if (initialType === 'quote') return `Quotation: ${contextData || 'Villa Plot'}`;
    if (initialType === 'calculator') return `Cost Sheet: ${contextData || 'Custom Plot'}`;
    return 'Brochure & Master Plan CAD';
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
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-main-color font-serif-luxury">Request Confirmed!</h3>
            <p className="text-xs text-sub-color leading-relaxed">
              Your inquiry has been logged in our central system. Our sales specialist will WhatsApp you at <strong className="text-main-color">+91 {formData.phone}</strong> shortly.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold rounded-xl cursor-pointer shadow-md hover:brightness-110"
              >
                Done
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
              <p className="text-[11px] text-sub-color mt-0.5">
                Complimentary chauffeur AC cab service available across Bengaluru.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-tight">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10.5px] font-medium text-sub-color mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (error) setError('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-medium text-sub-color mb-1">WhatsApp Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl neo-inset text-sub-color text-xs border-r-0 font-mono font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile (e.g. 9876543210)"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-3.5 py-2.5 rounded-r-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-sub-color mt-1 px-1">
                  <span>Starts with 6, 7, 8, or 9</span>
                  <span className={formData.phone.length === 10 ? 'text-emerald-500 font-bold' : ''}>
                    {formData.phone.length}/10 digits
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] font-medium text-sub-color mb-1">Plot Preference</label>
                <select
                  value={formData.plotType}
                  onChange={(e) => setFormData({ ...formData, plotType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl neo-inset text-main-color text-xs focus:outline-none focus:border-amber-500/50 bg-page-main cursor-pointer"
                >
                  <option value="30x40">30 × 40 (1,200 SqFt) — Standard Villa Plot</option>
                  <option value="30x45">30 × 45 (1,350 SqFt) — Premium Villa Plot</option>
                  <option value="30x50">30 × 50 (1,500 SqFt) — Luxury Grand Plot</option>
                  <option value="corner">Odd / Corner Plot (Boundary Frontage)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !rateLimitInfo.allowed}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Securing slot...</span>
                ) : (
                  <>
                    <span>Submit & Confirm Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {rateLimitInfo.allowed && rateLimitInfo.remaining < 3 && (
                <p className="text-[10px] text-center text-amber-500/80">
                  {rateLimitInfo.remaining} request{rateLimitInfo.remaining > 1 ? 's' : ''} remaining today.
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
