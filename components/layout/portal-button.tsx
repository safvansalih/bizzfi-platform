import Link from "next/link";
import { UserRound } from "lucide-react";

export function PortalButton() {
  return (
    <Link
      href="/login"
      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background/60 px-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-blue-500/30 hover:bg-muted hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:text-blue-400"
      aria-label="Open customer portal"
      title="Customer Portal"
    >
      <UserRound
        className="h-5 w-5"
        aria-hidden="true"
      />

      <span className="hidden xl:inline">
        Portal
      </span>
    </Link>
  );
}