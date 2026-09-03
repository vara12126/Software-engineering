import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { UserRole } from '../../types';
import { 
  Scale, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Fingerprint, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Briefcase, 
  FileSignature, 
  Landmark,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useCourt();

  const [email, setEmail] = useState('admin.registry@smartcourt.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [rememberMe, setRememberMe] = useState(true);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [require2FA, setRequire2FA] = useState(false);

  const roles: { role: UserRole; title: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
    { role: 'Admin', title: 'Court Administrator', desc: 'Full registry & AI docket access', icon: ShieldCheck },
    { role: 'Judge', title: 'Hon\'ble Judge', desc: 'Bench orders & cause list management', icon: Scale },
    { role: 'Lawyer', title: 'Advocate / Lawyer', desc: 'E-filing & virtual hearing access', icon: Briefcase },
    { role: 'Clerk', title: 'Registry Clerk', desc: 'Scrutiny & stamp validation', icon: FileSignature },
    { role: 'Citizen', title: 'Citizen / Litigant', desc: 'Public CNR tracking & cause lists', icon: Users }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'Judge') setEmail('justice.swaminathan@delhicourts.nic.in');
    else if (role === 'Lawyer') setEmail('siddhartha.law@delhibar.org');
    else if (role === 'Clerk') setEmail('clerk.scrutiny@smartcourt.gov.in');
    else if (role === 'Citizen') setEmail('priya.sharma92@gmail.com');
    else setEmail('admin.registry@smartcourt.gov.in');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (require2FA && !twoFactorCode) {
      alert('Please enter your 6-digit 2FA security code.');
      return;
    }
    login(email, selectedRole);
  };

  return (
    <div className="min-h-screen bg-court-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-amber-500 selection:text-court-950">
      {/* Background Decorative Gradients & Court Watermark */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Simple Judicial Header */}
      <header className="px-6 py-4 border-b border-court-850 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-court-950 font-bold shadow-gold-sm border border-amber-400/40">
            <Scale className="w-6 h-6 text-court-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base text-white">SMART COURT</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold uppercase">
                GovTech AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">AI-Powered Case Management & Judicial Analytics</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>National e-Courts Certified Security System</span>
        </div>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-4">
        <div className="w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
          {/* Form Header */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-court-900 text-amber-400 flex items-center justify-center mx-auto shadow-court mb-2">
              <Landmark className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
              Judicial Portal Authentication
            </h2>
            <p className="text-xs text-slate-500">
              Sign in with your government ID, Bar registration, or litigant credentials
            </p>
          </div>

          {/* Quick Role Selection Preset Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
              Select Your Designated Judicial Role:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {roles.map(({ role, title, icon: Icon }) => {
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleSelect(role)}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-court-900 bg-court-900 text-white shadow-court'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="text-[11px] font-bold truncate max-w-full">{role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Official Email / Judicial Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@court.gov.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password recovery link dispatched to registered institutional email.'); }} className="text-[11px] font-semibold text-court-700 hover:text-court-950">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>

            {/* 2FA Option */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <Fingerprint className="w-4 h-4 text-court-700" />
                  <span>Two-Factor Authentication (2FA)</span>
                </label>
                <input
                  type="checkbox"
                  checked={require2FA}
                  onChange={(e) => setRequire2FA(e.target.checked)}
                  className="w-4 h-4 accent-court-900 cursor-pointer"
                />
              </div>

              {require2FA && (
                <div className="pt-1">
                  <input
                    type="text"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="Enter 6-digit TOTP / SMS code (e.g. 849201)"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-center tracking-widest text-slate-900 font-bold"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-court-900"
                />
                <span>Remember this terminal session</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-court-900 hover:bg-court-850 text-white font-bold text-xs shadow-court transition-all flex items-center justify-center gap-2 group"
            >
              <span>Secure Judicial Sign In as {selectedRole}</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Security & Privacy Notice */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Official Government Use Only:</span> Unauthorized access attempts are monitored and logged with IP timestamping in accordance with the Information Technology Act.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-3 border-t border-court-850 text-center text-xs text-slate-500 z-10">
        SMART COURT Judicial Platform © 2026 • AI-Powered Docket Management System • Compliant with National Judicial Data Grid Standards
      </footer>
    </div>
  );
};
