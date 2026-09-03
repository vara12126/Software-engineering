export interface JudgeProfile {
  id: string;
  name: string;
  designation: string;
  courtroom: string;
  totalAssigned: number;
  activeCases: number;
  pendingCases: number;
  resolvedCases: number;
  avgDisposalDays: number;
  specialization: string[];
  benchType: 'Single Bench' | 'Division Bench' | 'Constitutional Bench';
  utilizationRate: number;
}

export const MOCK_JUDGES: JudgeProfile[] = [
  {
    id: 'JDG-001',
    name: 'Hon\'ble Justice Dr. Rajeshwar Swaminathan',
    designation: 'Senior Puisne Judge',
    courtroom: 'Courtroom 1 (Chief Court)',
    totalAssigned: 148,
    activeCases: 42,
    pendingCases: 38,
    resolvedCases: 68,
    avgDisposalDays: 142,
    specialization: ['Constitutional Law', 'Commercial Arbitration', 'Corporate Insolvency'],
    benchType: 'Division Bench',
    utilizationRate: 94
  },
  {
    id: 'JDG-002',
    name: 'Hon\'ble Justice Ananya Sengupta',
    designation: 'Judge, High Court Bench',
    courtroom: 'Courtroom 2',
    totalAssigned: 165,
    activeCases: 54,
    pendingCases: 49,
    resolvedCases: 62,
    avgDisposalDays: 168,
    specialization: ['Criminal Appeals', 'Cyber Crime & Forensics', 'Bail Jurisdiction'],
    benchType: 'Single Bench',
    utilizationRate: 98
  },
  {
    id: 'JDG-003',
    name: 'Hon\'ble Justice Vikramaditya Rathore',
    designation: 'Judge, Commercial Division',
    courtroom: 'Courtroom 3',
    totalAssigned: 132,
    activeCases: 36,
    pendingCases: 31,
    resolvedCases: 65,
    avgDisposalDays: 124,
    specialization: ['Intellectual Property', 'International Trade', 'Securities Law'],
    benchType: 'Single Bench',
    utilizationRate: 88
  },
  {
    id: 'JDG-004',
    name: 'Hon\'ble Justice Meenakshi Sundaram',
    designation: 'Judge, Civil & Appellate Division',
    courtroom: 'Courtroom 4',
    totalAssigned: 178,
    activeCases: 61,
    pendingCases: 55,
    resolvedCases: 62,
    avgDisposalDays: 185,
    specialization: ['Land Acquisition', 'Civil Writs', 'Service & Labor Law'],
    benchType: 'Single Bench',
    utilizationRate: 96
  },
  {
    id: 'JDG-005',
    name: 'Hon\'ble Justice Tariq Mansoor',
    designation: 'Judge, Family & Succession Bench',
    courtroom: 'Courtroom 5',
    totalAssigned: 110,
    activeCases: 29,
    pendingCases: 24,
    resolvedCases: 57,
    avgDisposalDays: 115,
    specialization: ['Family Disputes', 'Guardianship', 'Succession & Wills'],
    benchType: 'Single Bench',
    utilizationRate: 82
  },
  {
    id: 'JDG-006',
    name: 'Hon\'ble Justice Arundhati Roychowdhury',
    designation: 'Judge, Environmental & Public Interest Bench',
    courtroom: 'Courtroom 6',
    totalAssigned: 94,
    activeCases: 22,
    pendingCases: 19,
    resolvedCases: 53,
    avgDisposalDays: 98,
    specialization: ['Environmental Law', 'PIL & Human Rights', 'Municipal Law'],
    benchType: 'Division Bench',
    utilizationRate: 76
  }
];

export const MOCK_COURTROOMS = [
  { id: 'CR-01', name: 'Courtroom 1 (Chief Justice Court)', judge: 'Hon\'ble Justice Dr. Rajeshwar Swaminathan', capacity: 85, activeToday: 6, conflicts: 0, status: 'Active' },
  { id: 'CR-02', name: 'Courtroom 2 (Criminal Division)', judge: 'Hon\'ble Justice Ananya Sengupta', capacity: 60, activeToday: 9, conflicts: 2, status: 'High Load' },
  { id: 'CR-03', name: 'Courtroom 3 (Commercial Division)', judge: 'Hon\'ble Justice Vikramaditya Rathore', capacity: 50, activeToday: 7, conflicts: 1, status: 'Active' },
  { id: 'CR-04', name: 'Courtroom 4 (Appellate & Civil)', judge: 'Hon\'ble Justice Meenakshi Sundaram', capacity: 65, activeToday: 8, conflicts: 2, status: 'High Load' },
  { id: 'CR-05', name: 'Courtroom 5 (Family & Mediation)', judge: 'Hon\'ble Justice Tariq Mansoor', capacity: 40, activeToday: 5, conflicts: 0, status: 'Optimal' },
  { id: 'CR-06', name: 'Courtroom 6 (PIL & Special Benches)', judge: 'Hon\'ble Justice Arundhati Roychowdhury', capacity: 70, activeToday: 4, conflicts: 0, status: 'Optimal' },
];
