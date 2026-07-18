import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { ConsultationForm } from "@/components/consultation/consultation-form";

export const metadata: Metadata = {
  title: "Book Free IT Consultation",
  description:
    "Book a free IT consultation with Bizzfi to discuss your business technology, digital transformation, cloud, enterprise systems and AI automation requirements.",
};

export default function BookConsultationPage() {
  return (
    <>
      <Breadcrumb
        items={[
          {
            label: "Book Consultation",
          },
        ]}
      />

      <PageHero
        badge="Free IT Consultation"
        title={
          <>
            Let&apos;s Discuss the Right Technology for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Your Business
            </span>
          </>
        }
        description="Schedule a free consultation with Bizzfi to discuss your business goals, technology requirements and the digital solutions that can help you move forward."
      />

      <ConsultationForm />
    </>
  );
}