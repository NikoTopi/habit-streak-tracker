import type { ReactNode } from 'react';
import { Header } from './Header';
import { Toast } from '../ui/Toast';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      <Toast />
    </div>
  );
}
