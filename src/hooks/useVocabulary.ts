import { useState, useCallback } from "react";
import type { VocabularyEntry } from "@/types";

const STORAGE_KEY = "litxp_vocabulary";

function loadVocabulary(): VocabularyEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as VocabularyEntry[];
  } catch {
    // fall through
  }
  return [];
}

export function useVocabulary() {
  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>(loadVocabulary);

  const addWord = useCallback(
    (entry: VocabularyEntry) => {
      const exists = vocabulary.some(
        (v) => v.word.toLowerCase() === entry.word.toLowerCase(),
      );
      if (exists) return false;

      const updated = [entry, ...vocabulary];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setVocabulary(updated);
      return true;
    },
    [vocabulary],
  );

  const getWordCount = useCallback(() => vocabulary.length, [vocabulary]);

  return { vocabulary, addWord, getWordCount };
}
