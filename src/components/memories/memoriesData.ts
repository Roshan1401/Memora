import type { DayData } from "../../store/dayStore";
import { toDateSlug } from "../../utils/dateUtils";
import { getMomentCategory, getMomentEmoji } from "./categories";

export interface MemoryItem {
  id: string;
  title: string;
  description: string;
  time?: string;
  emoji: string;
  category: string;
  date: Date;
  dateSlug: string;
}

export interface MemoriesFilters {
  query: string;
  category: string;
  year: number | null;
}

export function flattenMoments(days: Record<string, DayData>): MemoryItem[] {
  const items: MemoryItem[] = [];

  for (const [key, day] of Object.entries(days)) {
    const date = new Date(key);
    for (const moment of day.moments) {
      items.push({
        id: moment.id,
        title: moment.title,
        description: moment.description,
        time: moment.time,
        emoji: getMomentEmoji(moment),
        category: getMomentCategory(moment),
        date,
        dateSlug: toDateSlug(date),
      });
    }
  }

  return items.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getAvailableYears(items: MemoryItem[]): number[] {
  return Array.from(new Set(items.map((item) => item.date.getFullYear()))).sort(
    (a, b) => b - a,
  );
}

export function getAvailableCategories(items: MemoryItem[]): string[] {
  return Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function filterMemories(
  items: MemoryItem[],
  filters: MemoriesFilters,
): MemoryItem[] {
  const query = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    const matchesQuery =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesCategory =
      filters.category === "all" || item.category === filters.category;

    const matchesYear =
      filters.year === null || item.date.getFullYear() === filters.year;

    return matchesQuery && matchesCategory && matchesYear;
  });
}
