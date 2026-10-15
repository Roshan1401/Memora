"use client";

import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { MemoryItem } from "./memoriesData";

const humanizeDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function MemoryCard({ item }: { item: MemoryItem }) {
  return (
    <Link
      href={`/calendar/${item.dateSlug}`}
      className="group block h-full transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      <article className="flex h-full flex-col justify-between gap-3 sm:gap-4 border-2 border-black bg-white p-3.5 sm:p-5 shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] transition-all group-hover:shadow-[5px_5px_0_0_#000] sm:group-hover:shadow-[6px_6px_0_0_#000]">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2.5">
            <span className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center border-2 border-black bg-yellow-300 text-2xl sm:text-3xl text-black shadow-[2px_2px_0_0_#000]">
              {item.emoji}
            </span>
            <span className="inline-flex items-center gap-1.5 border-2 border-black bg-[#f1efe7] px-2 py-1 text-[11px] sm:text-xs font-black uppercase text-black shadow-[2px_2px_0_0_#000]">
              <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span>{humanizeDate(item.date)}</span>
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="break-words [overflow-wrap:anywhere] text-base sm:text-lg font-black leading-snug text-black">
              {item.title}
            </h3>
            {item.description && (
              <p className="break-words [overflow-wrap:anywhere] text-xs sm:text-sm font-bold text-[#4d4b46] leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-dashed border-black/30 pt-2.5">
          <span className="inline-flex border-2 border-black bg-yellow-300 px-2 py-0.5 text-[11px] sm:text-xs font-black uppercase text-black">
            {item.category}
          </span>
          {item.time && (
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#4d4b46]">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{item.time}</span>
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}