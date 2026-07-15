import { technologies } from "./technology-data";

export function Technologies() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-12"
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
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="technology-marquee flex w-max items-center gap-6">
            {[...technologies, ...technologies].map((technology, index) => (
              <div
                key={`${technology}-${index}`}
                className="flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                {technology}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}