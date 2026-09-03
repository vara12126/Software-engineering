import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

export const CaseStatusDonut: React.FC = () => {
  const { cases } = useCourt();

  const pendingScrutiny = cases.filter((c) => c.status === 'Registered' || c.status === 'Preliminary Arguments').length;
  const underHearing = cases.filter((c) => c.status === 'Evidence & Witnesses' || c.status === 'Final Arguments' || c.status === 'Under Hearing').length;
  const reserved = cases.filter((c) => c.status === 'Judgment Reserved').length;
  const resolved = cases.filter((c) => c.status === 'Resolved').length;
  const appealed = cases.filter((c) => c.status === 'Appealed').length;

  const total = cases.length;

  const statusData = [
    { name: 'Pending Scrutiny', value: pendingScrutiny, color: '#94A3B8' },
    { name: 'Under Hearing', value: underHearing, color: '#3B82F6' },
    { name: 'Reserved', value: reserved, color: '#F59E0B' },
    { name: 'Resolved', value: resolved, color: '#10B981' },
    { name: 'Appealed', value: appealed, color: '#EF4444' }
  ];

  // Placeholder slice if 0 cases so donut renders clean empty circle
  const renderData = total > 0 ? statusData : [{ name: 'No Cases on Docket', value: 1, color: '#E2E8F0' }];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-court flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Case Status Distribution</h3>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {total} Total Cases
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">Active ledger across all benches</p>
      </div>

      <div className="h-56 w-full relative my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={renderData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={total > 0 ? 3 : 0}
              dataKey="value"
            >
              {renderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {total > 0 && (
              <Tooltip
                formatter={(val: number) => [`${val} Cases (${((val / total) * 100).toFixed(1)}%)`, 'Count']}
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-900">{total}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tracked</span>
        </div>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs pt-2 border-t border-slate-100">
        {statusData.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-0.5">
            <span className="flex items-center gap-1.5 text-slate-600 truncate">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="truncate">{item.name}</span>
            </span>
            <span className="font-semibold text-slate-800 ml-1">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

