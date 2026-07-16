import Link from "next/link";
import { UserRound } from "lucide-react";

export function PortalButton() {
  return (
    <Link
      href="/login"
      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10 hover:text-blue-400"
      aria-label="Open customer portal"
      title="Customer Portal"
    >
      <UserRound className="h-5 w-5" aria-hidden="true" />

      <span className="hidden xl:inline">
        Portal
      </span>
    </Link>
  );
}