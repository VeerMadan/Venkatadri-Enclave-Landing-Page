import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectStats from '../components/ProjectStats';
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
import StickyMobileBar from '../components/StickyMobileBar';
import LeadModal from '../components/LeadModal';
import LayoutDetailsModal from '../components/LayoutDetailsModal';
import GoogleMapsModal from '../components/GoogleMapsModal';

export default function LandingPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'brochure',
    context: ''
  });

  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [selectedLocationForMap, setSelectedLocationForMap] = useState(null);
  const [matrixPlotTypeFilter, setMatrixPlotTypeFilter] = useState('all');

  const handleOpenModal = (type = 'brochure', context = '') => {
    setModalState({
      isOpen: true,
      type,
      context
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: 'brochure',
      context: ''
    });
  };

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-page-main text-main-color font-sans selection:bg-amber-400 selection:text-black">
      <AmbientBackground />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500 z-[100] origin-left will-change-transform transform-gpu"
        style={{ scaleX: scrollYProgress }}
      />
      {/* Top Floating Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenModal={handleOpenModal} />
        <ProjectStats onOpenModal={handleOpenModal} />
        <Pillars 
          onOpenModal={handleOpenModal} 
          onOpenLayoutModal={() => setIsLayoutModalOpen(true)} 
        />
        <PlotConfigurations 
          onOpenModal={handleOpenModal} 
          onOpenLayoutModal={() => setIsLayoutModalOpen(true)} 
        />
        <InteractivePlotSelector 
          onOpenModal={handleOpenModal}
          initialTypeFilter={matrixPlotTypeFilter}
        />
        <PriceCalculator onOpenModal={handleOpenModal} />
        <MasterPlanViewer 
          onOpenModal={handleOpenModal} 
          onSelectPlotType={(type) => setMatrixPlotTypeFilter(type)}
        />
        <Amenities 
          onSelectLocation={(loc) => setSelectedLocationForMap(loc)} 
        />
        <LocationMatrix 
          onSelectLocation={(loc) => setSelectedLocationForMap(loc)} 
        />
        <WhyInvest onOpenModal={handleOpenModal} />
        <Gallery onOpenModal={handleOpenModal} />
        <ContactSection onOpenModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Floating / Sticky Mobile Navigation */}
      <StickyMobileBar onOpenModal={handleOpenModal} />

      {/* Lead Capture Popup Modal */}
      <LeadModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialType={modalState.type}
        contextData={modalState.context}
      />

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
