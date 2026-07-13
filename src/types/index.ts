export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  coverUrl: string;
  description: string;
  chapters: Chapter[];
  totalWords: number;
  estimatedMinutes: number;
}

export interface Chapter {
  id: string;
  bookId: string;
  number: number;
  title: string;
  content: string;
  wordCount: number;
}

export interface UserProgress {
  bookId: string;
  currentChapter: number;
  chaptersCompleted: number[];
  startedAt: string;
  completedAt?: string;
  status: "reading" | "completed" | "locked";
}

export interface ReaderSettings {
  theme: "light" | "dark" | "sepia";
  fontFamily: "sans" | "serif" | "mono" | "dyslexia";
  fontSize: number;
  lineHeight: number;
}

export interface VocabularyEntry {
  word: string;
  definition: string;
  partOfSpeech: string;
  pronunciation?: string;
  exampleSentence: string;
  context: string;
  bookId: string;
  chapterId: string;
  lookedUpAt: string;
  reviewCount: number;
}

export interface XPEvent {
  type: "chapter_read" | "word_lookup" | "note_taken" | "quiz_passed" | "quiz_perfect" | "streak_bonus";
  amount: number;
  timestamp: string;
  description: string;
}

export interface PlayerProfile {
  displayName: string;
  level: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  title: string;
  streak: number;
  longestStreak: number;
  booksCompleted: number;
  wordsLearned: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  progress?: number;
  target?: number;
}

export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  relatedPassage?: string;
}

export interface QuizAttempt {
  chapterId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  answers: { questionId: string; answer: string; correct: boolean }[];
  attemptedAt: string;
}

export interface Highlight {
  id: string;
  chapterId: string;
  text: string;
  startOffset: number;
  endOffset: number;
  note?: string;
  aiExplanation?: string;
  createdAt: string;
}
