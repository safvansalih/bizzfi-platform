import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { ProductsGrid } from "@/components/products/products-grid";
import { BusinessSolutions } from "@/components/products/business-solutions";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore digital products and business technology platforms being developed by Bizzfi for modern businesses.",
};

export default function ProductsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          {
            label: "Products",
          },
        ]}
      />

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

      <ProductsGrid />
      {/* Products */}
<ProductsGrid />

{/* Business Solutions */}
<BusinessSolutions />
    </>
  );
}