import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

import type { BlogPost } from "@/data/blog";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(post.publishedAt));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5">
      {/* Image Placeholder */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted/50">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10"
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">
            Article Image
          </span>
        </div>

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full border border-blue-500/20 bg-background/90 px-3 py-1.5 text-xs font-semibold text-blue-500 backdrop-blur">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formattedDate}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-semibold leading-8 text-foreground transition-colors group-hover:text-blue-500">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
          {post.excerpt}
        </p>

        {/* Read More */}
        <div className="mt-auto pt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition-colors hover:text-blue-400"
          >
            Read Article

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}