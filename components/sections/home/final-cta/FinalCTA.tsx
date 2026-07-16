import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { siteConfig } from "@/constants/site";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-20">
          
          {/* Background Effects */}
          <div
            className="pointer-events-none absolute left-1/2 top-[-200px] -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute bottom-[-250px] right-[-100px] -z-10 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[140px]"
            aria-hidden="true"
          />

          {/* Badge */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-400 backdrop-blur-md">
            Ready to Transform Your Business?
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s Build the Future of{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Your Business
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Whether you&apos;re modernizing your IT infrastructure, building a
            digital product, moving to the cloud or automating business
            processes, Bizzfi can help you take the next step.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-medium text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-auto"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" />

              <span>{siteConfig.cta.primary}</span>

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact?type=quote"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:w-auto"
            >
              <span>{siteConfig.cta.secondary}</span>

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Supporting Text */}
          <p className="mt-6 text-sm text-muted-foreground">
            Tell us about your business goals. We&apos;ll help you identify the
            right digital solution.
          </p>
        </div>
      </div>
    </section>
  );
}