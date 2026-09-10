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
    <div className="flex flex-col gap-3 border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]">
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4d4b46]" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full border-2 border-black bg-[#f1efe7] py-2.5 pl-11 pr-4 text-sm font-bold text-black outline-none placeholder:text-[#4d4b46] focus:bg-yellow-50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-[#4d4b46]">
              Tag
            </span>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="cursor-pointer appearance-none border-2 border-black bg-[#f1efe7] py-2.5 pl-3 pr-9 text-sm font-bold text-black outline-none focus:bg-yellow-50"
              >
                <option value="all">All tags</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
            </div>
          </label>

          <label className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-[#4d4b46]">
              Year
            </span>
            <div className="relative">
              <select
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
                className="cursor-pointer appearance-none border-2 border-black bg-[#f1efe7] py-2.5 pl-3 pr-9 text-sm font-bold text-black outline-none focus:bg-yellow-50"
              >
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
            </div>
          </label>

          {hasFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-2 border-2 border-black bg-red-500 px-4 py-2.5 text-sm font-black uppercase text-white shadow-[3px_3px_0_0_#000] transition-transform hover:-translate-y-0.5"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}