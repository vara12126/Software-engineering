import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { MOCK_JUDGES } from '../../data/mockJudges';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  BarChart3, 
  Sparkles 
} from 'lucide-react';

const FRESH_BACKLOG = [
  { year: '2022', totalBacklog: 0, clearanceRate: 0 },
  { year: '2023', totalBacklog: 0, clearanceRate: 0 },
  { year: '2024', totalBacklog: 0, clearanceRate: 0 },
  { year: '2025', totalBacklog: 0, clearanceRate: 0 },
  { year: '2026 (YTD)', totalBacklog: 0, clearanceRate: 0 }
];

const HISTORICAL_BACKLOG = [
  { year: '2022', totalBacklog: 540, clearanceRate: 84 },
  { year: '2023', totalBacklog: 490, clearanceRate: 88 },
  { year: '2024', totalBacklog: 430, clearanceRate: 91 },
  { year: '2025', totalBacklog: 375, clearanceRate: 93 },
  { year: '2026 (YTD)', totalBacklog: 332, clearanceRate: 96 }
];

const DISPOSAL_TIME_BY_COURTROOM = [
  { courtroom: 'CR-1 (Chief)', avgDays: 142, benchmark: 150 },
  { courtroom: 'CR-2 (Criminal)', avgDays: 168, benchmark: 150 },
  { courtroom: 'CR-3 (Commercial)', avgDays: 124, benchmark: 150 },
  { courtroom: 'CR-4 (Appellate)', avgDays: 185, benchmark: 150 },
  { courtroom: 'CR-5 (Family)', avgDays: 115, benchmark: 150 },
  { courtroom: 'CR-6 (PIL/Env)', avgDays: 98, benchmark: 150 }
];

export const JudicialAnalytics: React.FC = () => {
  const { cases } = useCourt();
  const isFresh = cases.length === 0;

  const judgeWorkloadData = MOCK_JUDGES.map((j) => ({
    name: j.name.replace('Hon\'ble Justice ', 'J. ').replace('Dr. ', ''),
    active: isFresh ? 0 : j.activeCases,
    pending: isFresh ? 0 : j.pendingCases,
    resolved: isFresh ? 0 : j.resolvedCases
  }));

  const backlogTrendData = isFresh ? FRESH_BACKLOG : HISTORICAL_BACKLOG;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Judicial Workload & Pendency Analytics</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-court-100 text-court-800 border border-slate-200 flex items-center gap-1">
              <BarChart3 className="w-3 h-3 text-court-700" />
              National Judicial Data Grid Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Bench clearance rates, judicial capacity metrics, 5-year pendency reduction & courtroom disposal trends
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
            Overall Clearance Rate: {isFresh ? '0.0%' : '96.2%'}
          </span>
        </div>
      </div>

      {/* Top 3 High Level KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Bench Pendency Reduction</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">{isFresh ? '0.0%' : '-38.5%'}</p>
          <p className="text-[11px] text-slate-500 mt-1">{isFresh ? '0 backlog matters recorded' : 'Down from 540 cases in 2022'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Average Case Lifecycle</p>
          <p className="text-2xl font-extrabold text-court-900 mt-1">{isFresh ? '0 Days' : '138.6 Days'}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">{isFresh ? 'Fresh benchmark ready' : '11.4 days faster than benchmark'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-court">
          <p className="text-xs font-bold text-slate-500 uppercase">Judicial Capacity Index</p>
          <p className="text-2xl font-extrabold text-indigo-700 mt-1">{isFresh ? '0.0%' : '94.8%'}</p>
          <p className="text-[11px] text-slate-500 mt-1">Across 6 active judicial benches</p>
        </div>
      </div>

      {/* Workload by Judge & Historical Backlog Charts (Grid 2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Judge Workload Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Active Docket & Resolution by Judge</h3>
            <p className="text-xs text-slate-500">Total assigned, active proceedings vs disposed cases per bench</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={judgeWorkloadData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, isFresh ? 10 : 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="active" name="Active Proceedings" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={14} />
                <Bar dataKey="pending" name="Pending Scrutiny" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={14} />
                <Bar dataKey="resolved" name="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5-Year Historical Backlog Trend */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court space-y-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">5-Year Backlog Reduction & Clearance Curve</h3>
            <p className="text-xs text-slate-500">Historical docket shrinkage after digital e-filing & AI scheduling</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={backlogTrendData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBacklog" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B192C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0B192C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="year" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, isFresh ? 10 : 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="totalBacklog" name="Total Pending Cases" stroke="#0B192C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBacklog)" />
                <Line type="monotone" dataKey="clearanceRate" name="Clearance Rate (%)" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Resolution Time Comparison by Courtroom */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Average Resolution Velocity by Courtroom</h3>
          <p className="text-xs text-slate-500">Bench disposal speed compared against 150-day statutory benchmark</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DISPOSAL_TIME_BY_COURTROOM.map((cr) => {
            const avg = isFresh ? 0 : cr.avgDays;
            const isFaster = avg <= cr.benchmark;
            return (
              <div key={cr.courtroom} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{cr.courtroom}</h4>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900 font-mono">{avg}</span>
                    <span className="text-xs text-slate-500">Days Avg</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Benchmark: {cr.benchmark}d</span>
                  <span className={`font-semibold ${isFaster ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {isFresh ? 'Ready' : isFaster ? `✓ ${cr.benchmark - cr.avgDays}d Faster` : `⚠ ${cr.avgDays - cr.benchmark}d Delay`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950">
            <span className="font-bold block mb-0.5">AI Judicial Workload Diagnostic:</span>
            {isFresh 
              ? 'Courtrooms 1 through 6 are synchronized with zero backlogs. The judicial allocation engine is standing by for new matter listings and expedited cause list assignment.'
              : 'Courtroom 4 (Appellate & Civil) currently exhibits the longest turnaround (185 days) primarily due to land acquisition counter-affidavit delays. Recommended policy: Issue peremptory orders under Asian Resurfacing norms to curtail adjournments.'}
          </div>
        </div>

        <LegalDisclaimer />
      </div>
    </div>
  );
};

