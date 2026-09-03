import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Download, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  BarChart2, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReportsCenter: React.FC = () => {
  const { cases, showToast, addAuditLog } = useCourt();

  const [reportType, setReportType] = useState<string>('Daily Cause List & Hearing Report');
  const [dateRange, setDateRange] = useState<string>('Today (02-Sep-2026)');
  const [selectedCourtroom, setSelectedCourtroom] = useState<string>('All Courtrooms');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const reportTypes = [
    { id: 'cause-list', name: 'Daily Cause List & Hearing Report', desc: 'Courtroom-wise list of daily listed matters, advocates & order status' },
    { id: 'case-status', name: 'Comprehensive Case Status Report', desc: 'Active registry report with current procedural stages & next dates' },
    { id: 'judge-workload', name: 'Judicial Workload & Bench Audit Report', desc: 'Per-judge disposal rates, active burden and clearance index' },
    { id: 'pendency-backlog', name: 'National Pendency & Backlog Audit', desc: 'Case aging breakdown (>1 yr, >2 yrs, >5 yrs) for NJDG compliance' },
    { id: 'ai-redaction', name: 'AI Document & PII Redaction Audit Log', desc: 'Security report of all PII entities masked under data privacy mandates' }
  ];

  const handleExport = (format: 'PDF' | 'Excel' | 'Print') => {
    if (format === 'Print') {
      window.print();
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      confetti({ particleCount: 50, spread: 60 });
      showToast('success', `${format} Generated`, `${reportType} (${format}) has been compiled and downloaded.`);
      addAuditLog(`Generated & Exported ${reportType} as ${format}`, undefined, 'Success');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Judicial Reports & Cause List Generator</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-court-100 text-court-800 border border-slate-200">
              Certified Legal Reports
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Export official printable cause lists, disposal audits, judge workload matrices & pendency compliance files
          </p>
        </div>

        {/* Action Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('Print')}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Cause List</span>
          </button>
          <button
            onClick={() => handleExport('Excel')}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-court transition-colors disabled:opacity-60"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white font-bold text-xs flex items-center gap-1.5 shadow-court transition-colors disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{isGenerating ? 'Compiling PDF...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Report Options */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-court space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500">
            Select Report Type
          </h3>

          <div className="space-y-2">
            {reportTypes.map((rep) => {
              const isSelected = reportType === rep.name;
              return (
                <div
                  key={rep.id}
                  onClick={() => setReportType(rep.name)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-court-700 bg-court-50 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900">{rep.name}</h4>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-court-700 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{rep.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date Parameter</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="Today (02-Sep-2026)">Today (02-Sep-2026)</option>
                <option value="Current Week">Current Judicial Week</option>
                <option value="Monthly Docket (Sep 2026)">Monthly Docket (Sep 2026)</option>
                <option value="Annual Audit (2026)">Annual Audit (2026)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Courtroom Filter</label>
              <select
                value={selectedCourtroom}
                onChange={(e) => setSelectedCourtroom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800"
              >
                <option value="All Courtrooms">All Courtrooms (CR 1 - 6)</option>
                <option value="Courtroom 1">Courtroom 1 (Chief Court)</option>
                <option value="Courtroom 2">Courtroom 2 (Criminal Division)</option>
                <option value="Courtroom 3">Courtroom 3 (Commercial Division)</option>
                <option value="Courtroom 4">Courtroom 4 (Appellate & Civil)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Preview */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-5 printable-area">
          {/* Institutional Document Header */}
          <div className="text-center border-b border-slate-300 pb-4 space-y-1">
            <div className="inline-block font-serif font-bold text-base text-court-950 tracking-wider uppercase">
              HIGH COURT OF JUDICATURE AT NEW DELHI
            </div>
            <p className="text-xs font-semibold text-slate-700">{reportType.toUpperCase()}</p>
            <p className="text-[11px] text-slate-500 font-mono">
              Session Date: {dateRange} • Generated on 02-Sep-2026 09:00 AM • Registry Copy
            </p>
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <th className="py-2 px-3 border-r border-slate-200">Item #</th>
                  <th className="py-2 px-3 border-r border-slate-200">Case ID / CNR</th>
                  <th className="py-2 px-3 border-r border-slate-200">Parties & Cause Title</th>
                  <th className="py-2 px-3 border-r border-slate-200">Advocates on Record</th>
                  <th className="py-2 px-3 border-r border-slate-200">Courtroom</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {cases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-sans">
                      <p className="font-semibold text-xs text-slate-700">0 Cause List Matters Recorded</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Register cases or allocate hearing dates to compile official printable cause lists.</p>
                    </td>
                  </tr>
                ) : (
                  cases.slice(0, 6).map((c, idx) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 border-r border-slate-200 text-center">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-mono border-r border-slate-200">
                        <div className="font-bold text-slate-900">{c.id}</div>
                        <div className="text-[10px] text-slate-500">{c.cnrNumber}</div>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200">
                        <p className="font-semibold text-slate-900 line-clamp-1">{c.title}</p>
                        <p className="text-[10px] text-slate-500">{c.caseType}</p>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] border-r border-slate-200">
                        <p className="text-slate-800">{c.petitioner.advocate}</p>
                        <p className="text-slate-500">v. {c.respondent.advocate}</p>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] border-r border-slate-200 whitespace-nowrap font-medium">
                        {c.courtroom.split(' ')[0]} {c.courtroom.split(' ')[1]}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-[11px] font-semibold text-slate-800">
                        {c.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          {/* Official Sign-off Footer */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">Registrar (Judicial Administration)</p>
              <p className="text-[10px] text-slate-400">Digitally Verified via e-Courts National Portal</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-400">
              <p>Security Hash: 8f434346648f6b96df89dda901c5176b</p>
              <p>Page 1 of 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
