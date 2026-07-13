import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Book, ReaderSettings } from "@/types";
import { WordPopup } from "./WordPopup";
import { SelectionToolbar } from "./SelectionToolbar";
import { XPBar } from "../game/XPBar";
import type { PlayerProfile, XPEvent } from "@/types";

interface BookReaderProps {
  book: Book;
  currentChapter: number;
  onChapterChange: (chapter: number) => void;
  onWordLookup: (word: string) => void;
  profile: PlayerProfile;
  recentXPEvent: XPEvent | null;
}

const MOCK_DEFINITIONS: Record<string, { definition: string; partOfSpeech: string; pronunciation: string }> = {
  dignity: { definition: "The state of being worthy of honor or respect; high rank or position.", partOfSpeech: "noun", pronunciation: "/\u02C8d\u026A\u0261.n\u0259.ti/" },
  mutiny: { definition: "An open rebellion against authority, especially by soldiers or sailors.", partOfSpeech: "noun", pronunciation: "/\u02C8mju\u02D0.t\u026A.ni/" },
  grudge: { definition: "A persistent feeling of ill will or resentment resulting from a past insult or injury.", partOfSpeech: "noun", pronunciation: "/\u0261r\u028Cd\u0292/" },
  choler: { definition: "Anger or irritability (archaic). Related to the old medical theory of bodily humors.", partOfSpeech: "noun", pronunciation: "/\u02C8k\u0252l.\u0259r/" },
  colliers: { definition: "Coal miners or coal merchants. Sampson puns on 'carry coals' meaning to endure insults.", partOfSpeech: "noun", pronunciation: "/\u02C8k\u0252l.i.\u0259rz/" },
  valiant: { definition: "Possessing or showing courage and determination.", partOfSpeech: "adjective", pronunciation: "/\u02C8v\u00E6l.j\u0259nt/" },
  envious: { definition: "Feeling or showing a desire to have what someone else has; jealous.", partOfSpeech: "adjective", pronunciation: "/\u02C8en.vi.\u0259s/" },
  vestal: { definition: "Relating to the Roman goddess Vesta; pure and chaste. A Vestal Virgin was sworn to purity.", partOfSpeech: "adjective", pronunciation: "/\u02C8ves.t\u0259l/" },
  vulnerable: { definition: "Susceptible to physical or emotional attack or harm; open to being wounded.", partOfSpeech: "adjective", pronunciation: "/\u02C8v\u028Cl.n\u0259r.\u0259.b\u0259l/" },
  riotous: { definition: "Marked by wild and uncontrolled behavior; uproarious.", partOfSpeech: "adjective", pronunciation: "/\u02C8ra\u026A.\u0259.t\u0259s/" },
  commencement: { definition: "The beginning or start of something.", partOfSpeech: "noun", pronunciation: "/k\u0259\u02C8mens.m\u0259nt/" },
  forebodings: { definition: "Feelings that something bad will happen; fearful apprehension.", partOfSpeech: "noun", pronunciation: "/f\u0254\u02D0r\u02C8b\u0259\u028A.d\u026A\u014Bz/" },
};

export function BookReader({
  book,
  currentChapter,
  onChapterChange,
  onWordLookup,
  profile,
  recentXPEvent,
}: BookReaderProps) {
  const [settings, setSettings] = useState<ReaderSettings>({
    theme: "dark",
    fontFamily: "serif",
    fontSize: 18,
    lineHeight: 1.8,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [wordPopup, setWordPopup] = useState<{
    word: string;
    position: { x: number; y: number };
  } | null>(null);
  const [selectionToolbar, setSelectionToolbar] = useState<{
    text: string;
    position: { x: number; y: number };
  } | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const chapter = book.chapters[currentChapter];

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const selection = window.getSelection();
      const word = selection?.toString().trim().toLowerCase();
      if (!word || word.includes(" ")) return;

      setSelectionToolbar(null);
      setWordPopup({
        word,
        position: { x: e.clientX, y: e.clientY },
      });
      onWordLookup(word);
    },
    [onWordLookup],
  );

  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (!text || text.split(" ").length < 3) return;

    const range = selection?.getRangeAt(0);
    if (!range) return;
    const rect = range.getBoundingClientRect();

    setWordPopup(null);
    setSelectionToolbar({
      text,
      position: { x: rect.left + rect.width / 2, y: rect.top },
    });
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setWordPopup(null);
      setSelectionToolbar(null);
    };
    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 100);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClick);
    };
  }, [wordPopup, selectionToolbar]);

  if (!chapter) return null;

  const fontFamilyClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
    dyslexia: "font-dyslexia",
  }[settings.fontFamily];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{book.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {chapter.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-48 hidden sm:block">
              <XPBar profile={profile} recentEvent={recentXPEvent} compact />
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="border-b border-border bg-card px-4 py-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) =>
                    setSettings({ ...settings, theme: e.target.value as ReaderSettings["theme"] })
                  }
                  className="w-full text-sm bg-background border border-border rounded-md px-2 py-1"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="sepia">Sepia</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Font
                </label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) =>
                    setSettings({ ...settings, fontFamily: e.target.value as ReaderSettings["fontFamily"] })
                  }
                  className="w-full text-sm bg-background border border-border rounded-md px-2 py-1"
                >
                  <option value="serif">Serif</option>
                  <option value="sans">Sans-serif</option>
                  <option value="mono">Monospace</option>
                  <option value="dyslexia">Dyslexia-friendly</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Size: {settings.fontSize}px
                </label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={settings.fontSize}
                  onChange={(e) =>
                    setSettings({ ...settings, fontSize: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Spacing: {settings.lineHeight.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2.5"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) =>
                    setSettings({ ...settings, lineHeight: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading area */}
      <div className="flex-1 px-4 py-8 sm:py-12">
        <div
          ref={contentRef}
          className={cn("reading-width", fontFamilyClass)}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
          }}
          onDoubleClick={handleDoubleClick}
          onMouseUp={handleMouseUp}
        >
          <motion.h2
            className="text-2xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {chapter.title}
          </motion.h2>

          <motion.div
            key={chapter.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onChapterChange(currentChapter - 1)}
            disabled={currentChapter === 0}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {book.chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => onChapterChange(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  i === currentChapter
                    ? "bg-primary"
                    : i < currentChapter
                      ? "bg-primary/40"
                      : "bg-muted-foreground/30",
                )}
              />
            ))}
          </div>

          <button
            onClick={() => onChapterChange(currentChapter + 1)}
            disabled={currentChapter >= book.chapters.length - 1}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Popups */}
      <AnimatePresence>
        {wordPopup && (
          <WordPopup
            word={wordPopup.word}
            definition={
              MOCK_DEFINITIONS[wordPopup.word]?.definition ??
              "Definition not found. In the full app, this will use AI to provide context-aware definitions."
            }
            partOfSpeech={
              MOCK_DEFINITIONS[wordPopup.word]?.partOfSpeech ?? "unknown"
            }
            pronunciation={MOCK_DEFINITIONS[wordPopup.word]?.pronunciation}
            position={wordPopup.position}
            onAddToVocabulary={() => setWordPopup(null)}
            onClose={() => setWordPopup(null)}
            alreadySaved={false}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectionToolbar && (
          <SelectionToolbar
            position={selectionToolbar.position}
            selectedText={selectionToolbar.text}
            onExplain={() => {
              alert(
                `[AI Explain] Would analyze:\n\n"${selectionToolbar.text.slice(0, 100)}..."\n\nThis will provide a plain-language explanation with literary context.`,
              );
              setSelectionToolbar(null);
            }}
            onSimplify={() => {
              alert(
                `[Simplify] Would rewrite in modern English:\n\n"${selectionToolbar.text.slice(0, 100)}..."`,
              );
              setSelectionToolbar(null);
            }}
            onWhyMatters={() => {
              alert(
                `[Why It Matters] Would explain the significance of this passage in the broader story.`,
              );
              setSelectionToolbar(null);
            }}
            onAddNote={() => {
              alert("Note-taking UI will open here.");
              setSelectionToolbar(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
