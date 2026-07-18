import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Cloud,
  Database,
  Globe2,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const solutions = [
  {
    icon: Globe2,
    title: "Digital Transformation",
    description:
      "Modernize your business with connected digital platforms, customer experiences and technology solutions.",
    href: "/services/website-development",
  },
  {
    icon: Database,
    title: "Enterprise Management",
    description:
      "Streamline business operations with integrated ERP, CRM and enterprise management solutions.",
    href: "/services/erp-crm",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Build secure, scalable and reliable technology foundations with modern cloud and infrastructure solutions.",
    href: "/services/cloud-solutions",
  },
  {
    icon: Bot,
    title: "AI & Intelligent Automation",
    description:
      "Use artificial intelligence and automation to simplify workflows, improve efficiency and enable smarter operations.",
    href: "/services/ai-automation",
  },
  {
    icon: ShieldCheck,
    title: "Security & Business Continuity",
    description:
      "Protect critical systems and business data with security, backup and resilient technology solutions.",
    href: "/services/cyber-security",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description:
      "Connect teams, systems and workflows to reduce manual work and improve operational productivity.",
    href: "/services/business-automation",
  },
];

export function BusinessSolutions() {
  return (
    <section className="border-y border-border bg-muted/30 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Business Solutions
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Technology Solutions Built Around{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Business Outcomes
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-8 text-muted-foreground lg:justify-self-end">
            Beyond individual technology services, Bizzfi combines multiple
            capabilities into integrated solutions designed around real
            business challenges and growth opportunities.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <Link
                key={solution.title}
                href={solution.href}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {solution.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {solution.description}
                </p>

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

        {/* Products vs Solutions Explanation */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background/70 p-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              Bizzfi Products
            </span>

            <h3 className="mt-3 text-xl font-semibold text-foreground">
              Ready-to-Use Digital Platforms
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Products are digital platforms and software solutions developed
              by Bizzfi to solve common business requirements and support
              scalable operations.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-500">
              Bizzfi Solutions
            </span>

            <h3 className="mt-3 text-xl font-semibold text-foreground">
              Technology Designed Around Your Business
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Solutions combine services, technologies and implementation
              expertise to address specific business challenges and
              transformation goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}