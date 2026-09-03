import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { AuditLogEntry } from '../../types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Key, 
  Search, 
  Fingerprint, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  FileCode 
} from 'lucide-react';

export const AuditSecurity: React.FC = () => {
  const { audits } = useCourt();
  const [search, setSearch] = useState('');
  const [selectedResult, setSelectedResult] = useState<string>('ALL');

  const filteredAudits = audits.filter((log) => {
    const matchesSearch =
      search === '' ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      (log.caseId && log.caseId.toLowerCase().includes(search.toLowerCase())) ||
      log.securityHash.toLowerCase().includes(search.toLowerCase());

    const matchesResult = selectedResult === 'ALL' || log.result === selectedResult;
    return matchesSearch && matchesResult;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Judicial Audit Trail & Cryptographic Security</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              SHA-256 Immutable Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically sealed tracking of every case action, judge order, scrutiny review & AI document execution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            TLS 1.3 / AES-256 Enabled
          </span>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Integrity Verification</p>
            <p className="text-xl font-extrabold text-emerald-700 mt-1">100% Verified</p>
            <p className="text-[11px] text-slate-400 mt-0.5">0 Tamper Alerts</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Active Judicial Sessions</p>
            <p className="text-xl font-extrabold text-court-900 mt-1">18 Nodes</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Benches & Registry Terminals</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-court-100 text-court-800 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">2FA Enforcement</p>
            <p className="text-xl font-extrabold text-indigo-700 mt-1">Strict Mandatory</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Judges & Court Clerks</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Fingerprint className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-court flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by User, Action, Case ID, or SHA-256 Hash..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500 font-semibold">Result:</span>
          <select
            value={selectedResult}
            onChange={(e) => setSelectedResult(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold"
          >
            <option value="ALL">All Results</option>
            <option value="Success">Success</option>
            <option value="Warning">Warning</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Main Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-court overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Audit ID & Timestamp</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Action Executed</th>
                <th className="py-3 px-4">Case Reference</th>
                <th className="py-3 px-4">IP & Device Terminal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAudits.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                    <div className="font-bold text-slate-900">{log.id}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{log.timestamp}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">{log.user}</div>
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-court-100 text-court-800">
                      {log.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-slate-800 leading-snug">{log.action}</p>
                  </td>

                  <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                    {log.caseId ? (
                      <span className="font-bold text-court-800 bg-court-50 border border-slate-200 px-2 py-0.5 rounded">
                        {log.caseId}
                      </span>
                    ) : (
                      <span className="text-slate-400">System Level</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 text-[11px] whitespace-nowrap">
                    <div className="font-mono">{log.ipAddress}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{log.device}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        log.result === 'Success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : log.result === 'Warning'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 max-w-[120px] truncate" title={log.securityHash}>
                    {log.securityHash.substring(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
