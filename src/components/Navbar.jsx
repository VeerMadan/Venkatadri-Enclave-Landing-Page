import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Download, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: "Overview", href: "#overview" },
    { label: "Plot Matrix", href: "#plot-finder" },
    { label: "Plot Sizes", href: "#plots" },
    { label: "Calculator", href: "#calculator" },
    { label: "Master Plan", href: "#master-plan" },
    { label: "Amenities", href: "#amenities" },
    { label: "Location", href: "#location" },
    { label: "Why Us", href: "#why-us" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 transition-all duration-300">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel py-2 px-4 sm:px-5 shadow-xl'
            : 'glass-panel py-2.5 px-5'
        } flex items-center justify-between`}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center p-0.5 shadow-sm">
            <div className="w-full h-full bg-[#070a0c] rounded-full flex items-center justify-center">
              <span className="font-serif-luxury font-bold text-amber-400 text-[10px]">M</span>
            </div>
          </div>
          <span className="font-serif-luxury text-xs sm:text-sm font-bold tracking-wider text-main-color group-hover:text-amber-500 transition-colors">
            VENKATADRI <span className="text-amber-500 font-light text-[11px] uppercase">ENCLAVE</span>
          </span>
        </a>

        {/* Minimalist Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-xs tracking-wide font-medium text-sub-color">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-500 transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="p-1.5 rounded-full glass-panel hover:border-amber-400/40 text-sub-color hover:text-amber-500 transition-all cursor-pointer"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </motion.div>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenModal('brochure')}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-sub-color hover:text-main-color glass-panel hover:border-amber-400/40 transition-all cursor-pointer flex items-center gap-1"
          >
            <Download className="w-3 h-3 text-amber-500" />
            <span>Brochure</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenModal('visit')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 shadow-sm transition-all cursor-pointer flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Visit</span>
          </motion.button>
        </div>

        {/* Mobile Nav & Toggle */}
        <div className="flex items-center gap-1.5 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-1.5 rounded-full glass-panel text-sub-color hover:text-amber-500"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onOpenModal('visit')}
            className="px-2.5 py-1 text-xs font-bold text-slate-950 bg-amber-400 rounded-full"
          >
            Visit
          </button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-full glass-panel text-sub-color"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 max-w-6xl mx-auto glass-panel rounded-2xl p-4 border space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-sub-color hover:text-amber-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-theme-subtle flex gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal('brochure');
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-sub-color glass-panel flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5 text-amber-500" /> Brochure
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenModal('visit');
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 flex items-center justify-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


