import { useCallback } from "react";
import { playSound, setSoundEnabled, isSoundEnabled } from "@/lib/sounds";

export function useGameSounds() {
  const xpGain = useCallback(() => playSound("xp_gain"), []);
  const wordLookup = useCallback(() => playSound("word_lookup"), []);
  const levelUp = useCallback(() => playSound("level_up"), []);
  const quizCorrect = useCallback(() => playSound("quiz_correct"), []);
  const quizWrong = useCallback(() => playSound("quiz_wrong"), []);
  const pageTurn = useCallback(() => playSound("page_turn"), []);
  const achievement = useCallback(() => playSound("achievement"), []);
  const combo = useCallback(() => playSound("combo"), []);
  const click = useCallback(() => playSound("click"), []);

  return {
    xpGain,
    wordLookup,
    levelUp,
    quizCorrect,
    quizWrong,
    pageTurn,
    achievement,
    combo,
    click,
    setSoundEnabled,
    isSoundEnabled,
  };
}
