import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getLevelTier } from "@/lib/xp";
import type { PlayerProfile, XPEvent } from "@/types";

interface XPBarProps {
  profile: PlayerProfile;
  recentEvent: XPEvent | null;
  compact?: boolean;
}

const tierColors: Record<string, string> = {
  bronze: "from-amber-700 to-amber-500",
  silver: "from-gray-400 to-gray-300",
  gold: "from-yellow-500 to-yellow-300",
  platinum: "from-slate-300 to-slate-100",
  diamond: "from-cyan-300 to-blue-200",
};

const tierGlow: Record<string, string> = {
  bronze: "shadow-amber-500/30",
  silver: "shadow-gray-400/30",
  gold: "shadow-yellow-400/40",
  platinum: "shadow-slate-300/40",
  diamond: "shadow-cyan-300/50",
};

export function XPBar({ profile, recentEvent, compact }: XPBarProps) {
  const tier = getLevelTier(profile.level);
  const percent = Math.min(
    (profile.currentXP / profile.xpToNextLevel) * 100,
    100,
  );

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <LevelBadge level={profile.level} tier={tier} size="sm" />
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full bg-gradient-to-r", tierColors[tier])}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <AnimatePresence>
          {recentEvent && (
            <motion.span
              className="text-xs font-bold text-xp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              +{recentEvent.amount} XP
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <LevelBadge level={profile.level} tier={tier} size="md" />
          <div>
            <p className="text-sm font-semibold">{profile.title}</p>
            <p className="text-xs text-muted-foreground">
              Level {profile.level}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {profile.currentXP} / {profile.xpToNextLevel} XP
          </p>
        </div>
      </div>

      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            tierColors[tier],
            `shadow-md ${tierGlow[tier]}`,
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence>
        {recentEvent && (
          <motion.div
            className="absolute -top-2 right-0 flex items-center gap-1"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-bold text-xp">
              +{recentEvent.amount} XP
            </span>
            <span className="text-xs text-muted-foreground">
              {recentEvent.description}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LevelBadge({
  level,
  tier,
  size,
}: {
  level: number;
  tier: string;
  size: "sm" | "md";
}) {
  const sizeClasses = size === "sm" ? "w-7 h-7 text-xs" : "w-10 h-10 text-sm";

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-black text-white bg-gradient-to-br shadow-lg",
        sizeClasses,
        tierColors[tier],
        tierGlow[tier],
      )}
    >
      {level}
    </div>
  );
}
