"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { addDays, toDateSlug } from "../../utils/dateUtils";
import Image from "next/image";
import CatImg from "../../assets/cat.png";
import catFoot from "../../assets/catfoot.png";

function ArrowButton({
  href,
  direction,
  label,
}: {
  href: string;
  direction: "left" | "right";
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-12 w-12 shrink-0 place-items-center border-2 border-black bg-white text-black shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000]"
    >
      {direction === "left" ? (
        <ArrowLeft className="h-6 w-6" />
      ) : (
        <ArrowRight className="h-6 w-6" />
      )}
    </Link>
  );
}

export default function DayHeader({ date }: { date: Date }) {
  const prevDate = addDays(date, -1);
  const nextDate = addDays(date, 1);

  const fullDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <header className="border-2 relative border-black bg-[#e6e3d9] p-6 shadow-[4px_4px_0_0_#000]">
      <div className="flex items-center justify-between gap-4">
        <ArrowButton
          href={`/calendar/${toDateSlug(prevDate)}`}
          direction="left"
          label={`Previous day, ${prevDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        />

        <div className="text-center">
          <p className="text-3xl font-black uppercase text-black">{fullDate}</p>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.3em] text-[#4d4b46]">
            {dayName}
          </p>
        </div>

        <ArrowButton
          href={`/calendar/${toDateSlug(nextDate)}`}
          direction="right"
          label={`Next day, ${nextDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
        />
      </div>

      <div className="absolute right-40 -top-5">
        <Image src={CatImg} alt="Cat" className="h-60 w-100" />
      </div>
      <div className="absolute left-40 -top-0 ">
        <Image src={catFoot} alt="Cat foot" className="h-50 w-100" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2  pt-4">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
        <p className="text-sm font-bold uppercase tracking-widest text-black">
          Every day has something to remember
        </p>
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
      </div>
    </header>
  );
}
