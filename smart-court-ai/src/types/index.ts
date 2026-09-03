export type UserRole = 'Admin' | 'Judge' | 'Lawyer' | 'Clerk' | 'Citizen';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  courtBranch: string;
  barRegNumber?: string;
  benchDesignation?: string;
  twoFactorEnabled: boolean;
}

export type CaseType = 
  | 'Civil Suit'
  | 'Criminal Appeal'
  | 'Writ Petition (Civil)'
  | 'Writ Petition (Criminal)'
  | 'Commercial Dispute'
  | 'Special Leave Petition'
  | 'Family & Matrimonial'
  | 'Arbitration Petition'
  | 'Taxation & Revenue'
  | 'Intellectual Property';

export type CaseStatus = 
  | 'Filing & Scrutiny'
  | 'Registered'
  | 'Under Hearing'
  | 'Preliminary Arguments'
  | 'Evidence & Witnesses'
  | 'Final Arguments'
  | 'Judgment Reserved'
  | 'Resolved'
  | 'Appealed'
  | 'Disposed';

export type PriorityLevel = 'Critical' | 'Urgent' | 'High' | 'Normal' | 'Expedited';

export interface PartyInfo {
  name: string;
  type: 'Petitioner' | 'Respondent' | 'Appellant' | 'Defendant' | 'Intervenor';
  advocate: string;
  barRegistration: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface HearingItem {
  id: string;
  hearingDate: string;
  timeSlot: string;
  courtroom: string;
  bench: string;
  purpose: string;
  stage: string;
  dailyOrderSummary?: string;
  judgeNotes?: string;
  status: 'Scheduled' | 'Completed' | 'Adjourned' | 'Part-Heard';
  virtualHearingLink?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'Petition' | 'Affidavit' | 'Evidence' | 'Judgment' | 'Order' | 'Notice' | 'Application' | 'Charge Sheet' | 'Other';
  fileName: string;
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  confidenceScore: number;
  extractedEntities?: {
    caseNumber?: string;
    filingDate?: string;
    petitioner?: string;
    respondent?: string;
    statutoryActs?: string[];
    courtSealVerified?: boolean;
    stampDutyPaid?: string;
  };
  redactionStatus: 'Pending' | 'Clean' | 'Redacted' | 'Manual Review Required';
  redactedEntitiesCount?: number;
  contentSnippet?: string;
  url?: string;
}

export interface CaseTimelineStage {
  stageName: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  targetDate?: string;
  completedDate?: string;
  durationDays?: number;
  notes?: string;
}

export interface CasePrecedent {
  citation: string;
  title: string;
  court: string;
  year: number;
  relevantSections: string[];
  similarityScore: number; // 0 - 100
  ratioDecidendi: string;
  bench: string;
  status: 'Upheld' | 'Followed' | 'Distinguished';
}

export interface CaseItem {
  id: string; // e.g. "SC-2026-1024"
  cnrNumber: string; // e.g. "DLHC01-002847-2026"
  title: string;
  caseType: CaseType;
  filingDate: string;
  registrationDate: string;
  assignedJudge: string;
  bench: string;
  courtroom: string;
  priority: PriorityLevel;
  status: CaseStatus;
  currentStage: string;
  nextHearing: string;
  predictedCompletion: string;
  estimatedRemainingDays: number;
  delayRisk: 'Low' | 'Moderate' | 'High';
  delayFactors?: string[];
  petitioner: PartyInfo;
  respondent: PartyInfo;
  statutoryActs: string[];
  summary: string;
  hearings: HearingItem[];
  documents: DocumentItem[];
  timeline: CaseTimelineStage[];
  precedents: CasePrecedent[];
  aiAnalysis: {
    complexityScore: number; // 1-10
    keyLegalIssues: string[];
    riskAssessment: string;
    recommendedActions: string[];
    delayExplanation: string;
  };
  auditHistory: {
    timestamp: string;
    user: string;
    action: string;
    details: string;
  }[];
}

export interface SensitiveEntity {
  id: string;
  type: 'Aadhaar' | 'Phone' | 'Email' | 'Bank Account' | 'Address' | 'Minor Name' | 'PAN Card' | 'Medical Detail';
  text: string;
  startIndex: number;
  endIndex: number;
  isRedacted: boolean;
  confidence: number;
  reason: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  caseId?: string;
  ipAddress: string;
  device: string;
  result: 'Success' | 'Warning' | 'Blocked';
  securityHash: string;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Normal';
  caseId?: string;
  isRead: boolean;
  category: 'Hearing' | 'AI Intelligence' | 'Redaction' | 'Compliance' | 'Administrative';
}

export interface AIInsightItem {
  id: string;
  type: 'Urgent Action' | 'Workload Trend' | 'Delay Alert' | 'Resource Optimization';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  metric?: string;
  suggestedAction: string;
  linkTab?: string;
}

export interface CourtroomSchedule {
  courtroomId: string;
  name: string;
  presidingJudge: string;
  capacity: number;
  currentOccupancyRate: number;
  scheduledHearings: {
    id: string;
    caseId: string;
    caseTitle: string;
    caseType: CaseType;
    time: string;
    priority: PriorityLevel;
    advocates: string;
    hasConflict?: boolean;
    conflictReason?: string;
  }[];
}
