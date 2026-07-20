import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { OrganizationSchema } from "@/components/seo/organization-schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bizzfi.com"),

  applicationName: "Bizzfi",

  title: {
    default: "Bizzfi | Complete Digital Business Solutions",
    template: "%s | Bizzfi",
  },

  description:
    "Bizzfi provides digital business and technology solutions including website development, mobile apps, AI automation, ERP, CRM, cloud infrastructure, cyber security, digital marketing and managed IT services.",

  keywords: [
    "Bizzfi",
    "Digital Business Solutions",
    "IT Services",
    "Managed IT Services",
    "Website Development",
    "Mobile App Development",
    "AI Automation",
    "ERP Solutions",
    "CRM Solutions",
    "Cloud Infrastructure",
    "Cloud Solutions",
    "Cyber Security",
    "Digital Marketing",
    "E-commerce Development",
    "Business Technology Solutions",
  ],

  authors: [
    {
      name: "Bizzfi",
      url: "https://www.bizzfi.com",
    },
  ],

  creator: "Bizzfi",

  publisher: "KL10SOUQ ENTERPRISES LLP",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Bizzfi",
    title: "Bizzfi | Complete Digital Business Solutions",
    description:
      "Digital business and technology solutions including AI automation, cloud infrastructure, ERP, CRM, web development, cyber security and managed IT services.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bizzfi | Complete Digital Business Solutions",
    description:
      "Digital business and technology solutions for modern and growing businesses.",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
         <OrganizationSchema />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />

          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}