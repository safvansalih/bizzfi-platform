"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/config/navigation";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-7 lg:flex"
      aria-label="Main navigation"
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
            aria-current={isActive ? "page" : undefined}
            className={`relative rounded-sm py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.title}

            {/* Active Indicator */}
            {isActive && (
              <span
                className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 rounded-full bg-blue-500"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}