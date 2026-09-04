import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Overview', href: '#overview' },
    { label: 'Plot Matrix', href: '#plots' },
    { label: 'Plot Sizes', href: '#configurations' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Master Plan', href: '#masterplan' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'Why Us', href: '#why-invest' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 select-none">
      {/* iOS Floating Island Capsule Container */}
      <div 
        className={`max-w-5xl mx-auto rounded-full transition-all duration-300 ${
          scrolled 
            ? 'py-2 px-3 sm:px-4 bg-white/70 dark:bg-[#0b0f14]/75 backdrop-blur-2xl border border-white/60 dark:border-white/15 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.7)]'
            : 'py-2.5 px-4 bg-white/55 dark:bg-[#0b0f14]/60 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.5)]'
        } flex items-center justify-between`}
      >
        {/* Brand Bubble (iOS Style Pill) */}
        <a 
          href="#" 
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-sm group hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center p-0.5 shadow-sm">
            <div className="w-full h-full bg-[#070a0c] rounded-full flex items-center justify-center">
              <span className="font-serif-luxury font-bold text-amber-400 text-[9px]">M</span>
            </div>
          </div>
          <span className="font-serif-luxury text-xs sm:text-sm font-bold tracking-wider text-main-color group-hover:text-amber-500 transition-colors">
            VENKATADRI <span className="text-amber-500 font-light text-[10.5px] uppercase">ENCLAVE</span>
          </span>
        </a>

        {/* Desktop iOS Blur Bubbles Navigation */}
        <nav 
          onMouseLeave={() => setHoveredLink(null)}
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 text-xs tracking-wide font-medium"
        >
          {links.map((link) => {
            const isHovered = hoveredLink === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                className={`relative px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                  isHovered 
                    ? 'text-slate-950 dark:text-white font-semibold' 
                    : 'text-sub-color hover:text-main-color'
                }`}
              >
                {/* Floating iOS Frosted Bubble Highlighter */}
                {isHovered && (
                  <motion.span
                    layoutId="ios-nav-bubble"
                    className="absolute inset-0 rounded-full bg-white/90 dark:bg-white/20 backdrop-blur-xl border border-white/70 dark:border-white/25 shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] -z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Theme Switcher Bubble */}
        <div className="hidden sm:flex items-center">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="w-8 h-8 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 shadow-sm flex items-center justify-center text-sub-color hover:text-amber-500 transition-all cursor-pointer"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Nav & Toggle (iOS Bubbles) */}
        <div className="flex items-center gap-1.5 md:hidden">
          {/* Mobile Theme Toggle Bubble */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-7 h-7 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/15 shadow-sm flex items-center justify-center text-sub-color hover:text-amber-500"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Mobile Menu Trigger Bubble */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="w-8 h-8 rounded-full bg-white/70 dark:bg-white/15 backdrop-blur-xl border border-white/60 dark:border-white/20 shadow-sm flex items-center justify-center text-main-color"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown (iOS Frosted Glass Sheet) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="md:hidden mt-2 p-4 rounded-3xl bg-white/80 dark:bg-[#0e141a]/90 backdrop-blur-2xl border border-white/60 dark:border-white/15 shadow-2xl space-y-2"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-md text-xs font-medium text-main-color hover:bg-amber-400/20 hover:text-amber-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
