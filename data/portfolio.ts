export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  status: "Published" | "Coming Soon";
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "digital-platform-projects",
    title: "Digital Platform Projects",
    category: "Web & Digital",
    description:
      "Modern websites, digital platforms and customer-focused web experiences built for growing businesses.",
    status: "Coming Soon",
  },
  {
    slug: "ecommerce-projects",
    title: "E-commerce Projects",
    category: "Digital Commerce",
    description:
      "Scalable online stores and digital commerce experiences designed to support business growth.",
    status: "Coming Soon",
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Solutions",
    category: "ERP & CRM",
    description:
      "Business management and enterprise system implementations designed to streamline operations.",
    status: "Coming Soon",
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    category: "Cloud & IT",
    description:
      "Cloud, server, networking and IT infrastructure projects built for secure and reliable operations.",
    status: "Coming Soon",
  },
  {
    slug: "automation-projects",
    title: "Automation Projects",
    category: "AI & Automation",
    description:
      "Intelligent automation and connected workflow solutions designed to improve business productivity.",
    status: "Coming Soon",
  },
  {
    slug: "branding-creative",
    title: "Branding & Creative",
    category: "Creative",
    description:
      "Brand identity, visual communication and creative digital experiences designed for modern brands.",
    status: "Coming Soon",
  },
];