import { industries } from "./industries-data";

export function Industries() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/10 py-24 sm:py-32 dark:border-white/5 dark:bg-white/[0.015]">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute right-[-200px] top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
            Industries We Serve
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Digital Solutions for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            We help organizations across diverse industries adopt modern
            technology, improve operations and build scalable digital
            experiences.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <article
                key={industry.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-muted/50 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                {/* Hover Glow */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-violet-500/0 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20"
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-violet-600 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 dark:border-white/10 dark:bg-white/5 dark:text-violet-400">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {industry.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {industry.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}