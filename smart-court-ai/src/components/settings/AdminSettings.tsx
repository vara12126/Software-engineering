import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { MOCK_COURTROOMS } from '../../data/mockJudges';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  Settings, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Lock, 
  Save, 
  Database,
  RotateCcw,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { cases, documents, notifications, audits, showToast, addAuditLog, resetToFresh, loadDemoData } = useCourt();

  const [activeTab, setActiveTab] = useState<'ai' | 'roles' | 'courtrooms' | 'security' | 'data'>('data');
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState<number>(90);
  const [redactionStrictness, setRedactionStrictness] = useState<string>('High (CJIS + Aadhaar Act)');
  const [twoFactorMandatory, setTwoFactorMandatory] = useState<boolean>(true);

  const handleSave = () => {
    showToast('success', 'Settings Saved', 'Judicial administration configuration updated and synchronized.');
    addAuditLog('Updated judicial configuration and AI thresholds', undefined, 'Success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Court Administration & System Settings</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-court-100 text-court-800 border border-slate-200">
              Root Level Config
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Role permissions, AI classification thresholds, courtroom rosters, and national e-Courts interoperability
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white font-bold text-xs shadow-court flex items-center gap-1.5 transition-all self-start md:self-center cursor-pointer"
        >
          <Save className="w-3.5 h-3.5 text-amber-400" />
          <span>Save Configuration</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold text-slate-600 overflow-x-auto">
        {[
          { id: 'data', label: 'System Data State (0 State)', icon: Database },
          { id: 'ai', label: 'AI & NLP Models', icon: Sparkles },
          { id: 'roles', label: 'Role-Based Access (RBAC)', icon: ShieldCheck },
          { id: 'courtrooms', label: 'Courtrooms & Rosters', icon: Building2 },
          { id: 'security', label: 'Security & 2FA', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-court-900 text-white font-bold shadow-xs'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Data State Management */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Database & Registry Data State Management</h3>
            <p className="text-xs text-slate-500 mt-0.5">Control system baseline: fresh 0 state or institutional demo dataset</p>
          </div>

          {/* Current Counts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Cases</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">{cases.length}</span>
              <span className="text-[10px] text-slate-500">{cases.length === 0 ? 'Fresh baseline' : 'Matters loaded'}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Processed Docs</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">{documents.length}</span>
              <span className="text-[10px] text-slate-500">{documents.length === 0 ? 'Fresh baseline' : 'Docs classified'}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Notifications</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">{notifications.length}</span>
              <span className="text-[10px] text-slate-500">{notifications.length === 0 ? '0 unread' : 'Alerts queued'}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Audit Log Entries</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono mt-0.5 block">{audits.length}</span>
              <span className="text-[10px] text-slate-500">Cryptographically sealed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reset to Fresh Box */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-800">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Reset to Fresh State (All 0)</h4>
                    <p className="text-[10px] text-slate-500">Set all dockets, hearings, documents & notifications to 0</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clears all cases, resets cause lists, empties document registries, and initialises an immutable clean system startup audit log.
                </p>
              </div>

              <button
                onClick={resetToFresh}
                className="w-full py-2.5 px-4 rounded-xl bg-court-900 hover:bg-court-850 text-white font-bold text-xs shadow-court flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset All Data to Fresh (0)</span>
              </button>
            </div>

            {/* Load Demo Data Box */}
            <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200/80 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-court-950 font-bold">
                    <Layers className="w-4 h-4 text-court-950" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Load Institutional Demo Dataset</h4>
                    <p className="text-[10px] text-amber-900 font-medium">Seed sample cases, judgments & cause lists</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Populate with 8 high-court sample dockets, 8-tab case dossiers, schedule conflict scenarios, and pre-classified NLP documents.
                </p>
              </div>

              <button
                onClick={loadDemoData}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-court-950 font-extrabold text-xs shadow-gold-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-court-950" />
                <span>Load Sample Demo Data</span>
              </button>
            </div>
          </div>

          <LegalDisclaimer variant="subtle" />
        </div>
      )}

      {/* Tab 1: AI Settings */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-5 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-slate-900">AI Intelligence Engine & Sensitivity Calibration</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="font-bold text-slate-800 block">
                Minimum Confidence for Auto-Classification ({aiConfidenceThreshold}%)
              </label>
              <input
                type="range"
                min="70"
                max="99"
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                className="w-full accent-court-900"
              />
              <p className="text-[11px] text-slate-500">
                Documents classified with confidence below this threshold will be queued for manual clerk scrutiny.
              </p>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-800 block">PII Redaction Policy Standard</label>
              <select
                value={redactionStrictness}
                onChange={(e) => setRedactionStrictness(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900 font-semibold"
              >
                <option value="High (CJIS + Aadhaar Act)">High (CJIS + Aadhaar Act + Minor Protection)</option>
                <option value="Standard Statutory">Standard Statutory (Aadhaar & Bank Details only)</option>
                <option value="Strict Confidential">Strict Confidential (Zero PII on Cause Lists)</option>
              </select>
              <p className="text-[11px] text-slate-500">
                Determines which regex & NLP entity types are automatically masked on certified copies.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900">Active AI Model Deployments:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 bg-white rounded-lg border">
                <span className="font-bold text-court-900 block">Legal-NLP-Classifier v3.2</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Online (99.4% Uptime)</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border">
                <span className="font-bold text-court-900 block">PII-Redactor-Guard v2.4</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Online (12 Ent types)</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border">
                <span className="font-bold text-court-900 block">Docket-Timeline-Forecast v1.9</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Online (Historical Sync)</span>
              </div>
            </div>
          </div>

          <LegalDisclaimer />
        </div>
      )}

      {/* Tab 2: RBAC Role Permissions */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-slate-900">Role-Based Access Control (RBAC) Matrix</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                  <th className="py-2.5 px-3">Role Designation</th>
                  <th className="py-2.5 px-3">Case View</th>
                  <th className="py-2.5 px-3">E-Filing</th>
                  <th className="py-2.5 px-3">Schedule / Orders</th>
                  <th className="py-2.5 px-3">PII Redaction</th>
                  <th className="py-2.5 px-3">Audit Logs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { role: 'Court Administrator', view: 'Full', file: 'Yes', sched: 'Full', red: 'Full', aud: 'Full' },
                  { role: 'Hon\'ble Judge', view: 'Bench Only', file: 'N/A', sched: 'Sign Orders', red: 'Review', aud: 'View' },
                  { role: 'Advocate / Lawyer', view: 'Listed Matters', file: 'Yes', sched: 'View/Join VC', red: 'Export Draft', aud: 'Own' },
                  { role: 'Registry Clerk', view: 'Scrutiny Only', file: 'Verify', sched: 'Cause List', red: 'Execute', aud: 'View' },
                  { role: 'Citizen / Litigant', view: 'Public CNR', file: 'Status Check', sched: 'Cause List', red: 'Redacted Only', aud: 'No' }
                ].map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{r.role}</td>
                    <td className="py-3 px-3 text-slate-700">{r.view}</td>
                    <td className="py-3 px-3 text-slate-700">{r.file}</td>
                    <td className="py-3 px-3 text-slate-700">{r.sched}</td>
                    <td className="py-3 px-3 text-slate-700">{r.red}</td>
                    <td className="py-3 px-3 text-slate-700">{r.aud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Courtrooms */}
      {activeTab === 'courtrooms' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-slate-900">Active Courtrooms & Presiding Judicial Rosters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {MOCK_COURTROOMS.map((cr) => (
              <div key={cr.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{cr.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {cr.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] truncate">Presiding: {cr.judge}</p>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1">
                  <span>Capacity: {cr.capacity}</span>
                  <span>Active Today: {cr.activeToday} Hearings</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Security */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-5 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold text-slate-900">Judicial Security & 2FA Protocols</h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border">
              <div>
                <span className="font-bold text-slate-900 block">Enforce Two-Factor Authentication (2FA)</span>
                <span className="text-slate-500 text-[11px]">Mandatory TOTP/Hardware Key verification on login</span>
              </div>
              <input
                type="checkbox"
                checked={twoFactorMandatory}
                onChange={(e) => setTwoFactorMandatory(e.target.checked)}
                className="w-4 h-4 accent-court-900"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border">
              <div>
                <span className="font-bold text-slate-900 block">Session Timeout</span>
                <span className="text-slate-500 text-[11px]">Automatic lock after 15 minutes of inactivity</span>
              </div>
              <span className="font-bold text-slate-800">15 Minutes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

