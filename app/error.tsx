"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Home,
  RotateCcw,
} from "lucide-react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Replace this with an error monitoring service
    // such as Sentry when production monitoring is added.
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-20 sm:py-24">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500">
          <AlertTriangle
            className="h-7 w-7"
            aria-hidden="true"
          />
        </div>

        {/* Label */}
        <span className="mt-8 block text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
          Something Went Wrong
        </span>

        {/* Heading */}
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          We Couldn&apos;t Load This Page
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
          An unexpected error occurred while loading this page. You can try
          again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 sm:w-auto"
          >
            <RotateCcw
              className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45"
              aria-hidden="true"
            />

            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-blue-500/40 hover:bg-muted/50 sm:w-auto"
          >
            <Home
              className="h-4 w-4"
              aria-hidden="true"
            />

            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}