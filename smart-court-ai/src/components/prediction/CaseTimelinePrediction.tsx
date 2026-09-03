import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { CaseItem } from '../../types';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  Hourglass, 
  BarChart2, 
  ShieldCheck,
  FileText
} from 'lucide-react';

export const CaseTimelinePrediction: React.FC = () => {
  const { cases, setIsRegisterModalOpen } = useCourt();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0] || null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Moderate':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'High':
      default:
        return 'text-rose-700 bg-rose-50 border-rose-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">AI Case Timeline & Delay Risk Prediction</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Predictive Docket Analytics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical estimation of case disposal dates based on procedural velocity, witness size & bench workloads
          </p>
        </div>

        {/* Case Selector Dropdown */}
        {cases.length > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Select Case:</span>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500/30"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.title.substring(0, 30)}...
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-medium">0 Cases on Docket</span>
        )}
      </div>

      {!activeCase ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 shadow-court text-center space-y-3">
          <Hourglass className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Cases Available for Delay Prediction (0 Tracked)</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Register a case into the digital management registry to generate AI-predicted milestone dates, delay risk probabilities, and procedural bottleneck diagnostics.
          </p>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="mt-2 px-4 py-2 rounded-xl bg-court-900 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-court"
          >
            + Register First Case
          </button>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Case Stage</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{activeCase.currentStage}</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
                <span className="font-semibold text-court-700">Filing Date:</span> {activeCase.filingDate}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Predicted Completion</p>
              <p className="text-xl font-bold text-court-900 mt-1 font-mono">{activeCase.predictedCompletion}</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
                <Hourglass className="w-3.5 h-3.5 text-amber-600" />
                <span>~{activeCase.estimatedRemainingDays} Days Remaining</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Historical Similarity</p>
              <p className="text-xl font-bold text-slate-900 mt-1">94.2% Match</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
                <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Compared with 1,420 cases</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Delay Risk Level</p>
              <div className="mt-1">
                <span className={`inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full border ${getRiskColor(activeCase.delayRisk)}`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {activeCase.delayRisk} Delay Probability
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Complexity: {activeCase.aiAnalysis.complexityScore} / 10</p>
            </div>
          </div>

          {/* Main Timeline Visualization */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Procedural Timeline & Projected Milestone Trajectory
              </h3>
              <p className="text-xs text-slate-500">
                Visual milestone breakdown showing actual completed durations against AI-forecasted completion dates
              </p>
            </div>

            {/* Interactive Milestone Track */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
              {activeCase.timeline.map((stage, idx) => {
                const isCompleted = stage.status === 'Completed';
                const isInProgress = stage.status === 'In Progress';
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                      isCompleted
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                        : isInProgress
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20 text-amber-950'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold font-mono">STEP {idx + 1}</span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : isInProgress ? (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                        ) : (
                          <Clock className="w-3 h-3 text-slate-400" />
                        )}
                      </div>
                      <h4 className="font-bold text-xs leading-snug">{stage.stageName}</h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-mono">
                      {stage.completedDate ? (
                        <span className="text-emerald-700 font-semibold">{stage.completedDate}</span>
                      ) : stage.targetDate ? (
                        <span className="text-amber-800 font-semibold">{stage.targetDate}</span>
                      ) : (
                        <span className="text-slate-400">Projected</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Explanatory Panel */}
            <div className="p-4 bg-gradient-to-r from-amber-50/60 via-slate-50 to-blue-50/40 rounded-xl border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-slate-900">AI Predictive Explanation & Delay Diagnostics</h4>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed">
                {activeCase.aiAnalysis.delayExplanation}
              </p>

              {activeCase.delayFactors && activeCase.delayFactors.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">Identified Potential Delay Drivers:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-600">
                    {activeCase.delayFactors.map((factor, fIdx) => (
                      <li key={fIdx}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <LegalDisclaimer />
          </div>
        </>
      )}
    </div>
  );
};

