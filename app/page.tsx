import { Hero } from "@/components/sections/home/hero";
import { Technologies } from "@/components/sections/home/technologies";
import { ServicesOverview } from "@/components/sections/home/services";
import { WhyChooseUs } from "@/components/sections/home/why-choose-us";
import { Industries } from "@/components/sections/home/industries";
import { FinalCTA } from "@/components/sections/home/final-cta";

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