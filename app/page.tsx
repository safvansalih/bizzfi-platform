import type { Metadata } from "next";

import { Hero } from "@/components/sections/home/hero";
import { Technologies } from "@/components/sections/home/technologies";
import { ServicesOverview } from "@/components/sections/home/services";
import { WhyChooseUs } from "@/components/sections/home/why-choose-us";
import { Industries } from "@/components/sections/home/industries";
import { FinalCTA } from "@/components/sections/home/final-cta";

export const metadata: Metadata = {
  title: "Complete Digital Business Solutions",

  description:
    "Bizzfi helps businesses grow with website development, mobile apps, AI automation, ERP and CRM solutions, cloud infrastructure, cyber security, digital marketing and managed IT services.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Bizzfi | Complete Digital Business Solutions",
    description:
      "Technology and digital business solutions including AI automation, cloud infrastructure, ERP, CRM, web development, cyber security and managed IT services.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bizzfi - Complete Digital Business Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bizzfi | Complete Digital Business Solutions",
    description:
      "Technology and digital solutions designed to support modern and growing businesses.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Technologies />
      <ServicesOverview />
      <WhyChooseUs />
      <Industries />
      <FinalCTA />
    </>
  );
}