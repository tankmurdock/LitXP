import { useState, useCallback } from "react";
import type { UserProgress } from "@/types";

const STORAGE_KEY = "litxp_progress";

function loadProgress(): Record<string, UserProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Record<string, UserProgress>;
  } catch {
    // fall through
  }
  return {};
}

export function useReadingProgress() {
  const [progressMap, setProgressMap] = useState<Record<string, UserProgress>>(loadProgress);

  const save = useCallback((updated: Record<string, UserProgress>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProgressMap(updated);
  }, []);

  const startBook = useCallback(
    (bookId: string) => {
      if (progressMap[bookId]) return progressMap[bookId]!;

      const progress: UserProgress = {
        bookId,
        currentChapter: 0,
        chaptersCompleted: [],
        startedAt: new Date().toISOString(),
        status: "reading",
      };
      const updated = { ...progressMap, [bookId]: progress };
      save(updated);
      return progress;
    },
    [progressMap, save],
  );

  const completeChapter = useCallback(
    (bookId: string, chapterIndex: number, totalChapters: number) => {
      const current = progressMap[bookId];
      if (!current) return;

      const chaptersCompleted = current.chaptersCompleted.includes(chapterIndex)
        ? current.chaptersCompleted
        : [...current.chaptersCompleted, chapterIndex];

      const allDone = chaptersCompleted.length >= totalChapters;

      const updated: Record<string, UserProgress> = {
        ...progressMap,
        [bookId]: {
          ...current,
          chaptersCompleted,
          currentChapter: Math.min(chapterIndex + 1, totalChapters - 1),
          status: allDone ? "completed" : "reading",
          completedAt: allDone ? new Date().toISOString() : undefined,
        },
      };
      save(updated);
    },
    [progressMap, save],
  );

  const setCurrentChapter = useCallback(
    (bookId: string, chapterIndex: number) => {
      const current = progressMap[bookId];
      if (!current) return;
      save({
        ...progressMap,
        [bookId]: { ...current, currentChapter: chapterIndex },
      });
    },
    [progressMap, save],
  );

  const getProgress = useCallback(
    (bookId: string): UserProgress | undefined => progressMap[bookId],
    [progressMap],
  );

  const isChapterUnlocked = useCallback(
    (bookId: string, chapterIndex: number): boolean => {
      if (chapterIndex === 0) return true;
      const progress = progressMap[bookId];
      if (!progress) return chapterIndex === 0;
      return progress.chaptersCompleted.includes(chapterIndex - 1);
    },
    [progressMap],
  );

  const getCurrentBook = useCallback((): { bookId: string; progress: UserProgress } | null => {
    const entries = Object.entries(progressMap);
    const reading = entries.find(([_, p]) => p.status === "reading");
    if (reading) return { bookId: reading[0], progress: reading[1] };
    return null;
  }, [progressMap]);

  const getAllProgress = useCallback(
    () => Object.values(progressMap),
    [progressMap],
  );

  return {
    startBook,
    completeChapter,
    setCurrentChapter,
    getProgress,
    isChapterUnlocked,
    getCurrentBook,
    getAllProgress,
  };
}
