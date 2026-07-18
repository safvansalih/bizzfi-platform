import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export function BlogCTA() {
  return (
    <section className="px-6 pb-20 sm:pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-blue-500/5 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          {/* Decorative Background */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Turn Insights Into Action
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Transform Your Business with the Right Technology?
            </h2>

            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Talk to the Bizzfi team about your business goals, technology
              requirements and digital challenges. We can help you explore the
              right solutions and define the next steps.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-consultation"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500"
              >
                <CalendarDays
                  className="h-4 w-4"
                  aria-hidden="true"
                />

                Book Free IT Consultation

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-blue-500/40 hover:bg-muted/50"
              >
                Explore Our Services

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}