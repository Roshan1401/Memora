"use client";

import { Plus } from "lucide-react";
import type { Moment } from "../../store/dayStore";
import EmptyState from "./EmptyState";
import MomentCard from "./MomentCard";

interface MomentSectionProps {
  moments: Moment[];
  onAddMoment: () => void;
  onEditMoment: (moment: Moment) => void;
  onDeleteMoment: (id: string) => void;
}

export default function MomentSection({
  moments,
  onAddMoment,
  onEditMoment,
  onDeleteMoment,
}: MomentSectionProps) {
  return (
    <section className="flex h-full flex-col gap-4 sm:gap-5 border-2 border-black bg-[#f1efe7] p-3.5 sm:p-5 shadow-[4px_4px_0_0_#000]">
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b-2 border-dashed border-black pb-3 sm:pb-4">
        <h2 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-black uppercase text-black">
          <span>Today&apos;s Moments</span>
          <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border-2 border-black bg-yellow-300 text-xs sm:text-sm font-black text-black shadow-[2px_2px_0_0_#000]">
            {moments.length}
          </span>
        </h2>
        <button
          onClick={onAddMoment}
          className="inline-flex cursor-pointer items-center gap-1.5 sm:gap-2 border-2 border-black bg-yellow-300 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-black uppercase text-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span>Add Moment</span>
        </button>
      </div>

      {moments.length === 0 ? (
        <EmptyState onAddMoment={onAddMoment} />
      ) : (
        <ul className="flex flex-1 flex-col gap-2.5 sm:gap-3">
          {moments.map((moment) => (
            <MomentCard
              key={moment.id}
              moment={moment}
              onEdit={onEditMoment}
              onDelete={onDeleteMoment}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
