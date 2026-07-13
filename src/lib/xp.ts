import type { XPEvent } from "@/types";

const XP_TABLE: Record<XPEvent["type"], number> = {
  chapter_read: 50,
  word_lookup: 5,
  note_taken: 10,
  quiz_passed: 100,
  quiz_perfect: 50,
  streak_bonus: 25,
};

const XP_DESCRIPTIONS: Record<XPEvent["type"], string> = {
  chapter_read: "Chapter completed",
  word_lookup: "New word learned",
  note_taken: "Note added",
  quiz_passed: "Quiz passed",
  quiz_perfect: "Perfect score bonus",
  streak_bonus: "Daily streak bonus",
};

const TITLES = [
  { level: 1, title: "Novice Reader" },
  { level: 5, title: "Page Turner" },
  { level: 10, title: "Bookworm" },
  { level: 15, title: "Story Seeker" },
  { level: 20, title: "Word Wielder" },
  { level: 25, title: "Tome Keeper" },
  { level: 30, title: "Lore Scholar" },
  { level: 35, title: "Chapter Champion" },
  { level: 40, title: "Epic Reader" },
  { level: 45, title: "Lore Master" },
  { level: 50, title: "Literary Legend" },
];

export function getXPForAction(type: XPEvent["type"]): number {
  return XP_TABLE[type];
}

export function createXPEvent(type: XPEvent["type"]): XPEvent {
  return {
    type,
    amount: XP_TABLE[type],
    timestamp: new Date().toISOString(),
    description: XP_DESCRIPTIONS[type],
  };
}

export function xpRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.15, level - 1));
}

export function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += xpRequiredForLevel(i);
  }
  return total;
}

export function getLevelFromTotalXP(totalXP: number): {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
} {
  let level = 1;
  let remaining = totalXP;

  while (remaining >= xpRequiredForLevel(level) && level < 50) {
    remaining -= xpRequiredForLevel(level);
    level++;
  }

  return {
    level,
    currentXP: remaining,
    xpToNextLevel: xpRequiredForLevel(level),
  };
}

export function getTitleForLevel(level: number): string {
  let title = TITLES[0]!.title;
  for (const entry of TITLES) {
    if (level >= entry.level) {
      title = entry.title;
    }
  }
  return title;
}

export function getLevelTier(level: number): "bronze" | "silver" | "gold" | "platinum" | "diamond" {
  if (level >= 40) return "diamond";
  if (level >= 30) return "platinum";
  if (level >= 20) return "gold";
  if (level >= 10) return "silver";
  return "bronze";
}
