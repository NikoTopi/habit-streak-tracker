import { useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet, storageSet } from '../services/storage';

export interface Profile {
  name: string;
  avatar: string | null; // base64 data URL
}

const DEFAULT_PROFILE: Profile = { name: '', avatar: null };

function resizeImage(file: File, maxSize = 300): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() =>
    storageGet<Profile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
  );

  const updateName = useCallback((name: string) => {
    setProfile((prev) => {
      const next = { ...prev, name };
      storageSet(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  }, []);

  const uploadAvatar = useCallback(async (file: File) => {
    const avatar = await resizeImage(file, 300);
    setProfile((prev) => {
      const next = { ...prev, avatar };
      storageSet(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  }, []);

  const removeAvatar = useCallback(() => {
    setProfile((prev) => {
      const next = { ...prev, avatar: null };
      storageSet(STORAGE_KEYS.PROFILE, next);
      return next;
    });
  }, []);

  return { profile, updateName, uploadAvatar, removeAvatar };
}
