"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
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
        className="h-10 w-10 sm:h-11 sm:w-11 animate-pulse rounded-full border-2 border-black bg-[#f1efe7]"
      />
    );
  }

  return (
    <Link
      href="/profile"
      aria-label="View Profile"
      className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center overflow-hidden rounded-full border-2 border-black bg-white shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0"
    >
      <Image
        src={photo || avatarImg}
        alt="Profile"
        width={44}
        height={44}
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
  const isLoading = status === "loading";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 border-2 border-black bg-white shadow-[3px_3px_0_0_#000]">
      <nav aria-label="Main Navigation" className="flex items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-xl sm:text-2xl font-black tracking-tight text-black transition-transform hover:-translate-y-0.5"
        >
          MEMORA
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-2 border-2 px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm font-black uppercase transition-all hover:-translate-y-0.5 active:translate-y-0 ${isActive
                      ? "border-black bg-yellow-300 text-black shadow-[3px_3px_0_0_#000]"
                      : "border-transparent text-[#4d4b46] hover:border-black hover:bg-[#faf6ec] hover:text-black"
                    }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            suppressHydrationWarning
            className="hidden lg:inline-flex border-2 border-black bg-yellow-300 px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0_0_#000]"
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>


          {isLoading ? (
            <div
              aria-hidden="true"
              className="h-10 w-10 sm:h-11 sm:w-11 animate-pulse rounded-full border-2 border-black bg-[#f1efe7]"
            />
          ) : isLoggedIn ? (
            <ProfileAvatar />
          ) : (
            <Link
              href="/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="border-2 border-black bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:bg-yellow-300 active:translate-y-0"
            >
              Sign In
            </Link>
          )}


          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center border-2 border-black bg-yellow-300 text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5 active:translate-y-0 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t-2 border-black bg-[#faf6ec] p-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 border-2 p-3 text-sm font-black uppercase transition-transform active:translate-y-0 ${isActive
                        ? "border-black bg-yellow-300 text-black shadow-[3px_3px_0_0_#000]"
                        : "border-black bg-white text-black shadow-[2px_2px_0_0_#000] hover:bg-yellow-50"
                      }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t-2 border-dashed border-black pt-3">
            <span
              suppressHydrationWarning
              className="text-xs font-black uppercase tracking-wider text-[#4d4b46]"
            >
              Today: {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="text-xs font-bold text-[#4d4b46]">Memora Journal</span>
          </div>
        </div>
      )}
    </header>
  );
}
