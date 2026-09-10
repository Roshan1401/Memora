const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function WeekDayHeader() {
  return weekDays.map((day, i) => (
    <div
      key={day}
      className={`py-2 text-center text-xs border-y border-2 border-black font-black uppercase tracking-widest ${
        i === 0 ? "bg-red-500 text-white" : "bg-black text-white"
      }`}
    >
      {day}
    </div>
  ));
}
