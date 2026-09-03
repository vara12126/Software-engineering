import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  icon: LucideIcon;
  colorScheme?: 'navy' | 'amber' | 'emerald' | 'rose' | 'indigo' | 'slate';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon: Icon,
  colorScheme = 'navy',
  onClick
}) => {
  const getScheme = () => {
    switch (colorScheme) {
      case 'amber':
        return {
          iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
          accent: 'hover:border-amber-400',
          dot: 'bg-amber-500'
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
          accent: 'hover:border-emerald-400',
          dot: 'bg-emerald-500'
        };
      case 'rose':
        return {
          iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
          accent: 'hover:border-rose-400',
          dot: 'bg-rose-500'
        };
      case 'indigo':
        return {
          iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
          accent: 'hover:border-indigo-400',
          dot: 'bg-indigo-500'
        };
      case 'navy':
      default:
        return {
          iconBg: 'bg-slate-100 text-court-700 border-slate-200',
          accent: 'hover:border-court-500',
          dot: 'bg-court-700'
        };
    }
  };

  const scheme = getScheme();

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-court hover:shadow-court-lg transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${scheme.accent}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">{value}</h3>
          </div>
        </div>
        <div className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${scheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend ? (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                trend.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trend.value}
            </span>
            <span className="text-slate-400">{trend.period || 'vs last month'}</span>
          </div>
        ) : (
          <span className="text-slate-500 font-normal">{subtext || 'Institutional metrics'}</span>
        )}
      </div>
    </div>
  );
};
