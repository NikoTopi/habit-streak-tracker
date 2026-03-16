import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useProfileContext } from '../../context/ProfileContext';

export function Header() {
  const { pathname } = useLocation();
  const [isDark, toggleDark] = useDarkMode();
  const { profile } = useProfileContext();

  const initials = (profile.name || 'Me')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
          <span className="text-2xl">🔥</span>
          <span>Ember</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="ml-1 rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Profile avatar */}
          <Link
            to="/profile"
            aria-label="Profile"
            className={`ml-1 rounded-xl transition-all ring-2 ${
              pathname === '/profile'
                ? 'ring-indigo-500'
                : 'ring-transparent hover:ring-indigo-300 dark:hover:ring-indigo-600'
            }`}
          >
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600 text-xs font-bold text-white">
                {initials}
              </div>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
