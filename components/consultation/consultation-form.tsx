"use client";

import { FormEvent, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Send,
  Video,
} from "lucide-react";

const consultationTopics = [
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
  "General IT Consultation",
  "Other",
];

const preferredTimes = [
  "Morning",
  "Afternoon",
  "Evening",
];

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const phone = String(formData.get("phone") ?? "").trim();

    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

    setPhoneError("");

    if (!phoneRegex.test(phone)) {
      setPhoneError(
        "Please enter a valid phone number using numbers only."
      );
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);

    // Temporary frontend simulation.
    // Backend, database and calendar integration will be added later.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);

    form.reset();
  }

  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Introduction */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Free IT Consultation
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Schedule a Conversation with Our Team
            </h2>

            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Tell us about your business goals, technology requirements or
              current challenges. We&apos;ll use the consultation to understand
              your needs and discuss the right direction for your business.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Clock3,
                  title: "Focused Discussion",
                  description:
                    "A conversation focused on your specific business and technology requirements.",
                },
                {
                  icon: Video,
                  title: "Flexible Consultation",
                  description:
                    "Discuss your requirements remotely or through the most suitable communication channel.",
                },
                {
                  icon: CheckCircle2,
                  title: "Clear Next Steps",
                  description:
                    "Get practical guidance on possible solutions and the next steps for your project.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-border bg-muted/30 p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-blue-500">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Form */}
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
                    Consultation request received
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Thank you. This is currently a frontend confirmation.
                    Booking notifications and calendar scheduling will be
                    connected during the backend integration phase.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name + Company */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="consultation-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>

                  <input
                    id="consultation-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="consultation-company"
                    className="text-sm font-medium text-foreground"
                  >
                    Company
                  </label>

                  <input
                    id="consultation-company"
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
                <div>
                  <label
                    htmlFor="consultation-email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </label>

                  <input
                    id="consultation-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="consultation-phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="consultation-phone"
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
                      phoneError
                        ? "consultation-phone-error"
                        : undefined
                    }
                  />

                  {phoneError && (
                    <p
                      id="consultation-phone-error"
                      className="mt-2 text-xs font-medium text-red-500"
                      role="alert"
                    >
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Consultation Topic */}
              <div>
                <label
                  htmlFor="consultation-topic"
                  className="text-sm font-medium text-foreground"
                >
                  What Would You Like to Discuss? *
                </label>

                <select
                  id="consultation-topic"
                  name="topic"
                  required
                  defaultValue=""
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="" disabled>
                    Select a topic
                  </option>

                  {consultationTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Preferred Time */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="preferred-date"
                    className="text-sm font-medium text-foreground"
                  >
                    Preferred Date *
                  </label>

                  <div className="relative mt-2">
                    <CalendarDays
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />

                    <input
  id="preferred-date"
  name="preferredDate"
  type="date"
  min={today}
  required
  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
/>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="preferred-time"
                    className="text-sm font-medium text-foreground"
                  >
                    Preferred Time *
                  </label>

                  <select
                    id="preferred-time"
                    name="preferredTime"
                    required
                    defaultValue=""
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="" disabled>
                      Select preferred time
                    </option>

                    {preferredTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirement */}
              <div>
                <label
                  htmlFor="consultation-message"
                  className="text-sm font-medium text-foreground"
                >
                  Briefly Describe Your Requirement *
                </label>

                <textarea
                  id="consultation-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you would like to discuss..."
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Request Free Consultation"}

                {!isSubmitting && (
                  <Send
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </button>

              <p className="text-xs leading-5 text-muted-foreground">
                Your preferred date and time are a request only. The final
                consultation schedule will be confirmed by the Bizzfi team.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}