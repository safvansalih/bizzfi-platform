import { ArrowUpRight } from "lucide-react";

import { products } from "@/data/products";

export function ProductsGrid() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Our Products
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Digital Products Built for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Modern Business
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            We are building a growing ecosystem of digital products and
            business platforms designed to simplify operations, improve
            customer experiences and enable smarter ways of working.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <article
                key={product.slug}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                    {product.status}
                  </span>
                </div>

                {/* Category */}
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-blue-500">
                  {product.category}
                </p>

                {/* Product */}
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                  {product.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {product.description}
                </p>

                {/* Future Product Link */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <span>Product details coming soon</span>

                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>

                {/* Glow */}
                <div
                  className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}