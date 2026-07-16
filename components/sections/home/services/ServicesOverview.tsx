import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { services } from "./services-data";

export function ServicesOverview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Our Services
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything Your Business Needs to{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Grow Digitally
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
            From digital experiences and enterprise software to cloud
            infrastructure and AI automation, Bizzfi provides technology
            solutions designed to help modern businesses grow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Background Glow */}
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                <div className="relative">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400">
                    Learn More

                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            View All Services

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}