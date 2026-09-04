import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowRight, CheckCircle2, Car, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveLead, checkRateLimit, validateIndianMobile } from '../data/leadsData';
import { getStoredSiteSettings } from '../data/siteSettings';

export default function ContactSection({ onOpenModal }) {
  const [formData, setFormData] = useState({ name: '', phone: '', cab: 'yes' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState({ allowed: true, remaining: 3 });
  const [settings, setSettings] = useState(getStoredSiteSettings());

  useEffect(() => {
    const limit = checkRateLimit();
    setRateLimitInfo(limit);
    if (!limit.allowed) {
      setError(limit.message);
    }

    const updateSettings = () => setSettings(getStoredSiteSettings());
    window.addEventListener('mvk_settings_updated', updateSettings);
    return () => window.removeEventListener('mvk_settings_updated', updateSettings);
  }, []);

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: digitsOnly }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setError(rateCheck.message);
      return;
    }

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
      type: 'visit_brochure',
      cab: formData.cab,
      plotType: '30x40'
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });

      // Redirect to WhatsApp with pre-typed bot trigger message
      if (result.whatsappUrl) {
        const opened = window.open(result.whatsappUrl, '_blank');
        if (!opened) {
          window.location.href = result.whatsappUrl;
        }
      }
    } else {
      setError(result.error || 'Failed to submit request. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-page-main relative border-t border-theme-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="apple-living-glass rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury">
              Direct Contact
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
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-main-color font-serif-luxury">Inquiry Received!</h3>
              <p className="text-xs text-sub-color leading-relaxed">
                Your request has been logged in the system. Our site specialist will call you at <strong className="text-main-color">+91 {formData.phone}</strong> to confirm your complimentary cab pickup.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', cab: 'yes' });
                  }}
                  className="px-4 py-2 rounded-xl glass-panel text-xs text-main-color hover:border-amber-400/40 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3.5">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-tight">{error}</span>
                </div>
              )}

              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (error) setError('');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl neo-inset text-sub-color text-xs border-r-0 font-mono font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit WhatsApp Number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-2.5 rounded-r-xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-sub-color mt-1 px-1">
                  <span>Starts with 6, 7, 8, or 9</span>
                  <span className={formData.phone.length === 10 ? 'text-emerald-500 font-bold' : ''}>
                    {formData.phone.length}/10 digits
                  </span>
                </div>
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
                disabled={isSubmitting || !rateLimitInfo.allowed}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Connecting to WhatsApp...</span>
                ) : (
                  <>
                    <span>Send Enquiry via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Direct Instant Action Links */}
              <div className="flex items-center justify-center gap-4 pt-3 text-xs text-sub-color">
                <a
                  href={`tel:${settings.salesPhoneRaw || '9900090049'}`}
                  className="flex items-center gap-1 hover:text-amber-500 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" /> {settings.salesPhone || '+91 99000 90049'}
                </a>
                <span>•</span>
                <a
                  href={settings.whatsappUrl || "https://wa.me/919900090049"}
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
