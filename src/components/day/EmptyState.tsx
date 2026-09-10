"use client";

import { Cat, Plus } from "lucide-react";

interface EmptyStateProps {
  onAddMoment: () => void;
}

export default function EmptyState({ onAddMoment }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 border-2 border-dashed border-black/40 bg-white/60 p-8 text-center">
      <span className="grid h-24 w-24 place-items-center border-2 border-black bg-yellow-300 shadow-[4px_4px_0_0_#000]">
        <Cat className="h-14 w-14 text-black" strokeWidth={1.5} />
      </span>
      <p className="text-2xl font-black uppercase text-black">
        No moments yet for this day
      </p>
      <p className="max-w-md text-sm font-bold text-[#4d4b46]">
        Capture the special moments — big or small. This is where your story of
        the day begins.
      </p>
      <button
        onClick={onAddMoment}
        className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-yellow-300 px-6 py-3 text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
      >
        <Plus className="h-5 w-5" />
        Add Your First Moment
      </button>
    </div>
  );
}
