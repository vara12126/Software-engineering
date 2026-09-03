import React, { useState } from 'react';
import { CourtProvider, useCourt } from './context/CourtContext';
import { RoleSwitcherBar } from './components/layout/RoleSwitcherBar';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { Toast } from './components/common/Toast';
import { LoginPage } from './components/auth/LoginPage';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { CaseManagement } from './components/cases/CaseManagement';
import { RegisterCaseModal } from './components/cases/RegisterCaseModal';
import { CaseDetailsModal } from './components/cases/CaseDetailsModal';
import { DocumentIntelligence } from './components/ai-docs/DocumentIntelligence';
import { SensitiveDataRedaction } from './components/redaction/SensitiveDataRedaction';
import { CaseTimelinePrediction } from './components/prediction/CaseTimelinePrediction';
import { HearingScheduler } from './components/scheduler/HearingScheduler';
import { JudicialAnalytics } from './components/analytics/JudicialAnalytics';
import { PrecedentSearch } from './components/precedents/PrecedentSearch';
import { ReportsCenter } from './components/reports/ReportsCenter';
import { CitizenPortal } from './components/citizen/CitizenPortal';
import { LawyerPortal } from './components/lawyer/LawyerPortal';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { AuditSecurity } from './components/audit/AuditSecurity';
import { AdminSettings } from './components/settings/AdminSettings';
import { AIAssistantModal } from './components/assistant/AIAssistantModal';
import { CaseItem } from './types';

const MainCourtApp: React.FC = () => {
  const { isAuthenticated, activeTab } = useCourt();
  const [selectedDossierCase, setSelectedDossierCase] = useState<CaseItem | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleOpenCaseDossier = (c: CaseItem) => {
    setSelectedDossierCase(c);
    setIsDossierOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'cases':
        return <CaseManagement onSelectCase={handleOpenCaseDossier} />;
      case 'ai-docs':
        return <DocumentIntelligence />;
      case 'redaction':
        return <SensitiveDataRedaction />;
      case 'scheduler':
        return <HearingScheduler />;
      case 'predictions':
        return <CaseTimelinePrediction />;
      case 'precedents':
        return <PrecedentSearch />;
      case 'analytics':
        return <JudicialAnalytics />;
      case 'reports':
        return <ReportsCenter />;
      case 'citizen':
        return <CitizenPortal />;
      case 'lawyer':
        return <LawyerPortal />;
      case 'notifications':
        return <NotificationCenter />;
      case 'audit':
        return <AuditSecurity />;
      case 'settings':
        return <AdminSettings />;
      case 'dashboard':
      default:
        return <MainDashboard onSelectCase={handleOpenCaseDossier} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Role Simulator Switcher */}
      <RoleSwitcherBar />

      <div className="flex-1 flex min-h-0">
        {/* Persistent Left Sidebar */}
        <Sidebar />

        {/* Right Main Content Panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <Navbar />

          {/* Active View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Modals & Utilities */}
      <RegisterCaseModal />
      <CaseDetailsModal
        caseItem={selectedDossierCase}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
      <AIAssistantModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <CourtProvider>
      <MainCourtApp />
    </CourtProvider>
  );
}

export default App;
