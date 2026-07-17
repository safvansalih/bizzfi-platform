import {
  Building2,
  Globe2,
  Lightbulb,
  Rocket,
} from "lucide-react";

const highlights = [
  {
    icon: Building2,
    value: "Business First",
    label: "Solutions designed around real business requirements",
  },
  {
    icon: Lightbulb,
    value: "Innovation",
    label: "Modern technology and intelligent digital solutions",
  },
  {
    icon: Globe2,
    value: "Scalable",
    label: "Solutions built to support businesses as they grow",
  },
  {
    icon: Rocket,
    value: "Future Ready",
    label: "Technology foundations designed for long-term success",
  },
];

export function CompanyOverview() {
  return (
    <section className="border-y border-border bg-muted/30 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Story */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Our Story
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Building Digital Foundations for{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Bizzfi was created with a clear purpose: to help businesses
                navigate technology with confidence and turn digital
                transformation into practical business value.
              </p>

              <p>
                Powered by KL10SOUQ ENTERPRISES LLP, Bizzfi brings together
                digital development, enterprise technology, cloud
                infrastructure, business systems and intelligent automation
                under one technology solutions platform.
              </p>

              <p>
                Our approach goes beyond delivering individual technology
                services. We focus on understanding business challenges,
                designing the right technology foundation and supporting
                organizations throughout their digital journey.
              </p>
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative">
            {/* Background Glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[100px]"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-3xl border border-border bg-background/70 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <span className="text-sm font-medium text-blue-500">
                Bizzfi
              </span>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Complete Digital Business Solutions
              </h3>

              <p className="mt-5 leading-7 text-muted-foreground">
                Connecting business strategy with technology to create
                reliable, scalable and future-ready digital solutions.
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Powered by
                </p>

                <p className="mt-2 text-sm font-semibold text-foreground">
                  KL10SOUQ ENTERPRISES LLP
                </p>
              </div>

              {/* Decorative Glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Company Highlights */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.value}
                className="group rounded-2xl border border-border bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-colors duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}