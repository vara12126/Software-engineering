import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { AIInsightItem } from '../../types';
import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Building2, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { LegalDisclaimer } from '../common/LegalDisclaimer';

export const AIInsightsPanel: React.FC = () => {
  const { aiInsights, setActiveTab } = useCourt();

  const getSeverityIcon = (type: AIInsightItem['type']) => {
    switch (type) {
      case 'Urgent Action':
        return <Clock className="w-4 h-4 text-rose-600" />;
      case 'Workload Trend':
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      case 'Delay Alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'Resource Optimization':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  const getBadgeStyle = (severity: AIInsightItem['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'info':
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50/50 to-amber-50/20 rounded-xl border border-amber-200/60 p-5 shadow-court">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-gold-sm text-court-950 font-bold">
            <Sparkles className="w-4 h-4 text-court-950" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              AI Judicial Insights & Real-Time Directives
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                Live NLP Engine
              </span>
            </h3>
            <p className="text-xs text-slate-500">Continuous docket analytics, pendency forecasts & conflict detection</p>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">Model: LegalLLM-70B Judicial</span>
      </div>

      {/* Grid of Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3.5">
        {aiInsights.map((insight) => (
          <div
            key={insight.id}
            className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-xs hover:border-amber-400/80 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-slate-100 group-hover:bg-amber-50 transition-colors">
                    {getSeverityIcon(insight.type)}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getBadgeStyle(insight.severity)}`}>
                    {insight.type}
                  </span>
                </div>
                {insight.metric && (
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {insight.metric}
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-court-700 transition-colors">
                {insight.title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {insight.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 truncate max-w-[200px]">
                {insight.suggestedAction}
              </span>
              {insight.linkTab && (
                <button
                  onClick={() => setActiveTab(insight.linkTab!)}
                  className="text-[11px] font-semibold text-court-700 hover:text-court-950 flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform"
                >
                  Action <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <LegalDisclaimer />
    </div>
  );
};
