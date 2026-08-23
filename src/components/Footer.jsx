import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-page-alt border-t border-theme-subtle text-sub-color text-xs pt-12 pb-24 md:pb-10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-theme-subtle">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury font-bold text-main-color text-base tracking-wide">
                MVK BUILDERS & DEVELOPERS LLP
              </span>
              <span className="text-[10px] text-amber-500 font-semibold px-2 py-0.5 rounded badge-luxury uppercase">
                Build Better With MVK
              </span>
            </div>
            <p className="text-[11px] text-sub-color">
              Gunduru village, Bidarahalli hobali, Bangalore East Taluk (PIN: 560049)
            </p>
          </div>

          {/* Quick Nav & Web */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#overview" className="hover:text-amber-500 transition-colors">Overview</a>
            <a href="#plots" className="hover:text-amber-500 transition-colors">Plots</a>
            <a href="#calculator" className="hover:text-amber-500 transition-colors">Calculator</a>
            <a href="#master-plan" className="hover:text-amber-500 transition-colors">Master Plan</a>
            <a
              href={PROJECT_INFO.developer.website}
              target="_blank"
              rel="noreferrer"
              className="text-amber-500 font-medium hover:underline flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" /> www.mvkdevelopers.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-sub-color">
          <p>© {new Date().getFullYear()} MVK Builders & Developers LLP. HPA & BMRDA Approved. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-panel text-amber-500 hover:border-amber-400/40 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}


