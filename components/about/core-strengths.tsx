import {
  Blocks,
  BriefcaseBusiness,
  Headphones,
  Layers3,
  Network,
  TrendingUp,
} from "lucide-react";

const strengths = [
  {
    icon: Layers3,
    title: "End-to-End Solutions",
    description:
      "From digital platforms and enterprise systems to cloud, infrastructure and automation, we bring multiple technology capabilities together under one solutions ecosystem.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business-First Approach",
    description:
      "We begin with business goals and operational challenges, then design technology solutions that deliver practical value and measurable impact.",
  },
  {
    icon: Blocks,
    title: "Modern Technology",
    description:
      "We use modern platforms, tools and technology practices to build reliable, secure and future-ready digital solutions.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description:
      "Our solutions are designed to evolve with your business, supporting future growth, new requirements and expanding operations.",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description:
      "We focus on long-term service and dependable support to help businesses keep their technology running effectively.",
  },
  {
    icon: Network,
    title: "Long-Term Partnership",
    description:
      "We aim to become an ongoing technology partner that understands your business and supports every stage of your digital journey.",
  },
];

export function CoreStrengths() {
  return (
    <section className="border-t border-border bg-muted/30 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Why Bizzfi
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            More Than a Service Provider.{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Your Technology Partner.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            We combine business understanding, modern technology and long-term
            support to help organizations build stronger digital foundations
            and move forward with confidence.
          </p>
        </div>

        {/* Strengths Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;

            return (
              <div
                key={strength.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 text-4xl font-bold text-muted-foreground/10 transition-colors duration-300 group-hover:text-blue-500/10">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {strength.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {strength.description}
                </p>

                {/* Hover Glow */}
                <div
                  className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-border bg-background/70 px-6 py-10 text-center shadow-sm backdrop-blur-md sm:px-10">
          <p className="text-xl font-semibold leading-8 text-foreground sm:text-2xl">
            One technology partner for your{" "}
            <span className="text-blue-500">
              digital growth, enterprise technology and business transformation.
            </span>
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Whether you are building your digital presence, modernizing
            operations or preparing your business for the future, Bizzfi brings
            the technology capabilities and support you need in one place.
          </p>
        </div>
      </div>
    </section>
  );
}