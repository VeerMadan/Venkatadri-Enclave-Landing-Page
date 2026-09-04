import React, { useState, useEffect } from 'react';
import { 
  Download, ArrowDown, CheckCircle2, AlertCircle, Sparkles, 
  ChevronDown, Phone, MessageSquare, ShieldCheck, MapPin 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { saveLead, checkRateLimit, validateIndianMobile } from '../data/leadsData';

export default function BrochureQualificationForm({ className = "", onScrollExplore }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: 'To build a home',
    budget: '₹92+ Lakhs',
    plotSizeInterest: '1,200 Sq.Ft.',
    timeline: 'This Weekend'
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Typewriter effect state for post-submission explore prompt
  const [typedText, setTypedText] = useState('');
  const fullPromptText = "Want to know more about this site? Explore by scrolling ↓";

  // Check rate limit on mount
  useEffect(() => {
    const limit = checkRateLimit();
    if (!limit.allowed) {
      setError(limit.message);
    }
  }, []);

  // Typewriter loop when submitted
  useEffect(() => {
    if (!isSubmitted) return;
    let i = 0;
    setTypedText('');
    const timer = setInterval(() => {
      if (i < fullPromptText.length) {
        setTypedText(fullPromptText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: digits }));
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
      purpose: formData.purpose,
      budget: formData.budget,
      plotSizeInterest: formData.plotSizeInterest,
      timeline: formData.timeline,
      type: 'brochure'
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });

      // Trigger redirect to WhatsApp with pre-formatted bot trigger message
      if (result.whatsappUrl) {
        const opened = window.open(result.whatsappUrl, '_blank');
        if (!opened) {
          window.location.href = result.whatsappUrl;
        }
      }
    } else {
      setError(result.error || 'Failed to submit. Please check your connection.');
    }
  };

  const handleScrollDown = () => {
    if (onScrollExplore) {
      onScrollExplore();
    } else {
      const nextSection = document.getElementById('overview') || document.getElementById('plots');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="brochure-form" className={`relative z-20 ${className}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="glass-panel rounded-3xl p-6 sm:p-9 border-theme-subtle shadow-2xl relative overflow-hidden backdrop-blur-2xl"
        >
          {/* Header Section from Reference Image */}
          <div className="mb-6">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury inline-block">
              DOWNLOAD BROCHURE
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-main-color mt-3 leading-tight">
              Take the Next Step Towards Your <span className="gold-gradient-text">Dream Plot</span>
            </h2>
            <p className="text-xs text-sub-color mt-1.5 leading-relaxed">
              Tell us a few details to receive the official project brochure and master layout drawing on WhatsApp.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2 mb-5"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {isSubmitted ? (
            /* Post-Submission Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-main-color font-serif-luxury">
                  Request Received!
                </h3>
                <p className="text-xs text-sub-color mt-1 max-w-md mx-auto leading-relaxed">
                  We have opened WhatsApp to send your brochure automatically. If your WhatsApp did not open automatically, click below to connect with our automated bot.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/919900090049?text=${encodeURIComponent(`Hello MVK Team! I am ${formData.name} and would like to receive the official Venkatadri Enclave brochure PDF.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md hover:bg-emerald-600 flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open WhatsApp Bot</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-full glass-panel text-xs text-sub-color hover:text-main-color transition-colors"
                >
                  Edit Answers
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-medium text-sub-color mb-1 pl-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (error) setError('');
                    }}
                    className="w-full px-4 py-3 rounded-2xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-sub-color mb-1 pl-1">
                    WhatsApp Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-2xl neo-inset text-sub-color text-xs border-r-0 font-mono font-semibold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-3.5 py-3 rounded-r-2xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Question 1 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <label className="text-xs font-semibold text-main-color leading-tight">
                    What's bringing you to consider a residential plot in this location?
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-7">
                  {[
                    "To build a home",
                    "Long-term investment",
                    "Second home / future rental property"
                  ].map((opt) => (
                    <label
                      key={opt}
                      onClick={() => setFormData({ ...formData, purpose: opt })}
                      className={`px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                        formData.purpose === opt
                          ? 'border-amber-500/60 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                          : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        formData.purpose === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                      }`}>
                        {formData.purpose === opt && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <label className="text-xs font-semibold text-main-color leading-tight">
                    What budget range are you considering for this plot?
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                  {[
                    "₹92+ Lakhs",
                    "₹1.1 Crore – ₹1.25 Crore"
                  ].map((opt) => (
                    <label
                      key={opt}
                      onClick={() => setFormData({ ...formData, budget: opt })}
                      className={`px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                        formData.budget === opt
                          ? 'border-amber-500/60 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                          : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        formData.budget === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                      }`}>
                        {formData.budget === opt && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span className="font-mono">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <label className="text-xs font-semibold text-main-color leading-tight">
                    Which plot size are you interested in?
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-2 pl-7">
                  {[
                    "1,200 Sq.Ft.",
                    "2,400 Sq.Ft.",
                    "Not sure, would like guidance on both"
                  ].map((opt) => (
                    <label
                      key={opt}
                      onClick={() => setFormData({ ...formData, plotSizeInterest: opt })}
                      className={`px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                        formData.plotSizeInterest === opt
                          ? 'border-amber-500/60 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                          : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        formData.plotSizeInterest === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                      }`}>
                        {formData.plotSizeInterest === opt && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <label className="text-xs font-semibold text-main-color leading-tight">
                    When are you looking to make this purchase?
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                  {[
                    "This Weekend",
                    "Next weekend"
                  ].map((opt) => (
                    <label
                      key={opt}
                      onClick={() => setFormData({ ...formData, timeline: opt })}
                      className={`px-4 py-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                        formData.timeline === opt
                          ? 'border-amber-500/60 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                          : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/30'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        formData.timeline === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                      }`}>
                        {formData.timeline === opt && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </div>
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Connecting to WhatsApp Bot...</span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Submit & Download Brochure</span>
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Animated Typing Explore Prompt at the bottom */}
          <div className="mt-6 pt-4 border-t border-theme-subtle text-center">
            <button
              onClick={handleScrollDown}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors group cursor-pointer"
            >
              <span className="font-mono min-h-[20px] flex items-center">
                {isSubmitted ? typedText : "Want to know more about this site? Explore by scrolling"}
                <span className="w-1.5 h-3.5 bg-amber-500 ml-1 inline-block animate-pulse" />
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="p-1 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.div>
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
