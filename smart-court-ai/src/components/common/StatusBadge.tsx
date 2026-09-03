import React from 'react';
import { PriorityLevel, CaseStatus } from '../../types';

interface StatusBadgeProps {
  status: CaseStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = (s: string) => {
    switch (s) {
      case 'Resolved':
      case 'Disposed':
      case 'Clean':
      case 'Success':
      case 'Optimal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'Under Hearing':
      case 'In Progress':
      case 'Preliminary Arguments':
      case 'Evidence & Witnesses':
      case 'Final Arguments':
      case 'Active':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
      case 'Registered':
      case 'Scheduled':
      case 'Filing & Scrutiny':
        return 'bg-slate-100 text-slate-700 border-slate-300 ring-slate-400/20';
      case 'Judgment Reserved':
      case 'Part-Heard':
      case 'High Load':
      case 'Manual Review Required':
      case 'Moderate':
        return 'bg-amber-50 text-amber-800 border-amber-300 ring-amber-500/20';
      case 'Appealed':
      case 'Adjourned':
      case 'High':
      case 'Critical':
      case 'Warning':
      case 'Blocked':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-xs transition-colors ${sizeClasses[size]} ${getStyle(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: PriorityLevel | string;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const getStyle = (p: string) => {
    switch (p) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-500/20 font-bold';
      case 'Urgent':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/20 font-semibold';
      case 'High':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-medium';
      case 'Expedited':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 font-medium';
      case 'Normal':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200 font-medium';
    }
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border ${sizeClasses[size]} ${getStyle(priority)}`}>
      {priority === 'Critical' && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>}
      {priority}
    </span>
  );
};
