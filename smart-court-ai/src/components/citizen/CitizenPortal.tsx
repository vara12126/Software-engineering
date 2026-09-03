import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { CaseItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Bell, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CitizenPortal: React.FC = () => {
  const { cases, showToast, addAuditLog } = useCourt();

  const [searchCnr, setSearchCnr] = useState<string>('');
  const [activeSearchedCase, setActiveSearchedCase] = useState<CaseItem | null>(null);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCnr.trim()) {
      showToast('info', 'Enter CNR', 'Please enter a valid 16-digit CNR or Case ID to search.');
      return;
    }
    const found = cases.find(
      (c) =>
        c.cnrNumber.toLowerCase().includes(searchCnr.trim().toLowerCase()) ||
        c.id.toLowerCase().includes(searchCnr.trim().toLowerCase())
    );

    if (found) {
      setActiveSearchedCase(found);
      showToast('success', 'Case Found', `Found record for ${found.cnrNumber} (${found.title})`);
      addAuditLog(`Citizen tracked case ${found.cnrNumber}`, found.id, 'Success');
    } else {
      showToast('error', 'No Record Found', 'No case record matches this CNR in the active digital registry.');
    }
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    confetti({ particleCount: 40, spread: 50 });
    showToast('success', 'Alerts Activated', 'SMS & WhatsApp hearing alerts enabled for this matter.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header / Welcome Banner */}
      <div className="bg-gradient-to-r from-court-950 via-court-900 to-court-850 rounded-2xl p-6 text-white shadow-court border border-court-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-court-950 font-bold">
            <Users className="w-5 h-5 text-court-950" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Citizen & Litigant Transparent Justice Portal</h2>
            <p className="text-xs text-slate-300">
              Track court case progress, next hearing dates, certified copy downloads & daily cause list updates
            </p>
          </div>
        </div>

        {/* CNR Lookup Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCnr}
                onChange={(e) => setSearchCnr(e.target.value)}
                placeholder="Enter 16-Digit CNR Number (e.g. DLHC01-002847-2026) or Case ID..."
                className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-court-950 font-extrabold text-xs shadow-gold-sm transition-all cursor-pointer"
            >
              Track Case
            </button>
          </div>
        </form>
      </div>

      {/* Case Status Display */}
      {!activeSearchedCase ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 shadow-court text-center space-y-3">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">Search Case Docket (0 Active Searches)</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Litigants and citizens can enter their 16-digit CNR Number or Case ID in the search bar above to verify live status, next hearing dates, and download certified interim orders.
          </p>
        </div>
      ) : (

        <div className="space-y-6">
          {/* Main Case Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                    {activeSearchedCase.id}
                  </span>
                  <span className="text-xs font-mono text-slate-500">CNR: {activeSearchedCase.cnrNumber}</span>
                  <StatusBadge status={activeSearchedCase.status} size="sm" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2 font-sans">
                  {activeSearchedCase.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filing Date: {activeSearchedCase.filingDate} • Registered in {activeSearchedCase.courtroom}
                </p>
              </div>

              {/* Next Hearing Date Highlight */}
              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-center shrink-0">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Next Hearing Date</span>
                <p className="text-base font-extrabold text-amber-950 font-mono mt-0.5 flex items-center justify-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  {activeSearchedCase.nextHearing}
                </p>
                <span className="text-[10px] text-amber-700 font-medium block mt-0.5">
                  {activeSearchedCase.courtroom.split(' ')[0]} {activeSearchedCase.courtroom.split(' ')[1]}
                </span>
              </div>
            </div>

            {/* Simplified Citizen Visual Progress Pipeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-3">Live Case Progression Timeline</h4>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {[
                  { name: 'Case Filed', status: 'Completed' },
                  { name: 'Registered', status: 'Completed' },
                  { name: 'Hearing', status: 'In Progress' },
                  { name: 'Proceedings', status: 'Upcoming' },
                  { name: 'Judgment', status: 'Upcoming' },
                  { name: 'Closed', status: 'Upcoming' }
                ].map((stg, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3 rounded-xl border text-center text-xs ${
                      stg.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200 font-semibold'
                        : stg.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-500/20 font-bold'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <div className="w-5 h-5 mx-auto rounded-full flex items-center justify-center mb-1 text-[10px] font-bold bg-white border">
                      {stg.status === 'Completed' ? '✓' : sIdx + 1}
                    </div>
                    <span>{stg.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hearing Orders & Certified Copy Request */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-court-700" />
                  Latest Public Interim Order
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeSearchedCase.hearings[0]?.dailyOrderSummary || 'Case listed for preliminary admission hearing.'}
                </p>
                <button
                  onClick={() => showToast('info', 'Downloading Order', 'Certified interim order copy downloaded.')}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-court-900 text-white font-semibold text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Certified Order (PDF)
                </button>
              </div>

              {/* Notification Subscription */}
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-700" />
                    Subscribe for Real-time Hearing Alerts
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Receive instant SMS & WhatsApp notifications whenever a new hearing date or bench order is pronounced.
                  </p>
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  className={`mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    subscribed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-court-950 shadow-gold-sm'
                  }`}
                >
                  {subscribed ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  <span>{subscribed ? 'Alerts Activated for +91-98***' : 'Enable Free SMS / WhatsApp Alerts'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

