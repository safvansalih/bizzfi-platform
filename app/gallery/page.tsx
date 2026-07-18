import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { PortfolioGrid } from "@/components/gallery/portfolio-grid";

export const metadata: Metadata = {
  title: "Gallery & Portfolio",
  description:
    "Explore Bizzfi technology, digital transformation, cloud, enterprise, automation and creative project capabilities.",
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