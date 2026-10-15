"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import profileBg from "../../assets/profileBg.png";
import {
  useProfileStore,
  useHydratedProfile,
  useProfileLoaded,
  type ProfileData,
} from "../../store/profileStore";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import LogoutModal from "./LogoutModal";
import { toast } from "sonner";

export default function ProfilePage() {
  const { status } = useSession();
  const hasHydrated = useHydratedProfile();
  const profileLoaded = useProfileLoaded();
  const profile = useProfileStore((s) => s.profile);
  const updateProfile = useProfileStore((s) => s.updateProfile);
  const resetProfile = useProfileStore((s) => s.resetProfile);

  const [editOpen, setEditOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleSave = async function (patch: Partial<ProfileData>) {
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patch),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      updateProfile(data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        "Error saving profile: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
      console.error("Error saving profile:", error);
    }
  };

  const handleLogout = async () => {
    setLogoutOpen(false);
    resetProfile();
    await signOut({ callbackUrl: "/" });
  };

  const handleAvatarChange = async (avatarUrl: string) => {
    try {
      const res = await fetch("/api/avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatarUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update avatar");
      }

      updateProfile({ avatarUrl });
      toast.success("Avatar updated successfully");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error(
        "Error updating avatar: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };

  const notLoggedIn = status === "unauthenticated";

  return (
    <div className="relative flex min-w-0 flex-1 flex-col py-4 sm:py-8">
      <Image
        src={profileBg}
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="-z-10 object-cover border-2 sm:border-3 border-black"
      />

      <div className="relative flex flex-1 flex-col justify-center px-2.5 sm:px-4">
        {!hasHydrated || status === "loading" || !profileLoaded ? (
          <div className="h-80 w-full max-w-xl self-center animate-pulse border-2 border-black bg-[#f1efe7] shadow-[4px_4px_0_0_#000]" />
        ) : notLoggedIn || !profile ? (
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3.5 sm:gap-4 border-2 border-black bg-white p-6 sm:p-8 text-center shadow-[4px_4px_0_0_#000]">
            <p className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
              You&apos;re not logged in
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#4d4b46]">
              Log in to see and manage your profile.
            </p>
            <Link
              href="/sign-in"
              className="mt-1 inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
            >
              Log In
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center py-2 sm:py-4 text-center">
            <ProfileCard
              profile={profile}
              onPhotoChange={handleAvatarChange}
              onLogout={() => setLogoutOpen(true)}
              onEdit={() => setEditOpen(true)}
            />
          </div>
        )}
      </div>

      {editOpen && profile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}

      {logoutOpen && (
        <LogoutModal
          onClose={() => setLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}
