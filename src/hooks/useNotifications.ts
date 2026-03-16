import { useState, useCallback } from 'react';
import type { NotificationSetting } from '../types';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { storageGet, storageSet } from '../services/storage';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [settings, setSettings] = useState<NotificationSetting[]>(() =>
    storageGet<NotificationSetting[]>(STORAGE_KEYS.NOTIFICATION_SETTINGS, [])
  );

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  }, []);

  const updateSetting = useCallback((habitId: string | 'global', updates: Partial<NotificationSetting>) => {
    setSettings((prev) => {
      const idx = prev.findIndex((s) => s.habitId === habitId);
      let updated: NotificationSetting[];
      if (idx === -1) {
        updated = [
          ...prev,
          { habitId, time: '09:00', enabled: false, ...updates },
        ];
      } else {
        updated = prev.map((s, i) => (i === idx ? { ...s, ...updates } : s));
      }
      storageSet(STORAGE_KEYS.NOTIFICATION_SETTINGS, updated);
      return updated;
    });
  }, []);

  const getSetting = useCallback(
    (habitId: string | 'global'): NotificationSetting | undefined => {
      return settings.find((s) => s.habitId === habitId);
    },
    [settings]
  );

  return { permission, settings, requestPermission, updateSetting, getSetting };
}
