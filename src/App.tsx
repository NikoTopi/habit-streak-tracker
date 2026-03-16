import { HashRouter, Routes, Route } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';
import { ProfileProvider } from './context/ProfileContext';
import { ToastProvider } from './context/ToastContext';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <HashRouter>
      <ProfileProvider>
        <ToastProvider>
          <HabitProvider>
            <AppShell>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/habits/:id/history" element={<HistoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </AppShell>
          </HabitProvider>
        </ToastProvider>
      </ProfileProvider>
    </HashRouter>
  );
}
