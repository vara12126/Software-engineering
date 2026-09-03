import { AuditLogEntry, NotificationItem, AIInsightItem } from '../types';

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    timestamp: '10 minutes ago',
    title: 'Urgent Bail Listing in Courtroom 2',
    message: 'Criminal Appeal #SC-2026-1089 listed for priority witness deposition at 02:00 PM today.',
    priority: 'Critical',
    caseId: 'SC-2026-1089',
    isRead: false,
    category: 'Hearing'
  },
  {
    id: 'NOTIF-02',
    timestamp: '25 minutes ago',
    title: 'AI Sensitive Data Redaction Alert',
    message: '14 sensitive PII elements (Aadhaar, Bank A/c, Phone) detected in WP(C) 1024/2026 document batch.',
    priority: 'High',
    caseId: 'SC-2026-1024',
    isRead: false,
    category: 'Redaction'
  },
  {
    id: 'NOTIF-03',
    timestamp: '1 hour ago',
    title: 'Courtroom 2 Scheduling Conflict Detected',
    message: 'Adv. Kapil Sibal listed in Courtroom 2 and Courtroom 4 simultaneously at 02:30 PM. AI Optimizer recommendation available.',
    priority: 'High',
    caseId: 'SC-2026-1089',
    isRead: false,
    category: 'Hearing'
  },
  {
    id: 'NOTIF-04',
    timestamp: '2 hours ago',
    title: 'AI Document Classification Succeeded',
    message: 'Affidavit in HMA/409/2026 auto-classified with 97.2% confidence. 6 key entities extracted.',
    priority: 'Normal',
    caseId: 'SC-2026-0409',
    isRead: true,
    category: 'AI Intelligence'
  },
  {
    id: 'NOTIF-05',
    timestamp: '3 hours ago',
    title: 'Timeline Overrun Warning',
    message: 'Case #SC-2026-1089 exceeded predicted timeline by 18 days due to forensic witness delays.',
    priority: 'Medium',
    caseId: 'SC-2026-1089',
    isRead: true,
    category: 'Compliance'
  },
  {
    id: 'NOTIF-06',
    timestamp: '5 hours ago',
    title: 'Security Audit: Multiple Failed Logins Blocked',
    message: 'IP 192.168.4.120 attempted 3 failed judicial logins. Account temporarily locked with 2FA requirement.',
    priority: 'Critical',
    isRead: true,
    category: 'Administrative'
  }
];

export const MOCK_AUDITS: AuditLogEntry[] = [
  {
    id: 'AUD-90124',
    timestamp: '2026-09-02 08:52:14',
    user: 'Hon\'ble Justice Ananya Sengupta',
    role: 'Judge',
    action: 'Updated Hearing Bench Notes & Adjournment',
    caseId: 'SC-2026-1089',
    ipAddress: '10.24.1.88 (Court Intranet)',
    device: 'High Court Bench Terminal #02 (Encrypted)',
    result: 'Success',
    securityHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'AUD-90123',
    timestamp: '2026-09-02 08:35:40',
    user: 'Administrator Vikram Rao',
    role: 'Admin',
    action: 'Triggered AI Hearing Schedule Optimization',
    caseId: 'CR-02',
    ipAddress: '10.24.0.12 (Admin HQ)',
    device: 'Judicial Server Node Alpha',
    result: 'Success',
    securityHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
  },
  {
    id: 'AUD-90122',
    timestamp: '2026-09-02 08:14:02',
    user: 'Sr. Adv. Siddhartha Narain',
    role: 'Lawyer',
    action: 'Uploaded Redacted Document Copy',
    caseId: 'SC-2026-1024',
    ipAddress: '122.160.44.19 (SSL VPN)',
    device: 'Bar Counsel Portal Client v4.2',
    result: 'Success',
    securityHash: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
  },
  {
    id: 'AUD-90121',
    timestamp: '2026-09-02 07:50:11',
    user: 'Court Clerk Rajesh Sharma',
    role: 'Clerk',
    action: 'Verified Digital Court Seal & Stamp Duty',
    caseId: 'SC-2026-0789',
    ipAddress: '10.24.2.14 (Filing Registry)',
    device: 'Registry Terminal #08',
    result: 'Success',
    securityHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'AUD-90120',
    timestamp: '2026-09-02 07:30:22',
    user: 'AI Automation Subsystem',
    role: 'Admin',
    action: 'Executed Automated PII Redaction Sweep (12 Entities)',
    caseId: 'SC-2026-1024',
    ipAddress: '127.0.0.1 (Internal Worker)',
    device: 'AI NLP Inference Engine v2.4',
    result: 'Success',
    securityHash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
  },
  {
    id: 'AUD-90119',
    timestamp: '2026-09-02 06:15:00',
    user: 'Unknown Litigant',
    role: 'Citizen',
    action: 'Queried Public CNR Status DLHC01-002847-2026',
    caseId: 'SC-2026-1024',
    ipAddress: '49.36.128.45 (Public Web)',
    device: 'Mobile Safari / iOS 17',
    result: 'Success',
    securityHash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d'
  }
];

export const MOCK_AI_INSIGHTS: AIInsightItem[] = [
  {
    id: 'INS-01',
    type: 'Urgent Action',
    severity: 'critical',
    title: '23 Cases Require Priority Scheduling',
    description: 'High-urgency bail petitions and commercial injunctions have pending hearings exceeding target statutory windows.',
    metric: '23 Cases',
    suggestedAction: 'Open Hearing Scheduler to apply AI-optimized slot redistribution.',
    linkTab: 'scheduler'
  },
  {
    id: 'INS-02',
    type: 'Workload Trend',
    severity: 'warning',
    title: 'Average Resolution Time Increased by 8% This Month',
    description: 'Civil Writs and Commercial suits are experiencing longer evidence stages due to forensic report backlogs.',
    metric: '+8% (148 Days Avg)',
    suggestedAction: 'Inspect Judicial Workload Analytics to review bench clearance rates.',
    linkTab: 'analytics'
  },
  {
    id: 'INS-03',
    type: 'Delay Alert',
    severity: 'warning',
    title: '12 Cases Exceeded Predicted Completion Timeline',
    description: 'Multi-party witness cross-examinations in Criminal Appeals have extended beyond estimated milestones.',
    metric: '12 Cases Flagged',
    suggestedAction: 'Review Case Timeline Predictions to view delay risk factor breakdowns.',
    linkTab: 'predictions'
  },
  {
    id: 'INS-04',
    type: 'Resource Optimization',
    severity: 'info',
    title: 'Courtroom 2 & 4 Have Highest Scheduling Load',
    description: 'Courtrooms 2 (Criminal) and 4 (Civil) operate at 98% and 96% utilization with attorney listing conflicts.',
    metric: '98% Utilization',
    suggestedAction: 'Redistribute morning overflow to Courtroom 5 & 6.',
    linkTab: 'scheduler'
  }
];
