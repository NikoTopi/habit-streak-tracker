import { createPortal } from 'react-dom';
import { useToast } from '../../context/ToastContext';

export function Toast() {
  const { toast, dismissToast } = useToast();
  if (!toast) return null;

  return createPortal(
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-toast-in flex items-center gap-3 rounded-full bg-gray-900 dark:bg-gray-800 px-5 py-3 shadow-xl text-white text-sm font-medium">
      <span>{toast.message}</span>
      <button
        onClick={() => { toast.onUndo(); dismissToast(); }}
        className="text-indigo-300 hover:text-indigo-100 font-semibold transition-colors"
      >
        Undo
      </button>
      <button
        onClick={dismissToast}
        aria-label="Dismiss"
        className="text-gray-400 hover:text-white transition-colors ml-1"
      >
        ×
      </button>
    </div>,
    document.body,
  );
}
