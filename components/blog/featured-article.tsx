import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

import type { BlogPost } from "@/data/blog";

type FeaturedArticleProps = {
  post: BlogPost;
};

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <section className="border-b border-border px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Label */}
        <div className="mb-8 flex items-center gap-2">
          <Sparkles
            className="h-4 w-4 text-blue-500"
            aria-hidden="true"
          />

          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Featured Insight
          </span>
        </div>

        {/* Featured Article */}
        <article className="group overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="grid lg:grid-cols-2">
            {/* Image Placeholder */}
            <div className="relative min-h-[280px] overflow-hidden border-b border-border bg-muted/50 sm:min-h-[360px] lg:min-h-[460px] lg:border-b-0 lg:border-r">
              {/* Background Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/5 to-violet-500/20"
                aria-hidden="true"
              />

              {/* Decorative Glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
                aria-hidden="true"
              />

              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Featured Article Image
                </span>
              </div>

              {/* Category */}
              <span className="absolute left-6 top-6 rounded-full border border-blue-500/20 bg-background/90 px-4 py-2 text-xs font-semibold text-blue-500 backdrop-blur">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CalendarDays
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  {formattedDate}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-blue-500 sm:text-4xl">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {post.excerpt}
              </p>

              {/* Author */}
              <p className="mt-5 text-sm text-muted-foreground">
                By{" "}
                <span className="font-medium text-foreground">
                  {post.author}
                </span>
              </p>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group/link inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500"
                >
                  Read Featured Article

                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}