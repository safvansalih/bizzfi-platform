import type { Metadata } from "next";

import { CompanyOverview } from "@/components/about/company-overview";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { MissionVision } from "@/components/about/mission-vision";
import { CoreStrengths } from "@/components/about/core-strengths";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bizzfi, a complete digital business solutions company helping businesses transform and grow through modern technology and enterprise solutions.",
};

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "About",
          },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        badge="About Bizzfi"
        title={
          <>
            Technology That Moves{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Business Forward
            </span>
          </>
        }
        description="We help businesses transform, scale and succeed through modern digital technology, intelligent automation and enterprise solutions."
      />

      {/* About Introduction */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Section Heading */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
                Who We Are
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Your Technology Partner for the Digital Future
              </h2>
            </div>

            {/* Section Content */}
            <div className="space-y-6 text-base leading-8 text-muted-foreground">
              <p>
                Bizzfi is a complete digital business solutions company focused
                on helping organizations adopt modern technology, improve
                operations and accelerate digital growth.
              </p>

              <p>
                From digital platforms and enterprise software to cloud
                infrastructure, IT solutions and intelligent automation, we
                bring technology and business expertise together to deliver
                practical solutions built around real business needs.
              </p>

              <p>
                Bizzfi is powered by KL10SOUQ ENTERPRISES LLP and is committed
                to building reliable, scalable and future-ready digital
                solutions for businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <CompanyOverview />
      {/* Mission, Vision & Core Values */}
<MissionVision />
{/* Why Bizzfi / Core Strengths */}
<CoreStrengths />
    </>
  );
}