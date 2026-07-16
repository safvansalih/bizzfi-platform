import { Hero } from "@/components/sections/home/hero";
import { Technologies } from "@/components/sections/home/technologies";
import { ServicesOverview } from "@/components/sections/home/services";
import { WhyChooseUs } from "@/components/sections/home/why-choose-us";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Technologies />
      <ServicesOverview />
      <WhyChooseUs />
    </>
  );
}