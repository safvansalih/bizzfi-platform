"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const serviceOptions = [
  "Website Development",
  "Mobile App Development",
  "E-commerce Development",
  "Digital Marketing",
  "Cloud Solutions",
  "ERP & CRM Solutions",
  "Networking & Infrastructure",
  "Server Management",
  "Cyber Security",
  "AI & Automation",
  "Business Automation",
  "CCTV & Security Solutions",
  "Other",
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const phone = String(formData.get("phone") ?? "").trim();

    // Accepts international phone formats such as:
    // 9876543210
    // +919876543210
    // +91 98765 43210
    // +971 50 123 4567
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

    // Clear previous validation message
    setPhoneError("");

    // Phone validation
    if (!phoneRegex.test(phone)) {
      setPhoneError(
        "Please enter a valid phone number using numbers only."
      );

      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);

    // Temporary frontend simulation.
    // API + database integration will be added later.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after successful submission
    form.reset();
  }

  return (
    <section className="border-t border-border bg-muted/30 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Introduction */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Start a Conversation
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tell Us About Your Business Requirement
            </h2>

            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Share a few details about your project, technology requirement or
              business challenge. Our team will review your enquiry and connect
              with you to discuss the next steps.
            </p>

            {/* What Happens Next */}
            <div className="mt-8 rounded-2xl border border-border bg-background/70 p-6">
              <h3 className="font-semibold text-foreground">
                What happens next?
              </h3>

              <div className="mt-5 space-y-4">
                {[
                  "We review your business requirement.",
                  "Our team contacts you for an initial discussion.",
                  "We identify the right solution and next steps.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-blue-500"
                      aria-hidden="true"
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
            {/* Success Message */}
            {isSubmitted && (
              <div
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4"
                role="status"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-green-500"
                  aria-hidden="true"
                />

                <div>
                  <p className="font-medium text-foreground">
                    Enquiry received
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Thank you for contacting Bizzfi. This is currently a
                    frontend confirmation. Backend submission will be connected
                    in the next development phase.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Company */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-foreground"
                  >
                    Company
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[+]?[0-9\s\-()]{7,20}"
                    minLength={7}
                    maxLength={20}
                    title="Please enter a valid phone number using numbers only"
                    placeholder="+91 98765 43210"
                    onChange={() => {
                      if (phoneError) {
                        setPhoneError("");
                      }
                    }}
                    className={`mt-2 h-12 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 ${
                      phoneError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    aria-invalid={phoneError ? "true" : "false"}
                    aria-describedby={
                      phoneError ? "phone-error" : undefined
                    }
                  />

                  {/* Phone Error */}
                  {phoneError && (
                    <p
                      id="phone-error"
                      className="mt-2 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-foreground"
                >
                  Service / Solution *
                </label>

                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="" disabled>
                    Select a service
                  </option>

                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Tell Us About Your Requirement *
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your project, business requirement or challenge..."
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}

                {!isSubmitting && (
                  <Send
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </button>

              {/* Privacy Notice */}
              <p className="text-xs leading-5 text-muted-foreground">
                By submitting this form, you agree that Bizzfi may contact you
                regarding your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}