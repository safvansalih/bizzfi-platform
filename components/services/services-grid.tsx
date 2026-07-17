import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "@/data/services";

export function ServicesGrid() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            What We Do
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Technology Solutions for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Every Stage of Business
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            From digital experiences and enterprise systems to infrastructure,
            security and intelligent automation, Bizzfi brings the technology
            capabilities businesses need to transform and grow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>

                {/* Link */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-500">
                  <span>Explore Solution</span>

                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>

                {/* Hover Glow */}
                <div
                  className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}