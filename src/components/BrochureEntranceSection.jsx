import React, { useState, useEffect } from 'react';
import { 
  Download, ArrowDown, CheckCircle2, AlertCircle, Sparkles, 
  MapPin, FileCheck, Compass, MessageSquare, Phone, ArrowRight,
  ShieldCheck, Check, Layers, Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { saveLead, checkRateLimit, validateIndianMobile } from '../data/leadsData';

export default function BrochureEntranceSection({ onScrollExplore }) {
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

  // Typewriter effect state
  const [typedText, setTypedText] = useState('');
  const fullPromptText = "Want to know more about this site? Explore by scrolling ↓";

  // Check if visitor has already submitted earlier ("when they come back to the link or smth")
  useEffect(() => {
    const hasSubmitted = localStorage.getItem('mvk_brochure_submitted') === 'true';
    if (hasSubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  // Typewriter typing animation loop
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
    }, 40);

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
      localStorage.setItem('mvk_brochure_submitted', 'true');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      // Trigger automatic redirect to WhatsApp with pre-filled message for bot
      if (result.whatsappUrl) {
        const opened = window.open(result.whatsappUrl, '_blank');
        if (!opened) {
          window.location.href = result.whatsappUrl;
        }
      }
    } else {
      setError(result.error || 'Failed to submit. Please try again.');
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
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="brochure-section" className="relative z-20 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Responsive Grid: 2-Columns on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ========================================================================= */}
          {/* LEFT COLUMN: Architectural Showcase Banner (Matches Reference Mobile Card) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Architectural Entrance Card with macOS Glass Styling */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-theme-subtle min-h-[260px] sm:min-h-[300px] lg:min-h-[360px] flex flex-col justify-between p-5 sm:p-7 group"
            >
              {/* macOS Window Controls Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 backdrop-blur-md text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>BMRDA & HPA Sanctioned</span>
                </div>
              </div>

              {/* Background Entrance Image */}
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src="/images/grand-entrance-mobile.jpg"
                alt="Venkatadri Enclave Premium Residential Plots Bengaluru"
                className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform"
              />

              {/* Ambient Gradient Veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

              {/* Brand Typography & Feature Badges */}
              <div className="relative z-10 space-y-2 pt-20">
                <div>
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    VENKATADRI <span className="text-amber-400">ENCLAVE</span>
                  </h1>
                  <p className="text-[11px] sm:text-xs text-white/80 font-medium tracking-wider uppercase mt-0.5">
                    Premium Residential Plots in Bengaluru
                  </p>
                </div>

                {/* 3 Pill Badges from Reference Image */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[10.5px] text-white font-medium">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md shadow-sm">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Prime Location</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md shadow-sm">
                    <FileCheck className="w-3 h-3 text-emerald-400" />
                    <span>Clear Titles</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-md shadow-sm">
                    <Compass className="w-3 h-3 text-amber-400" />
                    <span>Great Connectivity</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Metrics Strip (Visible on Desktop) */}
            <div className="hidden lg:grid grid-cols-3 gap-2.5 text-center">
              <div className="glass-panel p-3 rounded-2xl border-theme-subtle">
                <span className="text-[10px] text-sub-color block uppercase font-bold">Total Area</span>
                <span className="text-sm font-bold font-mono text-main-color">6.0 Acres</span>
              </div>
              <div className="glass-panel p-3 rounded-2xl border-theme-subtle">
                <span className="text-[10px] text-sub-color block uppercase font-bold">Inventory</span>
                <span className="text-sm font-bold font-mono text-amber-500">111 Plots</span>
              </div>
              <div className="glass-panel p-3 rounded-2xl border-theme-subtle">
                <span className="text-[10px] text-sub-color block uppercase font-bold">Bank Loans</span>
                <span className="text-sm font-bold font-mono text-emerald-500">80% Approved</span>
              </div>
            </div>

            {/* Desktop Explore Prompt Button */}
            <div className="hidden lg:block pt-2 text-center">
              <button
                onClick={handleScrollDown}
                className="text-xs text-sub-color hover:text-amber-500 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Scroll down to explore interactive 3D blueprint</span>
                <ArrowDown className="w-3 h-3 text-amber-500 animate-bounce" />
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 4-Question Qualification Form (Comfortable & Uncropped)    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-panel rounded-3xl p-5 sm:p-7 md:p-8 border-theme-subtle shadow-2xl relative overflow-hidden backdrop-blur-2xl"
            >
              {/* Form Title & Subtitle */}
              <div className="mb-5">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full badge-luxury inline-block">
                  DOWNLOAD BROCHURE
                </span>
                <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-main-color mt-2 leading-tight">
                  Take the Next Step Towards Your <span className="gold-gradient-text">Dream Plot</span>
                </h2>
                <p className="text-xs text-sub-color mt-1 leading-relaxed">
                  Tell us a few details to receive the official project brochure and master layout drawing on WhatsApp.
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {isSubmitted ? (
                /* Post-Submission Success State with Animated Explore Indicator */
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-main-color font-serif-luxury">
                      Request Received Successfully!
                    </h3>
                    <p className="text-xs text-sub-color mt-1 max-w-md mx-auto leading-relaxed">
                      We have connected you with our WhatsApp bot to deliver your brochure PDF instantly.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                    <a
                      href={`https://wa.me/919900090049?text=${encodeURIComponent(`Hello MVK Team! I am ${formData.name} and would like to receive the official Venkatadri Enclave brochure PDF.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md hover:bg-emerald-600 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open WhatsApp Chat</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 rounded-full glass-panel text-xs text-sub-color hover:text-main-color transition-colors cursor-pointer"
                    >
                      Edit Answers
                    </button>
                  </div>

                  {/* Animated Typewriter Explore Prompt (Pop-up on submission) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="pt-5 mt-4 border-t border-theme-subtle"
                  >
                    <button
                      onClick={handleScrollDown}
                      className="w-full p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/15 transition-all flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer group shadow-sm"
                    >
                      <span className="font-mono min-h-[20px] flex items-center">
                        {typedText}
                        <span className="w-1.5 h-3.5 bg-amber-500 ml-1 inline-block animate-pulse" />
                      </span>
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
                    </button>
                  </motion.div>
                </div>
              ) : (
                /* Main 4-Question Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Row 1: Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full px-3.5 py-2.5 rounded-2xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-sub-color mb-1 pl-1">
                        WhatsApp Mobile Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-2xl neo-inset text-sub-color text-xs border-r-0 font-mono font-semibold">
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
                          className="w-full px-3 py-2.5 rounded-r-2xl neo-inset text-main-color placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500/50 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question 1 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] flex items-center justify-center shrink-0">
                        1
                      </span>
                      <label className="text-xs font-semibold text-main-color">
                        What's bringing you to consider a residential plot in this location?
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-6">
                      {[
                        "To build a home",
                        "Long-term investment",
                        "Second home / future rental property"
                      ].map((opt) => (
                        <label
                          key={opt}
                          onClick={() => setFormData({ ...formData, purpose: opt })}
                          className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-[11px] ${
                            formData.purpose === opt
                              ? 'border-amber-500 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                              : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/40'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.purpose === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                          }`}>
                            {formData.purpose === opt && <div className="w-1 h-1 rounded-full bg-slate-950" />}
                          </div>
                          <span className="truncate">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] flex items-center justify-center shrink-0">
                        2
                      </span>
                      <label className="text-xs font-semibold text-main-color">
                        What budget range are you considering for this plot?
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                      {[
                        "₹92+ Lakhs",
                        "₹1.1 Crore – ₹1.25 Crore"
                      ].map((opt) => (
                        <label
                          key={opt}
                          onClick={() => setFormData({ ...formData, budget: opt })}
                          className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-[11px] ${
                            formData.budget === opt
                              ? 'border-amber-500 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                              : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/40'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.budget === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                          }`}>
                            {formData.budget === opt && <div className="w-1 h-1 rounded-full bg-slate-950" />}
                          </div>
                          <span className="font-mono">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] flex items-center justify-center shrink-0">
                        3
                      </span>
                      <label className="text-xs font-semibold text-main-color">
                        Which plot size are you interested in?
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-6">
                      {[
                        "1,200 Sq.Ft.",
                        "2,400 Sq.Ft.",
                        "Not sure, would like guidance on both"
                      ].map((opt) => (
                        <label
                          key={opt}
                          onClick={() => setFormData({ ...formData, plotSizeInterest: opt })}
                          className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-[11px] ${
                            formData.plotSizeInterest === opt
                              ? 'border-amber-500 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                              : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/40'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.plotSizeInterest === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                          }`}>
                            {formData.plotSizeInterest === opt && <div className="w-1 h-1 rounded-full bg-slate-950" />}
                          </div>
                          <span className="truncate">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 4 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-500 font-bold text-[10px] flex items-center justify-center shrink-0">
                        4
                      </span>
                      <label className="text-xs font-semibold text-main-color">
                        When are you looking to make this purchase?
                      </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                      {[
                        "This Weekend",
                        "Next weekend"
                      ].map((opt) => (
                        <label
                          key={opt}
                          onClick={() => setFormData({ ...formData, timeline: opt })}
                          className={`px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 text-[11px] ${
                            formData.timeline === opt
                              ? 'border-amber-500 bg-amber-500/10 text-main-color font-semibold shadow-sm'
                              : 'border-theme-subtle glass-panel text-sub-color hover:border-amber-500/40'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            formData.timeline === opt ? 'border-amber-500 bg-amber-500' : 'border-slate-400/40'
                          }`}>
                            {formData.timeline === opt && <div className="w-1 h-1 rounded-full bg-slate-950" />}
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
                    whileHover={{ scale: 1.012 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-50"
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

              {/* Pre-submission explore hint */}
              {!isSubmitted && (
                <div className="mt-4 pt-3 border-t border-theme-subtle text-center">
                  <button
                    onClick={handleScrollDown}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-sub-color hover:text-amber-500 transition-colors cursor-pointer group"
                  >
                    <span>Want to know more about this site? Explore by scrolling</span>
                    <ArrowDown className="w-3.5 h-3.5 text-amber-500 group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
