import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bizzfi.com"),

  title: {
    default: "Bizzfi | Complete Digital Business Solutions",
    template: "%s | Bizzfi",
  },

  description:
    "Bizzfi provides Website Development, Mobile Apps, AI Automation, Cloud Solutions, ERP, CRM, Digital Marketing and Managed IT Services.",

  keywords: [
    "IT Services",
    "Managed IT Services",
    "Website Development",
    "Mobile App Development",
    "AI Automation",
    "ERP",
    "CRM",
    "Cloud Solutions",
    "Digital Marketing",
  ],

  authors: [
    {
      name: "Bizzfi",
    },
  ],

  creator: "Bizzfi",

  publisher: "KL10SOUQ ENTERPRISES LLP",
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
        <ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <Header />

  <main className="flex-1">
    {children}
  </main>

  <Footer />

  <WhatsAppButton />
</ThemeProvider>
      </body>
    </html>
  );
}
