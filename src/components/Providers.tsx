"use client";

import { SessionProvider } from "next-auth/react";
import { useSyncProfile } from "./hooks/useSyncProfile";

function ProfileSync() {
  useSyncProfile();
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProfileSync />
      {children}
    </SessionProvider>
  );
}
