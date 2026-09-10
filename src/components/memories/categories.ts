import { getEmojiForText } from "../calendar/activityIcons";
import type { Moment } from "../../store/dayStore";

const CATEGORY_BY_EMOJI: Record<string, string> = {
  // General
  "✨": "General",

  // Work
  "💼": "Work",
  "📧": "Work",
  "🧑‍💼": "Work",
  "🧑‍💻": "Work",
  "📈": "Work",
  "🚪": "Work",

  // Tech
  "💻": "Tech",
  "📱": "Tech",
  "📲": "Tech",

  // Learning
  "📚": "Learning",
  "🎓": "Learning",
  "📖": "Learning",
  "🗣️": "Learning",
  "💡": "Learning",
  "📝": "Learning",

  // Fitness
  "🏋️": "Fitness",
  "🏃": "Fitness",
  "🚴": "Fitness",
  "🧘": "Fitness",
  "🧘‍♂️": "Fitness",
  "🏊": "Fitness",
  "🚶": "Fitness",
  "⚽": "Fitness",
  "💃": "Fitness",

  // Health
  "🏥": "Health",
  "💊": "Health",
  "🤒": "Health",
  "🦷": "Health",
  "🧠": "Health",
  "💧": "Health",

  // Food
  "🍜": "Food",
  "☕": "Food",
  "🍵": "Food",
  "🍕": "Food",
  "🥗": "Food",
  "🍻": "Food",
  "🍳": "Food",
  "🚫🍽️": "Food",

  // Entertainment
  "🎵": "Entertainment",
  "🎬": "Entertainment",
  "🎮": "Entertainment",

  // Creativity
  "🎨": "Creativity",
  "📸": "Creativity",

  // Travel
  "✈️": "Travel",
  "🏖️": "Travel",
  "⛰️": "Travel",
  "🚗": "Travel",

  // Nature
  "🌱": "Nature",
  "🌅": "Nature",
  "🌧️": "Nature",
  "☀️": "Nature",
  "❄️": "Nature",
  "🌿": "Nature",
  "🌃": "Nature",

  // Relationships
  "❤️": "Relationships",
  "💍": "Relationships",
  "🎂": "Relationships",
  "👥": "Relationships",
  "👨‍👩‍👧": "Relationships",
  "💔": "Relationships",
  "✉️": "Relationships",
  "👶": "Relationships",
  "💒": "Relationships",

  // Celebrations
  "🎉": "Celebrations",
  "🎆": "Celebrations",
  "🎄": "Celebrations",
  "🎁": "Celebrations",

  // Mood
  "😄": "Mood",
  "😴": "Mood",
  "😞": "Mood",
  "😰": "Mood",
  "😔": "Mood",
  "🥱": "Mood",
  "😑": "Mood",
  "🙏": "Mood",
  "🔥": "Mood",
  "⏰": "Mood",
  "🌙": "Mood",

  // Achievements
  "🏆": "Achievements",
  "⭐": "Achievements",
  "🚀": "Achievements",

  // Finance
  "💰": "Finance",
  "📊": "Finance",
  "🏦": "Finance",
  "🧾": "Finance",

  // Shopping
  "🛒": "Shopping",

  // Chores
  "🧹": "Chores",
  "🔧": "Chores",
  "📦": "Chores",

  // Pets
  "🐾": "Pets",

  // Events
  "🛕": "Events",
};

export const DEFAULT_CATEGORY = "General";

export interface CategorySource {
  emoji?: string;
  title: string;
}

export function getMomentEmoji(source: CategorySource): string {
  return source.emoji?.trim() || getEmojiForText(source.title);
}

export function getMomentCategory(source: CategorySource): string {
  const emoji = getMomentEmoji(source);
  return CATEGORY_BY_EMOJI[emoji] ?? DEFAULT_CATEGORY;
}

export function isMomentEmojiKnown(emoji: string): boolean {
  return Boolean(CATEGORY_BY_EMOJI[emoji]);
}

export type { Moment };
