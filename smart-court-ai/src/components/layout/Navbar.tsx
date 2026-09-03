import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  Sparkles, 
  Calendar, 
  Shield, 
  Check, 
  ExternalLink,
  ChevronDown,
  User,
  Sliders
} from 'lucide-react';
import { PriorityBadge } from '../common/StatusBadge';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    setIsRegisterModalOpen, 
    setIsAssistantOpen, 
    notifications, 
    unreadCount, 
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    searchQuery,
    setSearchQuery
  } = useCourt();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Formatted Current Date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const getGreeting = () => {
    switch (currentRole) {
      case 'Judge':
        return 'Hon\'ble Justice';
      case 'Lawyer':
        return 'Learned Advocate';
      case 'Clerk':
        return 'Registry Officer';
      case 'Citizen':
        return 'Litigant Citizen';
      case 'Admin':
      default:
        return 'Court Administrator';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs no-print">
      <div className="px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Greeting & Current Date */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans">
              Good Morning, {getGreeting()}
            </h1>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-court-100/70 text-court-800 border border-slate-200">
              <Shield className="w-3 h-3 text-court-700" />
              {currentUser.courtBranch}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{todayFormatted}</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-medium">Court Session Active</span>
          </p>
        </div>

        {/* Middle: Global Search Input */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Case ID, CNR, Litigant, Judge, Act..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-12 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-2xs"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono shadow-2xs">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Right: Quick Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Register New Case Action */}
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white text-xs font-semibold shadow-court transition-all duration-200 group border border-court-800"
          >
            <PlusCircle className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">+ Register New Case</span>
            <span className="sm:hidden">New</span>
          </button>

          {/* AI Assistant Quick Trigger */}
          <button
            onClick={() => setIsAssistantOpen(true)}
            title="Launch NyayaBot AI Assistant"
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
            <span className="hidden md:inline text-xs font-semibold text-amber-950">AI Copilot</span>
          </button>

          {/* Notifications Bell & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Judicial Notifications</h4>
                    <p className="text-[10px] text-slate-500">{unreadCount} unread administrative alerts</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-court-700 hover:text-court-900 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      <Bell className="w-6 h-6 text-slate-300 mx-auto mb-1" />
                      <p className="font-semibold text-slate-700">0 Notifications</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">All judicial alerts are clear.</p>
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer text-xs ${
                          !notif.isRead ? 'bg-amber-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <PriorityBadge priority={notif.priority} size="sm" />
                            <span className="font-semibold text-slate-900">{notif.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                        </div>
                        <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      setActiveTab('notifications');
                    }}
                    className="text-xs text-court-700 hover:text-court-950 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    View All Notifications <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* User Profile Button */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-all border border-slate-200/80"
            >
              <img
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-amber-500/40"
              />
              <div className="hidden xl:block text-left text-xs">
                <p className="font-bold text-slate-900 leading-tight truncate max-w-[120px]">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500">{currentUser.role}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-xl mb-1">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      2FA Active
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-court-100 text-court-800 font-medium">
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                <div className="space-y-0.5 text-xs">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setActiveTab('settings');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <Sliders className="w-4 h-4 text-slate-400" />
                    <span>Security & Preferences</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setActiveTab('audit');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>View Audit Trail</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
