import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useProfile } from '../hooks/useProfile';
import type { Profile } from '../hooks/useProfile';

interface ProfileContextValue {
  profile: Profile;
  updateName: (name: string) => void;
  uploadAvatar: (file: File) => Promise<void>;
  removeAvatar: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const value = useProfile();
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfileContext(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfileContext must be used within ProfileProvider');
  return ctx;
}
