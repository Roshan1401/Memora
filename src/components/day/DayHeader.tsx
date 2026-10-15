"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { addDays, toDateSlug } from "../../utils/dateUtils";
import Image from "next/image";
import CatImg from "../../assets/cat.png";
import catFoot from "../../assets/catfoot.png";

function ArrowButton({
  href,
  direction,
  label,
}: {
  href: string;
  direction: "left" | "right";
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {direction === "left" ? (
        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      ) : (
        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
      )}
    </Link>
  );
}

export default function DayHeader({ date }: { date: Date }) {
  const prevDate = addDays(date, -1);
  const nextDate = addDays(date, 1);

  const fullDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <header className="relative border-2 border-black bg-[#e6e3d9] p-4 sm:p-6 shadow-[4px_4px_0_0_#000]">
      <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
        <ArrowButton
          href={`/calendar/${toDateSlug(prevDate)}`}
          direction="left"
          label={`Previous day, ${prevDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        />

        <div className="text-center px-2 min-w-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-black uppercase text-black tracking-tight break-words">
            {fullDate}
          </h1>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#4d4b46]">
            {dayName}
          </p>
        </div>

        <ArrowButton
          href={`/calendar/${toDateSlug(nextDate)}`}
          direction="right"
          label={`Next day, ${nextDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        />
      </div>

      {/* Decorative Cats - visible on ultra-wide / desktop only, non-blocking */}
      <div className="pointer-events-none select-none absolute right-24 -top-8 hidden xl:block opacity-90">
        <Image src={CatImg} alt="" className="h-32 w-52 object-contain" />
      </div>
      <div className="pointer-events-none select-none absolute left-24 -top-4 hidden xl:block opacity-90">
        <Image src={catFoot} alt="" className="h-28 w-44 object-contain" />
      </div>

      <div className="relative z-10 mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 border-t border-dashed border-black/40 pt-3 sm:pt-4">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-500 shrink-0" />
        <p className="text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest text-black text-center">
          Every day has something to remember
        </p>
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-500 shrink-0" />
      </div>
    </header>
  );
}
