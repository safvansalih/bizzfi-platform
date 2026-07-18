import type { Metadata } from "next";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { FAQSection } from "@/components/common/faq-section";
import { PageHero } from "@/components/common/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { contactFAQs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Contact Us",

  description:
    "Contact Bizzfi to discuss digital business solutions, IT services, cloud infrastructure, enterprise technology, AI automation and digital transformation requirements.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Bizzfi | Digital Business & Technology Solutions",
    description:
      "Connect with Bizzfi to discuss your business goals, technology requirements, digital projects and IT solution needs.",
    url: "/contact",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Bizzfi | Digital Business & Technology Solutions",
    description:
      "Connect with Bizzfi to discuss your business goals, technology requirements and digital transformation needs.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Contact",
          },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        badge="Contact Bizzfi"
        title={
          <>
            Let&apos;s Build What&apos;s{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Next for Your Business
            </span>
          </>
        }
        description="Have a project, technology requirement or business challenge? Connect with Bizzfi and discover how the right digital solutions can help your business move forward."
      />

      {/* Contact Information */}
      <ContactInfo />

      {/* Contact Form */}
      <ContactForm />

      {/* Frequently Asked Questions */}
      <FAQSection
        title="Common Questions About Working with Bizzfi"
        description="Find answers to common questions about our services, consultations and how we work with businesses."
        items={contactFAQs}
      />
    </>
  );
}