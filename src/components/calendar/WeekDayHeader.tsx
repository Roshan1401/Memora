const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function WeekDayHeader() {
  return weekDays.map((day, i) => (
    <div
      key={day}
      className={`py-1.5 sm:py-2 text-center text-[11px] sm:text-xs border-2 border-black font-black uppercase tracking-tight sm:tracking-widest select-none ${
        i === 0 ? "bg-red-500 text-white" : "bg-black text-white"
      }`}
    >
      <span className="sm:hidden">{day.slice(0, 1)}</span>
      <span className="hidden sm:inline">{day}</span>
    </div>
  ));
}
