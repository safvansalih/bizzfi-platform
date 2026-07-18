import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { PortfolioGrid } from "@/components/gallery/portfolio-grid";

export const metadata: Metadata = {
  title: "Gallery & Portfolio",

  description:
    "Explore Bizzfi projects and capabilities across digital transformation, technology, cloud infrastructure, enterprise solutions, automation and creative digital experiences.",

  alternates: {
    canonical: "/gallery",
  },

  openGraph: {
    title: "Gallery & Portfolio | Bizzfi",
    description:
      "Explore Bizzfi technology, digital transformation, cloud, enterprise, automation and creative project capabilities.",
    url: "/gallery",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gallery & Portfolio | Bizzfi",
    description:
      "Discover how Bizzfi combines technology, digital strategy and creative thinking to build solutions for modern businesses.",
  },
};

export default function GalleryPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Gallery",
          },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        badge="Our Portfolio"
        title={
          <>
            Ideas, Technology & Solutions{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Brought to Life
            </span>
          </>
        }
        description="Discover how Bizzfi brings together technology, digital strategy and creative thinking to build solutions for modern businesses."
      />

      {/* Portfolio */}
      <PortfolioGrid />
    </>
  );
}