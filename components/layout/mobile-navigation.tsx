"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/constants/site";
import {
  Check,
  ChevronDown,
  Globe2,
  Menu,
  UserRound,
  X,
} from "lucide-react";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      {/* Menu Toggle */}
      <button
type="button"
  onClick={() => setIsOpen((previous) => !previous)}
  className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
          className="fixed inset-x-0 top-16 z-[60] border-b border-white/10 bg-black shadow-2xl lg:hidden"
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
            {/* Mobile Utilities */}
<div className="mt-4 border-t border-white/10 pt-4">
  {/* Customer Portal */}
  <Link
    href="/login"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
  >
    <UserRound className="h-5 w-5 text-blue-400" aria-hidden="true" />

    <span>Customer Portal</span>
  </Link>

  {/* Language Selector */}
  <div className="mt-1">
    <button
      type="button"
      onClick={() => setIsLanguageOpen((previous) => !previous)}
      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
      aria-expanded={isLanguageOpen}
    >
      <span className="flex items-center gap-3">
        <Globe2 className="h-5 w-5 text-blue-400" aria-hidden="true" />

        <span>Language</span>
      </span>

      <span className="flex items-center gap-2">
        <span className="text-xs text-blue-400">
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
      <div className="mt-1 space-y-1 pl-4">
        <button
          type="button"
          onClick={() => {
            setSelectedLanguage("en");
            setIsLanguageOpen(false);
          }}
          className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span>English</span>

          {selectedLanguage === "en" && (
            <Check className="h-4 w-4 text-blue-400" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedLanguage("ar");
            setIsLanguageOpen(false);
          }}
          className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span>العربية</span>

          {selectedLanguage === "ar" && (
            <Check className="h-4 w-4 text-blue-400" aria-hidden="true" />
          )}
        </button>
      </div>
    )}
  </div>
</div>

            {/* Mobile CTA */}
            <Link
              href="/book-consultation"
              onClick={() => setIsOpen(false)}
              className="mt-4 flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              {siteConfig.cta.primary}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}