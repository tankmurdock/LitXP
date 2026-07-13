import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  streak: number;
  className?: string;
}

export function StreakBadge({ streak, className }: StreakBadgeProps) {
  if (streak === 0) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold",
        streak >= 7
          ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
          : "bg-muted text-muted-foreground",
        className,
      )}
    >
      <Flame
        className={cn(
          "w-4 h-4",
          streak >= 7 ? "text-orange-500" : "text-muted-foreground",
        )}
      />
      {streak} day streak
    </div>
  );
}
