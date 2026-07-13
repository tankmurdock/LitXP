import { motion } from "framer-motion";
import { BookOpen, Brain, Flame, Trophy, Swords, ChevronRight } from "lucide-react";
import { XPBar } from "@/components/game/XPBar";
import { StreakBadge } from "@/components/game/StreakBadge";
import type { PlayerProfile, XPEvent, UserProgress, Book } from "@/types";
import { useVocabulary } from "@/hooks/useVocabulary";

interface DashboardProps {
  profile: PlayerProfile;
  recentXPEvent: XPEvent | null;
  currentBook: { bookId: string; progress: UserProgress } | null;
  allBooks: Book[];
}

export function Dashboard({ profile, recentXPEvent, currentBook, allBooks }: DashboardProps) {
  const { vocabulary } = useVocabulary();

  const activeBook = currentBook
    ? allBooks.find((b) => b.id === currentBook.bookId)
    : null;

  const stats = [
    {
      label: "Books Completed",
      value: profile.booksCompleted,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Words Learned",
      value: vocabulary.length,
      icon: Brain,
      color: "text-green-500",
    },
    {
      label: "Current Streak",
      value: `${profile.streak}d`,
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "Total XP",
      value: profile.totalXP.toLocaleString(),
      icon: Swords,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1">
            {profile.displayName}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{profile.title}</span>
            <StreakBadge streak={profile.streak} />
          </div>
        </div>
        <Trophy className="w-8 h-8 text-yellow-500" />
      </div>

      {/* XP Progress */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <XPBar profile={profile} recentEvent={recentXPEvent} />
      </div>

      {/* Current Book */}
      {activeBook && currentBook && (
        <motion.div
          className="bg-card border border-border rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Currently Reading
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{activeBook.title}</p>
              <p className="text-sm text-muted-foreground">{activeBook.author}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(currentBook.progress.chaptersCompleted.length / activeBook.chapters.length) * 100}%`,
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {currentBook.progress.chaptersCompleted.length}/{activeBook.chapters.length} chapters
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Vocabulary */}
      {vocabulary.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-green-500" />
            Recent Vocabulary
          </h2>
          <div className="space-y-3">
            {vocabulary.slice(0, 5).map((entry) => (
              <div
                key={entry.word}
                className="flex items-start justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-semibold">{entry.word}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.definition}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground italic shrink-0 ml-4">
                  {entry.partOfSpeech}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {vocabulary.length === 0 && !activeBook && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Brain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            No words yet. Start reading and double-click any word to look it up
            and add it to your vocabulary.
          </p>
        </div>
      )}
    </div>
  );
}
