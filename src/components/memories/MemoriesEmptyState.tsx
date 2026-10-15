"use client";

import Link from "next/link";
import { Cat, Plus, SearchX } from "lucide-react";

interface MemoriesEmptyStateProps {
  hasMoments: boolean;
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function MemoriesEmptyState({
  hasMoments,
  hasFilters,
  onClearFilters,
}: MemoriesEmptyStateProps) {
  const filtered = hasMoments && hasFilters;

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 border-2 border-dashed border-black/40 bg-white/70 p-6 sm:p-8 md:p-10 text-center">
      <span className="grid h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 place-items-center border-2 border-black bg-yellow-300 shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]">
        {filtered ? (
          <SearchX className="h-9 w-9 sm:h-12 sm:w-12 text-black" strokeWidth={1.5} />
        ) : (
          <Cat className="h-9 w-9 sm:h-12 sm:w-12 text-black" strokeWidth={1.5} />
        )}
      </span>

      <p className="text-lg sm:text-xl md:text-2xl font-black uppercase text-black tracking-tight">
        {filtered ? "No memories match" : "No memories yet"}
      </p>
      <p className="max-w-md text-xs sm:text-sm font-bold text-[#4d4b46]">
        {filtered
          ? "Try a different search term or clear your filters to see all your captured moments."
          : "Capture the special moments — big or small. Your memories will show up here."}
      </p>

      {filtered ? (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-1 inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-yellow-300 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
        >
          Clear Filters
        </button>
      ) : (
        <Link
          href="/calendar"
          className="mt-1 inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Create a Memory</span>
        </Link>
      )}
    </div>
  );
}