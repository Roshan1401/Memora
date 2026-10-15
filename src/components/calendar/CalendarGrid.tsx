"use client";

import WeekDayHeader from "./WeekDayHeader";
import DayCell from "./DayCell";
import { dayKey, useDayStore } from "../../store/dayStore";
import { getActivityIcon } from "./activityIcons";
import { toDateSlug } from "../../utils/dateUtils";
import { useMoments } from "../hooks/useMoments";

interface CalendarGridProps {
  year: number;
  month: number;
  activeDay: number;
  onSelectDay: (day: number) => void;
}

export default function CalendarGrid({
  year,
  month,
  activeDay,
  onSelectDay,
}: CalendarGridProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  useMoments();
  const days = useDayStore((s) => s.days);

  const getDayTasks = (day: number) => {
    const key = dayKey(new Date(year, month, day));
    const data = days[key];
    return (data?.moments ?? []).map((m) => ({
      label: m.title,
      icon: m.emoji ? (
        <span className="inline-flex h-6 w-6 items-center justify-center text-xl">
          {m.emoji}
        </span>
      ) : (
        getActivityIcon(m.title, "h-6 w-6")
      ),
    }));
  };

  return (
    <div className="mt-3 sm:mt-4 border-2 border-black bg-white shadow-[4px_4px_0_0_#000] overflow-hidden">
      <div className="grid grid-cols-7">
        <WeekDayHeader />
        {Array.from({ length: startDay }).map((_, i) => (
          <div
            key={`blank-${i}`}
            className="border border-black bg-[#f1efe7]/40 min-h-16 sm:min-h-24 md:min-h-28 lg:min-h-32"
          />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const tasks = getDayTasks(day);
          const colIndex = (startDay + day - 1) % 7;
          return (
            <DayCell
              key={day}
              day={day}
              dateKey={toDateSlug(new Date(year, month, day))}
              isActive={day === activeDay}
              tasks={tasks}
              isRightAligned={colIndex >= 4}
              onSelectDay={onSelectDay}
            />
          );
        })}
      </div>
    </div>
  );
}
