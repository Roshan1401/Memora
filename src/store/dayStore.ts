import { create } from "zustand";

export interface Moment {
  id: string;
  title: string;
  description: string;
  time?: string;
  emoji?: string;
}

export interface DayData {
  moments: Moment[];
  notes: string;
}

export const EMPTY_DAY: DayData = { moments: [], notes: "" };

export const dayKey = (date: Date) => date.toDateString();

interface DayStore {
  days: Record<string, DayData>;
  addMoment: (date: Date, moment: Moment) => void;
  updateMoment: (date: Date, id: string, patch: Partial<Moment>) => void;
  removeMoment: (date: Date, id: string) => void;
  setNotes: (date: Date, notes: string) => void;
  setDays: (days: Record<string, DayData>) => void;
}

export const useDayStore = create<DayStore>()((set) => ({
  days: {},

  addMoment: (date, moment) =>
    set((state) => {
      const key = dayKey(date);
      const current = state.days[key] ?? EMPTY_DAY;
      return {
        days: {
          ...state.days,
          [key]: { ...current, moments: [...current.moments, moment] },
        },
      };
    }),

  updateMoment: (date, id, patch) =>
    set((state) => {
      const key = dayKey(date);
      const current = state.days[key];
      if (!current) return state;
      return {
        days: {
          ...state.days,
          [key]: {
            ...current,
            moments: current.moments.map((m) =>
              m.id === id ? { ...m, ...patch } : m,
            ),
          },
        },
      };
    }),

  removeMoment: (date, id) =>
    set((state) => {
      const key = dayKey(date);
      const current = state.days[key];
      if (!current) return state;
      return {
        days: {
          ...state.days,
          [key]: {
            ...current,
            moments: current.moments.filter((m) => m.id !== id),
          },
        },
      };
    }),

  setNotes: (date, notes) =>
    set((state) => {
      const key = dayKey(date);
      const current = state.days[key] ?? EMPTY_DAY;
      return {
        days: { ...state.days, [key]: { ...current, notes } },
      };
    }),

  setDays: (incoming) =>
    set((state) => ({ days: { ...state.days, ...incoming } })),
}));