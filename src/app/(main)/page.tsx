import Image from "next/image";
import Link from "next/link";
import heroImage from "../../assets/hero.png";

export default function Home() {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  return (
    <div className="relative flex-1 w-full border-6 border-black overflow-hidden">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="flex flex-col items-start gap-4 p-10">
        <h1 className="text-7xl font-black text-yellow-300">
          {currentMonth.toUpperCase()}
        </h1>
        <p className="text-3xl font-bold text-white">
          GOOD DAYS, <br /> LAST FOREVER
        </p>

        <Link
          href="/calendar"
          className="mt-25 inline-flex items-center gap-3 border-2 border-black bg-yellow-300 px-8 py-3 text-sm font-black uppercase text-black shadow-[5px_5px_0_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000]"
        >
          View Calendar
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
