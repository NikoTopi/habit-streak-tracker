import { createContext, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface ToastData {
  id: number;
  message: string;
  onUndo: () => void;
}

interface ToastContextValue {
  toast: ToastData | null;
  showToast: (message: string, onUndo: () => void) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string, onUndo: () => void): void {
    if (timerRef.current) clearTimeout(timerRef.current);
    const id = Date.now();
    setToast({ id, message, onUndo });
    timerRef.current = setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  }

  function dismissToast(): void {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
