"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Camera,
  CalendarDays,
  Pencil,
  LogOut,
  Star,
  Sparkle,
} from "lucide-react";
import type { ProfileData } from "../../store/profileStore";
import { fileToResizedDataUrl } from "../../utils/imageUtils";
import { proxiedAvatar } from "../../utils/avatar";
import avatarImg from "../../assets/avatarImg.png";

interface ProfileCardProps {
  profile: ProfileData;
  onPhotoChange: (avatarUrl: string) => void;
  onEdit: () => void;
  onLogout: () => void;
}

const formatJoinedDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export default function ProfileCard({
  profile,
  onPhotoChange,
  onEdit,
  onLogout,
}: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      onPhotoChange(dataUrl);
    } catch {
      // ignore unreadable files
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-xl border-2 border-black bg-[#faf6ec] px-8 pb-4 pt-20 shadow-[6px_6px_0_0_#000]">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-36 w-36 rounded-full border-2 border-black bg-[#faf6ec] p-1.5">
          {profile.avatarUrl ? (
            <Image
              src={proxiedAvatar(profile.avatarUrl) || ""}
              alt="Profile Photo"
              width={144}
              height={144}
              unoptimized
              className="h-full w-full rounded-full border-2 border-black object-cover"
            />
          ) : (
            <Image
              src={avatarImg}
              alt="Default profile photo"
              width={144}
              height={144}
              className="h-full w-full rounded-full border-2 border-black object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change profile photo"
            className="absolute bottom-1 cursor-pointer right-1 grid h-9 w-9 place-items-center rounded-full border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000]"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-center text-4xl font-black uppercase tracking-tight text-black">
            {profile.name || "Unknown"}
          </h2>
          <p className="text-center text-sm font-bold text-[#d04d10]">
            @{profile.username || "no-username"}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-16 border-b border-black sm:w-24" />
          <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-500" />
          <div className="w-16 border-b border-black sm:w-24" />
        </div>

        <div className="flex items-start justify-center gap-2 px-2 pt-1">
          <span className="shrink-0 font-serif text-5xl leading-[0.6] text-yellow-500">
            &ldquo;
          </span>
          <p className="mt-3 max-w-sm text-center text-base font-medium text-black">
            {profile.bio || "No quote yet — tell people something about you."}
          </p>
          <span className="shrink-0 self-end font-serif text-5xl leading-[0.6] text-yellow-500">
            &rdquo;
          </span>
        </div>

        <div className="flex w-full items-center justify-center gap-3 pt-1">
          <div className="h-px flex-1 bg-black" />
          <Sparkle className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
          <div className="h-px flex-1 bg-black" />
        </div>

        <div className="flex items-center gap-2 text-[#4d4b46]">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm font-medium">
            Joined {formatJoinedDate(profile.joinedAt)}
          </span>
        </div>

        <div className="w-full border-b border-dashed border-black" />

        <button
          type="button"
          onClick={onEdit}
          className="my-2 cursor-pointer inline-flex items-center justify-center gap-2 border-2 border-black bg-transparent px-6 py-2.5 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000]"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </button>

        <div className="mt- w-full border-t border-black pt-4  ">
          <button
            type="button"
            onClick={onLogout}
            className="mx-auto inline-flex cursor-pointer items-center gap-2 border-2 border-transparent px-3 py-1.5 text-sm font-bold text-red-500 transition-all hover:-translate-y-0.5 hover:border-black hover:bg-red-500 hover:text-white hover:shadow-[3px_3px_0_0_#000]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
