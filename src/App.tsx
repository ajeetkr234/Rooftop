import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RoofInstallationPage } from './pages/RoofInstallationPage';
import { RoofRepairPage } from './pages/RoofRepairPage';
import { RoofMaintenancePage } from './pages/RoofMaintenancePage';
import { RoofReplacementPage } from './pages/RoofReplacementPage';
import { RoofInspectionPage } from './pages/RoofInspectionPage';
import { RoofLeakRepairPage } from './pages/RoofLeakRepairPage';
import { ResidentialRoofingPage } from './pages/ResidentialRoofingPage';
import { CommercialRoofingPage } from './pages/CommercialRoofingPage';
import { BookInspectionPage } from './pages/BookInspectionPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';
import { RequestEstimatePage } from './pages/RequestEstimatePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { FloatingContactWidget } from './components/tools/FloatingContactWidget';
import { RequestCallbackModal } from './components/forms/RequestCallbackModal';
import { AiRoofingAssistantModal } from './components/tools/AiRoofingAssistantModal';

export const App: React.FC = () => {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-brand-navy text-slate-100 selection:bg-brand-copper selection:text-white">
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/*" element={<AdminDashboardPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-warm text-brand-dark selection:bg-brand-copper selection:text-white">
      <ScrollToTop />
      <AnnouncementBar onOpenCallback={() => setIsCallbackModalOpen(true)} />
      <SiteHeader onOpenCallback={() => setIsCallbackModalOpen(true)} />

      <main id="main-content" className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/roof-installation" element={<RoofInstallationPage />} />
          <Route path="/services/roof-repair" element={<RoofRepairPage />} />
          <Route path="/services/roof-maintenance" element={<RoofMaintenancePage />} />
          <Route path="/services/roof-replacement" element={<RoofReplacementPage />} />
          <Route path="/services/roof-inspection" element={<RoofInspectionPage />} />
          <Route path="/services/roof-leak-repair" element={<RoofLeakRepairPage />} />
          <Route path="/services/residential-roofing" element={<ResidentialRoofingPage />} />
          <Route path="/services/commercial-roofing" element={<CommercialRoofingPage />} />
          <Route path="/book-inspection" element={<BookInspectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-estimate" element={<RequestEstimatePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />

      {/* Interactive Floating Quick-Connect Widget */}
      <FloatingContactWidget
        onOpenCallback={() => setIsCallbackModalOpen(true)}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
      />

      {/* Global Modals */}
      <RequestCallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />

      <AiRoofingAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onOpenCallback={() => {
          setIsAiModalOpen(false);
          setIsCallbackModalOpen(true);
        }}
      />
    </div>
  );
};

export default App;

