import React from 'react';
import { useCourt } from '../../context/CourtContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useCourt();

  if (!toast) return null;

  const getToastStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-slate-900 border-emerald-500/50 text-white',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        };
      case 'error':
        return {
          bg: 'bg-slate-900 border-rose-500/50 text-white',
          icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        };
      case 'warning':
        return {
          bg: 'bg-slate-900 border-amber-500/50 text-white',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        };
      case 'info':
      default:
        return {
          bg: 'bg-slate-900 border-court-500/50 text-white',
          icon: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        };
    }
  };

  const style = getToastStyle();

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`rounded-xl border p-4 shadow-2xl backdrop-blur-md flex items-start gap-3.5 ${style.bg}`}>
        {style.icon}
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
