"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  joinedAt: string;
}

interface ProfileStore {
  profile: ProfileData | null;
  setProfile: (profile: ProfileData) => void;
  updateProfile: (patch: Partial<ProfileData>) => void;
  resetProfile: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      _hasHydrated: false,
      setHasHydrated: (value: boolean) => set(() => ({ _hasHydrated: value })),
      setProfile: (profile) => set(() => ({ profile })),
      updateProfile: (patch) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...patch }
            : ({ ...patch } as ProfileData),
        })),
      resetProfile: () => set(() => ({ profile: null })),
    }),
    {
      name: "memora-profile-store",
      partialize: (state) => ({ profile: state.profile }),
      version: 2,
      migrate: (persisted) => {
        const p = persisted as { profile?: ProfileData | null } | null;
        return { profile: p?.profile ?? null };
      },
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function useHydratedProfile(): boolean {
  const hasHydrated = useProfileStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      useProfileStore.persist.rehydrate();
    }
  }, [hasHydrated]);

  return hasHydrated;
}

export function useProfileLoaded(delay = 1500): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return loaded;
}
