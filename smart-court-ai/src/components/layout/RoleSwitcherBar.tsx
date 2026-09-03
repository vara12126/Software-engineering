import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { UserRole } from '../../types';
import { Shield, Scale, Briefcase, FileSignature, Users, RefreshCw } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentRole, switchRole } = useCourt();

  const roles: { role: UserRole; label: string; icon: React.FC<{ className?: string }> }[] = [
    { role: 'Admin', label: 'Court Administrator', icon: Shield },
    { role: 'Judge', label: 'Hon\'ble Judge', icon: Scale },
    { role: 'Lawyer', label: 'Advocate / Lawyer', icon: Briefcase },
    { role: 'Clerk', label: 'Registry Clerk', icon: FileSignature },
    { role: 'Citizen', label: 'Citizen / Litigant', icon: Users }
  ];

  return (
    <div className="bg-court-950 text-slate-200 border-b border-court-800 px-4 py-1.5 flex flex-wrap items-center justify-between text-xs no-print">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
          <RefreshCw className="w-3 h-3 animate-spin-slow" />
          Interactive Role Simulator
        </span>
        <span className="hidden sm:inline text-slate-400 text-[11px]">
          Click any role to preview customized views & permissions:
        </span>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto py-0.5">
        {roles.map(({ role, label, icon: Icon }) => {
          const isActive = currentRole === role;
          return (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-gold-sm'
                  : 'text-slate-300 hover:text-white hover:bg-court-800/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{role}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
