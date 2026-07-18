import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { ConsultationForm } from "@/components/consultation/consultation-form";

export const metadata: Metadata = {
  title: "Book Free IT Consultation",

  description:
    "Book a free IT consultation with Bizzfi to discuss your business technology, digital transformation, cloud infrastructure, enterprise systems and AI automation requirements.",

  alternates: {
    canonical: "/book-consultation",
  },

  openGraph: {
    title: "Book a Free IT Consultation | Bizzfi",
    description:
      "Schedule a free consultation with Bizzfi to discuss your business goals, technology requirements and the right digital solutions for your business.",
    url: "/book-consultation",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book a Free IT Consultation | Bizzfi",
    description:
      "Talk to Bizzfi about your technology requirements, digital transformation goals and business challenges.",
  },
};

export default function BookConsultationPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Book Consultation",
          },
        ]}
      />

      {/* Page Hero */}
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

      {/* Consultation Form */}
      <ConsultationForm />
    </>
  );
}