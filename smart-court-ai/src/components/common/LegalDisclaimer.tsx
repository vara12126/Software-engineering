import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface LegalDisclaimerProps {
  message?: string;
  variant?: 'banner' | 'compact' | 'subtle';
}

export const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ 
  message = "AI-generated administrative decision support & analytical predictions. Non-binding advisory output – not an autonomous judicial verdict.",
  variant = 'banner'
}) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <p className="text-[11px] text-slate-400 italic flex items-center gap-1">
        <Info className="w-3 h-3 text-slate-400" />
        {message}
      </p>
    );
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 flex items-start gap-2.5 text-xs text-amber-900 shadow-2xs">
      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold text-amber-950 mr-1">Judicial AI Ethics Notice:</span>
        <span className="text-amber-900/90">{message}</span>
      </div>
    </div>
  );
};
