"use client";

import Calendar from "../../../components/calendar/Calendar";

export default function CalendarPage() {
  return (
    <div className="flex gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <Calendar />
      </div>
    </div>
  );
}
