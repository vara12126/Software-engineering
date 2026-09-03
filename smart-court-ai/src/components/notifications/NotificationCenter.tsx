import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { PriorityBadge } from '../common/StatusBadge';
import { NotificationItem } from '../../types';
import { 
  Bell, 
  Check, 
  Filter, 
  Trash2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount, setActiveTab } = useCourt();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');

  const filteredNotifs = notifications.filter((n) => {
    const matchCat = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchPri = selectedPriority === 'ALL' || n.priority === selectedPriority;
    return matchCat && matchPri;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Judicial Notification Center</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {unreadCount} Actionable Alerts
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time administrative alerts, courtroom schedule conflicts, AI redaction detections & urgent filings
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-court text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-500">Category:</span>
          {['ALL', 'Hearing', 'Redaction', 'AI Intelligence', 'Compliance', 'Administrative'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-court-900 text-white font-bold shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Severity:</span>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold"
          >
            <option value="ALL">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-court divide-y divide-slate-100 overflow-hidden">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-slate-800">All notifications caught up!</p>
            <p className="text-xs text-slate-400 mt-0.5">No unread judicial notifications matching your filters.</p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                !notif.isRead ? 'bg-amber-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5">
                  <PriorityBadge priority={notif.priority} size="sm" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {notif.category}
                    </span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">{notif.message}</p>
                  {notif.caseId && (
                    <span className="inline-block font-mono text-[10px] text-court-700 font-bold mt-1.5">
                      Case Ref: #{notif.caseId}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
