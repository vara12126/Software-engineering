import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  UserProfile, 
  CaseItem, 
  DocumentItem, 
  NotificationItem, 
  AuditLogEntry, 
  AIInsightItem,
  HearingItem 
} from '../types';
import { MOCK_CASES } from '../data/mockCases';
import { MOCK_DOCUMENTS } from '../data/mockDocuments';
import { MOCK_NOTIFICATIONS, MOCK_AUDITS, MOCK_AI_INSIGHTS } from '../data/mockAudits';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface CourtContextType {
  // Auth & Role
  currentUser: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Cases
  cases: CaseItem[];
  activeCase: CaseItem | null;
  setActiveCase: (caseItem: CaseItem | null) => void;
  addCase: (newCase: Partial<CaseItem>) => CaseItem;
  updateCaseStatus: (caseId: string, status: CaseItem['status']) => void;
  addHearingToCase: (caseId: string, hearing: HearingItem) => void;

  // Documents & Redaction
  documents: DocumentItem[];
  addDocument: (doc: DocumentItem) => void;
  updateDocument: (id: string, updates: Partial<DocumentItem>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Audits & Insights
  audits: AuditLogEntry[];
  addAuditLog: (action: string, caseId?: string, result?: 'Success' | 'Warning' | 'Blocked') => void;
  aiInsights: AIInsightItem[];

  // Global search & UI
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  
  // Data Reset & Demo Load
  resetToFresh: () => void;
  loadDemoData: () => void;

  // Toasts
  toast: ToastMessage | null;
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  Admin: {
    id: 'USR-ADMIN-01',
    name: 'Vikram Rao',
    role: 'Admin',
    email: 'admin.registry@smartcourt.gov.in',
    courtBranch: 'High Court of Delhi - Principal Registry',
    twoFactorEnabled: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  Judge: {
    id: 'USR-JDG-001',
    name: 'Hon\'ble Justice Dr. Rajeshwar Swaminathan',
    role: 'Judge',
    email: 'justice.swaminathan@delhicourts.nic.in',
    courtBranch: 'Courtroom 1 (Division Bench)',
    benchDesignation: 'Senior Puisne Judge',
    twoFactorEnabled: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  Lawyer: {
    id: 'USR-BAR-1429',
    name: 'Sr. Adv. Siddhartha Narain',
    role: 'Lawyer',
    email: 'siddhartha.law@delhibar.org',
    courtBranch: 'Delhi High Court Bar Association',
    barRegNumber: 'D/1429/2012',
    twoFactorEnabled: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  Clerk: {
    id: 'USR-CLK-082',
    name: 'Rajesh Sharma',
    role: 'Clerk',
    email: 'clerk.scrutiny@smartcourt.gov.in',
    courtBranch: 'Filing & Scrutiny Registry Branch',
    twoFactorEnabled: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  Citizen: {
    id: 'USR-CIT-9102',
    name: 'Priya Sharma (Litigant)',
    role: 'Citizen',
    email: 'priya.sharma92@gmail.com',
    courtBranch: 'Public Litigant Access Portal',
    twoFactorEnabled: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
};

const FRESH_AUDIT: AuditLogEntry[] = [
  {
    id: 'AUD-00001',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    user: 'System Initializer',
    role: 'Admin',
    action: 'Smart Court Judicial Platform Initialized in Fresh State (All 0)',
    ipAddress: '127.0.0.1 (Localhost)',
    device: 'Judicial Secure Terminal v4.1',
    result: 'Success',
    securityHash: '0000000000000000000000000000000000000000000000000000000000000000'
  }
];

const FRESH_AI_INSIGHTS: AIInsightItem[] = [
  {
    id: 'INS-001',
    type: 'Resource Optimization',
    severity: 'info',
    title: 'Judicial Platform Running in Pristine State (0 Backlog)',
    description: '0 pending scrutiny cases, 0 courtroom schedule overlaps, and 0 PII redaction alerts. The judicial operating system is ready for new case registrations.',
    suggestedAction: 'Register a case or upload e-filings to begin automated docket intelligence.',
    linkTab: 'cases',
    metric: '0 Matters'
  }
];

const CourtContext = createContext<CourtContextType | undefined>(undefined);

export const CourtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('Admin');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USERS.Admin);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Fresh initial 0 state
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [audits, setAudits] = useState<AuditLogEntry[]>(FRESH_AUDIT);
  const [aiInsights, setAiInsights] = useState<AIInsightItem[]>(FRESH_AI_INSIGHTS);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, type, title, message });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4500);
  };

  const resetToFresh = () => {
    setCases([]);
    setActiveCase(null);
    setDocuments([]);
    setNotifications([]);
    setAudits([
      {
        id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: currentUser.name,
        role: currentRole,
        action: 'Reset System to Fresh State (All 0)',
        ipAddress: '127.0.0.1 (Localhost)',
        device: 'Judicial Station v4.1',
        result: 'Success',
        securityHash: '0000000000000000000000000000000000000000000000000000000000000000'
      }
    ]);
    setAiInsights(FRESH_AI_INSIGHTS);
    showToast('info', 'System Reset', 'All court dockets, cases, documents, and notifications reset to fresh 0 state.');
  };

  const loadDemoData = () => {
    setCases(MOCK_CASES);
    setActiveCase(MOCK_CASES[0]);
    setDocuments(MOCK_DOCUMENTS);
    setNotifications(MOCK_NOTIFICATIONS);
    setAudits(MOCK_AUDITS);
    setAiInsights(MOCK_AI_INSIGHTS);
    showToast('success', 'Demo Data Loaded', 'Loaded institutional sample cases, cause lists, and AI document records.');
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEFAULT_USERS[role]);
    // Set appropriate default tab based on role
    if (role === 'Citizen') {
      setActiveTab('citizen');
    } else if (role === 'Lawyer') {
      setActiveTab('lawyer');
    } else if (role === 'Judge') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('dashboard');
    }
    showToast('info', 'Role Switched', `Switched view to ${role} (${DEFAULT_USERS[role].name})`);
    addAuditLog(`Switched session role to ${role}`, undefined, 'Success');
  };

  const login = (email: string, role: UserRole) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    const user = { ...DEFAULT_USERS[role], email: email || DEFAULT_USERS[role].email };
    setCurrentUser(user);
    if (role === 'Citizen') setActiveTab('citizen');
    else if (role === 'Lawyer') setActiveTab('lawyer');
    else setActiveTab('dashboard');

    showToast('success', 'Authentication Successful', `Welcome to Smart Court, ${user.name}`);
    addAuditLog(`User logged in as ${role}`, undefined, 'Success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('info', 'Logged Out', 'You have been securely logged out of the judicial system.');
    addAuditLog('User logged out from session', undefined, 'Success');
  };

  const addCase = (newCaseData: Partial<CaseItem>): CaseItem => {
    const caseId = `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const cnr = `DLHC01-${Math.floor(100000 + Math.random() * 900000)}-2026`;
    
    const fullCase: CaseItem = {
      id: caseId,
      cnrNumber: cnr,
      title: newCaseData.title || 'Untitled Case',
      caseType: newCaseData.caseType || 'Civil Suit',
      filingDate: new Date().toISOString().split('T')[0],
      registrationDate: new Date().toISOString().split('T')[0],
      assignedJudge: newCaseData.assignedJudge || 'Hon\'ble Justice Dr. Rajeshwar Swaminathan',
      bench: 'Division Bench I',
      courtroom: newCaseData.courtroom || 'Courtroom 1 (Chief Court)',
      priority: newCaseData.priority || 'Normal',
      status: 'Registered',
      currentStage: 'Preliminary Hearing',
      nextHearing: newCaseData.nextHearing || '2026-09-25',
      predictedCompletion: '2026-12-15',
      estimatedRemainingDays: 95,
      delayRisk: 'Low',
      delayFactors: [],
      petitioner: newCaseData.petitioner || {
        name: 'Petitioner Party',
        type: 'Petitioner',
        advocate: 'Adv. Siddhartha Narain',
        barRegistration: 'D/1429/2012'
      },
      respondent: newCaseData.respondent || {
        name: 'Respondent Party',
        type: 'Respondent',
        advocate: 'Adv. Standing Counsel',
        barRegistration: 'D/501/2005'
      },
      statutoryActs: newCaseData.statutoryActs || ['Constitution of India Art 226'],
      summary: newCaseData.summary || 'New case filed through Smart Court E-Filing System.',
      hearings: [
        {
          id: `HRG-${Math.floor(1000 + Math.random() * 9000)}`,
          hearingDate: newCaseData.nextHearing || '2026-09-25',
          timeSlot: '10:30 AM - 11:30 AM',
          courtroom: newCaseData.courtroom || 'Courtroom 1',
          bench: 'Division Bench I',
          purpose: 'Admission & Preliminary Hearing',
          stage: 'Preliminary Hearing',
          status: 'Scheduled'
        }
      ],
      documents: [],
      timeline: [
        { stageName: 'Filing', status: 'Completed', completedDate: new Date().toISOString().split('T')[0] },
        { stageName: 'Registration & Scrutiny', status: 'Completed', completedDate: new Date().toISOString().split('T')[0] },
        { stageName: 'Preliminary Hearing', status: 'In Progress', targetDate: newCaseData.nextHearing || '2026-09-25' },
        { stageName: 'Evidence & Affidavits', status: 'Upcoming' },
        { stageName: 'Final Arguments', status: 'Upcoming' },
        { stageName: 'Judgment', status: 'Upcoming' },
        { stageName: 'Closure', status: 'Upcoming' }
      ],
      precedents: [],
      aiAnalysis: {
        complexityScore: 6.0,
        keyLegalIssues: ['Preliminary maintainability and jurisdiction.'],
        riskAssessment: 'Standard litigation track.',
        recommendedActions: ['Issue notice to respondents returnable in 3 weeks.'],
        delayExplanation: 'Estimated duration within expected institutional benchmarks.'
      },
      auditHistory: [
        {
          timestamp: new Date().toISOString(),
          user: currentUser.name,
          action: 'New Case Registered',
          details: `Registered with CNR ${cnr}`
        }
      ]
    };

    setCases((prev) => [fullCase, ...prev]);
    setActiveCase(fullCase);
    showToast('success', 'Case Registered', `Case #${caseId} (CNR: ${cnr}) has been successfully registered.`);
    addAuditLog(`Registered new case #${caseId}`, caseId, 'Success');
    return fullCase;
  };

  const updateCaseStatus = (caseId: string, status: CaseItem['status']) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status } : c))
    );
    if (activeCase?.id === caseId) {
      setActiveCase((prev) => (prev ? { ...prev, status } : null));
    }
    showToast('info', 'Status Updated', `Case #${caseId} status changed to ${status}`);
    addAuditLog(`Updated case status to ${status}`, caseId, 'Success');
  };

  const addHearingToCase = (caseId: string, hearing: HearingItem) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            nextHearing: hearing.hearingDate,
            hearings: [hearing, ...c.hearings]
          };
        }
        return c;
      })
    );
    if (activeCase?.id === caseId) {
      setActiveCase((prev) =>
        prev
          ? {
              ...prev,
              nextHearing: hearing.hearingDate,
              hearings: [hearing, ...prev.hearings]
            }
          : null
      );
    }
    showToast('success', 'Hearing Scheduled', `Hearing for case #${caseId} scheduled for ${hearing.hearingDate} at ${hearing.timeSlot}`);
    addAuditLog(`Scheduled hearing for ${hearing.hearingDate}`, caseId, 'Success');
  };

  const addDocument = (doc: DocumentItem) => {
    setDocuments((prev) => [doc, ...prev]);
    showToast('success', 'Document Uploaded', `${doc.fileName} processed by AI Intelligence.`);
    addAuditLog(`Uploaded and classified document ${doc.fileName}`, undefined, 'Success');
  };

  const updateDocument = (id: string, updates: Partial<DocumentItem>) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('info', 'Notifications Marked', 'All notifications marked as read.');
  };

  const addAuditLog = (action: string, caseId?: string, result: 'Success' | 'Warning' | 'Blocked' = 'Success') => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * chars.length)];

    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

    const newLog: AuditLogEntry = {
      id: `AUD-${Math.floor(90000 + Math.random() * 10000)}`,
      timestamp,
      user: currentUser.name,
      role: currentRole,
      action,
      caseId,
      ipAddress: '10.24.0.88 (Intranet/VPN)',
      device: 'Secure Judicial Station v4.1',
      result,
      securityHash: hash
    };

    setAudits((prev) => [newLog, ...prev]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <CourtContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthenticated,
        switchRole,
        login,
        logout,
        activeTab,
        setActiveTab,
        cases,
        activeCase,
        setActiveCase,
        addCase,
        updateCaseStatus,
        addHearingToCase,
        documents,
        addDocument,
        updateDocument,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        audits,
        addAuditLog,
        aiInsights,
        searchQuery,
        setSearchQuery,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isAssistantOpen,
        setIsAssistantOpen,
        resetToFresh,
        loadDemoData,
        toast,
        showToast
      }}
    >
      {children}
    </CourtContext.Provider>
  );
};

export const useCourt = () => {
  const context = useContext(CourtContext);
  if (!context) {
    throw new Error('useCourt must be used within a CourtProvider');
  }
  return context;
};

