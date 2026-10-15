"use client";

import { ChevronDown, RotateCcw, Search } from "lucide-react";

interface MemoriesToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  year: string;
  onYearChange: (value: string) => void;
  years: number[];
  hasFilters: boolean;
  onClearFilters: () => void;
}

export default function MemoriesToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  year,
  onYearChange,
  years,
  hasFilters,
  onClearFilters,
}: MemoriesToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-2 border-black bg-white p-3 sm:p-4 shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000]">
      <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:items-stretch">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-[#4d4b46]" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full border-2 border-black bg-[#f1efe7] py-2 pl-9 sm:pl-11 pr-3 sm:pr-4 text-xs sm:text-sm font-bold text-black outline-none placeholder:text-[#4d4b46] focus:bg-yellow-50/70 focus-visible:outline-2 focus-visible:outline-black"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <label className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial min-w-[120px]">
            <span className="text-[11px] sm:text-xs font-black uppercase text-[#4d4b46] shrink-0">
              Tag
            </span>
            <div className="relative flex-1 sm:w-auto">
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full cursor-pointer appearance-none border-2 border-black bg-[#f1efe7] py-2 pl-2.5 sm:pl-3 pr-8 sm:pr-9 text-xs sm:text-sm font-bold text-black outline-none focus:bg-yellow-50/70 focus-visible:outline-2 focus-visible:outline-black"
              >
                <option value="all">All tags</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-black" />
            </div>
          </label>

          <label className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial min-w-[110px]">
            <span className="text-[11px] sm:text-xs font-black uppercase text-[#4d4b46] shrink-0">
              Year
            </span>
            <div className="relative flex-1 sm:w-auto">
              <select
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
                className="w-full cursor-pointer appearance-none border-2 border-black bg-[#f1efe7] py-2 pl-2.5 sm:pl-3 pr-8 sm:pr-9 text-xs sm:text-sm font-bold text-black outline-none focus:bg-yellow-50/70 focus-visible:outline-2 focus-visible:outline-black"
              >
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-black" />
            </div>
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 border-2 border-black bg-red-500 px-3.5 py-2 text-xs sm:text-sm font-black uppercase text-white shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0_0_#000] focus-visible:outline-2 focus-visible:outline-black"
            >
              <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}