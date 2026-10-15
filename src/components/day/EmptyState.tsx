"use client";

import { Cat, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddMoment: () => void;
}

export default function EmptyState({ onAddMoment }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 sm:gap-4 border-2 border-dashed border-black/40 bg-white/70 p-5 sm:p-8 md:p-10 text-center">
      <span className="grid h-16 w-16 sm:h-20 sm:w-20 place-items-center border-2 border-black bg-yellow-300 shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]">
        <Cat className="h-9 w-9 sm:h-12 sm:w-12 text-black" strokeWidth={1.5} />
      </span>
      <p className="text-lg sm:text-xl md:text-2xl font-black uppercase text-black tracking-tight">
        No moments yet for this day
      </p>
      <p className="max-w-md text-xs sm:text-sm font-bold text-[#4d4b46]">
        Capture the special moments — big or small. This is where your story of the day begins.
      </p>
      <button
        type="button"
        onClick={onAddMoment}
        className="mt-1 inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-yellow-300 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Add Your First Moment</span>
      </button>
    </div>
  );
}
