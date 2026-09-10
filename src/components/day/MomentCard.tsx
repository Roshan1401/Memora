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
    <li className="flex items-stretch gap-3 border-2 border-black bg-white p-4 shadow-[3px_3px_0_0_#000]">
      <span className="grid h-12 w-12 shrink-0 place-items-center border-2 border-black bg-[#f1efe7] shadow-[2px_2px_0_0_#000]">
        {moment.emoji ? (
          <span className="inline-flex h-8 w-8 items-center justify-center text-2xl">
            {moment.emoji}
          </span>
        ) : (
          getActivityIcon(moment.title, "h-7 w-7")
        )}
      </span>

      <div className="min-w-0 flex flex-1 flex-col justify-center">
        <div className="flex items-center  justify-between gap-2">
          <h3 className="wrap-break-word text-base font-black text-black">
            {moment.title}
          </h3>
          {moment.time && (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#4d4b46]">
              <Clock className="h-3.5 w-3.5" />
              {moment.time}
            </span>
          )}
        </div>
        {moment.description && (
          <p className="mt-1 wrap-break-word text-sm font-bold text-[#4d4b46]">
            {moment.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => onEdit(moment)}
          aria-label="Edit moment"
          className="grid h-9 w-9 place-items-center border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(moment.id)}
          aria-label="Delete moment"
          className="grid h-9 w-9 place-items-center border-2 border-black bg-red-500 text-white shadow-[2px_2px_0_0_#000] transition-transform hover:-translate-y-0.5"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
