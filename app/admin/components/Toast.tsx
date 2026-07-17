'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl border animate-in slide-in-from-bottom-4 fade-in duration-300 ${
      type === 'success'
        ? 'bg-[#0d1117] border-emerald-500/30 shadow-emerald-500/10'
        : 'bg-[#0d1117] border-red-500/30 shadow-red-500/10'
    }`}>
      {type === 'success'
        ? <CheckCircle className="size-5 text-emerald-400 shrink-0" />
        : <XCircle className="size-5 text-red-400 shrink-0" />
      }
      <p className="text-sm font-semibold text-white">{message}</p>
      <button onClick={onClose} className="ml-2 text-white/30 hover:text-white/70 transition-colors">
        <X className="size-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => setToast(null);

  return { toast, showToast, closeToast };
}
