import Link from "next/link";
import {
  ArrowLeft,
  Home,
  SearchX,
} from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-20 sm:py-24">
      {/* Background Effects */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-500">
          <SearchX
            className="h-7 w-7"
            aria-hidden="true"
          />
        </div>

        {/* Error Code */}
        <span className="mt-8 block text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
          Error 404
        </span>

        {/* Heading */}
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          This Page Couldn&apos;t Be{" "}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Found
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          The page you are looking for may have been moved, removed or the
          address may be incorrect. You can return to the homepage or explore
          our technology and digital business solutions.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 sm:w-auto"
          >
            <Home
              className="h-4 w-4"
              aria-hidden="true"
            />

            Back to Home
          </Link>

          <Link
            href="/services"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-blue-500/40 hover:bg-muted/50 sm:w-auto"
          >
            Explore Services

            <ArrowLeft
              className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Help Link */}
        <p className="mt-10 text-sm text-muted-foreground">
          Need help?{" "}
          <Link
            href="/contact"
            className="font-semibold text-blue-500 transition-colors hover:text-blue-400"
          >
            Contact the Bizzfi team
          </Link>
        </p>
      </div>
    </section>
  );
}