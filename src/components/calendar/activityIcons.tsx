import type { ReactNode } from "react";

interface IconEntry {
  keywords: string[];
  emoji: string;
}

const iconMap: IconEntry[] = [
  // ---------- SLEEP & MORNING ----------
  {
    keywords: ["wake up", "morning", "woke early", "early rise", "alarm"],
    emoji: "⏰",
  },
  {
    keywords: ["sleep", "slept", "nap", "rest well", "good sleep"],
    emoji: "😴",
  },
  {
    keywords: ["insomnia", "couldn't sleep", "sleepless", "restless night"],
    emoji: "🌙",
  },

  // ---------- FOOD & DRINK ----------
  {
    keywords: [
      "breakfast",
      "lunch",
      "dinner",
      "food",
      "eat",
      "restaurant",
      "meal",
      "cafe",
      "cook",
      "cooking",
      "bake",
      "baking",
    ],
    emoji: "🍜",
  },
  { keywords: ["coffee", "cappuccino", "espresso", "latte"], emoji: "☕" },
  { keywords: ["tea", "chai"], emoji: "🍵" },
  { keywords: ["pizza"], emoji: "🍕" },
  { keywords: ["water", "hydrate", "hydration"], emoji: "💧" },
  { keywords: ["diet", "healthy eating", "meal prep", "salad"], emoji: "🥗" },
  {
    keywords: ["drink", "alcohol", "beer", "wine", "party drink"],
    emoji: "🍻",
  },
  { keywords: ["fast", "fasting", "skip meal"], emoji: "🚫🍽️" },

  // ---------- HEALTH & FITNESS ----------
  {
    keywords: [
      "gym",
      "workout",
      "exercise",
      "lift",
      "weights",
      "strength training",
    ],
    emoji: "🏋️",
  },
  { keywords: ["run", "running", "jog", "jogging", "marathon"], emoji: "🏃" },
  { keywords: ["cycle", "cycling", "bike ride", "biking"], emoji: "🚴" },
  { keywords: ["yoga", "stretch", "stretching"], emoji: "🧘" },
  { keywords: ["swim", "swimming", "pool"], emoji: "🏊" },
  { keywords: ["walk", "walking", "stroll"], emoji: "🚶" },
  {
    keywords: ["doctor", "checkup", "appointment", "hospital", "clinic"],
    emoji: "🏥",
  },
  { keywords: ["sick", "ill", "fever", "cold", "flu", "unwell"], emoji: "🤒" },
  { keywords: ["medicine", "medication", "pills", "tablet"], emoji: "💊" },
  {
    keywords: ["meditate", "meditation", "mindfulness", "breathing"],
    emoji: "🧘‍♂️",
  },
  { keywords: ["therapy", "counseling", "mental health"], emoji: "🧠" },
  { keywords: ["dentist", "teeth"], emoji: "🦷" },
  { keywords: ["haircut", "salon", "grooming"], emoji: "💇" },

  // ---------- WORK & PRODUCTIVITY ----------
  {
    keywords: [
      "work",
      "office",
      "job",
      "meeting",
      "call",
      "presentation",
      "project",
      "deadline",
      "client",
    ],
    emoji: "💼",
  },
  {
    keywords: [
      "code",
      "coding",
      "programming",
      "build",
      "app",
      "website",
      "dev",
      "bug",
      "deploy",
    ],
    emoji: "💻",
  },
  { keywords: ["email", "inbox"], emoji: "📧" },
  { keywords: ["interview", "job offer", "resume", "cv"], emoji: "🧑‍💼" },
  { keywords: ["startup", "launch", "business", "entrepreneur"], emoji: "🚀" },
  { keywords: ["promotion", "raise", "new job"], emoji: "📈" },
  { keywords: ["resign", "quit", "fired", "layoff"], emoji: "🚪" },
  { keywords: ["freelance", "side hustle", "gig"], emoji: "🧑‍💻" },

  // ---------- STUDY & LEARNING ----------
  { keywords: ["book", "read", "reading", "novel"], emoji: "📖" },
  {
    keywords: [
      "study",
      "exam",
      "test",
      "class",
      "school",
      "college",
      "lesson",
      "lecture",
      "homework",
    ],
    emoji: "📚",
  },
  {
    keywords: ["learn", "learned", "course", "tutorial", "skill"],
    emoji: "🎓",
  },
  { keywords: ["write", "writing", "journal", "diary", "blog"], emoji: "📝" },
  { keywords: ["idea", "brainstorm", "new idea", "insight"], emoji: "💡" },
  { keywords: ["language", "vocabulary", "speak"], emoji: "🗣️" },

  // ---------- CREATIVITY & HOBBIES ----------
  {
    keywords: [
      "music",
      "song",
      "concert",
      "gig",
      "sing",
      "playlist",
      "guitar",
      "piano",
    ],
    emoji: "🎵",
  },
  {
    keywords: [
      "movie",
      "film",
      "cinema",
      "theater",
      "show",
      "netflix",
      "watched",
    ],
    emoji: "🎬",
  },
  { keywords: ["game", "gaming", "play", "video game", "match"], emoji: "🎮" },
  { keywords: ["photo", "photography", "camera", "clicked"], emoji: "📸" },
  {
    keywords: ["paint", "painting", "draw", "drawing", "art", "sketch"],
    emoji: "🎨",
  },
  { keywords: ["dance", "dancing"], emoji: "💃" },
  {
    keywords: ["garden", "gardening", "plant", "planted", "tree"],
    emoji: "🌱",
  },
  {
    keywords: ["cricket", "football", "sport", "sports", "tournament"],
    emoji: "⚽",
  },
  { keywords: ["puzzle", "chess", "board game"], emoji: "♟️" },

  // ---------- SOCIAL & RELATIONSHIPS ----------
  {
    keywords: [
      "friend",
      "friends",
      "meet",
      "meeting",
      "hangout",
      "gathering",
      "together",
    ],
    emoji: "👥",
  },
  { keywords: ["family"], emoji: "👨‍👩‍👧" },
  { keywords: ["party", "celebration", "celebrate"], emoji: "🎉" },
  {
    keywords: ["love", "girlfriend", "boyfriend", "date", "romantic", "crush"],
    emoji: "❤️",
  },
  { keywords: ["anniversary"], emoji: "💍" },
  { keywords: ["birthday"], emoji: "🎂" },
  { keywords: ["message", "text", "chat", "call friend"], emoji: "✉️" },
  { keywords: ["fight", "argument", "conflict", "breakup"], emoji: "💔" },
  { keywords: ["wedding", "marriage", "engaged"], emoji: "💒" },
  { keywords: ["new born", "baby", "pregnant"], emoji: "👶" },

  // ---------- TRAVEL & OUTDOOR ----------
  {
    keywords: [
      "trip",
      "travel",
      "flight",
      "vacation",
      "journey",
      "tour",
      "visit",
      "road trip",
      "booking",
    ],
    emoji: "✈️",
  },
  { keywords: ["beach", "sea", "ocean"], emoji: "🏖️" },
  {
    keywords: [
      "mountain",
      "trek",
      "hike",
      "hiking",
      "hill",
      "climb",
      "peak",
      "camping",
      "forest",
    ],
    emoji: "⛰️",
  },
  { keywords: ["drive", "driving", "road"], emoji: "🚗" },
  { keywords: ["sunset", "sunrise", "sky", "beautiful view"], emoji: "🌅" },
  { keywords: ["rain", "rainy", "storm"], emoji: "🌧️" },
  { keywords: ["sunny", "hot day", "heat"], emoji: "☀️" },
  { keywords: ["snow", "cold", "winter"], emoji: "❄️" },
  { keywords: ["night walk", "night out"], emoji: "🌃" },

  // ---------- FINANCE & SHOPPING ----------
  {
    keywords: [
      "shop",
      "shopping",
      "bought",
      "market",
      "mall",
      "store",
      "purchase",
    ],
    emoji: "🛒",
  },
  { keywords: ["money", "salary", "income", "budget", "expense"], emoji: "💰" },
  { keywords: ["invest", "investment", "stock", "trading"], emoji: "📊" },
  { keywords: ["save", "savings", "saved money"], emoji: "🏦" },
  { keywords: ["bill", "rent", "payment", "loan", "debt"], emoji: "🧾" },
  { keywords: ["gift", "present", "surprise"], emoji: "🎁" },

  // ---------- HOME & CHORES ----------
  {
    keywords: [
      "clean",
      "cleaning",
      "laundry",
      "chore",
      "chores",
      "tidy",
      "organize",
    ],
    emoji: "🧹",
  },
  { keywords: ["cook meal", "kitchen", "grocery"], emoji: "🍳" },
  { keywords: ["repair", "fix", "maintenance", "renovation"], emoji: "🔧" },
  { keywords: ["move", "moving", "shift house", "new home"], emoji: "📦" },
  { keywords: ["pet", "dog", "cat", "animal"], emoji: "🐾" },

  // ---------- MOOD & REFLECTION ----------
  {
    keywords: ["lazy day", "lazy", "unproductive", "did nothing"],
    emoji: "😑",
  },
  {
    keywords: ["happy", "great day", "good day", "awesome", "amazing"],
    emoji: "😄",
  },
  { keywords: ["sad", "down", "low", "upset"], emoji: "😞" },
  { keywords: ["tired", "exhausted", "burnout", "burned out"], emoji: "🥱" },
  {
    keywords: ["stress", "stressed", "anxious", "anxiety", "overwhelmed"],
    emoji: "😰",
  },
  { keywords: ["grateful", "gratitude", "thankful", "blessed"], emoji: "🙏" },
  {
    keywords: ["proud", "achievement", "accomplished", "milestone"],
    emoji: "🏆",
  },
  { keywords: ["win", "won", "success", "victory", "best"], emoji: "⭐" },
  { keywords: ["fail", "failure", "lost", "mistake"], emoji: "😔" },
  { keywords: ["motivated", "inspired", "energized"], emoji: "🔥" },
  { keywords: ["calm", "peaceful", "relax", "relaxed"], emoji: "🌿" },

  // ---------- HOLIDAYS & SPECIAL DAYS ----------
  { keywords: ["independence day", "national day", "flag"], emoji: "🇮🇳" },
  {
    keywords: [
      "festival",
      "holiday",
      "religious",
      "prayer",
      "temple",
      "church",
      "mosque",
    ],
    emoji: "🛕",
  },
  { keywords: ["christmas"], emoji: "🎄" },
  { keywords: ["new year"], emoji: "🎆" },

  // ---------- TECH & DIGITAL ----------
  { keywords: ["phone", "mobile", "device"], emoji: "📱" },
  {
    keywords: ["social media", "instagram", "post", "reel", "video edit"],
    emoji: "📲",
  },
  { keywords: ["portfolio", "views", "traffic", "analytics"], emoji: "📈" },
];

const DEFAULT_EMOJI = "✨";

const matchesKeyword = (text: string, keyword: string) =>
  new RegExp(`\\b${keyword}\\b`).test(text);

export function getEmojiForText(text: string): string {
  const normalized = text.toLowerCase();
  for (const entry of iconMap) {
    if (entry.keywords.some((keyword) => matchesKeyword(normalized, keyword))) {
      return entry.emoji;
    }
  }
  return DEFAULT_EMOJI;
}

export function getActivityIcon(
  text: string,
  className = "h-6 w-6",
): ReactNode {
  const emoji = getEmojiForText(text);

  return (
    <span
      className={`inline-flex items-center justify-center ${className} text-2xl leading-none`}
    >
      {emoji}
    </span>
  );
}
