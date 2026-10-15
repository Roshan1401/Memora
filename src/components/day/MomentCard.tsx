"use client";

import { Clock, Pencil, Trash2 } from "lucide-react";
import type { Moment } from "../../store/dayStore";
import { getActivityIcon } from "../calendar/activityIcons";

interface MomentCardProps {
  moment: Moment;
  onEdit: (moment: Moment) => void;
  onDelete: (id: string) => void;
}

export default function MomentCard({
  moment,
  onEdit,
  onDelete,
}: MomentCardProps) {
  return (
    <li className="flex items-center gap-2.5 sm:gap-3 border-2 border-black bg-white p-3 sm:p-4 shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-shadow hover:shadow-[4px_4px_0_0_#000]">
      <span className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center border-2 border-black bg-[#f1efe7] shadow-[2px_2px_0_0_#000]">
        {moment.emoji ? (
          <span className="inline-flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center text-xl sm:text-2xl">
            {moment.emoji}
          </span>
        ) : (
          getActivityIcon(moment.title, "h-5 w-5 sm:h-7 sm:w-7")
        )}
      </span>

      <div className="min-w-0 flex flex-1 flex-col justify-center gap-0.5">
        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
          <h3 className="break-words [overflow-wrap:anywhere] text-sm sm:text-base font-black text-black leading-snug">
            {moment.title}
          </h3>
          {moment.time && (
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] sm:text-xs font-bold text-[#4d4b46]">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              {moment.time}
            </span>
          )}
        </div>
        {moment.description && (
          <p className="break-words [overflow-wrap:anywhere] text-xs sm:text-sm font-bold text-[#4d4b46] leading-snug">
            {moment.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onEdit(moment)}
          aria-label={`Edit ${moment.title}`}
          className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-yellow-100 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
        >
          <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(moment.id)}
          aria-label={`Delete ${moment.title}`}
          className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border-2 border-black bg-red-500 text-white shadow-[2px_2px_0_0_#000] transition-all hover:-translate-y-0.5 hover:bg-red-600 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
        >
          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </li>
  );
}
