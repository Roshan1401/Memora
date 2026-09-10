"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProfileStore } from "../../store/profileStore";

export function useSyncProfile() {
  const { data: session, status } = useSession();
  const setProfile = useProfileStore((s) => s.setProfile);
  const resetProfile = useProfileStore((s) => s.resetProfile);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user?.id) {
      resetProfile();
      return;
    }

    let cancelled = false;

    fetch("/api/user")
      .then((res) => res.json())
      .then(({ user }) => {
        if (cancelled || !user) return;
        setProfile(user);
      })
      .catch((err) => console.error("Error syncing profile:", err));

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id, status, setProfile, resetProfile]);
}
