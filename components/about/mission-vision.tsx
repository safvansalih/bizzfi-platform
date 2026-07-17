import {
  Eye,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace modern technologies and new ideas to create smarter, future-ready business solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "We focus on building dependable solutions and long-term technology foundations businesses can trust.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We understand each business requirement and design solutions around real goals, challenges and opportunities.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership",
    description:
      "We work as a long-term technology partner, supporting businesses throughout their digital journey.",
  },
];

export function MissionVision() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            What Drives Us
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Mission, Vision &{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Core Values
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            We combine technology, business understanding and long-term
            partnerships to help organizations build stronger digital
            foundations and achieve sustainable growth.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Mission */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-blue-500">
              <Target className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-foreground">
              Our Mission
            </h3>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              To empower businesses with reliable, scalable and innovative
              digital solutions that simplify operations, improve efficiency
              and create meaningful opportunities for growth.
            </p>

            <div
              className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20"
              aria-hidden="true"
            />
          </div>

          {/* Vision */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-violet-500">
              <Eye className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-foreground">
              Our Vision
            </h3>

            <p className="mt-4 text-base leading-8 text-muted-foreground">
              To become a trusted digital transformation partner for
              businesses, connecting technology and strategy to build
              intelligent, connected and future-ready organizations.
            </p>

            <div
              className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Our Values
            </span>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              The Principles Behind Everything We Build
            </h3>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h4 className="mt-5 text-lg font-semibold text-foreground">
                    {value.title}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}