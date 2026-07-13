import { motion } from "framer-motion";
import { Volume2, Plus, X } from "lucide-react";

interface WordPopupProps {
  word: string;
  definition: string;
  partOfSpeech: string;
  pronunciation?: string;
  position: { x: number; y: number };
  onAddToVocabulary: () => void;
  onClose: () => void;
  alreadySaved: boolean;
}

export function WordPopup({
  word,
  definition,
  partOfSpeech,
  pronunciation,
  position,
  onAddToVocabulary,
  onClose,
  alreadySaved,
}: WordPopupProps) {
  return (
    <motion.div
      className="fixed z-40 w-72 bg-popover border border-border rounded-lg shadow-xl p-4"
      style={{
        left: Math.min(position.x, window.innerWidth - 300),
        top: position.y + 10,
      }}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-lg font-bold text-foreground">{word}</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="italic">{partOfSpeech}</span>
            {pronunciation && (
              <>
                <span>&middot;</span>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Volume2 className="w-3 h-3" />
                  <span>{pronunciation}</span>
                </button>
              </>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-foreground/90 mb-3">{definition}</p>

      {!alreadySaved && (
        <button
          onClick={onAddToVocabulary}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add to vocabulary (+5 XP)
        </button>
      )}
      {alreadySaved && (
        <p className="text-xs text-muted-foreground italic">
          Already in your vocabulary
        </p>
      )}
    </motion.div>
  );
}
