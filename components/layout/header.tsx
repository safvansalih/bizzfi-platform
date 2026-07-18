import Link from "next/link";

import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { siteConfig } from "@/constants/site";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchButton } from "@/components/layout/search-button";
import { PortalButton } from "@/components/layout/portal-button";
import { LanguageSelector } from "@/components/layout/language-selector";
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
  href="/"
  className="relative z-10 text-2xl font-bold tracking-tight text-foreground"
>
  {siteConfig.name}
</Link>

        {/* Desktop Navigation */}
        <DesktopNavigation />

       {/* Right Actions */}
<div className="flex items-center gap-2">
  {/* Search - Desktop & Mobile */}
  <SearchButton />

  {/* Desktop Language */}
  <div className="hidden lg:block">
    <LanguageSelector />
  </div>

  {/* Desktop Customer Portal */}
  <div className="hidden lg:block">
    <PortalButton />
  </div>

  {/* Theme Toggle - Desktop & Mobile */}
  <ThemeToggle />

  {/* CTA */}
<Link
  href="/book-consultation"
  className="hidden items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 lg:inline-flex"
>
  {siteConfig.cta.primary}
</Link>

  {/* Mobile Navigation */}
  <MobileNavigation />
</div>
      </div>
    </header>
  );
}