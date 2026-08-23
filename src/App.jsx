import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectStats from './components/ProjectStats';
import Pillars from './components/Pillars';
import PlotConfigurations from './components/PlotConfigurations';
import PriceCalculator from './components/PriceCalculator';
import MasterPlanViewer from './components/MasterPlanViewer';
import Amenities from './components/Amenities';
import LocationMatrix from './components/LocationMatrix';
import WhyInvest from './components/WhyInvest';
import Gallery from './components/Gallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StickyMobileBar from './components/StickyMobileBar';
import LeadModal from './components/LeadModal';

export default function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'brochure',
    context: ''
  });

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

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-page-main text-main-color font-sans selection:bg-amber-400 selection:text-black">
        {/* Top Floating Navigation */}
        <Navbar onOpenModal={handleOpenModal} />

        {/* Main Content Sections */}
        <main>
          <Hero onOpenModal={handleOpenModal} />
          <ProjectStats onOpenModal={handleOpenModal} />
          <Pillars onOpenModal={handleOpenModal} />
          <PlotConfigurations onOpenModal={handleOpenModal} />
          <PriceCalculator onOpenModal={handleOpenModal} />
          <MasterPlanViewer onOpenModal={handleOpenModal} />
          <Amenities onOpenModal={handleOpenModal} />
          <LocationMatrix onOpenModal={handleOpenModal} />
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
      </div>
    </ThemeProvider>
  );
}


