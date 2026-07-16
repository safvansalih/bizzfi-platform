import { Check } from "lucide-react";

import { whyChooseUsData } from "./why-choose-us-data";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left Content */}
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              Why Choose Bizzfi
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Technology Built Around{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Your Business
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              We combine technology, digital strategy and business expertise to
              create solutions that help organizations modernize operations,
              improve customer experiences and accelerate growth.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              {[
                "Solutions tailored to your business requirements",
                "Modern and scalable technology architecture",
                "Focus on performance, security and reliability",
                "Long-term technology and digital support",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-muted-foreground sm:text-base"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChooseUsData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}