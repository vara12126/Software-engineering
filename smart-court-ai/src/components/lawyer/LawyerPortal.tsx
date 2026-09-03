import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { PriorityBadge, StatusBadge } from '../common/StatusBadge';
import { 
  Briefcase, 
  Calendar, 
  Video, 
  FileText, 
  UploadCloud, 
  BookOpen, 
  Clock, 
  Eye, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const LawyerPortal: React.FC = () => {
  const { cases, currentUser, setActiveTab, setIsRegisterModalOpen, showToast } = useCourt();

  // Filter cases where counsel is active lawyer
  const lawyerCases = cases;

  const handleJoinVirtualCourt = (hearingTitle: string) => {
    showToast('info', 'Connecting to Virtual Courtroom', `Joining secure high-definition judicial session for ${hearingTitle}...`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Lawyer Header Banner */}
      <div className="bg-gradient-to-r from-court-950 via-court-900 to-court-850 rounded-2xl p-6 text-white shadow-court border border-court-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Bar Registration: D/1429/2012
            </span>
            <span className="text-xs text-slate-300">Delhi High Court Bar Association</span>
          </div>
          <h2 className="text-xl font-bold mt-1 font-sans">
            Advocate Digital Practice & Docket Chamber
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage daily cause lists, virtual court hearings, draft e-filings, and precedent research
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-court-950 font-bold text-xs shadow-gold-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            + New E-Filing Draft
          </button>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('ai-docs')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-court hover:shadow-court-lg transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <UploadCloud className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Upload E-Filing</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">AI classification & entity verification</p>
        </div>

        <div
          onClick={() => setActiveTab('cases')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-court hover:shadow-court-lg transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">My Listed Matters</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">{lawyerCases.length} Active matters on docket</p>
        </div>

        <div
          onClick={() => setActiveTab('scheduler')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-court hover:shadow-court-lg transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Daily Cause List</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Check listing times & courtrooms</p>
        </div>

        <div
          onClick={() => setActiveTab('precedents')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-court hover:shadow-court-lg transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold mb-2 group-hover:bg-amber-500 group-hover:text-court-950 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Precedent Research</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Instant legal ratio search & memos</p>
        </div>
      </div>

      {/* Today's Listed Hearings & Virtual Court Join Room */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Today's Listed Hearings (Virtual & Physical)</h3>
            <p className="text-xs text-slate-500">Live sessions across High Court Benches</p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
            {lawyerCases.length > 0 ? `${lawyerCases.length} Listed Today` : '0 Listed Today'}
          </span>
        </div>

        {lawyerCases.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-xs text-slate-700">No Matters Listed for Today</p>
            <p className="text-[11px] text-slate-400">Your advocate chamber is clear with 0 active listings. Create an e-filing draft or register a case to link to your chamber.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lawyerCases.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-court-900 text-white">
                      {c.id}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{c.courtroom}</span>
                    <PriorityBadge priority={c.priority} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {c.title} ({c.caseType})
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Next Hearing: {c.nextHearing} • Coram: {c.assignedJudge}
                  </p>
                </div>

                <button
                  onClick={() => handleJoinVirtualCourt(c.title)}
                  className="px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>Enter Virtual Bench</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

