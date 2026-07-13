import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import type { PlayerProfile } from "@/types";

interface LevelUpOverlayProps {
  show: boolean;
  profile: PlayerProfile;
}

export function LevelUpOverlay({ show, profile }: LevelUpOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4 fill-yellow-400" />
            </motion.div>

            <motion.p
              className="text-lg text-yellow-400 font-semibold tracking-widest uppercase mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Level Up!
            </motion.p>

            <motion.p
              className="text-6xl font-black text-white mb-2"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {profile.level}
            </motion.p>

            <motion.p
              className="text-xl text-purple-300 font-medium"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {profile.title}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
