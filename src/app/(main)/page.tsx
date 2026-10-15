import Image from "next/image";
import Link from "next/link";
import heroImage from "../../assets/hero.png";

export default function Home() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  return (
    <div className="relative flex flex-1 min-h-[70vh] sm:min-h-[75vh] w-full flex-col justify-between overflow-hidden border-2 sm:border-3 border-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000]">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="flex flex-col items-start gap-3 sm:gap-4 p-5 sm:p-8 md:p-12">
        <h1
          suppressHydrationWarning
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-yellow-300 drop-shadow-[3px_3px_0_#000] break-words"
        >
          {currentMonth.toUpperCase()}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-white drop-shadow-[2px_2px_0_#000] leading-tight">
          GOOD DAYS, <br /> LAST FOREVER
        </p>

        <Link
          href="/calendar"
          className="mt-8 sm:mt-14 md:mt-20 inline-flex items-center gap-3 border-2 border-black bg-yellow-300 px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-black uppercase text-black shadow-[4px_4px_0_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000] active:translate-y-0 active:shadow-[2px_2px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          <span>View Calendar</span>
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
