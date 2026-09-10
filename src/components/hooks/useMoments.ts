"use client";

import { useEffect, useState } from "react";
import { dayKey, useDayStore, type DayData } from "../../store/dayStore";
import { fromDateSlug, toDateSlug } from "../../utils/dateUtils";

interface MomentDto {
  id: string;
  title: string;
  description: string;
  time?: string;
  emoji?: string;
  date?: string;
}

export function useMoments(date?: Date) {
  const setDays = useDayStore((s) => s.setDays);
  const [loading, setLoading] = useState(true);
  const slug = date ? toDateSlug(date) : undefined;

  useEffect(() => {
    let cancelled = false;

    if (slug) {
      fetch(`/api/moment/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          const d = fromDateSlug(slug);
          if (!d) return;
          setDays({
            [dayKey(d)]: {
              moments: data.moments ?? [],
              notes: data.note ?? "",
            },
          });
        })
        .catch((err) => console.error("Error loading day:", err))
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      fetch("/api/moments")
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          const incoming: Record<string, DayData> = {};
          for (const m of (data.moments ?? []) as MomentDto[]) {
            if (!m.date) continue;
            const d = fromDateSlug(m.date);
            if (!d) continue;
            const key = dayKey(d);
            const day = (incoming[key] ??= { moments: [], notes: "" });
            day.moments.push({
              id: m.id,
              title: m.title,
              description: m.description,
              time: m.time,
              emoji: m.emoji,
            });
          }
          setDays(incoming);
        })
        .catch((err) => console.error("Error loading moments:", err))
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [slug, setDays]);

  return { loading };
}