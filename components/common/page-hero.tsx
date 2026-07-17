import { ReactNode } from "react";

type PageHeroProps = {
  badge?: string;
  title: ReactNode;
  description?: string;
};

export function PageHero({
  badge,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border px-6 py-20 sm:py-24 lg:py-28">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-250px] -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        {badge && (
          <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-medium text-blue-500 backdrop-blur-md">
            {badge}
          </span>
        )}

        {/* Title */}
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}