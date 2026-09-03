import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { KPICard } from '../common/KPICard';
import { CaseOverviewChart } from './CaseOverviewChart';
import { CaseStatusDonut } from './CaseStatusDonut';
import { UrgentCasesTable } from './UrgentCasesTable';
import { AIInsightsPanel } from './AIInsightsPanel';
import { CaseItem } from '../../types';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  Hourglass, 
  CalendarCheck,
  FileCheck,
  Sparkles,
  ShieldCheck,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface MainDashboardProps {
  onSelectCase: (caseItem: CaseItem) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ onSelectCase }) => {
  const { cases, setActiveTab, setIsRegisterModalOpen } = useCourt();

  const totalCasesCount = cases.length;
  const activeCasesCount = cases.filter(
    (c) =>
      c.status === 'Registered' ||
      c.status === 'Preliminary Arguments' ||
      c.status === 'Evidence & Witnesses' ||
      c.status === 'Final Arguments' ||
      c.status === 'Under Hearing'
  ).length;
  const pendingCasesCount = cases.filter((c) => c.status === 'Judgment Reserved').length;
  const resolvedCasesCount = cases.filter((c) => c.status === 'Resolved' || c.status === 'Appealed').length;
  const urgentCasesCount = cases.filter((c) => c.priority === 'Critical' || c.priority === 'Urgent').length;
  const avgResolutionTime = cases.length > 0 ? '148 Days' : '0 Days';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Quick Action Bar */}
      <div className="bg-gradient-to-r from-court-950 via-court-900 to-court-850 rounded-2xl p-5 sm:p-6 text-white shadow-court-lg border border-court-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Integrated Judicial Intelligence Operating System v2.6
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans text-white">
              National Smart Court Docket & Bench Orchestrator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Monitoring 6 active High Courtrooms, {totalCasesCount} matters on digital docket, AI-assisted case lifecycle prediction, automated redaction and cause-list conflict resolution.
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-court-950 font-bold text-xs shadow-gold-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              + Register New Case
            </button>
            <button
              onClick={() => setActiveTab('scheduler')}
              className="px-3.5 py-2 rounded-xl bg-court-800 hover:bg-court-750 text-slate-200 border border-court-700 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              Schedule Optimizer
            </button>
            <button
              onClick={() => setActiveTab('redaction')}
              className="px-3.5 py-2 rounded-xl bg-court-800 hover:bg-court-750 text-slate-200 border border-court-700 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              Redact PII
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <KPICard
          title="Total Cases"
          value={totalCasesCount}
          icon={Briefcase}
          colorScheme="navy"
          trend={totalCasesCount > 0 ? { value: `+${totalCasesCount}`, isPositive: true, period: 'total' } : { value: '0', isPositive: true, period: 'fresh' }}
          onClick={() => setActiveTab('cases')}
        />
        <KPICard
          title="Active Cases"
          value={activeCasesCount}
          icon={Hourglass}
          colorScheme="indigo"
          trend={totalCasesCount > 0 ? { value: `${((activeCasesCount / totalCasesCount) * 100).toFixed(0)}%`, isPositive: true, period: 'of docket' } : { value: '0%', isPositive: true, period: 'of docket' }}
          onClick={() => setActiveTab('cases')}
        />
        <KPICard
          title="Pending Scrutiny"
          value={pendingCasesCount}
          icon={Clock}
          colorScheme="amber"
          trend={{ value: '0', isPositive: true, period: 'pending' }}
          onClick={() => setActiveTab('cases')}
        />
        <KPICard
          title="Resolved Cases"
          value={resolvedCasesCount}
          icon={CheckCircle2}
          colorScheme="emerald"
          trend={{ value: '0', isPositive: true, period: 'this qtr' }}
          onClick={() => setActiveTab('analytics')}
        />
        <KPICard
          title="Urgent Cases"
          value={urgentCasesCount}
          icon={AlertOctagon}
          colorScheme="rose"
          trend={{ value: `${urgentCasesCount} Urgent`, isPositive: urgentCasesCount === 0, period: 'today' }}
          onClick={() => setActiveTab('cases')}
        />
        <KPICard
          title="Avg Resolution"
          value={avgResolutionTime}
          icon={CalendarCheck}
          colorScheme="slate"
          trend={{ value: '0 days', isPositive: true, period: 'benchmark' }}
          onClick={() => setActiveTab('analytics')}
        />
      </div>

      {/* AI Insights Banner Section */}
      <AIInsightsPanel />

      {/* Charts Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CaseOverviewChart />
        </div>
        <div className="lg:col-span-1">
          <CaseStatusDonut />
        </div>
      </div>

      {/* Urgent Priority Cases Table */}
      <UrgentCasesTable onSelectCase={onSelectCase} />

      {/* Interactive Quick Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveTab('ai-docs')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-court hover:shadow-court-lg transition-all cursor-pointer group flex items-start gap-3.5"
        >
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <FileCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-court-700 transition-colors">AI Document Intelligence</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Auto-classify petitions, affidavits, evidence & extract key legal entities.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-court-700 transition-all" />
        </div>

        <div 
          onClick={() => setActiveTab('precedents')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-court hover:shadow-court-lg transition-all cursor-pointer group flex items-start gap-3.5"
        >
          <div className="p-3 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-court-950 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-court-700 transition-colors">Legal Precedent Retrieval</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Semantic AI search across landmark Supreme & High Court judgments.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-court-700 transition-all" />
        </div>

        <div 
          onClick={() => setActiveTab('predictions')}
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-court hover:shadow-court-lg transition-all cursor-pointer group flex items-start gap-3.5"
        >
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Hourglass className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-court-700 transition-colors">AI Case Timeline Prediction</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Delay probability forecasting and procedural bottleneck diagnostics.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-court-700 transition-all" />
        </div>
      </div>
    </div>
  );
};
