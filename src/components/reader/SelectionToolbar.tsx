import { motion } from "framer-motion";
import { Sparkles, BookOpen, Lightbulb, StickyNote } from "lucide-react";

interface SelectionToolbarProps {
  position: { x: number; y: number };
  selectedText: string;
  onExplain: () => void;
  onSimplify: () => void;
  onWhyMatters: () => void;
  onAddNote: () => void;
}

export function SelectionToolbar({
  position,
  onExplain,
  onSimplify,
  onWhyMatters,
  onAddNote,
}: SelectionToolbarProps) {
  const actions = [
    { icon: Sparkles, label: "Explain This", onClick: onExplain },
    { icon: BookOpen, label: "Simplify", onClick: onSimplify },
    { icon: Lightbulb, label: "Why It Matters", onClick: onWhyMatters },
    { icon: StickyNote, label: "Add Note", onClick: onAddNote },
  ];

  return (
    <motion.div
      className="fixed z-40 flex items-center gap-1 bg-popover border border-border rounded-lg shadow-xl p-1"
      style={{
        left: Math.min(position.x - 100, window.innerWidth - 320),
        top: position.y - 50,
      }}
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors whitespace-nowrap"
          title={action.label}
        >
          <action.icon className="w-3.5 h-3.5" />
          {action.label}
        </button>
      ))}
    </motion.div>
  );
}
