import React, { useState, useMemo } from 'react';
import { useCourt } from '../../context/CourtContext';
import { CaseItem, CaseType, CaseStatus, PriorityLevel } from '../../types';
import { PriorityBadge, StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Calendar, 
  User, 
  FileText, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface CaseManagementProps {
  onSelectCase: (c: CaseItem) => void;
}

export const CaseManagement: React.FC<CaseManagementProps> = ({ onSelectCase }) => {
  const { cases, setIsRegisterModalOpen, searchQuery, setSearchQuery } = useCourt();

  // Filters State
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedJudge, setSelectedJudge] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'nextHearing'>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  // Distinct Lists for Dropdowns
  const caseTypes = useMemo(() => Array.from(new Set(cases.map((c) => c.caseType))), [cases]);
  const judges = useMemo(() => Array.from(new Set(cases.map((c) => c.assignedJudge))), [cases]);

  // Filtered & Sorted Cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        searchQuery === '' ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cnrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.petitioner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.respondent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.assignedJudge.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'ALL' || c.caseType === selectedType;
      const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;
      const matchesJudge = selectedJudge === 'ALL' || c.assignedJudge === selectedJudge;
      const matchesPriority = selectedPriority === 'ALL' || c.priority === selectedPriority;

      return matchesSearch && matchesType && matchesStatus && matchesJudge && matchesPriority;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.filingDate).getTime() - new Date(a.filingDate).getTime();
      if (sortBy === 'oldest') return new Date(a.filingDate).getTime() - new Date(b.filingDate).getTime();
      if (sortBy === 'priority') {
        const pOrder: Record<PriorityLevel, number> = { Critical: 4, Urgent: 3, High: 2, Expedited: 1, Normal: 0 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0);
      }
      if (sortBy === 'nextHearing') return new Date(a.nextHearing).getTime() - new Date(b.nextHearing).getTime();
      return 0;
    });
  }, [cases, searchQuery, selectedType, selectedStatus, selectedJudge, selectedPriority, sortBy]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage) || 1;
  const paginatedCases = filteredCases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedType('ALL');
    setSelectedStatus('ALL');
    setSelectedJudge('ALL');
    setSelectedPriority('ALL');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Case Management Registry</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-court-100 text-court-800">
              {filteredCases.length} Cases Listed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized judicial registry with AI-assisted timeline tracking, CNR lookup & scrutiny validation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showFilters || selectedType !== 'ALL' || selectedStatus !== 'ALL'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-amber-600" />
            <span>Filters {selectedType !== 'ALL' || selectedStatus !== 'ALL' ? '(Active)' : ''}</span>
          </button>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white text-xs font-bold shadow-court transition-all"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Register New Case</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-court space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Case ID (e.g. SC-2026-1024), CNR, Litigant Party, Judge, or Act..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
            >
              <option value="newest">Newest Filed</option>
              <option value="oldest">Oldest Filed</option>
              <option value="priority">Priority Level</option>
              <option value="nextHearing">Next Hearing Date</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showFilters && (
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-150">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Case Type</label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
              >
                <option value="ALL">All Case Types</option>
                {caseTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="Registered">Registered</option>
                <option value="Preliminary Arguments">Preliminary Arguments</option>
                <option value="Evidence & Witnesses">Evidence & Witnesses</option>
                <option value="Final Arguments">Final Arguments</option>
                <option value="Judgment Reserved">Judgment Reserved</option>
                <option value="Resolved">Resolved</option>
                <option value="Appealed">Appealed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Assigned Judge</label>
              <select
                value={selectedJudge}
                onChange={(e) => {
                  setSelectedJudge(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
              >
                <option value="ALL">All Judicial Benches</option>
                {judges.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Priority</label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPriority}
                  onChange={(e) => {
                    setSelectedPriority(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Expedited">Expedited</option>
                  <option value="Normal">Normal</option>
                </select>
                <button
                  onClick={resetFilters}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold shrink-0"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Cases Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-court overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Case ID & CNR</th>
                <th className="py-3 px-4">Case Title & Litigants</th>
                <th className="py-3 px-4">Case Type</th>
                <th className="py-3 px-4">Filing Date</th>
                <th className="py-3 px-4">Assigned Bench</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Next Hearing</th>
                <th className="py-3 px-4">Est. Completion</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">
                      {cases.length === 0 ? 'Digital Case Docket is Fresh (0 Cases)' : 'No court cases match your criteria'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {cases.length === 0
                        ? 'No cases have been registered yet. Register your first case or upload e-filings to begin.'
                        : 'Try clearing your search query or reset filter dropdowns.'}
                    </p>
                    {cases.length === 0 ? (
                      <button
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="mt-3 px-4 py-2 rounded-xl bg-court-900 text-white font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        + Register First Case
                      </button>
                    ) : (
                      <button
                        onClick={resetFilters}
                        className="mt-3 px-3 py-1.5 rounded-lg bg-court-900 text-white font-semibold text-xs cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedCases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCase(c)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      <div className="font-bold text-slate-900">{c.id}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{c.cnrNumber}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-semibold text-slate-900 line-clamp-1 group-hover:text-court-700 transition-colors">
                        {c.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        <span className="text-slate-700 font-medium">{c.petitioner.name}</span> v. <span className="text-slate-700 font-medium">{c.respondent.name}</span>
                      </p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 font-medium">
                      {c.caseType}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {c.filingDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700 text-[11px] font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate max-w-[130px]">{c.assignedJudge.replace('Hon\'ble Justice ', 'J. ')}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 pl-5">{c.courtroom.split(' ')[0]}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <PriorityBadge priority={c.priority} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>{c.nextHearing}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>{c.predictedCompletion}</span>
                      </div>
                      <div className={`text-[10px] font-semibold ${
                        c.delayRisk === 'Low' ? 'text-emerald-600' : c.delayRisk === 'Moderate' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {c.delayRisk} Delay Risk
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCase(c);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-court-900 hover:text-white text-slate-700 transition-colors cursor-pointer"
                          title="View Case Dossier"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-4 py-3 border-t border-slate-200/80 bg-slate-50/70 flex items-center justify-between text-xs text-slate-500">
          <div>
            {filteredCases.length === 0 ? (
              <span>Showing <span className="font-semibold text-slate-800">0</span> entries</span>
            ) : (
              <span>
                Showing <span className="font-semibold text-slate-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-semibold text-slate-800">{Math.min(currentPage * itemsPerPage, filteredCases.length)}</span> of{' '}
                <span className="font-semibold text-slate-800">{filteredCases.length}</span> entries
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2.5 font-semibold text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || filteredCases.length === 0}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

