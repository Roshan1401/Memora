"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useProfileStore, useProfileLoaded } from "../store/profileStore";
import { proxiedAvatar } from "../utils/avatar";
import avatarImg from "../assets/avatarImg.png";
import {
  HomeIcon,
  CalendarIcon,
  UserIcon,
  BookIcon,
} from "@/assets/Icons/index";

function ProfileAvatar() {
  const userPhoto = useProfileStore((s) => s.profile?.avatarUrl);
  const loaded = useProfileLoaded();
  const photo = proxiedAvatar(userPhoto);

  if (!loaded) {
    return (
      <div
        aria-label="Profile"
        className="h-12 w-12 animate-pulse rounded-full border-2 border-black bg-[#f1efe7]"
      />
    );
  }

  return (
    <Link
      href="/profile"
      aria-label="Profile"
      className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border-2 border-black bg-white shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
    >
      <Image
        src={photo || avatarImg}
        alt="Profile"
        width={48}
        height={48}
        unoptimized
        className="h-full w-full rounded-full object-cover"
      />
    </Link>
  );
}

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon /> },
  { label: "Calendar", href: "/calendar", icon: <CalendarIcon /> },
  { label: "Memories", href: "/memories", icon: <BookIcon /> },
  { label: "Profile", href: "/profile", icon: <UserIcon /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <header className="border-3  border-black bg-white ">
      <nav className="flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-black"
        >
          MEMORA
        </Link>

        <ul className="flex items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-2 border-2 px-4 py-2 text-sm font-bold uppercase transition-transform hover:-translate-y-0.5 ${
                    isActive
                      ? "border-black bg-yellow-300 text-black shadow-[4px_4px_0_0_#000]"
                      : "border-transparent text-[#4d4b46] hover:text-yellow-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <span
            suppressHydrationWarning
            className="border-2 border-black bg-yellow-300 px-4 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000]"
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {isLoggedIn ? (
            <ProfileAvatar />
          ) : (
            <Link
              href="/sign-in"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
