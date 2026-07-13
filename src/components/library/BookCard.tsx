import { motion } from "framer-motion";
import { Clock, BookOpen, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
  progress?: { chaptersCompleted: number; status: string };
  onClick: () => void;
  index: number;
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  advanced: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
};

const genreGradients: Record<string, string> = {
  Tragedy: "from-red-900 to-red-700",
  Fiction: "from-emerald-900 to-emerald-700",
  "Gothic Horror": "from-violet-900 to-gray-800",
};

export function BookCard({ book, progress, onClick, index }: BookCardProps) {
  const completedChapters = progress?.chaptersCompleted ?? 0;
  const totalChapters = book.chapters.length;
  const progressPercent = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

  return (
    <motion.button
      onClick={onClick}
      className="group text-left w-full rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      {/* Cover area */}
      <div
        className={cn(
          "h-40 bg-gradient-to-br flex items-end p-4 relative",
          genreGradients[book.genre] ?? "from-slate-800 to-slate-600",
        )}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-white leading-tight">
            {book.title}
          </h3>
          <p className="text-sm text-white/70">{book.author}</p>
        </div>
        {progress?.status === "completed" && (
          <div className="absolute top-3 right-3 z-10">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {book.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {totalChapters} chapters
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~{Math.round(book.estimatedMinutes / 60)}h
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              difficultyColors[book.difficulty],
            )}
          >
            {book.difficulty}
          </span>

          {completedChapters > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {completedChapters}/{totalChapters}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
