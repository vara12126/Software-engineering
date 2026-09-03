import { DocumentItem, SensitiveEntity } from '../types';

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: 'DOC-2026-0811',
    title: 'Writ Petition under Article 226 - Commercial Infringement',
    type: 'Petition',
    fileName: 'WP_Civil_1024_2026_Main_Petition.pdf',
    fileSize: '4.2 MB',
    uploadedBy: 'Adv. Siddhartha Narain (D/1429/2012)',
    uploadDate: '2026-08-14 10:32 AM',
    confidenceScore: 98.6,
    extractedEntities: {
      caseNumber: 'WP(C)/1024/2026',
      filingDate: '14-Aug-2026',
      petitioner: 'Bharat Cloud Networks Ltd.',
      respondent: 'Union of India & Ors.',
      statutoryActs: ['Constitution of India Art 226', 'IT Act 2000 Sec 43A', 'BNS 2023 Sec 318'],
      courtSealVerified: true,
      stampDutyPaid: '₹ 15,000 (e-Stamp Ref: DL78912903)'
    },
    redactionStatus: 'Redacted',
    redactedEntitiesCount: 14,
    contentSnippet: `IN THE HIGH COURT OF JUDICATURE AT NEW DELHI
(EXTRAORDINARY WRIT JURISDICTION)
WRIT PETITION (CIVIL) NO. 1024 OF 2026

IN THE MATTER OF:
Bharat Cloud Networks Ltd.
Registered Office at Plot 45, Okhla Industrial Area Ph-III, New Delhi - 110020
Through its Authorized Representative Mr. Rajesh Verma (Aadhaar: 4892-1092-8812)
Contact: +91-98112-40912 | email: compliance@bharatcloud.in
... PETITIONER

VERSUS

1. Union of India, Through Secretary, Ministry of Electronics & IT
2. National Cyber Security Directorate, CGO Complex, Lodhi Road
... RESPONDENTS

SYNOPSIS & LIST OF DATES:
The Petitioner company holds a valid Unified License for Cloud Telephony. The Respondent No. 2 issued an arbitrary blocking notice dated 12.07.2026 without prior show-cause hearing...`
  },
  {
    id: 'DOC-2026-0812',
    title: 'Affidavit of Assets and Liabilities - Matrimonial Maintenance',
    type: 'Affidavit',
    fileName: 'Affidavit_Assets_Liabilities_HMA_409.pdf',
    fileSize: '2.8 MB',
    uploadedBy: 'Adv. Radhika Deshmukh (MAH/892/2015)',
    uploadDate: '2026-08-20 02:15 PM',
    confidenceScore: 97.2,
    extractedEntities: {
      caseNumber: 'HMA/409/2026',
      filingDate: '20-Aug-2026',
      petitioner: 'Sunita Sharma',
      respondent: 'Vikram Sharma',
      statutoryActs: ['Hindu Marriage Act Sec 24', 'CrPC Sec 125'],
      courtSealVerified: true,
      stampDutyPaid: '₹ 500'
    },
    redactionStatus: 'Manual Review Required',
    redactedEntitiesCount: 9,
    contentSnippet: `IN THE COURT OF PRINCIPAL JUDGE, FAMILY COURT
HMA PETITION NO. 409 OF 2026

AFFIDAVIT OF ASSETS AND LIABILITIES
(As per Rajnesh v. Neha guidelines)

I, Vikram Sharma, S/o Late S.P. Sharma, aged 42 years, R/o B-14, Green Park Extension, New Delhi - 110016, PAN: ABCPS1290K, holding HDFC Bank A/c No: 50100291029104, IFSC: HDFC0000128, having monthly salary of ₹ 2,85,000 deposited via Aadhaar Linked account 9102-8841-3310...`
  },
  {
    id: 'DOC-2026-0813',
    title: 'Interim Injunction Order under Order 39 Rule 1 & 2 CPC',
    type: 'Order',
    fileName: 'Interim_Injunction_Order_CS_789.pdf',
    fileSize: '1.4 MB',
    uploadedBy: 'Court Master, Bench IV',
    uploadDate: '2026-08-28 04:45 PM',
    confidenceScore: 99.4,
    extractedEntities: {
      caseNumber: 'CS(COMM)/789/2026',
      filingDate: '28-Aug-2026',
      petitioner: 'Zenith BioPharma Inc.',
      respondent: 'Aegis Generics Ltd.',
      statutoryActs: ['Patents Act 1970 Sec 108', 'CPC Order 39 Rule 1&2'],
      courtSealVerified: true,
      stampDutyPaid: 'Court Certified'
    },
    redactionStatus: 'Clean',
    redactedEntitiesCount: 0,
    contentSnippet: `BEFORE THE HON'BLE HIGH COURT OF DELHI AT NEW DELHI
COMMERCIAL DIVISION - BENCH IV
CORAM: HON'BLE MR. JUSTICE VIKRAMADITYA RATHORE

I.A. NO. 4512 OF 2026 IN CS(COMM) 789/2026

ORDER:
1. Heard learned Senior Counsel Dr. A.M. Singhvi for the Plaintiff and learned Senior Counsel Mr. Mukul Rohatgi for the Defendants.
2. Prima facie case of patent infringement is established in respect of Patent No. IN340912 for synthetic peptide formulation.
3. Till the next date of hearing, Defendants are restrained from manufacturing, marketing or distributing the impugned product...`
  },
  {
    id: 'DOC-2026-0814',
    title: 'Forensic Audit Report - Multi-State Bank Fraud',
    type: 'Evidence',
    fileName: 'Forensic_Accounting_Report_KPMG_CBI_2026.pdf',
    fileSize: '18.6 MB',
    uploadedBy: 'Inspector R.K. Yadav, CBI (ACB)',
    uploadDate: '2026-08-22 11:10 AM',
    confidenceScore: 94.8,
    extractedEntities: {
      caseNumber: 'CBI/RC/2026/04',
      filingDate: '22-Aug-2026',
      petitioner: 'Central Bureau of Investigation',
      respondent: 'Apex Infrastructure Ltd. & Directors',
      statutoryActs: ['Prevention of Corruption Act Sec 13(1)(d)', 'IPC Sec 420, 120B'],
      courtSealVerified: true,
      stampDutyPaid: 'Official Document'
    },
    redactionStatus: 'Pending',
    redactedEntitiesCount: 22,
    contentSnippet: `CENTRAL BUREAU OF INVESTIGATION - SPECIAL POLICE ESTABLISHMENT
FORENSIC DIGITAL EVIDENCE AUDIT

Case RC No. 04(A)/2026-DLI
Accused: Suresh Mallya (DOB: 14/05/1972, Passport: Z8910291, Mobile: +91-98711-00219)
Bank Accounts Investigated:
1. State Bank of India, CAG Branch: A/c 30918290123 (Balance diverted ₹ 48.5 Cr)
2. Standard Chartered Bank: A/c 44910291829 (Beneficiary: offshore shell entity)
Aadhaar of key shell signatories: 5541-9021-3819, 7712-4019-2810.
Residential Address: Villa 12, Palm Meadows, Whitefield, Bengaluru - 560066.`
  }
];

export const SAMPLE_REDACTION_DOC = {
  title: 'CRIMINAL COMPLAINT & SPECIAL INVESTIGATION REPORT',
  caseNumber: 'SPL(CBI)/2026/842',
  text: `IN THE SPECIAL COURT OF CBI & ANTI-CORRUPTION, NEW DELHI
CRIMINAL COMPLAINT UNDER SECTION 190(1)(b) CrPC & SECTION 13 PC ACT

Complainant: Inspector Rajeshwar Rao, CBI ACB Branch, Lodhi Road, New Delhi.
Contact Phone: +91-98102-39481 | Email: rajeshwar.rao@cbi.gov.in

ACCUSED PARTICULARS:
1. Shri Rameshwar Prasad Gupta, S/o Late J.P. Gupta
   Aadhaar Number: 4892-3019-8812
   Permanent Account Number (PAN): BDFPG8912K
   Residential Address: Bungalow No. 14, Civil Lines, Sector 12, Gurugram, Haryana - 122001
   Personal Mobile: +91-98110-55421 | Alternative Email: rameshwar.gupta@apexholding.in

2. Smt. Sunita Gupta (Spouse & Director)
   Aadhaar Number: 7712-8921-4019
   Bank Details: Canara Bank A/c No. 209100291024, IFSC: CNRB0001092
   Current Balance Tracked: INR 3,42,80,000/-

3. Minor Child: Master Aryan Gupta (DOB: 12/09/2014, Age 11 years)
   School: Delhi Public School, R.K. Puram, New Delhi
   Beneficiary trust fund account: Kotak Mahindra Bank A/c 901290391204

STATEMENT OF OFFENCE:
During the financial audits of 2024-2026, the accused diverted public consortium loan funds amounting to ₹ 84.6 Crores sanctioned by Punjab National Bank (A/c No. 00291029104) to unauthorized private foreign trusts registered in Mauritius.`,
  entities: [
    { id: 'E1', type: 'Phone', text: '+91-98102-39481', startIndex: 165, endIndex: 180, isRedacted: true, confidence: 99.8, reason: 'Investigating Officer Private Line' },
    { id: 'E2', type: 'Email', text: 'rajeshwar.rao@cbi.gov.in', startIndex: 191, endIndex: 215, isRedacted: true, confidence: 99.4, reason: 'Official Direct Email' },
    { id: 'E3', type: 'Aadhaar', text: '4892-3019-8812', startIndex: 301, endIndex: 315, isRedacted: true, confidence: 99.9, reason: 'Statutory PII - Aadhaar Act 2016' },
    { id: 'E4', type: 'PAN Card', text: 'BDFPG8912K', startIndex: 359, endIndex: 369, isRedacted: true, confidence: 99.1, reason: 'Tax Identification Number' },
    { id: 'E5', type: 'Address', text: 'Bungalow No. 14, Civil Lines, Sector 12, Gurugram, Haryana - 122001', startIndex: 395, endIndex: 462, isRedacted: true, confidence: 96.5, reason: 'Residential Privacy' },
    { id: 'E6', type: 'Phone', text: '+91-98110-55421', startIndex: 483, endIndex: 498, isRedacted: true, confidence: 99.7, reason: 'Personal Contact' },
    { id: 'E7', type: 'Email', text: 'rameshwar.gupta@apexholding.in', startIndex: 521, endIndex: 551, isRedacted: true, confidence: 98.9, reason: 'Personal Email' },
    { id: 'E8', type: 'Aadhaar', text: '7712-8921-4019', startIndex: 610, endIndex: 624, isRedacted: true, confidence: 99.9, reason: 'Statutory PII - Aadhaar Act 2016' },
    { id: 'E9', type: 'Bank Account', text: '209100291024', startIndex: 662, endIndex: 674, isRedacted: true, confidence: 99.6, reason: 'Confidential Financial Identifier' },
    { id: 'E10', type: 'Minor Name', text: 'Master Aryan Gupta (DOB: 12/09/2014, Age 11 years)', startIndex: 777, endIndex: 827, isRedacted: true, confidence: 99.5, reason: 'Juvenile / Minor Identity Protection (JJ Act Sec 74)' },
    { id: 'E11', type: 'Bank Account', text: '901290391204', startIndex: 928, endIndex: 940, isRedacted: true, confidence: 99.2, reason: 'Trust Bank Account' },
    { id: 'E12', type: 'Bank Account', text: '00291029104', startIndex: 1157, endIndex: 1168, isRedacted: true, confidence: 98.8, reason: 'Bank Account Number' }
  ] as SensitiveEntity[]
};
