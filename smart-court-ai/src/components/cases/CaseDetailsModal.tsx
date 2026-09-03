import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { CaseItem } from '../../types';
import { PriorityBadge, StatusBadge } from '../common/StatusBadge';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  X, 
  User, 
  Calendar, 
  FileText, 
  Clock, 
  Sparkles, 
  BookOpen, 
  History, 
  Scale, 
  Share2, 
  Printer, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  ArrowRight,
  Gavel
} from 'lucide-react';

interface CaseDetailsModalProps {
  caseItem: CaseItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseDetailsModal: React.FC<CaseDetailsModalProps> = ({ caseItem, isOpen, onClose }) => {
  const { updateCaseStatus, setActiveTab } = useCourt();
  const [activeTab, setActiveDetailTab] = useState<
    'overview' | 'parties' | 'hearings' | 'documents' | 'timeline' | 'ai' | 'precedents' | 'audit'
  >('overview');

  if (!isOpen || !caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 bg-slate-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                {caseItem.id}
              </span>
              <span className="text-xs font-mono text-slate-500">CNR: {caseItem.cnrNumber}</span>
              <PriorityBadge priority={caseItem.priority} size="sm" />
              <StatusBadge status={caseItem.status} size="sm" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-sans">
              {caseItem.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => window.print()}
              title="Print Case Summary"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-200 bg-white overflow-x-auto text-xs font-semibold text-slate-600">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'parties', label: 'Parties & Advocates', icon: User },
            { id: 'hearings', label: `Hearings (${caseItem.hearings.length})`, icon: Calendar },
            { id: 'documents', label: `Documents (${caseItem.documents.length})`, icon: FolderOpen },
            { id: 'timeline', label: 'Timeline Pipeline', icon: Clock },
            { id: 'ai', label: 'AI Analysis', icon: Sparkles, badge: 'AI' },
            { id: 'precedents', label: `Precedents (${caseItem.precedents.length})`, icon: BookOpen },
            { id: 'audit', label: 'Audit Trail', icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDetailTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-amber-600 text-amber-700 font-bold bg-amber-50/30'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-bold uppercase">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Key Details Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-medium">Case Type</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{caseItem.caseType}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-medium">Assigned Bench</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{caseItem.assignedJudge}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-medium">Courtroom</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{caseItem.courtroom}</p>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                  <p className="text-[11px] text-amber-800 font-medium">Next Hearing</p>
                  <p className="text-xs font-bold text-amber-950 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {caseItem.nextHearing}
                  </p>
                </div>
              </div>

              {/* Litigant Overview Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Petitioner / Appellant
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{caseItem.petitioner.name}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold text-slate-800">Advocate:</span> {caseItem.petitioner.advocate}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">Bar Reg: {caseItem.petitioner.barRegistration}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                    Respondent / Defendant
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">{caseItem.respondent.name}</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold text-slate-800">Advocate:</span> {caseItem.respondent.advocate}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">Bar Reg: {caseItem.respondent.barRegistration}</p>
                </div>
              </div>

              {/* Prayer Synopsis */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 mb-1">Grievance & Relief Sought</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{caseItem.summary}</p>
              </div>

              {/* Statutory Acts */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">Statutory Acts & References</h4>
                <div className="flex flex-wrap gap-1.5">
                  {caseItem.statutoryActs.map((act, idx) => (
                    <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-court-100 text-court-800 border border-slate-200">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PARTIES */}
          {activeTab === 'parties' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      P
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{caseItem.petitioner.name}</h4>
                      <p className="text-[10px] text-slate-500">Party Type: {caseItem.petitioner.type}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified Digital e-Kyc
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Counsel on Record</span>
                    <span className="font-semibold text-slate-800">{caseItem.petitioner.advocate}</span>
                    <span className="block text-[11px] text-slate-500">Bar ID: {caseItem.petitioner.barRegistration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Counsel Email & Phone</span>
                    <span className="font-mono text-slate-700">{caseItem.petitioner.email || 'counsel@bar.in'}</span>
                    <span className="block font-mono text-slate-500">{caseItem.petitioner.phone || '+91-98110-00000'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px]">Registered Legal Address</span>
                    <span className="text-slate-700">{caseItem.petitioner.address || 'Address provided on judicial record'}</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      R
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{caseItem.respondent.name}</h4>
                      <p className="text-[10px] text-slate-500">Party Type: {caseItem.respondent.type}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    Notice Served
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Standing Counsel / Advocate</span>
                    <span className="font-semibold text-slate-800">{caseItem.respondent.advocate}</span>
                    <span className="block text-[11px] text-slate-500">Bar ID: {caseItem.respondent.barRegistration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Counsel Contact</span>
                    <span className="font-mono text-slate-700">{caseItem.respondent.email || 'respondent.counsel@bar.in'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px]">Service Address</span>
                    <span className="text-slate-700">{caseItem.respondent.address || 'Government Department / Registered Office'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HEARINGS */}
          {activeTab === 'hearings' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Judicial Proceedings Ledger</h4>
                <span className="text-[11px] text-slate-500">{caseItem.hearings.length} hearing(s) recorded</span>
              </div>

              <div className="space-y-3">
                {caseItem.hearings.map((hrg, idx) => (
                  <div key={hrg.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 font-mono">{hrg.hearingDate}</span>
                        <span className="text-[11px] text-slate-500">({hrg.timeSlot})</span>
                        <StatusBadge status={hrg.status} size="sm" />
                      </div>
                      <span className="text-[11px] font-semibold text-court-800 bg-court-100 px-2 py-0.5 rounded">
                        {hrg.courtroom} • {hrg.bench}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-800">
                      Purpose: <span className="font-normal text-slate-700">{hrg.purpose}</span>
                    </p>

                    {hrg.dailyOrderSummary && (
                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                        <span className="font-bold text-slate-900 block mb-0.5">Daily Bench Order Summary:</span>
                        <p className="leading-relaxed">{hrg.dailyOrderSummary}</p>
                      </div>
                    )}

                    {hrg.judgeNotes && (
                      <p className="text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded-lg border border-amber-200 italic">
                        <span className="font-bold not-italic">Bench Note:</span> {hrg.judgeNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Case Documents & Verified Filings</h4>
                <button
                  onClick={() => setActiveTab('ai-docs')}
                  className="text-xs font-semibold text-court-700 hover:text-court-950 flex items-center gap-1"
                >
                  Upload New Document <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {caseItem.documents.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                  <FolderOpen className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-slate-700">No standalone documents attached yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Upload petitions or affidavits via AI Document Intelligence.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {caseItem.documents.map((doc) => (
                    <div key={doc.id} className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{doc.title}</h5>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {doc.fileName} • {doc.fileSize} • Uploaded by {doc.uploadedBy}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              Type: {doc.type}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              AI Confidence: {doc.confidenceScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setActiveTab('redaction')}
                          className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                        >
                          Redact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TIMELINE PIPELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Procedural Stage Progression</h4>
                <p className="text-[11px] text-slate-500">Milestone timeline from initial filing through final judicial closure</p>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {caseItem.timeline.map((stage, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                        stage.status === 'Completed'
                          ? 'bg-emerald-500 text-white'
                          : stage.status === 'In Progress'
                          ? 'bg-amber-500 text-court-950 animate-pulse'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {stage.status === 'Completed' ? '✓' : idx + 1}
                    </span>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-900">{stage.stageName}</h5>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            stage.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : stage.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {stage.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono mt-1">
                        {stage.completedDate ? `Completed: ${stage.completedDate}` : stage.targetDate ? `Target: ${stage.targetDate}` : 'Pending preceding milestones'}
                      </p>
                      {stage.notes && <p className="text-xs text-slate-700 mt-1 italic">{stage.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AI ANALYSIS */}
          {activeTab === 'ai' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-200">
                  <p className="text-[10px] font-bold text-indigo-900 uppercase">Case Complexity Index</p>
                  <p className="text-2xl font-bold text-indigo-950 mt-1">{caseItem.aiAnalysis.complexityScore} / 10</p>
                  <p className="text-[10px] text-indigo-700 mt-0.5">Multi-party statutory matter</p>
                </div>
                <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200">
                  <p className="text-[10px] font-bold text-amber-900 uppercase">Predicted Disposal Date</p>
                  <p className="text-lg font-bold text-amber-950 mt-1 font-mono">{caseItem.predictedCompletion}</p>
                  <p className="text-[10px] text-amber-700 mt-0.5">~{caseItem.estimatedRemainingDays} Days Remaining</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-700 uppercase">Delay Risk Probability</p>
                  <p className={`text-lg font-bold mt-1 ${
                    caseItem.delayRisk === 'Low' ? 'text-emerald-600' : caseItem.delayRisk === 'Moderate' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {caseItem.delayRisk} Risk
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Based on bench clearance trends</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Key Points of Law & Legal Issues Identified</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 leading-relaxed">
                  {caseItem.aiAnalysis.keyLegalIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50/40 rounded-xl border border-amber-200 space-y-2">
                <h4 className="text-xs font-bold text-amber-950">AI Procedural Recommendations</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-amber-900 leading-relaxed">
                  {caseItem.aiAnalysis.recommendedActions.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>

              <LegalDisclaimer />
            </div>
          )}

          {/* TAB 7: PRECEDENTS */}
          {activeTab === 'precedents' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Relevant Judicial Precedents & Citations</h4>
                  <p className="text-[11px] text-slate-500">Semantic matches from Supreme Court & High Court digital repositories</p>
                </div>
                <button
                  onClick={() => setActiveTab('precedents')}
                  className="text-xs font-semibold text-court-700 hover:text-court-950 flex items-center gap-1"
                >
                  Search Full Repository <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {caseItem.precedents.map((prec, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {prec.citation}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 mt-1">{prec.title}</h5>
                        <p className="text-[11px] text-slate-500">{prec.court} ({prec.year}) • Bench: {prec.bench}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                        {prec.similarityScore}% Match
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block mb-0.5">Ratio Decidendi:</span>
                      <p className="leading-relaxed italic">"{prec.ratioDecidendi}"</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prec.relevantSections.map((sec, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold text-slate-900">Immutable Case Event History</h4>
              <div className="space-y-2">
                {caseItem.auditHistory.map((log, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">{log.details}</p>
                      <span className="text-[10px] text-slate-400">By: {log.user}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quick Status Update:</span>
            <select
              value={caseItem.status}
              onChange={(e) => updateCaseStatus(caseItem.id, e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold"
            >
              <option value="Registered">Registered</option>
              <option value="Under Hearing">Under Hearing</option>
              <option value="Preliminary Arguments">Preliminary Arguments</option>
              <option value="Evidence & Witnesses">Evidence & Witnesses</option>
              <option value="Final Arguments">Final Arguments</option>
              <option value="Judgment Reserved">Judgment Reserved</option>
              <option value="Resolved">Resolved</option>
              <option value="Appealed">Appealed</option>
            </select>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
