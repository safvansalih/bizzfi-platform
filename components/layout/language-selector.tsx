"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";

const languages = [
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
  },
  {
    code: "ar",
    label: "العربية",
    shortLabel: "AR",
  },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((language) => language.code === selectedLanguage) ??
    languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLanguageChange(languageCode: string) {
    setSelectedLanguage(languageCode);
    setIsOpen(false);

    // Actual i18n language switching will be connected later.
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Language Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10 hover:text-blue-400"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Globe2 className="h-4 w-4" aria-hidden="true" />

        <span className="hidden xl:inline">
          {currentLanguage.shortLabel}
        </span>

        <ChevronDown
          className={`hidden h-3.5 w-3.5 transition-transform duration-300 xl:block ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Language Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full z-[80] mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 p-1.5 shadow-2xl"
          role="menu"
        >
          {languages.map((language) => {
            const isSelected = selectedLanguage === language.code;

            return (
              <button
                key={language.code}
                type="button"
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                role="menuitem"
              >
                <span>{language.label}</span>

                {isSelected && (
                  <Check className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}