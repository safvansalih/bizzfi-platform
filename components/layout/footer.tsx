import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

const companyLinks = [
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Products", href: "/products" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const serviceLinks = [
  { title: "Website Development", href: "/services/website-development" },
  { title: "Mobile App Development", href: "/services/mobile-app-development" },
  { title: "Cloud Solutions", href: "/services/cloud-solutions" },
  { title: "ERP & CRM Solutions", href: "/services/erp-crm" },
  { title: "AI Automation", href: "/services/ai-automation" },
];

const legalLinks = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Company */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              Bizzfi
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Complete digital business solutions powered by technology,
              innovation and enterprise expertise.
            </p>

            <p className="mt-4 text-xs leading-6 text-gray-500">
              Powered by KL10SOUQ ENTERPRISES LLP
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {link.title}

                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Solutions
            </h3>

            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="tel:+916235562622"
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-blue-400"
              >
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>+91 62355 62622</span>
              </a>

              <a
                href="mailto:info@bizzfi.com"
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-blue-400"
              >
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>info@bizzfi.com</span>
              </a>

              <div className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>
                  Kodur, Malappuram
                  <br />
                  Kerala, India - 676504
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          
          <p>
            © {new Date().getFullYear()} Bizzfi. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}