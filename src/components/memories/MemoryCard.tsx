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
      className="block h-full transition-transform hover:-translate-y-1"
    >
      <article className="flex h-full flex-col gap-4 border-2 border-black bg-white p-5 shadow-[4px_4px_0_0_#000] transition-shadow hover:shadow-[6px_6px_0_0_#000]">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-black bg-yellow-300 text-3xl text-black shadow-[2px_2px_0_0_#000]">
            {item.emoji}
          </span>
          <span className="inline-flex items-center gap-1.5 border-2 border-black bg-[#f1efe7] px-2 py-1 text-xs font-black uppercase text-black shadow-[2px_2px_0_0_#000]">
            <CalendarDays className="h-3.5 w-3.5" />
            {humanizeDate(item.date)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h3 className="break-words text-lg font-black leading-snug text-black">
            {item.title}
          </h3>
          {item.description && (
            <p className="break-words text-sm font-bold text-[#4d4b46]">
              {item.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-black uppercase text-black">
            {item.category}
          </span>
          {item.time && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4d4b46]">
              <Clock className="h-3.5 w-3.5" />
              {item.time}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}