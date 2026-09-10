"use client";

import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function Calendar({
  onDaySelect,
}: {
  onDaySelect?: (date: Date) => void;
}) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [activeDay, setActiveDay] = useState(today.getDate());

  const label = `${viewDate.toLocaleString("en-US", {
    month: "long",
  })} ${viewDate.getFullYear()}`;

  const selectDay = (day: number) => {
    setActiveDay(day);
    onDaySelect?.(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
  };

  const prevMonth = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const goToday = () => {
    const now = new Date();
    setViewDate(now);
    setActiveDay(now.getDate());
    onDaySelect?.(now);
  };

  return (
    <div>
      <CalendarHeader
        label={label}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToday}
      />
      <CalendarGrid
        year={viewDate.getFullYear()}
        month={viewDate.getMonth()}
        activeDay={activeDay}
        onSelectDay={selectDay}
      />
    </div>
  );
}
