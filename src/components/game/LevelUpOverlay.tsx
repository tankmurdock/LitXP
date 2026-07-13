import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { Confetti } from "@/components/effects/Confetti";
import { playSound } from "@/lib/sounds";
import { getLevelTier } from "@/lib/xp";
import type { PlayerProfile } from "@/types";

interface LevelUpOverlayProps {
  show: boolean;
  profile: PlayerProfile;
}

const tierGradients: Record<string, string> = {
  bronze: "from-amber-500 to-amber-700",
  silver: "from-gray-300 to-gray-500",
  gold: "from-yellow-300 to-yellow-500",
  platinum: "from-slate-200 to-slate-400",
  diamond: "from-cyan-300 to-blue-400",
};

export function LevelUpOverlay({ show, profile }: LevelUpOverlayProps) {
  const tier = getLevelTier(profile.level);

  useEffect(() => {
    if (show) {
      playSound("level_up");
    }
  }, [show]);

  return (
    <>
      <Confetti trigger={show} duration={3500} />
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Radiating rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border border-primary/20"
                initial={{ width: 0, height: 0, opacity: 0.8 }}
                animate={{
                  width: 200 + ring * 150,
                  height: 200 + ring * 150,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: 0.2 + ring * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}

            <motion.div
              className="text-center relative"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Star className="w-20 h-20 text-yellow-400 mx-auto mb-4 fill-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </motion.div>

              <motion.p
                className="text-lg text-yellow-400 font-bold tracking-[0.3em] uppercase mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Level Up!
              </motion.p>

              <motion.div
                className={`inline-block bg-gradient-to-br ${tierGradients[tier]} rounded-2xl px-8 py-4 mb-3 shadow-2xl`}
                initial={{ y: 30, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", damping: 8 }}
              >
                <p className="text-7xl font-black text-white drop-shadow-lg">
                  {profile.level}
                </p>
              </motion.div>

              <motion.p
                className="text-xl text-purple-300 font-semibold"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {profile.title}
              </motion.p>

              <motion.p
                className="text-sm text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {tier.charAt(0).toUpperCase() + tier.slice(1)} Tier
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
