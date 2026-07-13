import { useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  LayoutDashboard,
  Library as LibraryIcon,
  Swords,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { LevelUpOverlay } from "@/components/game/LevelUpOverlay";
import { Library } from "@/pages/Library";
import { Dashboard } from "@/pages/Dashboard";
import { BookReader } from "@/components/reader/BookReader";
import type { Book } from "@/types";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Swords className="w-12 h-12 text-primary" />
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter">
            Lit<span className="text-primary">XP</span>
          </h1>
        </div>

        <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-2">
          Level up your reading. Earn XP. Master vocabulary. Conquer classics.
        </p>
        <p className="text-sm text-muted-foreground/70 max-w-md mx-auto mb-8">
          Every word you look up, every chapter you finish, every quiz you pass
          brings you closer to Literary Legend.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/library")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Start Reading
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
          >
            View Progress
          </button>
        </div>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {[
          {
            icon: BookOpen,
            title: "Tap to Define",
            desc: "Double-click any word for an instant definition. Build your vocabulary as you read.",
          },
          {
            icon: Swords,
            title: "Earn XP",
            desc: "Every chapter, word lookup, and quiz earns experience points. Level up from Novice to Legend.",
          },
          {
            icon: LibraryIcon,
            title: "Conquer Classics",
            desc: "Work through Shakespeare, Fitzgerald, Shelley and more. Pass quizzes to unlock new titles.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-card border border-border rounded-xl p-6 text-left"
          >
            <feature.icon className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-bold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function App() {
  const { profile, awardXP, recentXPEvent, leveledUp } = usePlayerProfile();
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home", icon: Swords },
    { path: "/library", label: "Library", icon: LibraryIcon },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  if (currentBook) {
    return (
      <>
        <LevelUpOverlay show={leveledUp} profile={profile} />
        <div className="fixed top-3 left-3 z-50">
          <button
            onClick={() => setCurrentBook(null)}
            className="flex items-center gap-2 px-3 py-1.5 bg-card/90 backdrop-blur border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            <LibraryIcon className="w-4 h-4" />
            Back to Library
          </button>
        </div>
        <BookReader
          book={currentBook}
          currentChapter={currentChapter}
          onChapterChange={setCurrentChapter}
          onWordLookup={() => awardXP("word_lookup")}
          profile={profile}
          recentXPEvent={recentXPEvent}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <LevelUpOverlay show={leveledUp} profile={profile} />

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-primary" />
            <span className="font-black text-lg tracking-tight">
              Lit<span className="text-primary">XP</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/library"
          element={
            <Library
              onSelectBook={(book) => {
                setCurrentBook(book);
                setCurrentChapter(0);
                navigate("/library");
              }}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard profile={profile} recentXPEvent={recentXPEvent} />
          }
        />
      </Routes>
    </div>
  );
}
