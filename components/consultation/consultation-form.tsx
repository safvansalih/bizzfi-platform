"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
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

type ConsultationApiResponse = {
  success?: boolean;
  message?: string;
};

export function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    /**
     * Supports international phone formats:
     * 9876543210
     * +919876543210
     * +91 98765 43210
     * +971 50 123 4567
     */
    const phoneRegex =
      /^\+?[0-9\s\-()]{7,20}$/;

    // Clear previous messages
    setPhoneError("");
    setSubmitError("");
    setIsSubmitted(false);

    // Client-side phone validation
    if (!phoneRegex.test(phone)) {
      setPhoneError(
        "Please enter a valid phone number."
      );

      return;
    }

    // Create API payload
    const payload = {
      name: String(
        formData.get("name") ?? ""
      ).trim(),

      company: String(
        formData.get("company") ?? ""
      ).trim(),

      email: String(
        formData.get("email") ?? ""
      ).trim(),

      phone,

      topic: String(
        formData.get("topic") ?? ""
      ).trim(),

      preferredDate: String(
        formData.get("preferredDate") ?? ""
      ).trim(),

      preferredTime: String(
        formData.get("preferredTime") ?? ""
      ).trim(),

      message: String(
        formData.get("message") ?? ""
      ).trim(),

      // Honeypot spam protection.
      // This should always remain empty for real users.
      website: String(
        formData.get("website") ?? ""
      ).trim(),
    };

    setIsSubmitting(true);

    /**
     * Abort the client request if the server takes
     * longer than 15 seconds to respond.
     */
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 15_000);

    try {
      const response = await fetch(
        "/api/consultation",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),

          signal: controller.signal,
        }
      );

      let data: ConsultationApiResponse;

      /**
       * Safely parse the API response.
       *
       * Protects against unexpected non-JSON
       * responses from the server or proxy.
       */
      try {
        data =
          (await response.json()) as ConsultationApiResponse;
      } catch {
        throw new Error(
          "We received an unexpected response from the server. Please try again."
        );
      }

      /**
       * Handle unsuccessful HTTP responses.
       */
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            data.message ||
              "Too many consultation requests. Please wait a few minutes before trying again."
          );
        }

        throw new Error(
          data.message ||
            "Unable to submit your consultation request. Please try again."
        );
      }

      /**
       * Additional API success validation.
       */
      if (!data.success) {
        throw new Error(
          data.message ||
            "The consultation request could not be completed. Please try again."
        );
      }

      // Show success message
      setIsSubmitted(true);

      // Reset form only after successful submission
      form.reset();
    } catch (error) {
      /**
       * Handle request timeout.
       */
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        setSubmitError(
          "The request is taking longer than expected. Please check your connection and try again."
        );

        return;
      }

      /**
       * Handle API, network and unexpected errors.
       */
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      // Always clear the timeout
      window.clearTimeout(timeoutId);

      // Re-enable submit button
      setIsSubmitting(false);
    }
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
              Tell us about your business goals, technology
              requirements or current challenges. We&apos;ll use
              the consultation to understand your needs and
              discuss the right direction for your business.
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
                      <Icon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
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
          <div className="min-w-0 rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
            {/* Success Message */}
            {isSubmitted && (
              <div
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4"
                role="status"
                aria-live="polite"
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
                    Thank you for requesting a consultation
                    with Bizzfi. Our team has received your
                    request and will contact you to confirm the
                    consultation schedule.
                  </p>
                </div>
              </div>
            )}

            {/* Submission Error */}
            {submitError && (
              <div
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4"
                role="alert"
              >
                <AlertCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                  aria-hidden="true"
                />

                <div>
                  <p className="font-medium text-red-600 dark:text-red-400">
                    Unable to submit consultation request
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {submitError}
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="min-w-0 space-y-6"
            >
              {/* Honeypot Spam Protection */}
              <div
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="consultation-website">
                  Website
                </label>

                <input
                  id="consultation-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name + Company */}
              <div className="grid min-w-0 gap-6 sm:grid-cols-2">
                <div className="min-w-0">
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
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    className="mt-2 h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="min-w-0">
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
                    maxLength={150}
                    autoComplete="organization"
                    placeholder="Company name"
                    className="mt-2 h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid min-w-0 gap-6 sm:grid-cols-2">
                <div className="min-w-0">
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
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="mt-2 h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="min-w-0">
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
                    title="Please enter a valid phone number"
                    placeholder="+91 98765 43210"
                    onChange={() => {
                      if (phoneError) {
                        setPhoneError("");
                      }
                    }}
                    className={`mt-2 h-12 w-full min-w-0 max-w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2 ${
                      phoneError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    aria-invalid={
                      phoneError ? "true" : "false"
                    }
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
              <div className="min-w-0">
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
                  className="mt-2 h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="" disabled>
                    Select a topic
                  </option>

                  {consultationTopics.map((topic) => (
                    <option
                      key={topic}
                      value={topic}
                    >
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Preferred Time */}
              <div className="grid min-w-0 gap-6 sm:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor="preferred-date"
                    className="text-sm font-medium text-foreground"
                  >
                    Preferred Date *
                  </label>

                  <div className="relative mt-2 min-w-0 max-w-full">
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
                      className="block h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="min-w-0">
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
                    className="mt-2 h-12 w-full min-w-0 max-w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="" disabled>
                      Select preferred time
                    </option>

                    {preferredTimes.map((time) => (
                      <option
                        key={time}
                        value={time}
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirement */}
              <div className="min-w-0">
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
                  maxLength={5000}
                  placeholder="Tell us what you would like to discuss..."
                  className="mt-2 w-full min-w-0 max-w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />

                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Request Free Consultation
                    </span>

                    <Send
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              {/* Scheduling Notice */}
              <p className="text-xs leading-5 text-muted-foreground">
                Your preferred date and time are a request only.
                The final consultation schedule will be confirmed
                by the Bizzfi team.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}