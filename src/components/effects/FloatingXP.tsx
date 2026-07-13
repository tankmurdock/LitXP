import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface FloatingXPItem {
  id: number;
  amount: number;
  x: number;
  y: number;
}

let nextId = 0;

export function useFloatingXP() {
  const [items, setItems] = useState<FloatingXPItem[]>([]);

  const spawn = useCallback((amount: number, x?: number, y?: number) => {
    const id = nextId++;
    const posX = x ?? window.innerWidth / 2;
    const posY = y ?? 60;

    setItems((prev) => [...prev, { id, amount, x: posX, y: posY }]);

    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, 1500);
  }, []);

  return { items, spawn };
}

interface FloatingXPDisplayProps {
  items: FloatingXPItem[];
}

export function FloatingXPDisplay({ items }: FloatingXPDisplayProps) {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute font-black text-lg"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-xp drop-shadow-lg">
              +{item.amount} XP
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
