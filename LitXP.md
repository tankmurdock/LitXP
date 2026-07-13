# LitXP — Level Up Your Reading

A gamified reading platform for high school students that combines a clean, responsive reading experience with RPG-style progression, AI-powered contextual tools, and gated comprehension quizzes.

## Project Overview

**Problem**: Teen attention spans have declined dramatically due to short-form content consumption. Students struggle to engage with assigned reading, leading to poor comprehension, limited vocabulary, and underdeveloped communication skills.

**Solution**: LitXP makes reading feel like a game. Students earn XP for every meaningful reading action, level up through a 50-tier progression system, and must pass chapter quizzes to progress. AI provides instant word definitions and contextual explanations for difficult passages.

**Target Users**: High school students (14-18), teachers, school districts (starting with Duval County Public Schools).

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui patterns + Framer Motion
- **Routing**: React Router v7
- **AI** (planned): OpenAI API for definitions, explanations, quiz generation
- **Backend** (planned): Supabase (auth + PostgreSQL + edge functions)
- **Content Source**: Project Gutenberg / Standard Ebooks (public domain)
- **Sound**: Web Audio API synthesizer (zero external audio files, game-style chimes)
- **Particles**: tsparticles for confetti, sparkle, and fire effects
- **PWA**: vite-plugin-pwa with service worker, offline caching, installable on mobile
- **Hosting** (planned): Vercel + Supabase

## Project Structure

```
LitXP/
  public/
    litxp.svg              -- App icon
  src/
    components/
      game/
        XPBar.tsx           -- XP progress bar with tier colors and animations
        LevelUpOverlay.tsx  -- Full-screen level-up celebration
        StreakBadge.tsx      -- Daily streak indicator
      reader/
        BookReader.tsx       -- Core reading component with settings, nav, popups
        WordPopup.tsx        -- Tap-to-define word popup
        SelectionToolbar.tsx -- Highlight toolbar (Explain, Simplify, Why It Matters, Note)
      library/
        BookCard.tsx         -- Book display card with progress
    hooks/
      usePlayerProfile.ts   -- XP, level, streak state management
      useVocabulary.ts      -- Vocabulary list management
    lib/
      utils.ts              -- cn() utility
      xp.ts                 -- XP calculations, level tables, titles, tiers
      sample-books.ts       -- Starter book content (Romeo & Juliet, Gatsby, Frankenstein)
    pages/
      Library.tsx            -- Book browsing with search and filters
      Dashboard.tsx          -- Player stats, XP, vocabulary, achievements
    types/
      index.ts               -- TypeScript interfaces for all domain models
    App.tsx                  -- Root app with routing, nav, landing page
    main.tsx                 -- Entry point
    index.css                -- Tailwind + theme variables (light/dark/sepia)
```

Additional files added in game feel update:
```
  public/
    manifest.json            -- PWA manifest (installable app metadata)
    icons/                   -- PWA icons (192px, 512px, maskable variants)
    sounds/                  -- Reserved for future audio sprite files
  src/
    components/
      effects/
        Confetti.tsx          -- tsparticles confetti burst (used on level-up)
        FloatingXP.tsx        -- Floating "+XP" numbers that animate from action points
    hooks/
      useGameSounds.ts        -- Hook exposing all game sound triggers
    lib/
      sounds.ts               -- Web Audio API synthesizer (9 game sounds, no files needed)
  scripts/
    generate-icons.mjs        -- Generates PWA icon SVGs from base logo
```

## Feature Status

### Implemented (MVP Prototype)
- [x] Project scaffolding (React + TS + Vite + Tailwind)
- [x] Theme system (light, dark, sepia)
- [x] Book reader with customizable font, size, spacing
- [x] Double-click word lookup with popup definitions
- [x] Text selection toolbar (Explain, Simplify, Why It Matters, Add Note)
- [x] XP system with 50 levels, tier progression (bronze/silver/gold/platinum/diamond)
- [x] Level-up overlay animation with confetti particles and radiating rings
- [x] Daily streak tracking
- [x] Library page with search and difficulty filter
- [x] Dashboard with stats and vocabulary list
- [x] Landing page with feature highlights and floating logo animation
- [x] 3 sample books loaded (Romeo & Juliet, Great Gatsby, Frankenstein)
- [x] PWA support (installable, offline-capable, service worker)
- [x] Game sound effects via Web Audio synthesizer (XP ding, level-up fanfare, page turn, etc.)
- [x] Sound toggle in nav bar (persists to localStorage)
- [x] Floating +XP numbers that animate from action points
- [x] Spring-based button animations (hover scale, tap shrink, glow effects)
- [x] Confetti particle burst on level-up
- [x] Page turn sound on chapter navigation

### Planned (Phase 2)
- [ ] AI-powered word definitions via OpenAI API
- [ ] AI contextual explanations for highlighted passages
- [ ] AI quiz generation per chapter
- [ ] Quiz gating (must pass to unlock next chapter)
- [ ] Supabase backend (auth, database, sync)
- [ ] Full book import pipeline from Project Gutenberg
- [ ] Achievement/badge system
- [ ] Avatar customization

### Planned (Phase 3 — School Integration)
- [ ] Teacher dashboard and class management
- [ ] Book assignment with deadlines
- [ ] Class leaderboards
- [ ] Progress reports for parent-teacher conferences
- [ ] Roster import (CSV, Clever, ClassLink SSO)

### Planned (Phase 4 — Scale)
- [ ] Publisher partnerships for contemporary titles
- [ ] District-level admin dashboard
- [ ] LMS integration (Canvas, Schoology)
- [ ] Mobile apps (React Native or Capacitor)

## XP System

| Action | XP Earned |
|---|---|
| Read a chapter | +50 |
| Look up a word | +5 |
| Take a note | +10 |
| Pass chapter quiz | +100 |
| Perfect quiz score | +50 bonus |
| Daily streak bonus | +25 |

### Level Tiers

| Tier | Levels | Visual |
|---|---|---|
| Bronze | 1-9 | Amber gradient |
| Silver | 10-19 | Gray gradient |
| Gold | 20-29 | Yellow gradient |
| Platinum | 30-39 | Slate gradient |
| Diamond | 40-50 | Cyan gradient |

### Reader Titles

Level 1: Novice Reader, Level 5: Page Turner, Level 10: Bookworm, Level 15: Story Seeker, Level 20: Word Wielder, Level 25: Tome Keeper, Level 30: Lore Scholar, Level 35: Chapter Champion, Level 40: Epic Reader, Level 45: Lore Master, Level 50: Literary Legend

## Content Strategy

Starting with public domain titles commonly found on high school reading lists:
- Shakespeare: Romeo and Juliet, Hamlet, Macbeth
- The Great Gatsby (F. Scott Fitzgerald, public domain 2021)
- Frankenstein (Mary Shelley)
- Pride and Prejudice (Jane Austen)
- Adventures of Huckleberry Finn (Mark Twain)
- The Scarlet Letter (Nathaniel Hawthorne)
- A Tale of Two Cities (Charles Dickens)

## Current Implementation Notes

### What's working end-to-end
- Full navigation: Landing -> Library -> Reader -> Dashboard
- XP awards on word lookup (double-click a word in the reader) with animated +XP popups
- Level progression with tier colors and level-up overlay
- Streak tracking via localStorage
- Reader settings (theme, font, size, spacing) are functional
- Library search and filter works across all loaded books
- Dashboard displays live stats from the player profile hook

### What's stubbed / placeholder
- **Word definitions**: Currently uses a hardcoded `MOCK_DEFINITIONS` map in `BookReader.tsx` for ~12 words. Needs OpenAI API integration for real definitions.
- **Selection toolbar actions**: "Explain This", "Simplify", "Why It Matters", and "Add Note" currently show `alert()` dialogs. These need AI integration.
- **Quiz system**: Not yet built. Needs AI quiz generation, a quiz UI component, and chapter gating logic.
- **Book content**: Only partial content loaded for 3 books (a few chapters/scenes each). Needs full import pipeline from Project Gutenberg EPUBs.
- **Vocabulary "Add to vocabulary" button**: The popup has the button but it's not wired to the `useVocabulary` hook in `BookReader.tsx` yet.
- **State persistence**: Uses localStorage only. No user accounts or cloud sync.
- **Book cover images**: No actual cover images — the `coverUrl` field is empty; cards use genre-colored gradient backgrounds instead.

### Key architectural decisions
- **All state is client-side** via React hooks + localStorage. The hooks (`usePlayerProfile`, `useVocabulary`) are designed to be swapped to Supabase later without changing component code.
- **XP curve**: Exponential `100 * 1.15^(level-1)`. Level 1 needs 100 XP, level 50 needs ~8,683 XP.
- **Book content stored as HTML strings** in TypeScript files. This will move to a database when Supabase is added.
- **Theme system**: CSS custom properties in `index.css` with three themes (light, dark, sepia). Components use semantic color tokens (`--background`, `--foreground`, `--primary`, etc.).
- **No backend required to run**: `npm install && npm run dev` is all you need.

## Repository

- **GitHub**: https://github.com/tankmurdock/LitXP.git
- **Branch**: main

## Database Schema (Planned)

```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  avatarConfig: object;
  xp: number;
  level: number;
  createdAt: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  coverUrl: string;
  chapterCount: number;
}

interface Chapter {
  id: string;
  bookId: string;
  number: number;
  title: string;
  content: string; // HTML
  wordCount: number;
}

interface UserProgress {
  userId: string;
  bookId: string;
  currentChapter: number;
  startedAt: string;
  completedAt?: string;
  status: "reading" | "completed" | "locked";
}

interface VocabularyEntry {
  id: string;
  userId: string;
  word: string;
  definition: string;
  context: string;
  bookId: string;
  lookedUpAt: string;
  reviewCount: number;
  nextReview: string;
}

interface QuizAttempt {
  id: string;
  userId: string;
  chapterId: string;
  score: number;
  passed: boolean;
  questionsJson: string;
  answersJson: string;
  attemptedAt: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteriaType: string;
  criteriaValue: number;
}

interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string;
}
```
