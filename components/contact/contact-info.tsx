import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 62355 62622",
    description: "Talk directly with our team.",
    href: "tel:+916235562622",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@bizzfi.com",
    description: "Send us your business requirements.",
    href: "mailto:info@bizzfi.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with Bizzfi",
    description: "Start a quick conversation with our team.",
    href: "https://wa.me/916235562622",
  },
];

export function ContactInfo() {
  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Introduction */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Get in Touch
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Let&apos;s Talk About Your{" "}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Next Digital Move
              </span>
            </h2>

            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Whether you are planning a new digital project, modernizing your
              technology or looking for the right business solution, our team
              is ready to understand your requirements and explore how Bizzfi
              can help.
            </p>

            {/* Office */}
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    Our Office
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Kodur, Malappuram
                    <br />
                    Kerala, India - 676504
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500">
                  <Clock3 className="h-5 w-5" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    Business Enquiries
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Contact our team by phone, email or WhatsApp for business
                    enquiries and consultations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              return (
                <a
                  key={method.title}
                  href={method.href}
                  target={
                    method.title === "WhatsApp" ? "_blank" : undefined
                  }
                  rel={
                    method.title === "WhatsApp"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/50 text-blue-500 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {method.title}
                  </h3>

                  <p className="mt-2 font-medium text-blue-500">
                    {method.value}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {method.description}
                  </p>

                  <div
                    className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10"
                    aria-hidden="true"
                  />
                </a>
              );
            })}

            {/* Consultation Card */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                Free Consultation
              </span>

              <h3 className="mt-3 text-xl font-semibold text-foreground">
                Not sure which solution is right for your business?
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
  Tell us about your business goals and technology requirements.
  Our team can help you identify the right direction and next
  steps.
</p>

<Link
  href="/book-consultation"
  className="group relative z-10 mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500"
>
  Book Free IT Consultation

  <ArrowRight
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  />
</Link>

<div
  className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl"
  aria-hidden="true"
/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}