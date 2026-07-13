import { useState, useCallback } from "react";
import type { PlayerProfile, XPEvent } from "@/types";
import { getLevelFromTotalXP, getTitleForLevel, createXPEvent } from "@/lib/xp";

const STORAGE_KEY = "litxp_profile";

function loadProfile(): PlayerProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as PlayerProfile;
  } catch {
    // fall through to default
  }
  return createDefaultProfile();
}

function createDefaultProfile(): PlayerProfile {
  return {
    displayName: "Adventurer",
    level: 1,
    currentXP: 0,
    totalXP: 0,
    xpToNextLevel: 100,
    title: "Novice Reader",
    streak: 0,
    longestStreak: 0,
    booksCompleted: 0,
    wordsLearned: 0,
    achievements: [],
  };
}

export function usePlayerProfile() {
  const [profile, setProfile] = useState<PlayerProfile>(loadProfile);
  const [recentXPEvent, setRecentXPEvent] = useState<XPEvent | null>(null);
  const [leveledUp, setLeveledUp] = useState(false);

  const saveProfile = useCallback((updated: PlayerProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProfile(updated);
  }, []);

  const awardXP = useCallback(
    (type: XPEvent["type"]) => {
      const event = createXPEvent(type);
      const newTotalXP = profile.totalXP + event.amount;
      const { level, currentXP, xpToNextLevel } = getLevelFromTotalXP(newTotalXP);
      const didLevelUp = level > profile.level;

      const updated: PlayerProfile = {
        ...profile,
        totalXP: newTotalXP,
        level,
        currentXP,
        xpToNextLevel,
        title: getTitleForLevel(level),
        wordsLearned:
          type === "word_lookup"
            ? profile.wordsLearned + 1
            : profile.wordsLearned,
        booksCompleted:
          type === "quiz_passed"
            ? profile.booksCompleted
            : profile.booksCompleted,
      };

      saveProfile(updated);
      setRecentXPEvent(event);
      setLeveledUp(didLevelUp);

      setTimeout(() => {
        setRecentXPEvent(null);
        setLeveledUp(false);
      }, 3000);

      return event;
    },
    [profile, saveProfile],
  );

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastRead = localStorage.getItem("litxp_last_read");

    if (lastRead === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = lastRead === yesterday ? profile.streak + 1 : 1;
    const longestStreak = Math.max(newStreak, profile.longestStreak);

    localStorage.setItem("litxp_last_read", today);

    const updated: PlayerProfile = {
      ...profile,
      streak: newStreak,
      longestStreak,
    };

    saveProfile(updated);

    if (newStreak > 1) {
      awardXP("streak_bonus");
    }
  }, [profile, saveProfile, awardXP]);

  return {
    profile,
    awardXP,
    updateStreak,
    recentXPEvent,
    leveledUp,
  };
}
