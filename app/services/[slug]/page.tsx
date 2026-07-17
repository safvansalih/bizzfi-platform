import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { services } from "@/data/services";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

const longDescription =
  "longDescription" in service &&
  typeof service.longDescription === "string"
    ? service.longDescription
    : service.description;

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Services",
            href: "/services",
          },
          {
            label: service.title,
          },
        ]}
      />

      {/* Service Hero */}
      <PageHero
        badge="Bizzfi Solutions"
        title={
          <>
            {service.title} for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </>
        }
        description={service.description}
      />

      {/* Service Introduction */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
            
            {/* Main Content */}
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/50 text-blue-500">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>

              <span className="mt-8 block text-sm font-semibold uppercase tracking-wider text-blue-500">
                Service Overview
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Transform Your Business with {service.title}
              </h2>

              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {longDescription}
              </p>
            </div>

            {/* CTA Card */}
            <div className="rounded-3xl border border-border bg-muted/30 p-7 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground">
                Looking for the right solution?
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Talk to the Bizzfi team about your business requirements and
                discover how our technology solutions can support your goals.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-blue-500"
                    aria-hidden="true"
                  />
                  Business-focused consultation
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-blue-500"
                    aria-hidden="true"
                  />
                  Customized technology solutions
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-blue-500"
                    aria-hidden="true"
                  />
                  Scalable and future-ready approach
                </div>
              </div>

              <a
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500"
              >
                Request a Consultation

                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

