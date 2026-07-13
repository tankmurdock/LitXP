import { useState, useCallback } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  LayoutDashboard,
  Library as LibraryIcon,
  Swords,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayerProfile } from "@/hooks/usePlayerProfile";
import { useGameSounds } from "@/hooks/useGameSounds";
import { LevelUpOverlay } from "@/components/game/LevelUpOverlay";
import { FloatingXPDisplay, useFloatingXP } from "@/components/effects/FloatingXP";
import { Library } from "@/pages/Library";
import { Dashboard } from "@/pages/Dashboard";
import { BookReader } from "@/components/reader/BookReader";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sounds";
import type { Book } from "@/types";

function Landing() {
  const navigate = useNavigate();
  const sounds = useGameSounds();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Swords className="w-12 h-12 text-primary" />
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter">
            Lit<span className="text-primary">XP</span>
          </h1>
        </motion.div>

        <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-2">
          Level up your reading. Earn XP. Master vocabulary. Conquer classics.
        </p>
        <p className="text-sm text-muted-foreground/70 max-w-md mx-auto mb-8">
          Every word you look up, every chapter you finish, every quiz you pass
          brings you closer to Literary Legend.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => {
              sounds.click();
              navigate("/library");
            }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg shadow-primary/25"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Start Reading
          </motion.button>
          <motion.button
            onClick={() => {
              sounds.click();
              navigate("/dashboard");
            }}
            className="px-8 py-3 bg-card border border-border rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Progress
          </motion.button>
        </div>
      </motion.div>

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
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            className="bg-card border border-border rounded-xl p-6 text-left group cursor-default"
            whileHover={{ y: -4, borderColor: "hsl(262 80% 55% / 0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <feature.icon className="w-8 h-8 text-primary mb-3 transition-transform group-hover:scale-110" />
            <h3 className="font-bold mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function App() {
  const { profile, awardXP, recentXPEvent, leveledUp } = usePlayerProfile();
  const sounds = useGameSounds();
  const { items: floatingXPItems, spawn: spawnXP } = useFloatingXP();
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const location = useLocation();
  const navigate = useNavigate();

  const handleXPAction = useCallback(
    (type: Parameters<typeof awardXP>[0], mouseEvent?: { clientX: number; clientY: number }) => {
      const event = awardXP(type);
      sounds.xpGain();
      spawnXP(event.amount, mouseEvent?.clientX, mouseEvent?.clientY);
    },
    [awardXP, sounds, spawnXP],
  );

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) sounds.click();
  }, [soundOn, sounds]);

  const navItems = [
    { path: "/", label: "Home", icon: Swords },
    { path: "/library", label: "Library", icon: LibraryIcon },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  if (currentBook) {
    return (
      <>
        <LevelUpOverlay show={leveledUp} profile={profile} />
        <FloatingXPDisplay items={floatingXPItems} />
        <div className="fixed top-3 left-3 z-50">
          <motion.button
            onClick={() => {
              sounds.click();
              setCurrentBook(null);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-card/90 backdrop-blur border border-border rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LibraryIcon className="w-4 h-4" />
            Back to Library
          </motion.button>
        </div>
        <BookReader
          book={currentBook}
          currentChapter={currentChapter}
          onChapterChange={(ch) => {
            sounds.pageTurn();
            setCurrentChapter(ch);
          }}
          onWordLookup={() => handleXPAction("word_lookup")}
          profile={profile}
          recentXPEvent={recentXPEvent}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <LevelUpOverlay show={leveledUp} profile={profile} />
      <FloatingXPDisplay items={floatingXPItems} />

      <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Swords className="w-5 h-5 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-black text-lg tracking-tight">
              Lit<span className="text-primary">XP</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => sounds.click()}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  location.pathname === item.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={toggleSound}
              className="ml-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              title={soundOn ? "Mute sounds" : "Enable sounds"}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
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
                sounds.click();
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
