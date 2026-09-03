import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileSearch, 
  ShieldCheck, 
  CalendarDays, 
  TrendingUp, 
  BookOpen, 
  BarChart3, 
  FileSpreadsheet, 
  Users, 
  Scale, 
  Bell, 
  ShieldAlert, 
  Settings, 
  HelpCircle, 
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  roles?: string[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, unreadCount, logout, currentUser, currentRole, setIsAssistantOpen, cases } = useCourt();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Case Management', icon: Briefcase, badge: cases.length > 0 ? `${cases.length} Active` : undefined },
    { id: 'ai-docs', label: 'AI Documents', icon: FileSearch, badge: 'AI NLP', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
    { id: 'redaction', label: 'Redaction Suite', icon: ShieldCheck, badge: 'PII AI', badgeColor: 'bg-rose-500/20 text-rose-300' },
    { id: 'scheduler', label: 'Hearing Scheduler', icon: CalendarDays, badge: 'Optimizer', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'predictions', label: 'Case Predictions', icon: TrendingUp, badge: 'Timeline', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'precedents', label: 'Precedent Search', icon: BookOpen },
    { id: 'analytics', label: 'Judicial Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports & Cause Lists', icon: FileSpreadsheet },
    { id: 'citizen', label: 'Citizen Portal', icon: Users, badge: 'Public' },
    { id: 'lawyer', label: 'Lawyer Portal', icon: Scale, badge: 'Bar' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? `${unreadCount}` : undefined, badgeColor: 'bg-red-500 text-white font-bold' },
    { id: 'audit', label: 'Audit & Security', icon: ShieldAlert },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];


  return (
    <aside className="w-64 bg-court-950 text-slate-300 flex flex-col shrink-0 border-r border-court-850 h-screen sticky top-0 no-print">
      {/* Brand Header */}
      <div className="p-4 border-b border-court-850 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-gold-sm border border-amber-400/40 text-court-950 font-bold">
          <Scale className="w-6 h-6 text-court-950" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-wider text-sm text-white font-sans">SMART COURT</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold uppercase">AI</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-tight">Judicial Analytics & CMS</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core Judicial Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-court-800 text-white font-semibold shadow-inner border-l-3 border-amber-500'
                  : 'text-slate-300 hover:text-white hover:bg-court-900'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                    item.badgeColor || 'bg-court-700 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* AI Assistant Quick Trigger */}
        <div className="pt-3">
          <button
            onClick={() => setIsAssistantOpen(true)}
            className="w-full bg-gradient-to-r from-amber-500/15 via-court-800 to-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-left flex items-center gap-2.5 hover:border-amber-400/60 transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-court-950 shrink-0 shadow-gold-sm">
              <Sparkles className="w-4 h-4 text-court-950 animate-spin-slow" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">NyayaBot AI</p>
              <p className="text-[10px] text-slate-400 truncate">Legal Admin Assistant</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom User Profile Card & Controls */}
      <div className="p-3 border-t border-court-850 bg-court-950/80 space-y-2">
        <div className="flex items-center gap-2.5 p-1.5 rounded-lg bg-court-900/60 border border-court-800">
          <img
            src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-amber-400/40 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-[10px] text-amber-400/90 font-medium truncate">{currentUser.role} • {currentRole}</p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-court-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Encrypted (TLS 1.3)
          </span>
          <button
            onClick={() => setActiveTab('settings')}
            className="hover:text-white transition-colors"
          >
            v2.6 Judicial
          </button>
        </div>
      </div>
    </aside>
  );
};
