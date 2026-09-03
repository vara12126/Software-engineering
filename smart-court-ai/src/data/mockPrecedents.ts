import { CasePrecedent } from '../types';

export const MOCK_PRECEDENTS: CasePrecedent[] = [
  {
    citation: '(2017) 10 SCC 1',
    title: 'Justice K.S. Puttaswamy (Retd.) v. Union of India',
    court: 'Supreme Court of India (9-Judge Constitution Bench)',
    year: 2017,
    relevantSections: ['Article 21', 'Article 14', 'Article 19', 'Information Technology Act Section 43A'],
    similarityScore: 96,
    ratioDecidendi: 'The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution. State actions infringing informational privacy must pass the three-fold test of legality, necessity, and proportionality.',
    bench: 'Hon\'ble J.S. Khehar, C.J.I., J. Chelameswar, S.A. Bobde, R.K. Agrawal, R.F. Nariman, A.M. Sapre, D.Y. Chandrachud, Sanjay Kishan Kaul, S. Abdul Nazeer, JJ.',
    status: 'Followed'
  },
  {
    citation: '(2014) 8 SCC 273',
    title: 'Arnesh Kumar v. State of Bihar & Anr.',
    court: 'Supreme Court of India',
    year: 2014,
    relevantSections: ['Section 41 CrPC', 'Section 41A CrPC', 'Section 498A IPC'],
    similarityScore: 92,
    ratioDecidendi: 'Arrest should not be made routinely in offences punishable with imprisonment up to seven years. Police officers must satisfy themselves regarding the necessity of arrest based on parameters laid down in Section 41 CrPC and issue notice of appearance under Section 41A CrPC.',
    bench: 'Hon\'ble Chandramauli Kr. Prasad and Pinaki Chandra Ghose, JJ.',
    status: 'Upheld'
  },
  {
    citation: '(2019) 4 SCC 17',
    title: 'Swiss Ribbons Pvt. Ltd. & Anr. v. Union of India & Ors.',
    court: 'Supreme Court of India',
    year: 2019,
    relevantSections: ['IBC Section 7', 'IBC Section 9', 'IBC Section 12A', 'IBC Section 29A'],
    similarityScore: 89,
    ratioDecidendi: 'Upheld the constitutional validity of the Insolvency and Bankruptcy Code, 2016. Distinguished between financial and operational creditors; clarified that the primary objective of IBC is resolution and revival of corporate debtors rather than mere debt recovery.',
    bench: 'Hon\'ble R.F. Nariman and Navin Sinha, JJ.',
    status: 'Followed'
  },
  {
    citation: '(2018) 16 SCC 299',
    title: 'Asian Resurfacing of Road Agency Pvt. Ltd. v. CBI',
    court: 'Supreme Court of India (3-Judge Bench)',
    year: 2018,
    relevantSections: ['Section 397 CrPC', 'Section 482 CrPC', 'Prevention of Corruption Act'],
    similarityScore: 87,
    ratioDecidendi: 'Stay of proceedings granted by High Courts or trial courts in civil and criminal cases shall not exceed six months unless extended by a speaking order explaining reasons for delay.',
    bench: 'Hon\'ble Adarsh Kumar Goel, Rohinton Fali Nariman, Navin Sinha, JJ.',
    status: 'Followed'
  },
  {
    citation: '(2021) 2 SCC 324',
    title: 'Vidya Drolia and Others v. Durga Trading Corporation',
    court: 'Supreme Court of India',
    year: 2021,
    relevantSections: ['Arbitration and Conciliation Act Section 8', 'Section 11(6)', 'Transfer of Property Act'],
    similarityScore: 85,
    ratioDecidendi: 'Laid down the four-fold test for determining non-arbitrability of disputes: (1) actions in rem, (2) matters affecting third party rights, (3) inalienable sovereign functions, and (4) non-arbitrability mandated by statute.',
    bench: 'Hon\'ble N.V. Ramana, Sanjiv Khanna, Krishna Murari, JJ.',
    status: 'Followed'
  },
  {
    citation: '(2020) 12 SCC 324',
    title: 'Rajnesh v. Neha & Anr.',
    court: 'Supreme Court of India',
    year: 2020,
    relevantSections: ['Section 125 CrPC', 'Protection of Women from Domestic Violence Act Section 12', 'HMA Section 24'],
    similarityScore: 91,
    ratioDecidendi: 'Comprehensive guidelines issued for determining quantum of interim maintenance in matrimonial disputes, mandating mandatory filing of Affidavit of Assets and Liabilities by both spouses.',
    bench: 'Hon\'ble Indu Malhotra and R. Subhash Reddy, JJ.',
    status: 'Followed'
  },
  {
    citation: '(2015) 5 SCC 1',
    title: 'Shreya Singhal v. Union of India',
    court: 'Supreme Court of India',
    year: 2015,
    relevantSections: ['IT Act Section 66A', 'Article 19(1)(a)', 'Article 19(2)'],
    similarityScore: 94,
    ratioDecidendi: 'Section 66A of Information Technology Act struck down in its entirety as unconstitutional and violative of free speech under Article 19(1)(a); discussion vs advocacy principle recognized.',
    bench: 'Hon\'ble J. Chelameswar and Rohinton Fali Nariman, JJ.',
    status: 'Upheld'
  }
];
