import { technologies } from "./technology-data";

export function Technologies() {
  return (
    <section
      className="relative overflow-hidden border-y border-border bg-muted/10 py-12 dark:border-white/10 dark:bg-white/[0.02]"
      aria-labelledby="technologies-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="text-center">
          <p
            id="technologies-heading"
            className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            Technologies We Work With
          </p>
        </div>

        {/* Marquee */}
        <div className="relative mt-8 overflow-hidden">
          {/* Left Fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
            aria-hidden="true"
          />

          {/* Right Fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
            aria-hidden="true"
          />

          <div className="technology-marquee flex w-max items-center gap-6">
            {[...technologies, ...technologies].map(
              (technology, index) => (
                <div
                  key={`${technology}-${index}`}
                  className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-border bg-background/60 px-6 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-foreground dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.06] dark:hover:text-white"
                >
                  {technology}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}