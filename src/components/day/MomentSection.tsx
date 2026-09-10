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
    <section className="flex h-full flex-col gap-5 border-2 border-black bg-[#f1efe7] p-5 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-black pb-4">
        <h2 className="flex items-center gap-2 text-xl font-black uppercase text-black">
          Today&apos;s Moments
          <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-black bg-yellow-300 text-sm font-black text-black shadow-[2px_2px_0_0_#000]">
            {moments.length}
          </span>
        </h2>
        <button
          onClick={onAddMoment}
          className="inline-flex cursor-pointer items-center gap-2 border-2 border-black bg-yellow-300 px-4 py-2 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000]"
        >
          <Plus className="h-4 w-4" />
          Add Moment
        </button>
      </div>

      {moments.length === 0 ? (
        <EmptyState onAddMoment={onAddMoment} />
      ) : (
        <ul className="flex flex-1 flex-col px-6 gap-3">
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
