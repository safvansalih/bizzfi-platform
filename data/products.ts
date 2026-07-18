import {
  Bot,
  Building2,
  Headphones,
  LayoutDashboard,
  ShoppingCart,
  Workflow,
} from "lucide-react";

export const products = [
  {
    slug: "business-management-platform",
    title: "Business Management Platform",
    category: "Enterprise",
    description:
      "A unified digital platform designed to help businesses manage operations, customers and workflows from one place.",
    icon: LayoutDashboard,
    status: "Coming Soon",
  },
  {
    slug: "ai-business-assistant",
    title: "AI Business Assistant",
    category: "Artificial Intelligence",
    description:
      "An intelligent AI assistant designed to automate customer interactions, business enquiries and everyday workflows.",
    icon: Bot,
    status: "Coming Soon",
  },
  {
    slug: "customer-service-platform",
    title: "Customer Service Platform",
    category: "Customer Experience",
    description:
      "A centralized platform for managing customer enquiries, support requests and service interactions.",
    icon: Headphones,
    status: "Coming Soon",
  },
  {
    slug: "workflow-automation-platform",
    title: "Workflow Automation Platform",
    category: "Automation",
    description:
      "A flexible automation solution that connects business processes and reduces repetitive manual work.",
    icon: Workflow,
    status: "Coming Soon",
  },
  {
    slug: "commerce-platform",
    title: "Digital Commerce Platform",
    category: "E-commerce",
    description:
      "A scalable commerce solution for businesses looking to manage products, customers and digital sales.",
    icon: ShoppingCart,
    status: "Coming Soon",
  },
  {
    slug: "enterprise-operations-platform",
    title: "Enterprise Operations Platform",
    category: "Enterprise",
    description:
      "An integrated technology platform designed to connect teams, systems and business operations.",
    icon: Building2,
    status: "Coming Soon",
  },
];

export type Product = (typeof products)[number];