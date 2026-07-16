"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    // Actual search functionality will be connected later.
    console.log("Search query:", trimmedQuery);
  }

  return (
    <>
      {/* Search Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-all duration-300 hover:border-blue-500/40 hover:bg-muted hover:text-blue-500"
        aria-label="Open search"
        title="Search"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-xl sm:pt-32"
          role="dialog"
          aria-modal="true"
          aria-label="Search website"
          onClick={() => setIsOpen(false)}
        >
          {/* Search Panel */}
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-border bg-background p-4 text-foreground shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Search Bizzfi
              </span>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 transition focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10">
                <Search
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />

                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search services, solutions, products..."
                  className="h-14 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                  aria-label="Search"
                />
              </div>
            </form>

            {/* Search Hint */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Start typing to search Bizzfi</span>

              <span className="hidden sm:inline">
                Press ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}