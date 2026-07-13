# LitXP — Level Up Your Reading

A gamified reading platform that turns high school literature into an RPG experience. Students earn XP for every chapter read, word looked up, and quiz passed — leveling up from **Novice Reader** to **Literary Legend**.

## The Problem

Teen attention spans have declined 33% since 2015. Students toggle between apps every 44 seconds. Deep reading habits dropped 39% in the last decade. The result: students can't stay engaged with assigned reading, and their comprehension, vocabulary, and communication skills suffer.

## The Solution

LitXP makes reading feel like a game — without dumbing it down. Instead of breaking books into bite-sized social media fragments, LitXP keeps students engaged with the full text through interactive tools and RPG progression:

- **Tap any word** for an instant definition, pronunciation, and part of speech
- **Highlight a passage** to get an AI-powered explanation, simplification, or literary analysis
- **Earn XP** for reading chapters, looking up words, taking notes, and passing quizzes
- **Level up** through 50 levels across 5 tiers (Bronze → Silver → Gold → Platinum → Diamond)
- **Pass chapter quizzes** to unlock the next section — comprehension is required, not optional

## Quick Start

```bash
git clone https://github.com/tankmurdock/LitXP.git
cd LitXP
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS, Framer Motion |
| Routing | React Router v7 |
| AI (planned) | OpenAI API |
| Backend (planned) | Supabase |
| Content | Project Gutenberg (public domain classics) |

## Current Status

This is an early prototype. The reader, XP system, library, and dashboard are functional. AI-powered features (definitions, explanations, quiz generation) and the backend are in development.

See [LitXP.md](LitXP.md) for the full project documentation, roadmap, and technical details.

## Roadmap

- **Phase 1** (current): Core reader, XP progression, word lookup, sample books
- **Phase 2**: AI integration (definitions, explanations, quiz generation), Supabase backend
- **Phase 3**: Teacher dashboard, class management, assignments, leaderboards
- **Phase 4**: Publisher partnerships, LMS integration, mobile apps

## License

TBD
