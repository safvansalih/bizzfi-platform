import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { ProductsGrid } from "@/components/products/products-grid";
import { BusinessSolutions } from "@/components/products/business-solutions";

export const metadata: Metadata = {
  title: "Products",

  description:
    "Explore Bizzfi digital products, business technology platforms and integrated solutions designed to help modern businesses operate smarter, connect better and grow.",

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Digital Products & Business Technology Platforms | Bizzfi",
    description:
      "Explore digital products, technology platforms and business solutions from Bizzfi designed for modern and growing businesses.",
    url: "/products",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Products & Business Technology Platforms | Bizzfi",
    description:
      "Discover Bizzfi digital products and technology solutions designed to help businesses operate smarter and grow.",
  },
};

export default function ProductsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Products",
          },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        badge="Bizzfi Products"
        title={
          <>
            Building Digital Products for the{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Future of Business
            </span>
          </>
        }
        description="Explore our growing ecosystem of digital products and technology platforms designed to help businesses operate smarter, connect better and grow faster."
      />

      {/* Products */}
      <ProductsGrid />

      {/* Business Solutions */}
      <BusinessSolutions />
    </>
  );
}