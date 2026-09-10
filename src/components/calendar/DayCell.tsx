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
  onSelectDay: (day: number) => void;
}

export default function DayCell({
  day,
  dateKey,
  isActive,
  tasks = [],
  onSelectDay,
}: DayCellProps) {
  const router = useRouter();
  const [firstTask, ...rest] = tasks;

  return (
    <button
      onClick={() => {
        onSelectDay(day);
        router.push(`/calendar/${dateKey}`);
      }}
      className={`group relative flex min-h-28 flex-col items-start gap-1.5 hover:scale-101 cursor-pointer border border-black p-2 text-left transition-colors ${
        isActive ? "bg-yellow-300" : "bg-white hover:bg-[#F4E7D3]"
      }`}
    >
      <span
        className={`text-lg font-black ${
          isActive ? "text-red-500" : "text-black"
        }`}
      >
        {day}
      </span>

      {firstTask && (
        <div className="flex flex-col h-full items-center     w-full gap-3">
          <div className="flex flex-col text-center justify-center items-center gap-1">
            {firstTask.icon}
            <span className="  text-md font-black text-black">
              {firstTask.label}
            </span>
          </div>
          {rest.length > 0 && (
            <span
              className={`inline-flex w-fit items-center border-2 border-black  px-1.5 py-0.5 text-xs font-black text-black ${isActive ? "bg-white" : "bg-yellow-300"}`}
            >
              +{rest.length}
            </span>
          )}
        </div>
      )}

      {tasks.length > 0 && (
        <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-52 border-2 border-black bg-white p-2 shadow-[4px_4px_0_0_#000] group-hover:block">
          <p className="mb-1 text-xs font-black uppercase text-black">
            {day} {tasks.length > 1 ? `· ${tasks.length} moments` : "· moment"}
          </p>
          <ul className="flex flex-col gap-1">
            {tasks.map((task, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {task.icon}
                <span className="text-xs font-bold text-black">
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
