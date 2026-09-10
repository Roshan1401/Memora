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
      className="grid h-9 w-9 place-items-center border-2 border-black cursor-pointer  bg-white shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000]"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <div className="flex relative items-center  justify-between gap-4">
      <div className="flex items-center gap-2">
        <ArrowButton direction="left" onClick={onPrevMonth} />
        <ArrowButton direction="right" onClick={onNextMonth} />
        <p
          suppressHydrationWarning
          className={`text-4xl ml-3 font-black uppercase text-black`}
        >
          {label}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="border-2 border-black  cursor-pointer bg-yellow-300 px-4 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000]"
        >
          Today
        </button>
      </div>
      <div className="absolute right-30 -top-6">
        <Image src={CatImg} alt="CatFoot" className="h-22 w-45" />
      </div>
    </div>
  );
}
