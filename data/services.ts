import {
  Bot,
  Cloud,
  Code2,
  Database,
  Megaphone,
  Network,
  Server,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Video,
  Workflow,
} from "lucide-react";

export const services = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "Fast, scalable and conversion-focused websites built for modern businesses.",
    icon: Code2,
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "Modern mobile applications designed to deliver seamless digital experiences.",
    icon: Smartphone,
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    description:
      "Powerful online stores and commerce platforms built to support digital growth.",
    icon: ShoppingCart,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Performance-focused digital marketing strategies that help businesses reach and convert customers.",
    icon: Megaphone,
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Secure and scalable cloud infrastructure, migration and business productivity solutions.",
    icon: Cloud,
  },
  {
    slug: "erp-crm",
    title: "ERP & CRM Solutions",
    description:
      "Integrated business management systems that streamline operations and customer relationships.",
    icon: Database,
  },
  {
    slug: "networking-infrastructure",
    title: "Networking & Infrastructure",
    description:
      "Reliable enterprise networking and IT infrastructure designed for connected businesses.",
    icon: Network,
  },
  {
    slug: "server-management",
    title: "Server Management",
    description:
      "Professional server, virtualization, storage and backup solutions for business continuity.",
    icon: Server,
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    description:
      "Security solutions designed to protect business systems, networks and digital assets.",
    icon: ShieldCheck,
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    description:
      "Intelligent AI-powered automation that helps businesses improve efficiency and scale operations.",
    icon: Bot,
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    description:
      "Connected workflows and process automation designed to reduce manual work and improve productivity.",
    icon: Workflow,
  },
  {
    slug: "cctv-security",
    title: "CCTV & Security Solutions",
    description:
      "Smart surveillance and security solutions for modern business environments.",
    icon: Video,
  },
];

export type Service = (typeof services)[number];