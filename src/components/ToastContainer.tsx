import React from 'react';
import { useServer } from '../context/ServerContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useServer();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-top-3 ${
            toast.type === 'success'
              ? 'bg-[#0f172a]/95 border-emerald-500/40 text-emerald-300'
              : toast.type === 'error'
              ? 'bg-[#0f172a]/95 border-rose-500/40 text-rose-300'
              : 'bg-[#0f172a]/95 border-sky-500/40 text-sky-300'
          }`}
        >
          <div className="flex items-center gap-2.5 text-sm font-medium">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
            {toast.type === 'info' && <Info className="w-4 h-4 shrink-0 text-sky-400" />}
            <span className="leading-snug">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors ml-2"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
