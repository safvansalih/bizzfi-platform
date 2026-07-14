import Link from "next/link";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/constants/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium transition hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
          {siteConfig.cta.primary}
        </button>

      </div>
    </header>
  );
}