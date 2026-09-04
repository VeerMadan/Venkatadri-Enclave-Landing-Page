import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Pillars from '../components/Pillars';
import PlotConfigurations from '../components/PlotConfigurations';
import InteractivePlotSelector from '../components/InteractivePlotSelector';
import AmbientBackground from '../components/AmbientBackground';
import PriceCalculator from '../components/PriceCalculator';
import MasterPlanViewer from '../components/MasterPlanViewer';
import Amenities from '../components/Amenities';
import LocationMatrix from '../components/LocationMatrix';
import WhyInvest from '../components/WhyInvest';
import Gallery from '../components/Gallery';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LayoutDetailsModal from '../components/LayoutDetailsModal';
import GoogleMapsModal from '../components/GoogleMapsModal';

export default function LandingPage() {
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [selectedLocationForMap, setSelectedLocationForMap] = useState(null);
  const [matrixPlotTypeFilter, setMatrixPlotTypeFilter] = useState('all');

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-page-main text-main-color font-sans selection:bg-amber-400 selection:text-black relative">
      {/* Dynamic Ambient Background */}
      <AmbientBackground />

      {/* Top Scroll Progress Line */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500 z-[100] origin-left will-change-transform transform-gpu"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Top Floating Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Grand Entrance Showcase Runway & Project Foundations Screen */}
        <Hero />
        
        {/* Core Architectural Modules */}
        <Pillars 
          onOpenLayoutModal={() => setIsLayoutModalOpen(true)} 
        />
        <PlotConfigurations 
          onOpenLayoutModal={() => setIsLayoutModalOpen(true)} 
        />
        <InteractivePlotSelector 
          initialTypeFilter={matrixPlotTypeFilter}
        />
        <PriceCalculator />
        <MasterPlanViewer 
          onSelectPlotType={(type) => setMatrixPlotTypeFilter(type)}
        />
        <Amenities 
          onSelectLocation={(loc) => setSelectedLocationForMap(loc)} 
        />
        <LocationMatrix 
          onSelectLocation={(loc) => setSelectedLocationForMap(loc)} 
        />
        <WhyInvest />
        <Gallery />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Layout Details Dossier Modal */}
      <LayoutDetailsModal
        isOpen={isLayoutModalOpen}
        onClose={() => setIsLayoutModalOpen(false)}
      />

      {/* Interactive Google Maps Proximity Modal */}
      <GoogleMapsModal
        isOpen={!!selectedLocationForMap}
        onClose={() => setSelectedLocationForMap(null)}
        locationItem={selectedLocationForMap}
      />
    </div>
  );
}
