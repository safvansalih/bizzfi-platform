import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { ServicesGrid } from "@/components/services/services-grid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Bizzfi digital business solutions including website development, mobile apps, cloud, ERP, CRM, IT infrastructure, cyber security and AI automation.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Services",
          },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        badge="Our Services"
        title={
          <>
            Complete Technology Solutions for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </>
        }
        description="From digital platforms and enterprise systems to cloud infrastructure, cyber security and AI automation, Bizzfi delivers integrated technology solutions designed around your business."
      />

      {/* Services */}
      <ServicesGrid />
    </>
  );
}