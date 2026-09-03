import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { CaseItem } from '../../types';
import { PriorityBadge, StatusBadge } from '../common/StatusBadge';
import { Eye, Calendar, User, ArrowUpRight } from 'lucide-react';

interface UrgentCasesTableProps {
  onSelectCase: (caseItem: CaseItem) => void;
}

export const UrgentCasesTable: React.FC<UrgentCasesTableProps> = ({ onSelectCase }) => {
  const { cases, setActiveTab } = useCourt();

  // Filter urgent & critical cases
  const priorityCases = cases
    .filter((c) => c.priority === 'Critical' || c.priority === 'Urgent' || c.priority === 'High')
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-court">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Urgent & Priority Cases</h3>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full animate-pulse">
              Priority Bench
            </span>
          </div>
          <p className="text-xs text-slate-500">Matters requiring expedited listing & judicial triage</p>
        </div>

        <button
          onClick={() => setActiveTab('cases')}
          className="text-xs font-semibold text-court-700 hover:text-court-950 flex items-center gap-1 transition-colors"
        >
          View Full Ledger <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-2.5 px-3">Case ID / CNR</th>
              <th className="py-2.5 px-3">Case Title & Type</th>
              <th className="py-2.5 px-3">Priority</th>
              <th className="py-2.5 px-3">Next Hearing</th>
              <th className="py-2.5 px-3">Assigned Bench</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
            <tbody className="divide-y divide-slate-100">
            {priorityCases.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-slate-700">0 Urgent Matters Pending</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">All expedited listings and emergency bail dockets are completely clear.</p>
                  </div>
                </td>
              </tr>
            ) : (
              priorityCases.map((c) => (
                <tr 
                  key={c.id} 
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onSelectCase(c)}
                >
                  <td className="py-3 px-3 font-mono font-semibold text-slate-900 whitespace-nowrap">
                    <div>{c.id}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{c.cnrNumber}</div>
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    <p className="font-semibold text-slate-800 line-clamp-1 group-hover:text-court-700 transition-colors">
                      {c.title}
                    </p>
                    <p className="text-[10px] text-slate-500">{c.caseType}</p>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <PriorityBadge priority={c.priority} size="sm" />
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{c.nextHearing}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                      <User className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[140px]">{c.assignedJudge.replace('Hon\'ble Justice ', 'J. ')}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <StatusBadge status={c.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(c);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-court-900 hover:text-white text-slate-700 font-semibold text-[11px] transition-colors shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Dossier</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

