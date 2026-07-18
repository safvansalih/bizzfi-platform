"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  badge?: string;
  title?: string;
  description?: string;
  items: FAQItem[];
};

export function FAQSection({
  badge = "Frequently Asked Questions",
  title = "Questions? We Have Answers.",
  description = "Find answers to some of the most common questions about working with Bizzfi.",
  items,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFAQ(index: number) {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
  }

  return (
    <section className="border-t border-border px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            {badge}
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-base leading-8 text-muted-foreground">
            {description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-blue-500/30"
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-foreground sm:text-lg">
                    {item.question}
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-500" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7">
                    <div className="border-t border-border pt-5">
                      <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}