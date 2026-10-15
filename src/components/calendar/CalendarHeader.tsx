"use client";

import Image from "next/image";
import CatImg from "../../assets/cat3.png";

interface CalendarHeaderProps {
  label: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${direction === "left" ? "Previous" : "Next"} month`}
      className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center border-2 border-black cursor-pointer bg-white shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="m9 18 6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

export default function CalendarHeader({
  label,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="relative flex flex-wrap items-center justify-between gap-2 sm:gap-4 py-1">
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        <ArrowButton direction="left" onClick={onPrevMonth} />
        <ArrowButton direction="right" onClick={onNextMonth} />
        <h2
          suppressHydrationWarning
          className="ml-1 sm:ml-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase text-black tracking-tight"
        >
          {label}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="border-2 border-black cursor-pointer bg-yellow-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          Today
        </button>
      </div>

      <div className="pointer-events-none select-none absolute right-24 -top-5 hidden md:block">
        <Image src={CatImg} alt="" className="h-16 w-32 lg:h-20 lg:w-40 object-contain" />
      </div>
    </div>
  );
}
