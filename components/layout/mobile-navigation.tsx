"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Check,
  ChevronDown,
  Globe2,
  Menu,
  UserRound,
  X,
} from "lucide-react";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/constants/site";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const pathname = usePathname();

  function closeNavigation() {
    setIsOpen(false);
    setIsLanguageOpen(false);
  }

  function handleLanguageChange(language: string) {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);

    // Actual i18n language switching will be connected later.
  }

  return (
    <div className="lg:hidden">
      {/* Menu Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/60 text-foreground transition-all duration-300 hover:border-blue-500/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        aria-label={
          isOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-16 z-[60] border-b border-border bg-background shadow-2xl lg:hidden dark:border-white/10"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6"
            aria-label="Mobile navigation"
          >
            {/* Navigation Links */}
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeNavigation}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}

            {/* Mobile Utilities */}
            <div className="mt-4 border-t border-border pt-4 dark:border-white/10">
              {/* Customer Portal */}
              <Link
                href="/login"
                onClick={closeNavigation}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-white/5 dark:hover:text-white"
              >
                <UserRound
                  className="h-5 w-5 text-blue-500 dark:text-blue-400"
                  aria-hidden="true"
                />

                <span>Customer Portal</span>
              </Link>

              {/* Language Selector */}
              <div className="mt-1">
                <button
                  type="button"
                  onClick={() =>
                    setIsLanguageOpen((previous) => !previous)
                  }
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-white/5 dark:hover:text-white"
                  aria-expanded={isLanguageOpen}
                  aria-controls="mobile-language-options"
                >
                  <span className="flex items-center gap-3">
                    <Globe2
                      className="h-5 w-5 text-blue-500 dark:text-blue-400"
                      aria-hidden="true"
                    />

                    <span>Language</span>
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {selectedLanguage.toUpperCase()}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isLanguageOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Language Options */}
                {isLanguageOpen && (
                  <div
                    id="mobile-language-options"
                    className="mt-1 space-y-1 pl-4"
                  >
                    <button
                      type="button"
                      onClick={() => handleLanguageChange("en")}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        selectedLanguage === "en"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      <span>English</span>

                      {selectedLanguage === "en" && (
                        <Check
                          className="h-4 w-4 text-blue-600 dark:text-blue-400"
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLanguageChange("ar")}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        selectedLanguage === "ar"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      <span>العربية</span>

                      {selectedLanguage === "ar" && (
                        <Check
                          className="h-4 w-4 text-blue-600 dark:text-blue-400"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile CTA */}
            <Link
              href="/book-consultation"
              onClick={closeNavigation}
              className="mt-4 flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {siteConfig.cta.primary}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}