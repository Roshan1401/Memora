"use client";
import { useRouter } from "next/navigation";

export interface DayTask {
  label: string;
  icon?: React.ReactNode;
}

interface DayCellProps {
  day: number;
  dateKey: string;
  isActive: boolean;
  tasks?: DayTask[];
  isRightAligned?: boolean;
  onSelectDay: (day: number) => void;
}

export default function DayCell({
  day,
  dateKey,
  isActive,
  tasks = [],
  isRightAligned = false,
  onSelectDay,
}: DayCellProps) {
  const router = useRouter();
  const [firstTask, ...rest] = tasks;

  return (
    <button
      type="button"
      onClick={() => {
        onSelectDay(day);
        router.push(`/calendar/${dateKey}`);
      }}
      aria-label={`Day ${day}, ${tasks.length} ${tasks.length === 1 ? "moment" : "moments"}`}
      className={`group relative flex min-h-16 sm:min-h-24 md:min-h-28 lg:min-h-32 flex-col items-start gap-1 cursor-pointer border border-black p-1 sm:p-2 text-left transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-black ${
        isActive ? "bg-yellow-300" : "bg-white hover:bg-[#F4E7D3]"
      }`}
    >
      <span
        className={`text-xs sm:text-base md:text-lg font-black leading-none ${
          isActive ? "text-red-600" : "text-black"
        }`}
      >
        {day}
      </span>

      {firstTask && (
        <div className="flex flex-col h-full items-center justify-center w-full gap-1 sm:gap-2">
          <div className="flex flex-col text-center justify-center items-center gap-0.5 sm:gap-1 max-w-full">
            <span className="scale-75 sm:scale-100 transform-gpu">{firstTask.icon}</span>
            <span className="hidden sm:block text-xs font-black text-black max-w-full truncate px-1">
              {firstTask.label}
            </span>
          </div>
          {rest.length > 0 && (
            <span
              className={`inline-flex w-fit items-center border border-black px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs font-black text-black ${
                isActive ? "bg-white" : "bg-yellow-300"
              }`}
            >
              +{rest.length}
            </span>
          )}
        </div>
      )}

      {tasks.length > 0 && (
        <div
          className={`pointer-events-none absolute top-full z-20 mt-1 hidden w-48 sm:w-56 border-2 border-black bg-white p-2.5 shadow-[4px_4px_0_0_#000] group-hover:block ${
            isRightAligned ? "right-0" : "left-0"
          }`}
        >
          <p className="mb-1.5 text-xs font-black uppercase tracking-wider text-black border-b border-dashed border-black pb-1">
            Day {day} · {tasks.length} {tasks.length > 1 ? "moments" : "moment"}
          </p>
          <ul className="flex flex-col gap-1.5">
            {tasks.map((task, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="shrink-0">{task.icon}</span>
                <span className="text-xs font-bold text-black truncate">
                  {task.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}
