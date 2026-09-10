"use client";

import { useMemo, useState } from "react";
import { BookMarked } from "lucide-react";
import { useDayStore } from "../../store/dayStore";
import { useMoments } from "../hooks/useMoments";
import {
  filterMemories,
  flattenMoments,
  getAvailableCategories,
  getAvailableYears,
} from "./memoriesData";
import MemoriesToolbar from "./MemoriesToolbar";
import MemoryCard from "./MemoryCard";
import MemoriesEmptyState from "./MemoriesEmptyState";

const SKELETON_COUNT = 6;

export default function MemoriesPage() {
  const { loading } = useMoments();
  const days = useDayStore((s) => s.days);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");

  const allMoments = useMemo(() => flattenMoments(days), [days]);
  const categories = useMemo(
    () => getAvailableCategories(allMoments),
    [allMoments],
  );
  const years = useMemo(() => getAvailableYears(allMoments), [allMoments]);

  const hasFilters =
    Boolean(query.trim()) || category !== "all" || year !== "all";

  const visibleMoments = useMemo(
    () =>
      filterMemories(allMoments, {
        query,
        category,
        year: year === "all" ? null : Number(year),
      }),
    [allMoments, query, category, year],
  );

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setYear("all");
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="inline-flex items-center gap-3 text-4xl font-black uppercase tracking-tight text-black">
            <span className="grid h-12 w-12 place-items-center border-2 border-black bg-yellow-300 text-black shadow-[3px_3px_0_0_#000]">
              <BookMarked className="h-6 w-6" />
            </span>
            Memories
          </h1>
          <p className="mt-2 text-sm font-bold text-[#4d4b46]">
            Every moment you captured, all in one place.
          </p>
        </div>

        {!loading && allMoments.length > 0 && (
          <span className="border-2 border-black bg-white px-3 py-1.5 text-sm font-black uppercase text-black shadow-[3px_3px_0_0_#000]">
            {visibleMoments.length} / {allMoments.length} moments
          </span>
        )}
      </header>

      {!loading && (
        <MemoriesToolbar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          year={year}
          onYearChange={setYear}
          years={years}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
        />
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse border-2 border-black bg-[#f1efe7] shadow-[4px_4px_0_0_#000]"
            />
          ))}
        </div>
      ) : visibleMoments.length === 0 ? (
        <MemoriesEmptyState
          hasMoments={allMoments.length > 0}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleMoments.map((moment) => (
            <MemoryCard key={`${moment.dateSlug}-${moment.id}`} item={moment} />
          ))}
        </div>
      )}
    </div>
  );
}
