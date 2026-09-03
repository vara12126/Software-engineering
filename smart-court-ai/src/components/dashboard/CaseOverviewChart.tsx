import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';

const ZERO_MONTHLY_DATA = [
  { month: 'Mar', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
  { month: 'Apr', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
  { month: 'May', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
  { month: 'Jun', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
  { month: 'Jul', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
  { month: 'Aug', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
  { month: 'Sep (Est)', newCases: 0, ongoingCases: 0, resolvedCases: 0, pendingCases: 0 },
];

const SAMPLE_MONTHLY_DATA = [
  { month: 'Mar', newCases: 42, ongoingCases: 110, resolvedCases: 38, pendingCases: 72 },
  { month: 'Apr', newCases: 55, ongoingCases: 125, resolvedCases: 46, pendingCases: 79 },
  { month: 'May', newCases: 48, ongoingCases: 130, resolvedCases: 52, pendingCases: 78 },
  { month: 'Jun', newCases: 64, ongoingCases: 142, resolvedCases: 41, pendingCases: 101 },
  { month: 'Jul', newCases: 58, ongoingCases: 138, resolvedCases: 60, pendingCases: 78 },
  { month: 'Aug', newCases: 72, ongoingCases: 154, resolvedCases: 65, pendingCases: 89 },
  { month: 'Sep (Est)', newCases: 68, ongoingCases: 148, resolvedCases: 70, pendingCases: 78 },
];

export const CaseOverviewChart: React.FC = () => {
  const { cases } = useCourt();
  const [chartType, setChartType] = useState<'all' | 'newVsResolved' | 'ongoing'>('all');

  const isFresh = cases.length === 0;
  const chartData = isFresh ? ZERO_MONTHLY_DATA : SAMPLE_MONTHLY_DATA;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-court">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Case Overview & Disposal Dynamics</h3>
          <p className="text-xs text-slate-500">Monthly breakdown of filing volume vs bench disposals</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start text-xs font-medium">
          <button
            onClick={() => setChartType('all')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              chartType === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Metrics
          </button>
          <button
            onClick={() => setChartType('newVsResolved')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              chartType === 'newVsResolved' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Filings vs Disposals
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, isFresh ? 10 : 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                borderRadius: '8px',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            
            {chartType === 'all' && (
              <>
                <Bar dataKey="newCases" name="New Cases" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="resolvedCases" name="Resolved Cases" fill="#10B981" radius={[4, 4, 0, 0]} barSize={16} />
                <Line type="monotone" dataKey="ongoingCases" name="Active / Ongoing" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="pendingCases" name="Pending Scrutiny" stroke="#64748B" strokeWidth={2} strokeDasharray="4 4" />
              </>
            )}

            {chartType === 'newVsResolved' && (
              <>
                <Bar dataKey="newCases" name="New Filings" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={22} />
                <Bar dataKey="resolvedCases" name="Disposals" fill="#10B981" radius={[4, 4, 0, 0]} barSize={22} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 bg-blue-50/50 rounded-lg">
          <p className="text-slate-500 text-[10px]">Avg Monthly Filings</p>
          <p className="font-bold text-blue-700 text-sm">{isFresh ? '0 Cases' : '58.1 Cases'}</p>
        </div>
        <div className="p-2 bg-emerald-50/50 rounded-lg">
          <p className="text-slate-500 text-[10px]">Avg Monthly Disposal</p>
          <p className="font-bold text-emerald-700 text-sm">{isFresh ? '0 Cases' : '54.3 Cases'}</p>
        </div>
        <div className="p-2 bg-amber-50/50 rounded-lg">
          <p className="text-slate-500 text-[10px]">Clearance Rate</p>
          <p className="font-bold text-amber-700 text-sm">{isFresh ? '0.0%' : '93.4%'}</p>
        </div>
        <div className="p-2 bg-slate-100 rounded-lg">
          <p className="text-slate-500 text-[10px]">Active Workload Index</p>
          <p className="font-bold text-slate-800 text-sm">{isFresh ? '0.0' : 'Stable (1.07)'}</p>
        </div>
      </div>
    </div>
  );
};

