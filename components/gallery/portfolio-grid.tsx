import {
  ArrowUpRight,
  Bot,
  Cloud,
  Database,
  Globe2,
  Palette,
  ShoppingCart,
} from "lucide-react";

import { portfolioItems } from "@/data/portfolio";

const categoryIcons = {
  "Web & Digital": Globe2,
  "Digital Commerce": ShoppingCart,
  "ERP & CRM": Database,
  "Cloud & IT": Cloud,
  "AI & Automation": Bot,
  Creative: Palette,
};

export function PortfolioGrid() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Our Work
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Technology & Digital Work Built for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Real Business Impact
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Explore the areas where Bizzfi combines technology, strategy and
            creative expertise to help businesses build stronger digital
            capabilities.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => {
            const Icon =
              categoryIcons[item.category as keyof typeof categoryIcons] ??
              Globe2;

            return (
              <article
                key={item.slug}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Visual Placeholder */}
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border bg-muted/40">
                  <div
                    className="pointer-events-none absolute h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20"
                    aria-hidden="true"
                  />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/80 text-blue-500 shadow-lg backdrop-blur-md">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>

                  <span className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
                    {item.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span>Projects coming soon</span>

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}