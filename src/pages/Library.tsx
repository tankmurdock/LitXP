import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { SAMPLE_BOOKS } from "@/lib/sample-books";
import { BookCard } from "@/components/library/BookCard";
import type { Book, UserProgress } from "@/types";

interface LibraryProps {
  onSelectBook: (book: Book) => void;
  getProgress: (bookId: string) => UserProgress | undefined;
}

export function Library({ onSelectBook, getProgress }: LibraryProps) {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filtered = SAMPLE_BOOKS.filter((book) => {
    const matchesSearch =
      search === "" ||
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || book.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight mb-2">Library</h1>
        <p className="text-muted-foreground">
          Choose your next adventure. Each book is a quest waiting to be
          conquered.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
          >
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book, i) => (
          <BookCard
            key={book.id}
            book={book}
            progress={(() => {
              const p = getProgress(book.id);
              return p ? { chaptersCompleted: p.chaptersCompleted.length, status: p.status } : undefined;
            })()}
            onClick={() => onSelectBook(book)}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No books match your search.</p>
          <p className="text-sm mt-1">Try a different term or filter.</p>
        </div>
      )}
    </div>
  );
}
