import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { MOCK_COURTROOMS, MOCK_JUDGES } from '../../data/mockJudges';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  User, 
  ArrowRight, 
  Sliders, 
  Check,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScheduledHearingSlot {
  id: string;
  courtroom: string;
  time: string;
  caseId: string;
  title: string;
  judge: string;
  advocates: string;
  isUrgent: boolean;
  hasConflict?: boolean;
  conflictDetails?: string;
}

const INITIAL_SCHEDULE: ScheduledHearingSlot[] = [
  {
    id: 'SLOT-01',
    courtroom: 'Courtroom 1 (Chief Justice Court)',
    time: '10:30 AM - 11:30 AM',
    caseId: 'SC-2026-1024',
    title: 'Bharat Cloud Networks vs. Union of India',
    judge: 'Hon\'ble Justice Dr. Rajeshwar Swaminathan',
    advocates: 'Sr. Adv. Siddhartha Narain vs. ASG Tushar Mehta',
    isUrgent: true,
    hasConflict: false
  },
  {
    id: 'SLOT-02',
    courtroom: 'Courtroom 2 (Criminal Division)',
    time: '02:00 PM - 03:30 PM',
    caseId: 'SC-2026-1089',
    title: 'State (CBI) vs. Rajeshwar Prasad Gupta',
    judge: 'Hon\'ble Justice Ananya Sengupta',
    advocates: 'SPP K.V. Mohan vs. Sr. Adv. Kapil Sibal',
    isUrgent: true,
    hasConflict: true,
    conflictDetails: 'Adv. Kapil Sibal listed in Courtroom 4 simultaneously at 02:30 PM'
  },
  {
    id: 'SLOT-03',
    courtroom: 'Courtroom 3 (Commercial Division)',
    time: '02:30 PM - 04:30 PM',
    caseId: 'SC-2026-0789',
    title: 'Zenith BioPharma Inc. vs. Aegis Generics Ltd.',
    judge: 'Hon\'ble Justice Vikramaditya Rathore',
    advocates: 'Sr. Adv. Dr. A.M. Singhvi vs. Sr. Adv. Mukul Rohatgi',
    isUrgent: false,
    hasConflict: false
  },
  {
    id: 'SLOT-04',
    courtroom: 'Courtroom 4 (Appellate & Civil)',
    time: '02:00 PM - 03:30 PM',
    caseId: 'SC-2026-0914',
    title: 'Metro Rail Infrastructure Corp vs. Larsen Turbo JV',
    judge: 'Hon\'ble Justice Meenakshi Sundaram',
    advocates: 'Adv. Rajiv Nayar vs. Sr. Adv. Kapil Sibal',
    isUrgent: true,
    hasConflict: true,
    conflictDetails: 'Adv. Kapil Sibal double-booked across Bench II & Bench IV'
  },
  {
    id: 'SLOT-05',
    courtroom: 'Courtroom 5 (Family & Mediation)',
    time: '11:00 AM - 12:30 PM',
    caseId: 'SC-2026-0409',
    title: 'Sunita Sharma vs. Vikram Sharma',
    judge: 'Hon\'ble Justice Tariq Mansoor',
    advocates: 'Adv. Radhika Deshmukh vs. Adv. Harish Chawla',
    isUrgent: false,
    hasConflict: false
  },
  {
    id: 'SLOT-06',
    courtroom: 'Courtroom 6 (PIL & Special Benches)',
    time: '11:30 AM - 01:00 PM',
    caseId: 'SC-2026-0512',
    title: 'Yamuna Ecological Foundation vs. DDA',
    judge: 'Hon\'ble Justice Arundhati Roychowdhury',
    advocates: 'Adv. Ritwick Dutta vs. Adv. Sanjeev Sabharwal',
    isUrgent: false,
    hasConflict: false
  }
];

export const HearingScheduler: React.FC = () => {
  const { showToast, addAuditLog } = useCourt();

  const [schedule, setSchedule] = useState<ScheduledHearingSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-08');
  const [optimizerRan, setOptimizerRan] = useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const conflictsCount = schedule.filter((s) => s.hasConflict).length;

  const handleRunOptimizer = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      if (schedule.length === 0) {
        setSchedule(INITIAL_SCHEDULE);
        setOptimizerRan(true);
        showToast('info', 'Schedule Generated & Analyzed', 'Simulated 6 courtroom listings. Detected 2 counsel listing conflicts requiring optimal redistribution.');
      } else {
        setOptimizerRan(true);
        showToast('info', 'AI Schedule Optimization Ready', 'AI generated optimal slot redistribution for active hearings.');
      }
    }, 1000);
  };

  const handleApplySuggestedSchedule = () => {
    // Resolve conflicts by reallocating timeslot
    setSchedule((prev) =>
      prev.map((s) => {
        if (s.id === 'SLOT-04') {
          return {
            ...s,
            time: '03:45 PM - 05:00 PM',
            hasConflict: false,
            conflictDetails: undefined
          };
        }
        if (s.id === 'SLOT-02') {
          return {
            ...s,
            hasConflict: false,
            conflictDetails: undefined
          };
        }
        return s;
      })
    );
    setOptimizerRan(false);
    confetti({ particleCount: 75, spread: 65 });
    showToast('success', 'Optimized Schedule Applied', 'All advocate listing conflicts resolved. Cause list updated in real-time.');
    addAuditLog('Applied AI Schedule Optimizer across Courtrooms 1-6', undefined, 'Success');
  };


  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Smart Hearing Schedule & Bench Optimizer</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Dynamic Slot Dispatcher
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time conflict detection, advocate double-listing prevention & courtroom capacity balancing
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500/30"
          />

          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white text-xs font-bold shadow-court flex items-center gap-1.5 transition-all disabled:opacity-60"
          >
            <Sparkles className={`w-3.5 h-3.5 text-amber-400 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'Analyzing Rosters...' : 'AI Schedule Optimizer'}</span>
          </button>
        </div>
      </div>

      {/* Scheduling Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Courtroom Utilization</p>
          <p className="text-2xl font-extrabold text-court-900 mt-1">{schedule.length > 0 ? '92.4%' : '0.0%'}</p>
          <p className="text-[11px] text-slate-500 mt-1">6 Active Courtrooms</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Daily Hearings Listed</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{schedule.length} Matters</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">{schedule.length > 0 ? '100% Bench Attendance' : 'All Benches Available'}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Schedule Conflicts</p>
          <p className={`text-2xl font-extrabold mt-1 ${conflictsCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {conflictsCount} Overlaps
          </p>
          <p className="text-[11px] text-slate-500 mt-1">{conflictsCount > 0 ? 'Requires AI redistribution' : 'All clear'}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Average Hearing Window</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{schedule.length > 0 ? '45 Mins' : '0 Mins'}</p>
          <p className="text-[11px] text-slate-500 mt-1">Optimal allocation</p>
        </div>
      </div>

      {/* AI Optimizer Suggestion Card (if ran) */}
      {optimizerRan && (
        <div className="p-5 bg-gradient-to-r from-amber-50 via-white to-amber-50/40 rounded-2xl border-2 border-amber-400 shadow-court space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500 text-court-950 font-bold shadow-gold-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Optimization Proposal Ready</h3>
                <p className="text-xs text-amber-900 font-medium">Overlapping advocate conflict resolved with zero delay to priority cases</p>
              </div>
            </div>

            <button
              onClick={handleApplySuggestedSchedule}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-court-950 font-extrabold text-xs shadow-gold-sm flex items-center gap-1.5 transition-all self-start sm:self-center cursor-pointer"
            >
              <Check className="w-4 h-4 text-court-950" />
              <span>Apply Suggested Schedule</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-amber-200">
              <span className="font-bold text-slate-900 block">Conflict Resolution Strategy:</span>
              <p className="text-slate-700 mt-1">
                Move Arbitration Petition <span className="font-semibold text-court-800">#SC-2026-0914</span> from 02:00 PM to <span className="font-bold text-emerald-700">03:45 PM</span> in Courtroom 4.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200">
              <span className="font-bold text-slate-900 block">Efficiency Gain:</span>
              <p className="text-slate-700 mt-1">
                Zero adjournments requested, eliminates 100% counsel transit clash, balances Courtroom 4 daily load.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Courtroom Daily Schedule Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-sans">
              Daily Cause List & Courtroom Dispatch Matrix ({selectedDate})
            </h3>
            <p className="text-xs text-slate-500">Scheduled hearings across all High Court Benches</p>
          </div>

          <span className="text-xs text-slate-500 font-semibold">Live Session Tracking</span>
        </div>

        {schedule.length === 0 ? (
          <div className="p-10 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-xs text-slate-700">0 Scheduled Hearings for {selectedDate}</p>
            <p className="text-[11px] text-slate-400">All 6 courtrooms and judicial benches are available. Click "AI Schedule Optimizer" above to simulate cause list distribution.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {schedule.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border transition-all ${
                  slot.hasConflict
                    ? 'border-rose-300 bg-rose-50/50'
                    : slot.isUrgent
                    ? 'border-amber-200 bg-amber-50/30'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-court-100 text-court-800">
                      {slot.courtroom.split(' ')[0]} {slot.courtroom.split(' ')[1]}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {slot.time}
                    </span>
                    {slot.isUrgent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                        Urgent
                      </span>
                    )}
                    {slot.hasConflict && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                        Listing Conflict
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-medium text-slate-600 truncate">{slot.courtroom}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="md:col-span-2">
                    <h4 className="font-bold text-slate-900">{slot.title}</h4>
                    <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                      Case ID: <span className="font-bold">{slot.caseId}</span> • Advocates: {slot.advocates}
                    </p>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    <span className="text-slate-400 block">Presiding Judge:</span>
                    <span className="font-semibold text-slate-800 truncate block">{slot.judge}</span>
                  </div>
                </div>

                {slot.hasConflict && (
                  <div className="mt-2.5 p-2 rounded-lg bg-rose-100/80 border border-rose-300 text-xs text-rose-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                    <span>{slot.conflictDetails}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}


        <LegalDisclaimer />
      </div>
    </div>
  );
};
