import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { MOCK_PRECEDENTS } from '../../data/mockPrecedents';
import { CasePrecedent } from '../../types';
import { Modal } from '../common/Modal';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Filter, 
  ExternalLink, 
  Plus, 
  FileText, 
  Download, 
  Scale, 
  Check, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PrecedentSearch: React.FC = () => {
  const { cases, showToast, addAuditLog } = useCourt();

  const [query, setQuery] = useState<string>('Right to Privacy Article 21 interim stay procedure');
  const [selectedCourt, setSelectedCourt] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedPrecedent, setSelectedPrecedent] = useState<CasePrecedent | null>(null);
  const [memoModalOpen, setMemoModalOpen] = useState<boolean>(false);
  const [isGeneratingMemo, setIsGeneratingMemo] = useState<boolean>(false);

  // Filter precedents
  const filteredPrecedents = MOCK_PRECEDENTS.filter((p) => {
    const matchesQuery =
      query === '' ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.citation.toLowerCase().includes(query.toLowerCase()) ||
      p.ratioDecidendi.toLowerCase().includes(query.toLowerCase()) ||
      p.relevantSections.some((s) => s.toLowerCase().includes(query.toLowerCase()));

    const matchesCourt = selectedCourt === 'ALL' || p.court.includes(selectedCourt);
    const matchesYear = selectedYear === 'ALL' || p.year.toString() === selectedYear;

    return matchesQuery && matchesCourt && matchesYear;
  });

  const handleAddCitationToCase = (prec: CasePrecedent) => {
    confetti({ particleCount: 40, spread: 50 });
    showToast('success', 'Citation Linked', `Added ${prec.citation} (${prec.title}) to active case reference docket.`);
    addAuditLog(`Linked precedent citation ${prec.citation}`, undefined, 'Success');
  };

  const handleGenerateMemo = (prec: CasePrecedent) => {
    setSelectedPrecedent(prec);
    setIsGeneratingMemo(true);
    setMemoModalOpen(true);
    setTimeout(() => {
      setIsGeneratingMemo(false);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">AI Legal Precedent & Citation Retrieval</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Semantic Legal Vector Search
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Retrieve authoritative Supreme Court & High Court precedents with semantic similarity scoring & automated ratio extraction
          </p>
        </div>

        <span className="text-xs text-slate-500 font-mono">1.2M+ Judicial Decisions Indexed</span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-court space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, judgments, legal principles, statutory acts (e.g. Sec 138 NI Act, Article 21 Privacy, Section 9 Arbitration)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-28 py-3 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
          />
          <button
            onClick={() => showToast('info', 'Search Refreshed', `Retrieved ${filteredPrecedents.length} relevant judicial citations.`)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-court-900 hover:bg-court-850 text-white font-semibold text-xs transition-colors"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">Jurisdiction:</span>
            <select
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-medium"
            >
              <option value="ALL">All Apex & High Courts</option>
              <option value="Supreme Court">Supreme Court of India</option>
              <option value="High Court">High Courts</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Year Range:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-medium"
            >
              <option value="ALL">All Years</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
            </select>
          </div>

          <div className="ml-auto text-slate-400 text-[11px]">
            Showing <span className="font-bold text-slate-700">{filteredPrecedents.length}</span> precedent matches
          </div>
        </div>
      </div>

      {/* Precedent Results Grid */}
      <div className="space-y-4">
        {filteredPrecedents.map((prec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court hover:shadow-court-lg transition-all space-y-3 group"
          >
            {/* Title & Citation Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                    {prec.citation}
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {prec.court} ({prec.year})
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Status: {prec.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-court-700 transition-colors font-sans">
                  {prec.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">Coram / Bench:</span> {prec.bench}
                </p>
              </div>

              {/* Similarity badge */}
              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {prec.similarityScore}% Semantic Match
                </span>
              </div>
            </div>

            {/* Ratio Decidendi */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 block">Ratio Decidendi / Legal Principle:</span>
              <p className="leading-relaxed italic">"{prec.ratioDecidendi}"</p>
            </div>

            {/* Statutory tags & Action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {prec.relevantSections.map((sec, sIdx) => (
                  <span key={sIdx} className="text-[11px] font-semibold bg-court-50 text-court-800 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    {sec}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleGenerateMemo(prec)}
                  className="px-3 py-1.5 rounded-lg bg-court-900 hover:bg-court-850 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Generate Legal Memo</span>
                </button>
                <button
                  onClick={() => handleAddCitationToCase(prec)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Case</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LegalDisclaimer message="Precedent citations retrieved by semantic search must be independently verified against authoritative law reports (SCR/SCC/AIR) before judicial citation." />

      {/* AI Legal Memo Modal */}
      {selectedPrecedent && (
        <Modal
          isOpen={memoModalOpen}
          onClose={() => setMemoModalOpen(false)}
          title={`AI Legal Bench Memorandum: ${selectedPrecedent.citation}`}
          subtitle={`Comparative Analysis for ${selectedPrecedent.title}`}
          maxWidth="3xl"
        >
          {isGeneratingMemo ? (
            <div className="p-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto animate-spin-slow" />
              <p className="text-xs font-bold text-slate-800">Synthesizing Comparative Precedent Memo...</p>
              <p className="text-[11px] text-slate-400">Extracting binding principles, distinguished doctrines & statutory cross-references</p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-950 block">Binding Precedent Overview</span>
                <p className="text-amber-900 mt-0.5">
                  <span className="font-semibold">{selectedPrecedent.title}</span> ({selectedPrecedent.citation}) held by {selectedPrecedent.court}.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">Key Takeaways for Active Bench:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
                  <li>Directly applicable to constitutional and statutory challenges concerning procedural fairness.</li>
                  <li>Established three-tier proportionality standard for evaluating executive encroachment.</li>
                  <li>Binding on all coordinate High Court benches under Article 141 of the Constitution.</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] leading-relaxed">
                <div>// SUGGESTED JUDICIAL PARAGRAPH FOR BENCH ORDER:</div>
                <div className="text-amber-300 mt-1">
                  "Following the authoritative dictum in {selectedPrecedent.title} [{selectedPrecedent.citation}], this Court observes that the impugned administrative direction must adhere to strict procedural necessity..."
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setMemoModalOpen(false);
                    showToast('success', 'Memo Saved', 'Precedent memo copied to draft orders repository.');
                  }}
                  className="px-4 py-2 rounded-xl bg-court-900 text-white font-bold text-xs"
                >
                  Save to Draft Orders
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
