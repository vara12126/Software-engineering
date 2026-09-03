import { CaseItem } from '../types';
import { MOCK_PRECEDENTS } from './mockPrecedents';
import { MOCK_DOCUMENTS } from './mockDocuments';

export const MOCK_CASES: CaseItem[] = [
  {
    id: 'SC-2026-1024',
    cnrNumber: 'DLHC01-002847-2026',
    title: 'Bharat Cloud Networks Ltd. vs. Union of India & Cyber Security Directorate',
    caseType: 'Writ Petition (Civil)',
    filingDate: '2026-08-14',
    registrationDate: '2026-08-16',
    assignedJudge: 'Hon\'ble Justice Dr. Rajeshwar Swaminathan',
    bench: 'Division Bench - Courtroom 1',
    courtroom: 'Courtroom 1 (Chief Court)',
    priority: 'Critical',
    status: 'Preliminary Arguments',
    currentStage: 'Preliminary Hearing',
    nextHearing: '2026-09-08',
    predictedCompletion: '2026-11-20',
    estimatedRemainingDays: 78,
    delayRisk: 'Moderate',
    delayFactors: [
      'Union of India counter-affidavit filing delayed by 14 days',
      'High technical complexity requiring expert cyber forensic assessor',
      'Constitutional bench reference pending'
    ],
    petitioner: {
      name: 'Bharat Cloud Networks Ltd.',
      type: 'Petitioner',
      advocate: 'Sr. Adv. Siddhartha Narain',
      barRegistration: 'D/1429/2012',
      email: 'siddhartha.law@delhibar.org',
      phone: '+91-98110-44910',
      address: 'Plot 45, Okhla Industrial Area Phase-III, New Delhi - 110020'
    },
    respondent: {
      name: 'Union of India, Ministry of Electronics & IT',
      type: 'Respondent',
      advocate: 'Additional Solicitor General Mr. Tushar Mehta',
      barRegistration: 'D/892/1998',
      email: 'asg.office@gov.in',
      phone: '+91-11-2338-9012',
      address: 'Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi'
    },
    statutoryActs: ['Constitution of India Art 226', 'IT Act 2000 Sec 43A & 69A', 'Telecommunications Act 2023'],
    summary: 'Challenge against emergency blocking and seizure order issued by National Cyber Security Directorate without prior pre-decisional hearing under Section 69A IT Act.',
    hearings: [
      {
        id: 'HRG-1024-01',
        hearingDate: '2026-08-18',
        timeSlot: '10:30 AM - 11:15 AM',
        courtroom: 'Courtroom 1',
        bench: 'Division Bench I',
        purpose: 'Urgent Mentioning & Admission',
        stage: 'Preliminary Hearing',
        dailyOrderSummary: 'Notice issued to respondents returnable in 2 weeks. Ad-interim stay granted against coercive server seizure.',
        judgeNotes: 'Maintainability established under Puttaswamy precedent. Union directed to produce file in sealed cover.',
        status: 'Completed',
        virtualHearingLink: 'https://smartcourt.gov.in/vc/bench1-live'
      },
      {
        id: 'HRG-1024-02',
        hearingDate: '2026-09-08',
        timeSlot: '11:30 AM - 01:00 PM',
        courtroom: 'Courtroom 1',
        bench: 'Division Bench I',
        purpose: 'Hearing on Counter Affidavit & Interim Relief',
        stage: 'Arguments',
        status: 'Scheduled',
        virtualHearingLink: 'https://smartcourt.gov.in/vc/bench1-live'
      }
    ],
    documents: [MOCK_DOCUMENTS[0]],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-08-14', notes: 'e-Filed via Portal' },
      { stageName: 'Registration & Scrutiny', status: 'Completed', completedDate: '2026-08-16', notes: 'Defects cured within 24h' },
      { stageName: 'Preliminary Hearing', status: 'In Progress', targetDate: '2026-09-08', notes: 'Interim stay operational' },
      { stageName: 'Evidence & Affidavits', status: 'Upcoming', targetDate: '2026-09-28' },
      { stageName: 'Final Arguments', status: 'Upcoming', targetDate: '2026-10-24' },
      { stageName: 'Judgment', status: 'Upcoming', targetDate: '2026-11-20' },
      { stageName: 'Closure', status: 'Upcoming', targetDate: '2026-11-30' }
    ],
    precedents: [MOCK_PRECEDENTS[0], MOCK_PRECEDENTS[6]],
    aiAnalysis: {
      complexityScore: 8.5,
      keyLegalIssues: [
        'Whether Section 69A IT Blocking Rules violate procedural natural justice guarantees under Article 21.',
        'Proportionality of emergency domain blocking vis-a-vis encrypted cloud tenancy.',
        'Disclosure of confidential security review committee minutes in judicial review.'
      ],
      riskAssessment: 'High probability of division bench formulating constitutional question on algorithmic sovereignty. Potential delay due to sealed cover verification.',
      recommendedActions: [
        'Direct respondent to tender redacted public version of blocking committee minutes.',
        'Appoint Independent Amicus Curiae on cloud infrastructure security.',
        'Fix timeline under Asian Resurfacing guidelines to avoid prolonged interim stay.'
      ],
      delayExplanation: 'Based on historical case patterns, current workload of Courtroom 1, hearing frequency, and case complexity, this case has a moderate probability of delay due to respondent counter-affidavit backlog.'
    },
    auditHistory: [
      { timestamp: '2026-08-14 10:32:10', user: 'Adv. Siddhartha Narain', action: 'e-Filed Petition', details: 'Petition along with 4 annexures uploaded.' },
      { timestamp: '2026-08-16 11:05:44', user: 'Scrutiny Officer Sharma (Clerk)', action: 'Scrutiny Passed', details: 'CNR DLHC01-002847-2026 assigned.' },
      { timestamp: '2026-08-18 12:45:00', user: 'Hon\'ble Justice Swaminathan', action: 'Bench Order Passed', details: 'Interim stay on server seizure granted.' }
    ]
  },
  {
    id: 'SC-2026-1089',
    cnrNumber: 'DLHC02-003119-2026',
    title: 'State (CBI) vs. Rajeshwar Prasad Gupta & Ors.',
    caseType: 'Criminal Appeal',
    filingDate: '2026-07-10',
    registrationDate: '2026-07-12',
    assignedJudge: 'Hon\'ble Justice Ananya Sengupta',
    bench: 'Single Bench - Courtroom 2',
    courtroom: 'Courtroom 2 (Criminal Division)',
    priority: 'Critical',
    status: 'Evidence & Witnesses',
    currentStage: 'Evidence',
    nextHearing: '2026-09-04',
    predictedCompletion: '2027-01-15',
    estimatedRemainingDays: 135,
    delayRisk: 'High',
    delayFactors: [
      'Cross-examination of 18 forensic accounting witnesses pending',
      'Letters Rogatory response awaited from Mauritius banking authority',
      'Accused medical exemption requests filed twice'
    ],
    petitioner: {
      name: 'Central Bureau of Investigation (ACB)',
      type: 'Petitioner',
      advocate: 'Special Public Prosecutor Shri K.V. Mohan',
      barRegistration: 'D/412/2004',
      email: 'spp.cbi@delhibar.org',
      phone: '+91-11-2436-1090',
      address: 'CBI Headquarters, CGO Complex, Lodhi Road, New Delhi'
    },
    respondent: {
      name: 'Rajeshwar Prasad Gupta',
      type: 'Respondent',
      advocate: 'Sr. Adv. Kapil Sibal',
      barRegistration: 'D/204/1978',
      email: 'chambers@sibal.law',
      phone: '+91-11-2309-8812',
      address: 'Bungalow 14, Civil Lines, Gurugram, Haryana'
    },
    statutoryActs: ['Prevention of Corruption Act Sec 13(1)(d)', 'IPC Sec 420, 120B', 'Prevention of Money Laundering Act Sec 3'],
    summary: 'Consortium bank fraud and illicit diversion of ₹ 84.6 Crores loan proceeds via foreign shell entities and offshore accounts.',
    hearings: [
      {
        id: 'HRG-1089-01',
        hearingDate: '2026-08-04',
        timeSlot: '02:00 PM - 03:30 PM',
        courtroom: 'Courtroom 2',
        bench: 'Single Bench II',
        purpose: 'Examination of PW-3 (Forensic Auditor)',
        stage: 'Evidence & Witnesses',
        dailyOrderSummary: 'PW-3 partly cross-examined. Defense requested 10 days adjournment to inspect unredacted bank ledgers.',
        judgeNotes: 'Defense warned against delay tactics under Arnesh Kumar & Asian Resurfacing norms.',
        status: 'Completed'
      },
      {
        id: 'HRG-1089-02',
        hearingDate: '2026-09-04',
        timeSlot: '02:00 PM - 04:00 PM',
        courtroom: 'Courtroom 2',
        bench: 'Single Bench II',
        purpose: 'Continuation of PW-3 & PW-4 Cross Examination',
        stage: 'Evidence',
        status: 'Scheduled'
      }
    ],
    documents: [MOCK_DOCUMENTS[3]],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-07-10' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2026-07-12' },
      { stageName: 'Preliminary Hearing', status: 'Completed', completedDate: '2026-07-28' },
      { stageName: 'Evidence & Witnesses', status: 'In Progress', targetDate: '2026-10-15' },
      { stageName: 'Final Arguments', status: 'Upcoming', targetDate: '2026-12-10' },
      { stageName: 'Judgment', status: 'Upcoming', targetDate: '2027-01-15' },
      { stageName: 'Closure', status: 'Upcoming', targetDate: '2027-01-25' }
    ],
    precedents: [MOCK_PRECEDENTS[1], MOCK_PRECEDENTS[3]],
    aiAnalysis: {
      complexityScore: 9.2,
      keyLegalIssues: [
        'Admissibility of electronic digital audit logs under Section 65B Indian Evidence Act / BSA 2023.',
        'Extradition protocol compliance regarding offshore bank records.',
        'Bail cancellation review due to alleged tampering of prosecution witnesses.'
      ],
      riskAssessment: 'High delay risk. Historical fraud cases with 15+ witnesses average 380 days unless day-to-day trial is ordered.',
      recommendedActions: [
        'Invoke day-to-day trial schedule for recording forensic witness depositions.',
        'Utilize virtual presence for overseas bank compliance officers.',
        'Set strict 45-day deadline for defense cross-examination.'
      ],
      delayExplanation: 'High volume of overseas financial records and multi-witness cross-examination creates an estimated 42-day delay risk.'
    },
    auditHistory: [
      { timestamp: '2026-07-10 14:20:12', user: 'CBI Registry Clerk', action: 'Charge Sheet Registered', details: '14 volumes filed.' },
      { timestamp: '2026-08-04 16:15:30', user: 'Hon\'ble Justice Sengupta', action: 'Adjournment Order', details: 'Final opportunity granted to defense.' }
    ]
  },
  {
    id: 'SC-2026-0789',
    cnrNumber: 'DLHC03-001924-2026',
    title: 'Zenith BioPharma Inc. vs. Aegis Generics Ltd.',
    caseType: 'Intellectual Property',
    filingDate: '2026-06-02',
    registrationDate: '2026-06-05',
    assignedJudge: 'Hon\'ble Justice Vikramaditya Rathore',
    bench: 'Commercial Division - Courtroom 3',
    courtroom: 'Courtroom 3 (Commercial Division)',
    priority: 'High',
    status: 'Final Arguments',
    currentStage: 'Arguments',
    nextHearing: '2026-09-12',
    predictedCompletion: '2026-10-30',
    estimatedRemainingDays: 58,
    delayRisk: 'Low',
    delayFactors: ['Both parties completed discovery phase within statutory schedule'],
    petitioner: {
      name: 'Zenith BioPharma Inc. (USA)',
      type: 'Petitioner',
      advocate: 'Sr. Adv. Dr. Abhishek Manu Singhvi',
      barRegistration: 'D/109/1982',
      email: 'singhvi.chambers@legal.in',
      phone: '+91-11-2331-4500',
      address: '400 Technology Square, Cambridge, MA, USA / New Delhi Office'
    },
    respondent: {
      name: 'Aegis Generics Ltd.',
      type: 'Respondent',
      advocate: 'Sr. Adv. Mukul Rohatgi',
      barRegistration: 'D/311/1979',
      email: 'rohatgi.associates@delhibar.org',
      phone: '+91-11-2338-7711',
      address: 'Plot 18, Industrial Estate, Hyderabad, Telangana'
    },
    statutoryActs: ['Patents Act 1970 Sec 48 & 108', 'Commercial Courts Act 2015', 'Specific Relief Act 1963'],
    summary: 'Suit for permanent injunction restraining patent infringement of synthetic oncology polypeptide molecule Patent No. IN340912.',
    hearings: [
      {
        id: 'HRG-0789-01',
        hearingDate: '2026-08-28',
        timeSlot: '03:00 PM - 04:30 PM',
        courtroom: 'Courtroom 3',
        bench: 'Commercial Division',
        purpose: 'Hearing on Patent Injunction IA',
        stage: 'Arguments',
        dailyOrderSummary: 'Interim injunction confirmed. Final arguments scheduled for concluding hearing.',
        status: 'Completed'
      },
      {
        id: 'HRG-0789-02',
        hearingDate: '2026-09-12',
        timeSlot: '02:30 PM - 04:30 PM',
        courtroom: 'Courtroom 3',
        bench: 'Commercial Division',
        purpose: 'Final Arguments & Formulation of Decree',
        stage: 'Arguments',
        status: 'Scheduled'
      }
    ],
    documents: [MOCK_DOCUMENTS[2]],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-06-02' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2026-06-05' },
      { stageName: 'Preliminary Hearing', status: 'Completed', completedDate: '2026-06-25' },
      { stageName: 'Evidence & Scientific Advisor', status: 'Completed', completedDate: '2026-08-10' },
      { stageName: 'Final Arguments', status: 'In Progress', targetDate: '2026-09-12' },
      { stageName: 'Judgment', status: 'Upcoming', targetDate: '2026-10-30' },
      { stageName: 'Closure', status: 'Upcoming', targetDate: '2026-11-10' }
    ],
    precedents: [MOCK_PRECEDENTS[4]],
    aiAnalysis: {
      complexityScore: 7.8,
      keyLegalIssues: [
        'Whether generic crystallization process infringes doctrine of equivalents under Indian patent jurisprudence.',
        'Validity of Section 3(d) therapeutic efficacy defense.',
        'Calculation of reasonable royalties and exemplary damages.'
      ],
      riskAssessment: 'Low delay risk. Case progressing on expedited Commercial Courts timetable.',
      recommendedActions: [
        'Finalize expert scientific bench report.',
        'Direct parties to submit written synopsis of 5 pages maximum.'
      ],
      delayExplanation: 'Well-managed commercial timetable with minimal delay probability.'
    },
    auditHistory: [
      { timestamp: '2026-06-02 11:30:00', user: 'Adv. Singhvi Associate', action: 'Suit Filed', details: 'Commercial Suit under Order 39.' },
      { timestamp: '2026-08-28 17:00:15', user: 'Hon\'ble Justice Rathore', action: 'Order Signed', details: 'Interim injunction confirmed.' }
    ]
  },
  {
    id: 'SC-2026-0409',
    cnrNumber: 'DLFC01-001289-2026',
    title: 'Sunita Sharma vs. Vikram Sharma',
    caseType: 'Family & Matrimonial',
    filingDate: '2026-05-15',
    registrationDate: '2026-05-18',
    assignedJudge: 'Hon\'ble Justice Tariq Mansoor',
    bench: 'Family Bench - Courtroom 5',
    courtroom: 'Courtroom 5 (Family & Mediation)',
    priority: 'Normal',
    status: 'Under Hearing',
    currentStage: 'Evidence',
    nextHearing: '2026-09-18',
    predictedCompletion: '2026-12-15',
    estimatedRemainingDays: 104,
    delayRisk: 'Moderate',
    delayFactors: ['Mediation referral completed without settlement', 'Income affidavit verification pending'],
    petitioner: {
      name: 'Sunita Sharma',
      type: 'Petitioner',
      advocate: 'Adv. Radhika Deshmukh',
      barRegistration: 'MAH/892/2015',
      email: 'radhika.deshmukh@legal.com',
      phone: '+91-98200-91823',
      address: 'Flat 402, Lotus Towers, Saket, New Delhi'
    },
    respondent: {
      name: 'Vikram Sharma',
      type: 'Respondent',
      advocate: 'Adv. Harish Chawla',
      barRegistration: 'D/1290/2009',
      email: 'hchawla.law@gmail.com',
      phone: '+91-98101-77291',
      address: 'B-14, Green Park Extension, New Delhi'
    },
    statutoryActs: ['Hindu Marriage Act 1955 Sec 13(1)(ia) & 24', 'Family Courts Act 1984', 'CrPC Sec 125'],
    summary: 'Petition for dissolution of marriage and determination of monthly interim maintenance & child custody under Rajnesh v. Neha guidelines.',
    hearings: [
      {
        id: 'HRG-0409-01',
        hearingDate: '2026-08-20',
        timeSlot: '11:00 AM - 12:00 PM',
        courtroom: 'Courtroom 5',
        bench: 'Family Court I',
        purpose: 'Assessment of Assets & Liabilities Affidavits',
        stage: 'Evidence',
        dailyOrderSummary: 'Respondent directed to produce last 3 years ITR and bank statements. Interim maintenance fixed at ₹ 45,000/month.',
        status: 'Completed'
      },
      {
        id: 'HRG-0409-02',
        hearingDate: '2026-09-18',
        timeSlot: '11:00 AM - 12:30 PM',
        courtroom: 'Courtroom 5',
        bench: 'Family Court I',
        purpose: 'Cross Examination on Financial Affidavits & Custody Arrangement',
        stage: 'Evidence',
        status: 'Scheduled'
      }
    ],
    documents: [MOCK_DOCUMENTS[1]],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-05-15' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2026-05-18' },
      { stageName: 'Mediation Session', status: 'Completed', completedDate: '2026-07-10', notes: 'Unsuccessful' },
      { stageName: 'Evidence & Affidavits', status: 'In Progress', targetDate: '2026-09-18' },
      { stageName: 'Arguments', status: 'Upcoming', targetDate: '2026-11-05' },
      { stageName: 'Judgment', status: 'Upcoming', targetDate: '2026-12-15' },
      { stageName: 'Closure', status: 'Upcoming', targetDate: '2026-12-20' }
    ],
    precedents: [MOCK_PRECEDENTS[5]],
    aiAnalysis: {
      complexityScore: 5.4,
      keyLegalIssues: [
        'Ascertainment of undisclosed rental income and foreign stock grants.',
        'Shared parenting custody schedule during school vacations.',
        'Permanent alimony computation.'
      ],
      riskAssessment: 'Moderate probability of delay if forensic tracing of hidden bank assets is demanded.',
      recommendedActions: [
        'Direct standard disclosure through e-Court Financial Affidavit Portal.',
        'Schedule weekend child visitation interim protocol.'
      ],
      delayExplanation: 'Moderate delay risk due to repeated non-disclosure of income tax acknowledgments.'
    },
    auditHistory: [
      { timestamp: '2026-05-15 09:40:00', user: 'Adv. Radhika Deshmukh', action: 'e-Filed HMA Petition', details: 'Filing fee paid online.' }
    ]
  },
  {
    id: 'SC-2026-0512',
    cnrNumber: 'DLHC04-004412-2026',
    title: 'Yamuna Ecological Foundation vs. Delhi Development Authority & Ors.',
    caseType: 'Writ Petition (Civil)',
    filingDate: '2026-04-10',
    registrationDate: '2026-04-12',
    assignedJudge: 'Hon\'ble Justice Arundhati Roychowdhury',
    bench: 'Division Bench - Courtroom 6',
    courtroom: 'Courtroom 6 (PIL & Special Benches)',
    priority: 'High',
    status: 'Under Hearing',
    currentStage: 'Evidence',
    nextHearing: '2026-09-22',
    predictedCompletion: '2026-12-30',
    estimatedRemainingDays: 119,
    delayRisk: 'Low',
    delayFactors: ['Joint inspection committee submitted geo-spatial satellite survey on time'],
    petitioner: {
      name: 'Yamuna Ecological Foundation',
      type: 'Petitioner',
      advocate: 'Adv. Ritwick Dutta',
      barRegistration: 'D/781/1996',
      email: 'ritwick.enviro@legal.in',
      phone: '+91-11-2691-8840',
      address: 'A-21, Nizamuddin East, New Delhi'
    },
    respondent: {
      name: 'Delhi Development Authority & Central Pollution Control Board',
      type: 'Respondent',
      advocate: 'Adv. Sanjeev Sabharwal',
      barRegistration: 'D/450/1990',
      email: 'cpcb.legal@gov.in',
      phone: '+91-11-2321-0091',
      address: 'Vikas Sadan, INA, New Delhi'
    },
    statutoryActs: ['National Green Tribunal Act 2010', 'Water (Prevention of Pollution) Act 1974', 'Environment Protection Act 1986'],
    summary: 'Public Interest Litigation seeking immediate demarcation and removal of illegal permanent construction encroaching upon active Yamuna River floodplains zone O.',
    hearings: [
      {
        id: 'HRG-0512-01',
        hearingDate: '2026-07-22',
        timeSlot: '11:30 AM - 01:00 PM',
        courtroom: 'Courtroom 6',
        bench: 'Division Bench VI',
        purpose: 'Consideration of High Powered Committee Report',
        stage: 'Evidence',
        dailyOrderSummary: 'DDA directed to demolish non-conforming industrial sheds within 30 days and file compliance geo-tagged photos.',
        status: 'Completed'
      },
      {
        id: 'HRG-0512-02',
        hearingDate: '2026-09-22',
        timeSlot: '11:30 AM - 01:00 PM',
        courtroom: 'Courtroom 6',
        bench: 'Division Bench VI',
        purpose: 'Compliance Review of Floodplain Demolition',
        stage: 'Evidence',
        status: 'Scheduled'
      }
    ],
    documents: [],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-04-10' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2026-04-12' },
      { stageName: 'Preliminary Hearing', status: 'Completed', completedDate: '2026-05-02' },
      { stageName: 'Inspection & Evidence', status: 'In Progress', targetDate: '2026-09-22' },
      { stageName: 'Final Arguments', status: 'Upcoming', targetDate: '2026-11-15' },
      { stageName: 'Judgment', status: 'Upcoming', targetDate: '2026-12-30' },
      { stageName: 'Closure', status: 'Upcoming', targetDate: '2027-01-15' }
    ],
    precedents: [MOCK_PRECEDENTS[0]],
    aiAnalysis: {
      complexityScore: 6.9,
      keyLegalIssues: [
        'Application of Precautionary Principle & Polluter Pays Principle.',
        'Zoning legality of temporary commercial storage in River Zone O.',
        'Equitable rehabilitation for affected seasonal nurseries.'
      ],
      riskAssessment: 'Low delay risk. Environmental bench has maintained bi-weekly compliance reviews.',
      recommendedActions: [
        'Mandate drone-based GIS boundary verification for real-time court surveillance.',
        'Establish escrow restoration fund.'
      ],
      delayExplanation: 'Compliance reporting is on schedule with drone verification reports submitted.'
    },
    auditHistory: [
      { timestamp: '2026-04-10 16:20:00', user: 'Adv. Ritwick Dutta', action: 'PIL e-Filed', details: 'PIL registered with court seal.' }
    ]
  },
  {
    id: 'SC-2026-0914',
    cnrNumber: 'DLHC05-002199-2026',
    title: 'Metro Rail Infrastructure Corp vs. Larsen Turbo JV',
    caseType: 'Arbitration Petition',
    filingDate: '2026-07-28',
    registrationDate: '2026-07-30',
    assignedJudge: 'Hon\'ble Justice Meenakshi Sundaram',
    bench: 'Single Bench - Courtroom 4',
    courtroom: 'Courtroom 4 (Appellate & Civil)',
    priority: 'Urgent',
    status: 'Under Hearing',
    currentStage: 'Preliminary Arguments',
    nextHearing: '2026-09-06',
    predictedCompletion: '2026-11-10',
    estimatedRemainingDays: 69,
    delayRisk: 'Low',
    delayFactors: [],
    petitioner: {
      name: 'Metro Rail Infrastructure Corp Ltd.',
      type: 'Petitioner',
      advocate: 'Adv. Rajiv Nayar',
      barRegistration: 'D/389/1986',
      email: 'rnayar.chambers@arbitration.in',
      phone: '+91-11-2338-9900',
      address: 'Metro Bhawan, Barakhamba Road, New Delhi'
    },
    respondent: {
      name: 'Larsen Turbo JV',
      type: 'Respondent',
      advocate: 'Sr. Adv. Parag Tripathi',
      barRegistration: 'D/210/1980',
      email: 'ptripathi@lawchambers.in',
      phone: '+91-11-2461-7700',
      address: 'L&T House, Ballard Estate, Mumbai / New Delhi'
    },
    statutoryActs: ['Arbitration and Conciliation Act 1996 Sec 9, 11(6), 34', 'Commercial Courts Act 2015'],
    summary: 'Petition under Section 9 for interim protective measures regarding encashment of unconditional Bank Guarantees worth ₹ 120 Crores in underground tunnel package.',
    hearings: [
      {
        id: 'HRG-0914-01',
        hearingDate: '2026-08-12',
        timeSlot: '11:00 AM - 12:30 PM',
        courtroom: 'Courtroom 4',
        bench: 'Single Bench IV',
        purpose: 'Section 9 Interim Injunction Hearing',
        stage: 'Preliminary Arguments',
        dailyOrderSummary: 'Bank Guarantees encashment kept in abeyance subject to respondent depositing ₹ 25 Crores in interest-bearing fixed deposit.',
        status: 'Completed'
      },
      {
        id: 'HRG-0914-02',
        hearingDate: '2026-09-06',
        timeSlot: '02:00 PM - 03:30 PM',
        courtroom: 'Courtroom 4',
        bench: 'Single Bench IV',
        purpose: 'Section 11 Arbitral Tribunal Constitution',
        stage: 'Preliminary Arguments',
        status: 'Scheduled'
      }
    ],
    documents: [],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-07-28' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2026-07-30' },
      { stageName: 'Section 9 Hearing', status: 'Completed', completedDate: '2026-08-12' },
      { stageName: 'Section 11 Appointment', status: 'In Progress', targetDate: '2026-09-06' },
      { stageName: 'Reference to Arbitrator', status: 'Upcoming', targetDate: '2026-10-15' },
      { stageName: 'Disposed', status: 'Upcoming', targetDate: '2026-11-10' }
    ],
    precedents: [MOCK_PRECEDENTS[4]],
    aiAnalysis: {
      complexityScore: 6.2,
      keyLegalIssues: [
        'Fraud of egregious nature or irretrievable injustice test for restraining invocation of unconditional bank guarantees.',
        'Jurisdiction of fast-track Section 11 arbitrator nomination.'
      ],
      riskAssessment: 'Low delay risk. Standard commercial arbitration expedited track applies.',
      recommendedActions: [
        'Appoint former Supreme Court Judge as Sole Arbitrator from DIAC roster.',
        'Fix 6-month statutory timeline for arbitral award delivery under Section 29A.'
      ],
      delayExplanation: 'High likelihood of expeditious disposal following Vidya Drolia precedent.'
    },
    auditHistory: [
      { timestamp: '2026-07-28 15:40:10', user: 'Adv. Rajiv Nayar', action: 'e-Filed Section 9 Petition', details: 'Filing completed.' }
    ]
  },
  {
    id: 'SC-2026-0219',
    cnrNumber: 'DLHC01-000984-2026',
    title: 'Dr. Alok Verma vs. Medical Council of India & AIIMS',
    caseType: 'Civil Suit',
    filingDate: '2026-02-14',
    registrationDate: '2026-02-16',
    assignedJudge: 'Hon\'ble Justice Meenakshi Sundaram',
    bench: 'Single Bench - Courtroom 4',
    courtroom: 'Courtroom 4 (Appellate & Civil)',
    priority: 'Normal',
    status: 'Judgment Reserved',
    currentStage: 'Judgment',
    nextHearing: '2026-09-15',
    predictedCompletion: '2026-09-20',
    estimatedRemainingDays: 18,
    delayRisk: 'Low',
    delayFactors: [],
    petitioner: {
      name: 'Dr. Alok Verma',
      type: 'Petitioner',
      advocate: 'Adv. Prashant Bhushan',
      barRegistration: 'D/501/1983',
      email: 'pbhushan.office@legal.org',
      phone: '+91-11-2651-4400',
      address: 'B-10, Jungpura Extension, New Delhi'
    },
    respondent: {
      name: 'National Medical Commission & AIIMS',
      type: 'Respondent',
      advocate: 'Adv. Gaurav Sharma',
      barRegistration: 'D/612/1995',
      email: 'gsharma.nmc@gov.in',
      phone: '+91-11-2536-7033',
      address: 'Pocket 14, Sector 8, Dwarka, New Delhi'
    },
    statutoryActs: ['National Medical Commission Act 2019', 'Constitution of India Art 14, 16'],
    summary: 'Service dispute challenging retrospective revision of seniority criteria for super-specialty professorial appointments at AIIMS.',
    hearings: [
      {
        id: 'HRG-0219-01',
        hearingDate: '2026-08-25',
        timeSlot: '02:00 PM - 04:00 PM',
        courtroom: 'Courtroom 4',
        bench: 'Single Bench IV',
        purpose: 'Concluding Arguments',
        stage: 'Final Arguments',
        dailyOrderSummary: 'Arguments concluded by both sides. Written submissions taken on record. Judgment reserved.',
        judgeNotes: 'Judgment draft under judicial preparation.',
        status: 'Completed'
      },
      {
        id: 'HRG-0219-02',
        hearingDate: '2026-09-15',
        timeSlot: '10:30 AM - 11:00 AM',
        courtroom: 'Courtroom 4',
        bench: 'Single Bench IV',
        purpose: 'Pronouncement of Judgment',
        stage: 'Judgment',
        status: 'Scheduled'
      }
    ],
    documents: [],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2026-02-14' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2026-02-16' },
      { stageName: 'Preliminary Hearing', status: 'Completed', completedDate: '2026-03-10' },
      { stageName: 'Evidence & Pleadings', status: 'Completed', completedDate: '2026-06-20' },
      { stageName: 'Final Arguments', status: 'Completed', completedDate: '2026-08-25' },
      { stageName: 'Judgment', status: 'In Progress', targetDate: '2026-09-15' },
      { stageName: 'Closure', status: 'Upcoming', targetDate: '2026-09-20' }
    ],
    precedents: [MOCK_PRECEDENTS[0]],
    aiAnalysis: {
      complexityScore: 4.8,
      keyLegalIssues: [
        'Vested right in promotional seniority vis-a-vis subsequent executive amendments.',
        'Doctrine of legitimate expectation in central public medical institutions.'
      ],
      riskAssessment: 'Negligible delay risk. Judgment reserved and scheduled for pronouncement.',
      recommendedActions: ['Notify registry for certified judgment copy auto-generation.'],
      delayExplanation: 'Final stage reached; pronouncement date fixed on cause list.'
    },
    auditHistory: [
      { timestamp: '2026-08-25 16:30:00', user: 'Hon\'ble Justice Sundaram', action: 'Judgment Reserved', details: 'Pronouncement scheduled for 15-Sep-2026.' }
    ]
  },
  {
    id: 'SC-2025-1102',
    cnrNumber: 'DLHC02-008912-2025',
    title: 'Anil Ambani Telecom Holdings vs. Department of Telecommunications',
    caseType: 'Commercial Dispute',
    filingDate: '2025-11-18',
    registrationDate: '2025-11-20',
    assignedJudge: 'Hon\'ble Justice Dr. Rajeshwar Swaminathan',
    bench: 'Division Bench - Courtroom 1',
    courtroom: 'Courtroom 1 (Chief Court)',
    priority: 'Normal',
    status: 'Resolved',
    currentStage: 'Closure',
    nextHearing: 'Completed',
    predictedCompletion: '2026-07-30',
    estimatedRemainingDays: 0,
    delayRisk: 'Low',
    delayFactors: [],
    petitioner: {
      name: 'Anil Ambani Telecom Holdings Ltd.',
      type: 'Petitioner',
      advocate: 'Sr. Adv. Harish Salve',
      barRegistration: 'D/092/1977',
      email: 'hsalve@chambers.co.uk',
      phone: '+91-11-2338-1122',
      address: 'Reliance Centre, Maharaja Ranjit Singh Marg, New Delhi'
    },
    respondent: {
      name: 'Department of Telecommunications, GoI',
      type: 'Respondent',
      advocate: 'Solicitor General Tushar Mehta',
      barRegistration: 'D/892/1998',
      email: 'sg.office@gov.in',
      phone: '+91-11-2338-9012',
      address: 'Sanchar Bhawan, 20 Ashoka Road, New Delhi'
    },
    statutoryActs: ['Telegraph Act 1885', 'TRAI Act 1997', 'Insolvency and Bankruptcy Code 2016'],
    summary: 'Dispute concerning AGR spectrum sharing dues and asset monetization during corporate insolvency resolution process.',
    hearings: [
      {
        id: 'HRG-1102-01',
        hearingDate: '2026-07-30',
        timeSlot: '10:30 AM',
        courtroom: 'Courtroom 1',
        bench: 'Division Bench I',
        purpose: 'Final Judgment Pronouncement',
        stage: 'Judgment',
        dailyOrderSummary: 'Civil Appeal dismissed following Swiss Ribbons judgment. Spectrum dues affirmed as sovereign priority liability.',
        status: 'Completed'
      }
    ],
    documents: [],
    timeline: [
      { stageName: 'Filing', status: 'Completed', completedDate: '2025-11-18' },
      { stageName: 'Registration', status: 'Completed', completedDate: '2025-11-20' },
      { stageName: 'Preliminary Hearing', status: 'Completed', completedDate: '2026-01-15' },
      { stageName: 'Arguments', status: 'Completed', completedDate: '2026-05-20' },
      { stageName: 'Judgment', status: 'Completed', completedDate: '2026-07-30' },
      { stageName: 'Closure', status: 'Completed', completedDate: '2026-08-05' }
    ],
    precedents: [MOCK_PRECEDENTS[2]],
    aiAnalysis: {
      complexityScore: 8.9,
      keyLegalIssues: ['Priority of spectrum statutory dues in IBC Section 53 waterfall mechanism.'],
      riskAssessment: 'Case fully resolved and certified copy generated.',
      recommendedActions: ['Archive case file in National Judicial Data Grid vault.'],
      delayExplanation: 'Disposed in compliance with statutory timetable.'
    },
    auditHistory: [
      { timestamp: '2026-07-30 11:15:00', user: 'Hon\'ble Justice Swaminathan', action: 'Judgment Signed', details: 'Full judgment uploaded to portal.' },
      { timestamp: '2026-08-05 10:00:00', user: 'Decree Section Officer', action: 'Decree Drawn', details: 'Case marked Disposed.' }
    ]
  }
];
