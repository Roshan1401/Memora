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
    <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-black/40 bg-white/60 p-10 text-center">
      <span className="grid h-24 w-24 place-items-center border-2 border-black bg-yellow-300 shadow-[4px_4px_0_0_#000]">
        {filtered ? (
          <SearchX className="h-14 w-14 text-black" strokeWidth={1.5} />
        ) : (
          <Cat className="h-14 w-14 text-black" strokeWidth={1.5} />
        )}
      </span>

      <p className="text-2xl font-black uppercase text-black">
        {filtered ? "No memories match" : "No memories yet"}
      </p>
      <p className="max-w-md text-sm font-bold text-[#4d4b46]">
        {filtered
          ? "Try a different search term or clear your filters to see all your captured moments."
          : "Capture the special moments — big or small. Your memories will show up here."}
      </p>

      {filtered ? (
        <button
          onClick={onClearFilters}
          className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
        >
          Clear Filters
        </button>
      ) : (
        <Link
          href="/calendar"
          className="inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
        >
          <Plus className="h-5 w-5" />
          Create a Memory
        </Link>
      )}
    </div>
  );
}